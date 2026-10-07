import { useEffect, useRef, useState, type FormEvent } from "react";
import { Bot, ChevronDown, Send, X } from "lucide-react";
import { useTranslation } from "@/i18n/useTranslation";
import type { Language } from "@/i18n/language";
import { Link } from "react-router-dom";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import {
  getKnowledgeBaseAnswer,
  getSemanticChatAnswer,
} from "@/lib/semanticChatbot";

interface FAQItem {
  id: string;
  topicId: string;
  uz: string;
  ru: string;
}

interface FAQSection {
  id: string;
  title: Record<Language, string>;
  questions: FAQItem[];
}

interface ChatMessage {
  id: string;
  text: string;
  sender: "user" | "bot";
  actions?: CatalogAction[];
}

interface CatalogAction {
  to: string;
  label: string;
}

const FAQ_SECTIONS: FAQSection[] = [
  {
    id: "stay",
    title: { uz: "Xona va kottejlar", ru: "Номера и коттеджи" },
    questions: [
      {
        id: "cheapest-room",
        topicId: "room-cheapest",
        uz: "Eng arzon xona qaysi, narxi va joylashuvi qanday?",
        ru: "Какой номер самый доступный, сколько стоит и где находится?",
      },
      {
        id: "cheapest-rooms-all",
        topicId: "room-cheapest",
        uz: "Eng arzon narxdagi xonalarning barchasini ko‘rsat",
        ru: "Покажите все номера с самой низкой ценой",
      },
      {
        id: "three-person-rooms",
        topicId: "room-cheapest",
        uz: "3 kishilik xonalarning barchasi necha pul?",
        ru: "Сколько стоят все 3-местные номера?",
      },
      {
        id: "expensive-room",
        topicId: "room-most-expensive",
        uz: "Eng qimmat xona qaysi?",
        ru: "Какой номер самый дорогой?",
      },
      {
        id: "room-prices",
        topicId: "room-prices",
        uz: "Xona va kottejlar narxlari qancha?",
        ru: "Сколько стоят номера и коттеджи?",
      },
      {
        id: "cottages",
        topicId: "cottages",
        uz: "Kottejlar soni, narxi va joylashuvi qanday?",
        ru: "Сколько коттеджей, каковы цены и расположение?",
      },
      {
        id: "cheapest-cottage",
        topicId: "cottage-cheapest",
        uz: "Eng arzon kottej qaysi?",
        ru: "Какой коттедж самый доступный?",
      },
      {
        id: "expensive-cottage",
        topicId: "cottage-most-expensive",
        uz: "Eng qimmat kottej qaysi?",
        ru: "Какой коттедж самый дорогой?",
      },
      {
        id: "luxury",
        topicId: "luxury",
        uz: "Lyuks xonalar va kottejlar haqida ma’lumot",
        ru: "Информация о люкс-номерах и коттеджах",
      },
      {
        id: "capacity",
        topicId: "capacity",
        uz: "Xonalar va kottejlar nechta kishiga mo‘ljallangan?",
        ru: "На сколько человек рассчитаны номера и коттеджи?",
      },
      {
        id: "room-location",
        topicId: "accommodation-location",
        uz: "4 kishilik xonalar qayerda joylashgan?",
        ru: "Где расположены 4-местные номера?",
      },
      {
        id: "room-capacities",
        topicId: "capacity",
        uz: "Necha kishilik xonalar mavjud?",
        ru: "Какие номера по вместимости доступны?",
      },
      {
        id: "room-equipment",
        topicId: "amenities",
        uz: "Xonalarda qanday jihoz va qulayliklar bor?",
        ru: "Какие удобства и оснащение есть в номерах?",
      },
      {
        id: "private-kitchen",
        topicId: "luxury",
        uz: "Qaysi kottejda alohida oshxona bor?",
        ru: "В каком коттедже есть отдельная кухня?",
      },
    ],
  },
  {
    id: "amenities",
    title: { uz: "Qulayliklar", ru: "Удобства" },
    questions: [
      {
        id: "pool",
        topicId: "pool",
        uz: "Basseyn bormi?",
        ru: "Есть ли бассейн?",
      },
      {
        id: "sauna",
        topicId: "sauna",
        uz: "Sauna bormi?",
        ru: "Есть ли сауна?",
      },
      {
        id: "wifi",
        topicId: "wifi",
        uz: "Wi-Fi mavjudmi?",
        ru: "Есть ли Wi-Fi?",
      },
      {
        id: "halal-meals",
        topicId: "halal-meals",
        uz: "3 mahal halol ovqat beriladimi?",
        ru: "Предусмотрено ли 3-разовое халяльное питание?",
      },
      {
        id: "parking",
        topicId: "parking",
        uz: "Avtomobil uchun parkovka bormi?",
        ru: "Есть ли парковка для автомобиля?",
      },
      {
        id: "amenities",
        topicId: "amenities",
        uz: "Resortda qanday qulayliklar bor?",
        ru: "Какие удобства есть на курорте?",
      },
      {
        id: "food-area",
        topicId: "food-area",
        uz: "Ovqat tayyorlash joyi va magazin bormi?",
        ru: "Есть ли место для готовки и магазин?",
      },
      {
        id: "showers",
        topicId: "amenities",
        uz: "Xonalarda dush va sanuzel bormi?",
        ru: "Есть ли в номерах душ и санузел?",
      },
      {
        id: "playground",
        topicId: "amenities",
        uz: "Bolalar maydonchasi bormi?",
        ru: "Есть ли детская площадка?",
      },
      {
        id: "mountain-view",
        topicId: "resort-about",
        uz: "Tog‘ manzarasi bormi?",
        ru: "Есть ли вид на горы?",
      },
    ],
  },
  {
    id: "visit",
    title: { uz: "Manzil va tashrif", ru: "Расположение и поездка" },
    questions: [
      {
        id: "location",
        topicId: "location",
        uz: "Dugoba Resort qayerda joylashgan?",
        ru: "Где находится Dugoba Resort?",
      },
      {
        id: "booking",
        topicId: "booking",
        uz: "Qanday qilib bron qilaman?",
        ru: "Как забронировать?",
      },
      {
        id: "tour-packages",
        topicId: "tour-packages",
        uz: "Tur paketlari va transport haqida",
        ru: "О турпакетах и транспорте",
      },
      {
        id: "contact",
        topicId: "contact",
        uz: "Administrator bilan qanday bog‘lanaman?",
        ru: "Как связаться с администратором?",
      },
      {
        id: "working-hours",
        topicId: "hours",
        uz: "Resort qaysi vaqtda ishlaydi?",
        ru: "В какие часы работает курорт?",
      },
      {
        id: "directions",
        topicId: "location",
        uz: "Xarita va yo‘lni qayerdan ko‘raman?",
        ru: "Где посмотреть карту и маршрут?",
      },
      {
        id: "transport",
        topicId: "tour-packages",
        uz: "Farg‘onadan resortga transport bormi?",
        ru: "Есть ли транспорт из Ферганы до курорта?",
      },
      {
        id: "resort-about",
        topicId: "resort-about",
        uz: "Dugoba Resort haqida qisqacha",
        ru: "Кратко о Dugoba Resort",
      },
    ],
  },
];

const COPY: Record<
  Language,
  {
    title: string;
    subtitle: string;
    close: string;
    open: string;
    loading: string;
    greeting: string;
    placeholder: string;
    send: string;
    faq: string;
    teaser: string;
    teaserCta: string;
    dismissTeaser: string;
  }
> = {
  uz: {
    title: "Dugoba yordamchisi",
    subtitle: "Ko‘p so‘raladigan savollar",
    close: "Savollar oynasini yopish",
    open: "Savollar oynasini ochish",
    loading: "Javob qidirilmoqda...",
    greeting: "Assalomu alaykum! Dugoba Resort haqida qanday savolingiz bor?",
    placeholder: "Xabaringizni yozing...",
    send: "Yuborish",
    faq: "Savollar ro‘yxatini ochish",
    teaser:
      "Savollaringiz bormi? Dugoba Resort haqida javoblarni chat yordamchisidan oling.",
    teaserCta: "Chatni ochish",
    dismissTeaser: "Taklifni yopish",
  },
  ru: {
    title: "Помощник Dugoba",
    subtitle: "Часто задаваемые вопросы",
    close: "Закрыть вопросы",
    open: "Открыть вопросы",
    loading: "Ищу ответ...",
    greeting: "Здравствуйте! Задайте вопрос о Dugoba Resort.",
    placeholder: "Напишите сообщение...",
    send: "Отправить",
    faq: "Открыть список вопросов",
    teaser: "Остались вопросы? Узнайте больше о Dugoba Resort в чате.",
    teaserCta: "Открыть чат",
    dismissTeaser: "Скрыть подсказку",
  },
};

export default function FloatingChatbot() {
  const { language, t } = useTranslation();
  const copy = COPY[language];
  const [isOpen, setIsOpen] = useState(false);
  const [isFaqOpen, setIsFaqOpen] = useState(false);
  const [showTeaser, setShowTeaser] = useState(false);
  const [teaserDismissed, setTeaserDismissed] = useState(false);
  const [draft, setDraft] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    { id: crypto.randomUUID(), text: copy.greeting, sender: "bot" },
  ]);
  const answerTimerRef = useRef<number | null>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const teaserTimerRef = useRef<number | null>(null);

  useBodyScrollLock(isOpen);

  useEffect(() => {
    teaserTimerRef.current = window.setTimeout(
      () => setShowTeaser(true),
      90_000,
    );
    return () => {
      if (teaserTimerRef.current !== null) {
        window.clearTimeout(teaserTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    messagesRef.current?.scrollTo({
      top: messagesRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isLoading]);

  useEffect(
    () => () => {
      if (answerTimerRef.current !== null) {
        window.clearTimeout(answerTimerRef.current);
      }
    },
    [],
  );

  function getCatalogActions(
    topicId: string | undefined,
    question: string,
  ): CatalogAction[] {
    const normalized = question.toLocaleLowerCase();
    const asksCottages =
      topicId?.includes("cottage") ||
      topicId === "cottages" ||
      /kottej|коттедж/.test(normalized);
    const asksRooms =
      topicId?.includes("room") ||
      topicId === "accommodation-location" ||
      /xona|nomer|номер|комнат/.test(normalized);
    const actions: CatalogAction[] = [];

    if (asksRooms || topicId === "room-prices" || topicId === "luxury") {
      actions.push({
        to: "/xonalar",
        label:
          language === "ru" ? "Все номера и цены" : "Barcha xonalar va narxlar",
      });
    }
    if (asksCottages || topicId === "room-prices" || topicId === "luxury") {
      actions.push({
        to: "/kottejlar",
        label:
          language === "ru"
            ? "Все коттеджи и цены"
            : "Barcha kottejlar va narxlar",
      });
    }
    return actions;
  }

  function submitQuestion(question: string, topicId?: string) {
    const text = question.trim();
    if (!text || isLoading) return;

    setDraft("");
    setIsFaqOpen(false);
    setMessages((current) => [
      ...current,
      { id: crypto.randomUUID(), text, sender: "user" },
    ]);
    setIsLoading(true);
    const delay = 2000 + Math.floor(Math.random() * 3001);
    answerTimerRef.current = window.setTimeout(() => {
      const reply = topicId
        ? getKnowledgeBaseAnswer(topicId, text, language, t)
        : getSemanticChatAnswer(text, language, t);
      const actions = getCatalogActions(topicId, text);
      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          text: reply,
          sender: "bot",
          actions,
        },
      ]);
      setIsLoading(false);
      answerTimerRef.current = null;
    }, delay);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    submitQuestion(draft);
  }

  function closeChat() {
    if (answerTimerRef.current !== null) {
      window.clearTimeout(answerTimerRef.current);
      answerTimerRef.current = null;
    }
    setIsLoading(false);
    setIsFaqOpen(false);
    setIsOpen(false);
  }

  return (
    <div className="fixed bottom-6 right-[5.75rem] z-[85] flex flex-col items-end gap-3 sm:right-[5.75rem]">
      {isOpen && (
        <section
          role="dialog"
          aria-label={copy.title}
          className="flex h-[min(82vh,44rem)] max-h-[calc(100dvh-7rem)] w-[calc(100vw-2rem)] max-w-sm translate-x-[4.25rem] flex-col overflow-hidden rounded-lg border border-stone-200 bg-stone-50 shadow-2xl"
        >
          <header className="flex items-center gap-3 border-b border-stone-200 bg-white px-4 py-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest-700 text-white">
              <Bot size={21} aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <h2 className="truncate text-sm font-semibold text-stone-950">
                {copy.title}
              </h2>
              <p className="text-xs text-stone-500">{copy.subtitle}</p>
            </div>
            <button
              type="button"
              onClick={closeChat}
              aria-label={copy.close}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-stone-500 transition-colors hover:bg-stone-100 hover:text-stone-900"
            >
              <X size={19} aria-hidden="true" />
            </button>
          </header>

          <div
            ref={messagesRef}
            role="log"
            aria-live="polite"
            className="min-h-0 flex-1 space-y-3 overflow-y-auto p-4"
            data-lenis-prevent
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`max-w-[88%] whitespace-pre-wrap break-words rounded-lg px-3 py-2.5 text-sm leading-relaxed ${message.sender === "user" ? "ml-auto bg-forest-700 text-white" : "mr-auto border border-stone-200 bg-white text-stone-800"}`}
              >
                {message.text}
                {message.actions && message.actions.length > 0 && (
                  <div className="mt-3 flex flex-col gap-2 border-t border-stone-100 pt-3">
                    {message.actions.map((action) => (
                      <Link
                        key={action.to}
                        to={action.to}
                        onClick={closeChat}
                        className="inline-flex min-h-9 items-center justify-center rounded-md border border-forest-700 px-3 py-2 text-xs font-semibold text-forest-800 transition-colors hover:bg-forest-50"
                      >
                        {action.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div
                role="status"
                className="flex items-center gap-2 text-xs text-stone-500"
              >
                <Bot size={15} aria-hidden="true" />
                <span>{copy.loading}</span>
                <span className="flex gap-0.5" aria-hidden="true">
                  <i className="h-1 w-1 animate-pulse rounded-full bg-stone-400" />
                  <i className="h-1 w-1 animate-pulse rounded-full bg-stone-400 [animation-delay:150ms]" />
                  <i className="h-1 w-1 animate-pulse rounded-full bg-stone-400 [animation-delay:300ms]" />
                </span>
              </div>
            )}
          </div>

          <div className="relative border-t border-stone-200 bg-white p-3">
            {isFaqOpen && (
              <div
                role="region"
                aria-label={copy.faq}
                className="absolute bottom-full left-3 right-3 mb-2 max-h-[min(58vh,30rem)] overflow-y-auto rounded-lg border border-stone-200 bg-stone-50 p-3 shadow-xl"
                data-lenis-prevent
              >
                {FAQ_SECTIONS.map((section) => (
                  <section
                    key={section.id}
                    aria-label={section.title[language]}
                    className="mb-4 last:mb-0"
                  >
                    <h3 className="px-1 pb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-500">
                      {section.title[language]}
                    </h3>
                    <div className="overflow-hidden rounded-md border border-stone-200 bg-white">
                      {section.questions.map((question) => (
                        <button
                          key={question.id}
                          type="button"
                          onClick={() =>
                            submitQuestion(question[language], question.topicId)
                          }
                          disabled={isLoading}
                          className="flex min-h-10 w-full items-center justify-between gap-2 border-b border-stone-100 px-3 py-2 text-left text-xs leading-snug text-stone-800 last:border-b-0 hover:bg-forest-50 disabled:cursor-wait"
                        >
                          <span>{question[language]}</span>
                          <ChevronDown
                            size={14}
                            className="shrink-0 -rotate-90 text-forest-700"
                            aria-hidden="true"
                          />
                        </button>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsFaqOpen((current) => !current)}
                disabled={isLoading}
                aria-label={copy.faq}
                aria-expanded={isFaqOpen}
                title={copy.faq}
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-md border text-lg font-semibold transition-colors disabled:cursor-wait ${isFaqOpen ? "border-forest-700 bg-forest-700 text-white" : "border-stone-300 bg-white text-forest-800 hover:bg-forest-50"}`}
              >
                /
              </button>
              <input
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder={copy.placeholder}
                aria-label={copy.placeholder}
                maxLength={1500}
                disabled={isLoading}
                className="min-w-0 flex-1 rounded-md border border-stone-300 bg-stone-50 px-3 py-2.5 text-sm text-stone-900 outline-none transition focus:border-forest-600 focus:ring-2 focus:ring-forest-600/15 disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={!draft.trim() || isLoading}
                aria-label={copy.send}
                title={copy.send}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-forest-700 text-white transition-colors hover:bg-forest-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Send size={17} aria-hidden="true" />
              </button>
            </form>
          </div>
        </section>
      )}

      {showTeaser && !teaserDismissed && !isOpen && (
        <div className="flex max-w-[calc(100vw-2rem)] translate-x-[4.25rem] items-start gap-3 rounded-md border border-stone-200 bg-white p-3 shadow-xl sm:max-w-xs">
          <p className="flex-1 text-xs leading-relaxed text-stone-700">
            {copy.teaser}
          </p>
          <button
            type="button"
            onClick={() => {
              setIsOpen(true);
              setTeaserDismissed(true);
            }}
            className="shrink-0 text-xs font-semibold text-forest-700 underline underline-offset-2 hover:text-forest-900"
          >
            {copy.teaserCta}
          </button>
          <button
            type="button"
            onClick={() => setTeaserDismissed(true)}
            aria-label={copy.dismissTeaser}
            className="-mr-1 -mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-stone-400 hover:bg-stone-100 hover:text-stone-700"
          >
            <X size={14} aria-hidden="true" />
          </button>
        </div>
      )}

      <button
        type="button"
        onClick={() => (isOpen ? closeChat() : setIsOpen(true))}
        aria-label={isOpen ? copy.close : copy.open}
        aria-expanded={isOpen}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-forest-700 text-white shadow-xl transition-colors hover:bg-forest-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700 focus-visible:ring-offset-2"
      >
        {isOpen ? (
          <X size={23} aria-hidden="true" />
        ) : (
          <Bot size={23} aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
