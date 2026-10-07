import {
  getAccommodations,
  getAmenities,
  getResortDescription,
  getResortLocation,
  resortInfo,
  type Accommodation,
} from '@/data/accommodations';
import type { Language } from '@/i18n/language';

type Translate = (key: string) => string;

export interface KnowledgeBaseItem {
  id: string;
  keywords: readonly string[];
  answer: (context: AnswerContext) => string;
}

interface AnswerContext {
  question: string;
  language: Language;
  translate: Translate;
  accommodations: Accommodation[];
}

function normalize(text: string): string {
  return text
    .toLocaleLowerCase()
    .normalize('NFKD')
    .replace(/[’ʻ`']/g, '')
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function words(text: string): string[] {
  return normalize(text).split(' ').filter(Boolean);
}

function sameWord(queryWord: string, keyword: string): boolean {
  if (queryWord === keyword) return true;
  return queryWord.length > 3 && keyword.length > 3 &&
    (queryWord.startsWith(keyword) || keyword.startsWith(queryWord));
}

function scoreItem(queryWords: string[], item: KnowledgeBaseItem): number {
  const keywords = item.keywords.flatMap(words);
  return queryWords.reduce((score, queryWord) =>
    score + (keywords.some((keyword) => sameWord(queryWord, keyword)) ? 1 : 0), 0);
}

function accommodationSummary(items: Accommodation[], language: Language): string {
  return items.map((item) => {
    const kind = item.type === 'room'
      ? language === 'ru' ? 'Номер' : 'Xona'
      : language === 'ru' ? 'Коттедж' : 'Kottej';
    const people = language === 'ru' ? 'мест' : 'kishilik';
    const location = language === 'ru' ? 'Расположение' : 'Joylashuvi';
    return `${kind}: ${item.name}, ${item.capacity} ${people}, ${item.priceDisplay}. ${location}: ${item.location}.`;
  }).join('\n');
}

function findMostExpensive(items: Accommodation[]): Accommodation | undefined {
  return items.reduce<Accommodation | undefined>((mostExpensive, item) =>
    !mostExpensive || item.price > mostExpensive.price ? item : mostExpensive, undefined);
}

function findMostExpensiveCottage(items: Accommodation[]): Accommodation | undefined {
  return findMostExpensive(items.filter((item) => item.type === 'cottage'));
}

function findCheapestCottages(items: Accommodation[]): Accommodation[] {
  const cottages = items.filter((item) => item.type === 'cottage');
  if (cottages.length === 0) return [];
  const lowestPrice = Math.min(...cottages.map((item) => item.price));
  return cottages.filter((item) => item.price === lowestPrice);
}

function answerForAccommodationLocation(context: AnswerContext): string {
  const query = normalize(context.question);
  const type = /kottej|коттедж|cottage/.test(query) ? 'cottage' : 'room';
  let candidates = context.accommodations.filter((item) => item.type === type);
  const capacityMatch = query.match(/(?:^|\s)(3|4|6|8|10)(?:\s|$)/);
  if (capacityMatch) {
    const matchingCapacity = candidates.filter((item) => item.capacity === Number(capacityMatch[1]));
    if (matchingCapacity.length > 0) candidates = matchingCapacity;
  }
  const numberMatch = query.match(/(?:xona|номер|room|kottej|коттедж)\s*(?:№|no|raqam)?\s*(\d+)/);
  if (numberMatch) {
    const suffix = `-${numberMatch[1]}`;
    const matchingNumber = candidates.filter((item) => item.id.endsWith(suffix));
    if (matchingNumber.length > 0) candidates = matchingNumber;
  }
  const locations = [...new Set(candidates.map((item) => `${item.name}: ${item.location}`))];
  const note = context.language === 'ru'
    ? 'Точный корпус и этаж в каталоге сайта не указаны.'
    : 'Sayt katalogida aniq korpus va qavat ko‘rsatilmagan.';
  return `${locations.join('\n')}\n${note}`;
}

function getPriceList(items: Accommodation[], language: Language): string {
  const groups = new Map<string, Accommodation[]>();
  items.forEach((item) => {
    const key = `${item.type}-${item.category}-${item.price}`;
    groups.set(key, [...(groups.get(key) ?? []), item]);
  });

  return [...groups.values()]
    .sort((a, b) => a[0].price - b[0].price)
    .map((group) => {
      const item = group[0];
      const kind = item.type === 'room'
        ? language === 'ru' ? 'номер' : 'xona'
        : language === 'ru' ? 'коттедж' : 'kottej';
      const locations = [...new Set(group.map((entry) => entry.location))].join(', ');
      return `${item.category} ${kind}: ${item.priceDisplay}. ${language === 'ru' ? 'Расположение' : 'Joylashuvi'}: ${locations}.`;
    }).join('\n');
}

function contactText(language: Language): string {
  return language === 'ru'
    ? `Для бронирования и уточнения деталей позвоните ${resortInfo.phone} или напишите ${resortInfo.telegramUsername}.`
    : `Bron va tafsilotlarni aniqlashtirish uchun ${resortInfo.phone} raqamiga qo‘ng‘iroq qiling yoki ${resortInfo.telegramUsername} ga yozing.`;
}

const KNOWLEDGE_BASE: KnowledgeBaseItem[] = [
  {
    id: 'room-cheapest',
    keywords: ['arzon', 'arzonroq', 'eng arzon', 'tejamkor', 'ekonom', 'econom', 'pastroq', 'minimal', 'hamyonbop', 'xamyonbop', 'skidka', 'chegirma', 'xona', 'nomer'],
    answer: ({ language, accommodations }) => {
      const rooms = accommodations.filter((item) => item.type === 'room');
      if (rooms.length === 0) {
        return language === 'ru' ? 'Доступные номера не найдены.' : 'Mavjud xona topilmadi.';
      }
      const lowestPrice = Math.min(...rooms.map((item) => item.price));
      const cheapestRooms = rooms.filter((item) => item.price === lowestPrice);
      return language === 'ru'
        ? `Самые доступные номера по каталогу сайта (${cheapestRooms[0].priceDisplay}):\n${accommodationSummary(cheapestRooms, language)}`
        : `Sayt katalogidagi eng arzon xonalar (${cheapestRooms[0].priceDisplay}):\n${accommodationSummary(cheapestRooms, language)}`;
    },
  },
  {
    id: 'room-most-expensive',
    keywords: ['qimmat', 'qimmatroq', 'eng qimmat', 'premium', 'luxury', 'дорогой', 'дороже', 'максимальный', 'максимум', 'yuqori narx', 'eng yuqori', 'xonalar', 'xona'],
    answer: ({ language, accommodations }) => {
      const rooms = accommodations.filter((item) => item.type === 'room');
      const mostExpensive = findMostExpensive(rooms);
      if (!mostExpensive) return language === 'ru' ? 'Нет данных о доступных номерах.' : 'Mavjud xonalar haqida ma’lumot topilmadi.';
      return `${language === 'ru' ? 'Самый дорогой номер в каталоге' : 'Katalogdagi eng qimmat xona'}: ${mostExpensive.name}, ${mostExpensive.priceDisplay}, ${mostExpensive.capacity} ${language === 'ru' ? 'мест' : 'kishilik'}, ${mostExpensive.location}.`;
    },
  },
  {
    id: 'cottage-cheapest',
    keywords: ['arzon', 'arzonroq', 'tejamkor', 'ekonom', 'pastroq', 'minimal', 'hamyonbop', 'xamyonbop', 'skidka', 'chegirma', 'byudjet', 'eng arzon', 'kottej', 'коттедж'],
    answer: ({ language, accommodations }) => {
      const cottages = findCheapestCottages(accommodations);
      return cottages.length > 0
        ? `${language === 'ru' ? 'Самые доступные коттеджи по каталогу сайта' : 'Sayt katalogidagi eng arzon kottejlar'} (${cottages[0].priceDisplay}):\n${accommodationSummary(cottages, language)}`
        : language === 'ru' ? 'Доступные коттеджи не найдены.' : 'Mavjud kottej topilmadi.';
    },
  },
  {
    id: 'cottage-most-expensive',
    keywords: ['qimmat', 'qimmatroq', 'premium', 'hashamat', 'lyuks', 'lux', 'eng yuqori', 'eng qimmat', 'дорогой', 'дороже', 'максимальный', 'kottej', 'коттедж'],
    answer: ({ language, accommodations }) => {
      const cottage = findMostExpensiveCottage(accommodations);
      return cottage
        ? `${language === 'ru' ? 'Самый дорогой коттедж' : 'Eng qimmat kottej'}: ${accommodationSummary([cottage], language)} ${cottage.features.join(', ')}.`
        : language === 'ru' ? 'Доступные коттеджи не найдены.' : 'Mavjud kottej topilmadi.';
    },
  },
  {
    id: 'room-prices',
    keywords: ['narx', 'narxlari', 'qancha', 'necha pul', 'bahosi', 'sum', 'so‘m', 'pul', 'price', 'стоимость', 'цена', 'сколько', 'tarif', 'расценки'],
    answer: ({ language, accommodations }) => `${language === 'ru' ? 'Цены по каталогу сайта:' : 'Sayt katalogidagi narxlar:'}\n${getPriceList(accommodations, language)}`,
  },
  {
    id: 'luxury',
    keywords: ['lyuks', 'lux', 'люкс', 'luxury', 'premium', 'hashamat', 'shinam', 'alohida oshxona', 'oshxona', 'kuxnya', 'xususiy', 'вип', 'komfort', 'qulay'],
    answer: ({ language, accommodations }) => {
      const luxury = accommodations.filter((item) => item.isLuxury || /lyuks|люкс|lux/i.test(item.category));
      return luxury.length
        ? `${language === 'ru' ? 'Люкс-варианты по каталогу:' : 'Katalogdagi lyuks variantlar:'}\n${accommodationSummary(luxury, language)}\n${language === 'ru' ? 'Удобства' : 'Qulayliklar'}: ${[...new Set(luxury.flatMap((item) => item.features))].join(', ')}.`
        : language === 'ru' ? 'Люкс-варианты в каталоге не найдены.' : 'Katalogda lyuks variant topilmadi.';
    },
  },
  {
    id: 'cottages',
    keywords: ['kottej', 'kottejlar', 'коттедж', 'коттеджи', 'cottage', 'uycha', 'oilaviy uy', 'hovli', 'shaxsiy', 'mustaqil uy', 'villa', 'uy', 'dacha'],
    answer: ({ language, accommodations }) => {
      const cottages = accommodations.filter((item) => item.type === 'cottage');
      return `${language === 'ru' ? `В каталоге ${cottages.length} коттеджей:` : `Katalogda ${cottages.length} ta kottej bor:`}\n${accommodationSummary(cottages, language)}`;
    },
  },
  {
    id: 'pool',
    keywords: ['basseyn', 'basseynda', 'hovuz', 'suzish', 'suv', 'pool', 'swimming', 'купальня', 'бассейн', 'плавать', 'suzish joyi', 'cho‘milish'],
    answer: ({ language }) => language === 'ru'
      ? `В текстовой информации сайта наличие бассейна не подтверждено. Уточните у администратора: ${resortInfo.phone}.`
      : `Matnli sayt ma’lumotida basseyn borligi tasdiqlanmagan. Administratordan aniqlashtiring: ${resortInfo.phone}.`,
  },
  {
    id: 'sauna',
    keywords: ['sauna', 'saunada', 'hammom', 'bug‘xona', 'bug xona', 'парная', 'баня', 'сауна', 'bug‘', 'issiq xona', 'dam olish', 'spa'],
    answer: ({ language }) => language === 'ru'
      ? `Сауна не указана в текстовой информации сайта. Наличие уточните у администратора: ${resortInfo.phone}.`
      : `Saytning matnli ma’lumotida sauna ko‘rsatilmagan. Borligini administratordan aniqlashtiring: ${resortInfo.phone}.`,
  },
  {
    id: 'wifi',
    keywords: ['wifi', 'wi fi', 'internet', 'wi-fi', 'wlan', 'tarmoq', 'wireless', 'вайфай', 'вай фай', 'интернет', 'signal', 'aloqa'],
    answer: ({ language, accommodations }) => {
      const hasWifi = accommodations.some((item) => item.features.some((feature) => /wi.?fi/i.test(feature)));
      return hasWifi
        ? language === 'ru' ? 'Wi-Fi указан среди удобств номеров и коттеджей.' : 'Xona va kottejlar qulayliklarida Wi-Fi ko‘rsatilgan.'
        : language === 'ru' ? 'Информация о Wi-Fi не найдена.' : 'Wi-Fi haqida ma’lumot topilmadi.';
    },
  },
  {
    id: 'halal-meals',
    keywords: ['halol', 'halal', 'халяль', 'ovqat', 'taom', 'nonushta', 'tushlik', 'kechki ovqat', 'uch mahal', '3 mahal', 'еда', 'питание', 'завтрак', 'обед', 'ужин'],
    answer: ({ language }) => language === 'ru'
      ? `Трёхразовое халяльное питание не указано в информации сайта. Уточните у администратора: ${resortInfo.phone}.`
      : `Sayt ma’lumotida 3 mahal halol ovqat xizmati ko‘rsatilmagan. Administratordan aniqlashtiring: ${resortInfo.phone}.`,
  },
  {
    id: 'parking',
    keywords: ['parkovka', 'parking', 'avtoturargoh', 'mashina', 'avtomobil', 'transport', 'joy', 'машина', 'парковка', 'стоянка', 'автостоянка', 'автомобиль'],
    answer: ({ language }) => language === 'ru'
      ? `Парковка не указана в текстовой информации сайта. Наличие мест уточните у администратора: ${resortInfo.phone}.`
      : `Saytning matnli ma’lumotida parkovka ko‘rsatilmagan. Joy borligini administratordan aniqlashtiring: ${resortInfo.phone}.`,
  },
  {
    id: 'accommodation-location',
    keywords: ['xona', 'kottej', 'nomer', 'kishilik', 'qayerda', 'joylashuv', 'joylashgan', 'lokatsiya', 'manzil', 'where', 'location', 'расположение', 'находится', 'адрес', 'qavat'],
    answer: answerForAccommodationLocation,
  },
  {
    id: 'location',
    keywords: ['resort', 'dugoba', 'kurort', 'manzil', 'qayerda', 'joylashuv', 'lokatsiya', 'lokatsiyasi', 'adres', 'address', 'xarita', 'xaritada', 'map', 'location', 'карта'],
    answer: ({ language }) => `${getResortLocation(language)}. ${language === 'ru' ? 'Курорт находится в ущелье Дугоба.' : 'Resort Dugoba darasida joylashgan.'} ${getResortDescription(language)} ${resortInfo.mapUrl}`,
  },
  {
    id: 'booking',
    keywords: ['bron', 'bronlash', 'band', 'buyurtma', 'band qilish', 'joy olmoq', 'kelish', 'sana', 'booking', 'забронировать', 'бронь', 'заказать', 'свободно', 'даты'],
    answer: ({ language }) => `${language === 'ru' ? 'Для бронирования свяжитесь с администратором.' : 'Bron qilish uchun administrator bilan bog‘laning.'} ${contactText(language)}`,
  },
  {
    id: 'capacity',
    keywords: ['sig‘im', 'sigim', 'necha kishi', 'odam', 'kishilik', 'joylashadi', 'мест', 'вместимость', 'сколько человек', 'гостей', 'capacity'],
    answer: ({ language, accommodations }) => {
      const rooms = accommodations.filter((item) => item.type === 'room');
      const capacities = [...new Set(rooms.map((item) => item.capacity))].sort((a, b) => a - b);
      return language === 'ru'
        ? `В каталоге есть номера на ${capacities.join(', ')} человек. Коттеджи рассчитаны на ${[...new Set(accommodations.filter((item) => item.type === 'cottage').map((item) => item.capacity))].sort((a, b) => a - b).join(', ')} человек.`
        : `Katalogda ${capacities.join(', ')} kishilik xonalar bor. Kottejlar sig‘imi: ${[...new Set(accommodations.filter((item) => item.type === 'cottage').map((item) => item.capacity))].sort((a, b) => a - b).join(', ')} kishi.`;
    },
  },
  {
    id: 'amenities',
    keywords: ['qulaylik', 'xizmat', 'nima bor', 'nimalar bor', 'infratuzilma', 'sharoit', 'facility', 'amenities', 'удобства', 'сервис', 'инфраструктура', 'есть ли'],
    answer: ({ language, translate }) => {
      const amenities = getAmenities(language).map((item) => item.name).join(', ');
      const note = language === 'ru'
        ? 'Наличие бассейна, сауны, питания и парковки в текстовой информации сайта не подтверждено; уточните у администратора.'
        : 'Basseyn, sauna, ovqatlanish va parkovka sayt ma’lumotida tasdiqlanmagan; administratordan aniqlashtiring.';
      return `${language === 'ru' ? 'Удобства по сайту' : 'Saytda ko‘rsatilgan qulayliklar'}: ${amenities}. ${translate('resort.locationDesc')} ${note}`;
    },
  },
  {
    id: 'food-area',
    keywords: ['oshxona', 'ochoqxona', 'ovqat pishirish', 'pishirish', 'magazin', 'do‘kon', 'кухня', 'готовить', 'магазин', 'кафе', 'столовая', 'еда'],
    answer: ({ language }) => language === 'ru'
      ? 'На территории есть общая зона для самостоятельного приготовления еды и небольшой магазин у входа. Отдельная кухня предусмотрена в отдельных вариантах жилья.'
      : 'Hududda mehmonlar o‘zlari ovqat tayyorlashi uchun umumiy o‘choqxona va kirish qismida kichik magazin bor. Ayrim turar joylarda alohida oshxona mavjud.',
  },
  {
    id: 'tour-packages',
    keywords: ['tur paket', 'turpaket', 'sayohat', 'transport', 'avtobus', 'tur narx', 'турпакет', 'экскурсия', 'транспорт', 'автобус', 'yo‘l', 'kelib ketish'],
    answer: ({ translate }) => {
      const status = translate('tourPackages.noneDesc');
      const transport = [
        translate('tourPackages.transport1Desc'),
        translate('tourPackages.transport2Desc'),
        translate('tourPackages.transport3Desc'),
      ].join(' ');
      return `${status} ${transport} Telegram: ${resortInfo.telegramChannel}`;
    },
  },
  {
    id: 'contact',
    keywords: ['telefon', 'raqam', 'aloqa', 'bog‘lanish', 'telegram', 'instagram', 'admin', 'administrator', 'contact', 'контакт', 'телефон', 'связаться', 'менеджер'],
    answer: ({ language }) => `${contactText(language)} ${language === 'ru' ? `Instagram: ${resortInfo.instagramUsername}.` : `Instagram: ${resortInfo.instagramUsername}.`}`,
  },
  {
    id: 'hours',
    keywords: ['ish vaqti', 'ishlaydi', 'qachon', 'soat', '24/7', 'kecha kunduz', 'doimo', 'vaqt', 'режим работы', 'часы', 'когда', 'круглосуточно', 'время', 'открыт'],
    answer: ({ translate }) => `${translate('contact.hoursLabel')}: ${translate('contact.hoursValue')}.`,
  },
  {
    id: 'resort-about',
    keywords: ['resort', 'kurort', 'dam olish', 'dugoba', 'tog‘', 'tabiat', 'manzara', 'ta’til', 'отдых', 'курорт', 'дугоба', 'природа', 'горы'],
    answer: ({ language }) => `${getResortDescription(language)} ${language === 'ru' ? `Всего ${resortInfo.totalRooms} номеров и ${resortInfo.totalCottages} коттеджей.` : `Jami ${resortInfo.totalRooms} ta xona va ${resortInfo.totalCottages} ta kottej mavjud.`}`,
  },
];

function fallbackAnswer(language: Language): string {
  return language === 'ru'
    ? `Извините, точную информацию по этому вопросу найти не удалось. Я могу подсказать цены на номера, удобства и расположение. Свяжитесь с администратором: ${resortInfo.phone}, Telegram ${resortInfo.telegramUsername}.`
    : `Kechirasiz, ushbu savolingiz bo‘yicha aniq ma’lumot topolmadim. Xonalar narxi, qulayliklar va joylashuv haqida yordam bera olaman. Administrator: ${resortInfo.phone}, Telegram ${resortInfo.telegramUsername}.`;
}

export function getSemanticChatAnswer(
  question: string,
  language: Language,
  translate: Translate,
): string {
  const queryWords = [...new Set(words(question))];
  if (queryWords.length === 0) return fallbackAnswer(language);

  const context: AnswerContext = {
    question,
    language,
    translate,
    accommodations: getAccommodations(language).filter((item) => item.available),
  };
  const scoredItems = KNOWLEDGE_BASE.map((item, index) => ({
    item,
    index,
    score: scoreItem(queryWords, item),
  })).sort((a, b) => b.score - a.score || a.index - b.index);
  const bestMatch = scoredItems[0];

  return bestMatch && bestMatch.score > 0
    ? bestMatch.item.answer(context)
    : fallbackAnswer(language);
}

export function getKnowledgeBaseAnswer(
  topicId: string,
  question: string,
  language: Language,
  translate: Translate,
): string {
  const item = KNOWLEDGE_BASE.find((entry) => entry.id === topicId);
  if (!item) return fallbackAnswer(language);

  return item.answer({
    question,
    language,
    translate,
    accommodations: getAccommodations(language).filter((accommodation) => accommodation.available),
  });
}