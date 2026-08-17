import r3p1 from '../xonalar/3kishilik/3kishi1.png';
import r3p2 from '../xonalar/3kishilik/3kishi2.png';
import r3p3 from '../xonalar/3kishilik/3kishi3.png';
import r3p4 from '../xonalar/3kishilik/3kishi4.png';
import r3p5 from '../xonalar/3kishilik/3kishi5.png';

import r4p1 from '../xonalar/4kishilik/4kishi1.png';
import r4p2 from '../xonalar/4kishilik/4kishi2.png';
import r4p3 from '../xonalar/4kishilik/4kishi3.png';
import r4p4 from '../xonalar/4kishilik/4kishi4.png';
import r4p5 from '../xonalar/4kishilik/4kishi5.png';

import c1_1 from '../xonalar/10kishilik/10kishi1.png';
import c1_2 from '../xonalar/10kishilik/10kishi2.png';
import c1_3 from '../xonalar/10kishilik/10kishi3.png';
import c1_4 from '../xonalar/10kishilik/10kishi4.png';

import c2_1 from '../xonalar/10kishilik-1/2-10kishi1.png';
import c2_2 from '../xonalar/10kishilik-1/2-10kishi2.png';
import c2_3 from '../xonalar/10kishilik-1/2-10kishi3.png';
import c2_4 from '../xonalar/10kishilik-1/2-10kishi4.png';
import c2_5 from '../xonalar/10kishilik-1/2-10kishi5.png';
import c2_6 from '../xonalar/10kishilik-1/2-10kishi6.png';

import c3_1 from '../xonalar/10-kishilik-3-standart/standart-1.png';
import c3_2 from '../xonalar/10-kishilik-3-standart/standart-2.png';
import c3_3 from '../xonalar/10-kishilik-3-standart/standart-3.png';
import c3_4 from '../xonalar/10-kishilik-3-standart/standart-4.png';
import c3_5 from '../xonalar/10-kishilik-3-standart/standart-5.png';
import c3_6 from '../xonalar/10-kishilik-3-standart/standart-6.png';
import c3_7 from '../xonalar/10-kishilik-3-standart/standart-7.png';
import c3_8 from '../xonalar/10-kishilik-3-standart/standart-8.png';
import c3_9 from '../xonalar/10-kishilik-3-standart/standart-9.png';
import c3_10 from '../xonalar/10-kishilik-3-standart/standart-10.png';

import c4_1 from '../xonalar/10-kishilik-pollux/10kishi-pollux1.png';
import c4_2 from '../xonalar/10-kishilik-pollux/10kishi-pollux2.png';
import c4_3 from '../xonalar/10-kishilik-pollux/10kishi-pollux3.png';
import c4_4 from '../xonalar/10-kishilik-pollux/10kishi-pollux4.png';
import c4_5 from '../xonalar/10-kishilik-pollux/10kishi-pollux5.png';
import c4_6 from '../xonalar/10-kishilik-pollux/10kishi-pollux6.png';
import c4_7 from '../xonalar/10-kishilik-pollux/10kishi-pollux7.png';
import c4_8 from '../xonalar/10-kishilik-pollux/10kishi-pollux8.png';
import c4_9 from '../xonalar/10-kishilik-pollux/10kishi-pollux9.png';
import c4_10 from '../xonalar/10-kishilik-pollux/10kishi-pollux10.png';

import c5_1 from '../xonalar/8-kishilik-luks/8kishi-lux1.png';
import c5_2 from '../xonalar/8-kishilik-luks/8kishi-lux2.png';
import c5_3 from '../xonalar/8-kishilik-luks/8kishi-lux3.png';
import c5_4 from '../xonalar/8-kishilik-luks/8kishi-lux4.png';
import c5_5 from '../xonalar/8-kishilik-luks/8kishi-lux5.png';
import c5_6 from '../xonalar/8-kishilik-luks/8kishi-lux6.png';
import c5_7 from '../xonalar/8-kishilik-luks/8kishi-lux7.png';
import c5_8 from '../xonalar/8-kishilik-luks/8kishi-lux8.png';
import c5_9 from '../xonalar/8-kishilik-luks/8kishi-lux9.png';
import c5_10 from '../xonalar/8-kishilik-luks/8kishi-lux10.png';

import v_standart2 from '../videos/2-standart-kotej-video/standart-2.mp4';
import v_standart3 from '../videos/3-standart-kotej-video/standart-3.mp4';
import v_luxKotej from '../videos/lux-kotej-video/lux-kotej.mp4';
import v_4kishi1 from '../videos/4-kishi-xona-video/4kishi.mp4';
import v_4kishi2 from '../videos/4-kishi-xona-video/4kishi-2.mp4';
import v_4kishi3 from '../videos/4-kishi-xona-video/4kishi-3.mp4';

import v_bolim1 from '../videos/videolar-bolim.mp4';
import v_bolim2 from '../videos/videolar-bolim2.mp4';
import v_bolim3 from '../videos/videolar-bolim3.mp4';
import v_bolim4 from '../videos/videolar-bolim4.mp4';

import am_tabiat0 from '../atrof-muhit/tabiat.png';
import am_tabiat1 from '../atrof-muhit/tabiat1.png';
import am_tabiat2 from '../atrof-muhit/tabiat2.png';
import am_tabiat3 from '../atrof-muhit/tabiat3.png';
import am_tabiat4 from '../atrof-muhit/tabiat4.png';
import am_tabiat5 from '../atrof-muhit/tabiat5.png';
import am_tabiat6 from '../atrof-muhit/tabiat6.png';
import am_tabiat7 from '../atrof-muhit/tabiat7.png';
import am_tabiat8 from '../atrof-muhit/tabiat8.png';
import am_xonaKotej from '../atrof-muhit/xona-kotej.png';
import am_tog from '../atrof-muhit/tog.png';
import am_resort from '../atrof-muhit/resort.png';

export interface Accommodation {
  id: string;
  name: string;
  type: 'cottage' | 'room';
  category: string;
  capacity: number;
  price: number;
  priceDisplay: string;
  location: string;
  shortDescription: string;
  description: string;
  amenities: string[];
  mainImage: string;
  gallery: string[];
  video: string | null;
  tapchanImages: string[];
  hasKitchen: boolean;
  kitchenImages: string[];
  kitchenVideo: string | null;
  isLuxury: boolean;
  hasPrivateTapchan: boolean;
  features: string[];
}

const IMG = {
  heroResort: 'https://images.pexels.com/photos/30151209/pexels-photo-30151209.jpeg?auto=compress&cs=tinysrgb&w=1920',
  heroMountain: 'https://images.pexels.com/photos/452726/pexels-photo-452726.jpeg?auto=compress&cs=tinysrgb&w=1920',
  resortAerial: 'https://images.pexels.com/photos/12389429/pexels-photo-12389429.jpeg?auto=compress&cs=tinysrgb&w=1920',
  resortTerrace: 'https://images.pexels.com/photos/31665649/pexels-photo-31665649.jpeg?auto=compress&cs=tinysrgb&w=1920',
  resortPool: 'https://images.pexels.com/photos/9119725/pexels-photo-9119725.jpeg?auto=compress&cs=tinysrgb&w=1920',
  resortFacade: 'https://images.pexels.com/photos/9119622/pexels-photo-9119622.jpeg?auto=compress&cs=tinysrgb&w=1920',
  resortGarden: 'https://images.pexels.com/photos/9119722/pexels-photo-9119722.jpeg?auto=compress&cs=tinysrgb&w=1920',
  resortElegant: 'https://images.pexels.com/photos/9119626/pexels-photo-9119626.jpeg?auto=compress&cs=tinysrgb&w=1920',
  resortForest: 'https://images.pexels.com/photos/38543138/pexels-photo-38543138.jpeg?auto=compress&cs=tinysrgb&w=1920',
  resortRiverside: 'https://images.pexels.com/photos/8413422/pexels-photo-8413422.jpeg?auto=compress&cs=tinysrgb&w=1920',
  cottage1: 'https://images.pexels.com/photos/29338236/pexels-photo-29338236.jpeg?auto=compress&cs=tinysrgb&w=1920',
  cottage2: 'https://images.pexels.com/photos/14177812/pexels-photo-14177812.jpeg?auto=compress&cs=tinysrgb&w=1920',
  cottage3: 'https://images.pexels.com/photos/13686638/pexels-photo-13686638.jpeg?auto=compress&cs=tinysrgb&w=1920',
  cottage4: 'https://images.pexels.com/photos/10388824/pexels-photo-10388824.jpeg?auto=compress&cs=tinysrgb&w=1920',
  cottage5: 'https://images.pexels.com/photos/18870105/pexels-photo-18870105.jpeg?auto=compress&cs=tinysrgb&w=1920',
  cottage6: 'https://images.pexels.com/photos/27238377/pexels-photo-27238377.jpeg?auto=compress&cs=tinysrgb&w=1920',
  cottage7: 'https://images.pexels.com/photos/32880862/pexels-photo-32880862.jpeg?auto=compress&cs=tinysrgb&w=1920',
  cottage8: 'https://images.pexels.com/photos/8262574/pexels-photo-8262574.jpeg?auto=compress&cs=tinysrgb&w=1920',
  room1: 'https://images.pexels.com/photos/31728412/pexels-photo-31728412.jpeg?auto=compress&cs=tinysrgb&w=1920',
  room2: 'https://images.pexels.com/photos/7745929/pexels-photo-7745929.jpeg?auto=compress&cs=tinysrgb&w=1920',
  room3: 'https://images.pexels.com/photos/14547139/pexels-photo-14547139.jpeg?auto=compress&cs=tinysrgb&w=1920',
  room4: 'https://images.pexels.com/photos/189293/pexels-photo-189293.jpeg?auto=compress&cs=tinysrgb&w=1920',
  room5: 'https://images.pexels.com/photos/35747339/pexels-photo-35747339.jpeg?auto=compress&cs=tinysrgb&w=1920',
  room6: 'https://images.pexels.com/photos/2736388/pexels-photo-2736388.jpeg?auto=compress&cs=tinysrgb&w=1920',
  room7: 'https://images.pexels.com/photos/15792555/pexels-photo-15792555.jpeg?auto=compress&cs=tinysrgb&w=1920',
  room8: 'https://images.pexels.com/photos/14883357/pexels-photo-14883357.jpeg?auto=compress&cs=tinysrgb&w=1920',
  room9: 'https://images.pexels.com/photos/8135248/pexels-photo-8135248.jpeg?auto=compress&cs=tinysrgb&w=1920',
  room10: 'https://images.pexels.com/photos/6585619/pexels-photo-6585619.jpeg?auto=compress&cs=tinysrgb&w=1920',
  room11: 'https://images.pexels.com/photos/6394574/pexels-photo-6394574.jpeg?auto=compress&cs=tinysrgb&w=1920',
  room12: 'https://images.pexels.com/photos/10660270/pexels-photo-10660270.jpeg?auto=compress&cs=tinysrgb&w=1920',
  room13: 'https://images.pexels.com/photos/4577673/pexels-photo-4577673.jpeg?auto=compress&cs=tinysrgb&w=1920',
  room14: 'https://images.pexels.com/photos/2736384/pexels-photo-2736384.jpeg?auto=compress&cs=tinysrgb&w=1920',
  room15: 'https://images.pexels.com/photos/26840829/pexels-photo-26840829.png?auto=compress&cs=tinysrgb&w=1920',
  room16: 'https://images.pexels.com/photos/6434586/pexels-photo-6434586.jpeg?auto=compress&cs=tinysrgb&w=1920',
  room17: 'https://images.pexels.com/photos/6782578/pexels-photo-6782578.jpeg?auto=compress&cs=tinysrgb&w=1920',
  room18: 'https://images.pexels.com/photos/8134823/pexels-photo-8134823.jpeg?auto=compress&cs=tinysrgb&w=1920',
  room19: 'https://images.pexels.com/photos/8135118/pexels-photo-8135118.jpeg?auto=compress&cs=tinysrgb&w=1920',
  room20: 'https://images.pexels.com/photos/8135502/pexels-photo-8135502.jpeg?auto=compress&cs=tinysrgb&w=1920',
  room21: 'https://images.pexels.com/photos/8134808/pexels-photo-8134808.jpeg?auto=compress&cs=tinysrgb&w=1920',
  room22: 'https://images.pexels.com/photos/34961766/pexels-photo-34961766.jpeg?auto=compress&cs=tinysrgb&w=1920',
  room23: 'https://images.pexels.com/photos/35868592/pexels-photo-35868592.jpeg?auto=compress&cs=tinysrgb&w=1920',
  room24: 'https://images.pexels.com/photos/13813465/pexels-photo-13813465.jpeg?auto=compress&cs=tinysrgb&w=1920',
  room25: 'https://images.pexels.com/photos/32177990/pexels-photo-32177990.png?auto=compress&cs=tinysrgb&w=1920',
  room26: 'https://images.pexels.com/photos/5137980/pexels-photo-5137980.jpeg?auto=compress&cs=tinysrgb&w=1920',
  room27: 'https://images.pexels.com/photos/5158945/pexels-photo-5158945.jpeg?auto=compress&cs=tinysrgb&w=1920',
  kitchen1: 'https://images.pexels.com/photos/7534297/pexels-photo-7534297.jpeg?auto=compress&cs=tinysrgb&w=1920',
  kitchen2: 'https://images.pexels.com/photos/6908569/pexels-photo-6908569.jpeg?auto=compress&cs=tinysrgb&w=1920',
  kitchen3: 'https://images.pexels.com/photos/18285887/pexels-photo-18285887.jpeg?auto=compress&cs=tinysrgb&w=1920',
  kitchen4: 'https://images.pexels.com/photos/11295908/pexels-photo-11295908.jpeg?auto=compress&cs=tinysrgb&w=1920',
  kitchen5: 'https://images.pexels.com/photos/7836573/pexels-photo-7836573.jpeg?auto=compress&cs=tinysrgb&w=1920',
  stove: 'https://images.pexels.com/photos/9551383/pexels-photo-9551383.jpeg?auto=compress&cs=tinysrgb&w=1920',
  stove2: 'https://images.pexels.com/photos/10835546/pexels-photo-10835546.jpeg?auto=compress&cs=tinysrgb&w=1920',
  bathroom1: 'https://images.pexels.com/photos/27359993/pexels-photo-27359993.jpeg?auto=compress&cs=tinysrgb&w=1920',
  bathroom2: 'https://images.pexels.com/photos/7005271/pexels-photo-7005271.jpeg?auto=compress&cs=tinysrgb&w=1920',
  bathroom3: 'https://images.pexels.com/photos/8082195/pexels-photo-8082195.jpeg?auto=compress&cs=tinysrgb&w=1920',
  bathroom4: 'https://images.pexels.com/photos/8082550/pexels-photo-8082550.jpeg?auto=compress&cs=tinysrgb&w=1920',
  bathroom5: 'https://images.pexels.com/photos/7147283/pexels-photo-7147283.jpeg?auto=compress&cs=tinysrgb&w=1920',
  bathroom6: 'https://images.pexels.com/photos/7005448/pexels-photo-7005448.jpeg?auto=compress&cs=tinysrgb&w=1920',
  tapchan1: 'https://images.pexels.com/photos/2771921/pexels-photo-2771921.jpeg?auto=compress&cs=tinysrgb&w=1920',
  tapchan2: 'https://images.pexels.com/photos/2962114/pexels-photo-2962114.jpeg?auto=compress&cs=tinysrgb&w=1920',
  tapchan3: 'https://images.pexels.com/photos/38871237/pexels-photo-38871237.jpeg?auto=compress&cs=tinysrgb&w=1920',
  tapchan4: 'https://images.pexels.com/photos/2961945/pexels-photo-2961945.jpeg?auto=compress&cs=tinysrgb&w=1920',
  tapchan5: 'https://images.pexels.com/photos/4915587/pexels-photo-4915587.jpeg?auto=compress&cs=tinysrgb&w=1920',
  tapchan6: 'https://images.pexels.com/photos/38701759/pexels-photo-38701759.jpeg?auto=compress&cs=tinysrgb&w=1920',
  tapchan7: 'https://images.pexels.com/photos/34401151/pexels-photo-34401151.jpeg?auto=compress&cs=tinysrgb&w=1920',
  tapchan8: 'https://images.pexels.com/photos/36577716/pexels-photo-36577716.jpeg?auto=compress&cs=tinysrgb&w=1920',
  playground1: 'https://images.pexels.com/photos/19336565/pexels-photo-19336565.jpeg?auto=compress&cs=tinysrgb&w=1920',
  playground2: 'https://images.pexels.com/photos/13350086/pexels-photo-13350086.jpeg?auto=compress&cs=tinysrgb&w=1920',
  playground3: 'https://images.pexels.com/photos/5826495/pexels-photo-5826495.jpeg?auto=compress&cs=tinysrgb&w=1920',
  shop1: 'https://images.pexels.com/photos/3735183/pexels-photo-3735183.jpeg?auto=compress&cs=tinysrgb&w=1920',
  shop2: 'https://images.pexels.com/photos/38698664/pexels-photo-38698664.jpeg?auto=compress&cs=tinysrgb&w=1920',
  shop3: 'https://images.pexels.com/photos/3167310/pexels-photo-3167310.jpeg?auto=compress&cs=tinysrgb&w=1920',
  mountain1: 'https://images.pexels.com/photos/18685968/pexels-photo-18685968.jpeg?auto=compress&cs=tinysrgb&w=1920',
  mountain2: 'https://images.pexels.com/photos/9579665/pexels-photo-9579665.jpeg?auto=compress&cs=tinysrgb&w=1920',
  mountain3: 'https://images.pexels.com/photos/9271524/pexels-photo-9271524.jpeg?auto=compress&cs=tinysrgb&w=1920',
  mountain4: 'https://images.pexels.com/photos/15256032/pexels-photo-15256032.jpeg?auto=compress&cs=tinysrgb&w=1920',
  mountain5: 'https://images.pexels.com/photos/15499463/pexels-photo-15499463.jpeg?auto=compress&cs=tinysrgb&w=1920',
  mountain6: 'https://images.pexels.com/photos/31735734/pexels-photo-31735734.jpeg?auto=compress&cs=tinysrgb&w=1920',
  mountain7: 'https://images.pexels.com/photos/5665900/pexels-photo-5665900.jpeg?auto=compress&cs=tinysrgb&w=1920',
  mountain8: 'https://images.pexels.com/photos/11249076/pexels-photo-11249076.jpeg?auto=compress&cs=tinysrgb&w=1920',
  mountain9: 'https://images.pexels.com/photos/14211206/pexels-photo-14211206.jpeg?auto=compress&cs=tinysrgb&w=1920',
  mountain10: 'https://images.pexels.com/photos/5223578/pexels-photo-5223578.jpeg?auto=compress&cs=tinysrgb&w=1920',
  mountain11: 'https://images.pexels.com/photos/24643976/pexels-photo-24643976.jpeg?auto=compress&cs=tinysrgb&w=1920',
  mountain12: 'https://images.pexels.com/photos/12261365/pexels-photo-12261365.jpeg?auto=compress&cs=tinysrgb&w=1920',
  campfire1: 'https://images.pexels.com/photos/1061640/pexels-photo-1061640.jpeg?auto=compress&cs=tinysrgb&w=1920',
  campfire2: 'https://images.pexels.com/photos/5686602/pexels-photo-5686602.jpeg?auto=compress&cs=tinysrgb&w=1920',
  campfire3: 'https://images.pexels.com/photos/9880528/pexels-photo-9880528.jpeg?auto=compress&cs=tinysrgb&w=1920',
  campfire4: 'https://images.pexels.com/photos/5283702/pexels-photo-5283702.jpeg?auto=compress&cs=tinysrgb&w=1920',
  cottageInterior1: 'https://images.pexels.com/photos/8134823/pexels-photo-8134823.jpeg?auto=compress&cs=tinysrgb&w=1920',
  cottageInterior2: 'https://images.pexels.com/photos/8135118/pexels-photo-8135118.jpeg?auto=compress&cs=tinysrgb&w=1920',
  cottageInterior3: 'https://images.pexels.com/photos/8135502/pexels-photo-8135502.jpeg?auto=compress&cs=tinysrgb&w=1920',
  cottageInterior4: 'https://images.pexels.com/photos/8134808/pexels-photo-8134808.jpeg?auto=compress&cs=tinysrgb&w=1920',
  atrofMuhitTog: am_tog,
  atrofMuhitResort: am_resort,
  atrofMuhitXonaKotej: am_xonaKotej,
  atrofMuhitTabiat6: am_tabiat6,
};

export const IMAGES = IMG;

const baseAmenities = [
  'Dush', 'Sanuzel', 'Wi-Fi', 'Televizor', 'Shaxsiy so\'ri/tapchan',
];

function make3pRoom(
  id: string,
  num: number,
  location: string,
  mainImage: string,
  roomImg2: string,
  roomImg3: string,
): Accommodation {
  return {
    id,
    name: `3 kishilik xona №${num}`,
    type: 'room',
    category: '3 kishilik',
    capacity: 3,
    price: 600000,
    priceDisplay: '600 000 so\'m',
    location,
    shortDescription: `${location}da joylashgan 3 kishilik zamonaviy xona — dush, sanuzel, Wi-Fi va shaxsiy tapchan bilan.`,
    description: `Bu xona ${location}da joylashgan bo'lib, 3 kishi uchun mo'ljallangan. Xonada zamonaviy dush, sanuzel, televizor va Wi-Fi mavjud. Mehmonlar uchun shaxsiy so'ri/tapchan biriktirilgan. Tog' manzarasi va resortning tinch muhiti dam olish uchun ideal sharoit yaratadi. Xona toza, yorug' va qulay intererga ega bo'lib, oilaviy dam olish yoki do'stlar bilan kelish uchun juda mos keladi.`,
    amenities: [...baseAmenities],
    mainImage,
    gallery: [mainImage, roomImg2, roomImg3, IMG.bathroom1, IMG.bathroom2, IMG.tapchan1],
    video: null,
    tapchanImages: [IMG.tapchan1, IMG.tapchan2],
    hasKitchen: false,
    kitchenImages: [],
    kitchenVideo: null,
    isLuxury: false,
    hasPrivateTapchan: true,
    features: ['3 kishilik', 'Dush', 'Sanuzel', 'Wi-Fi', 'Televizor', 'Shaxsiy tapchan'],
  };
}

function make4pRoom(
  id: string,
  num: number,
  location: string,
  mainImage: string,
  roomImg2: string,
  roomImg3: string,
): Accommodation {
  return {
    id,
    name: `4 kishilik xona №${num}`,
    type: 'room',
    category: '4 kishilik',
    capacity: 4,
    price: 800000,
    priceDisplay: '800 000 so\'m',
    location,
    shortDescription: `${location}da joylashgan 4 kishilik keng xona — barcha qulayliklar va shaxsiy tapchan bilan.`,
    description: `Bu xona ${location}da joylashgan bo'lib, 4 kishi uchun mo'ljallangan keng xonadir. Xonada zamonaviy dush, sanuzel, televizor va Wi-Fi mavjud. Mehmonlar uchun shaxsiy so'ri/tapchan biriktirilgan. Xona kattaroq bo'lgani uchun oilaviy dam olish uchun yanada qulayroq. Tog' manzarasi va resortning go'zal muhiti dam olishni unutilmas qiladi.`,
    amenities: [...baseAmenities],
    mainImage,
    gallery: [mainImage, roomImg2, roomImg3, IMG.bathroom3, IMG.bathroom4, IMG.tapchan3],
    video: null,
    tapchanImages: [IMG.tapchan3, IMG.tapchan4],
    hasKitchen: false,
    kitchenImages: [],
    kitchenVideo: null,
    isLuxury: false,
    hasPrivateTapchan: true,
    features: ['4 kishilik', 'Dush', 'Sanuzel', 'Wi-Fi', 'Televizor', 'Shaxsiy tapchan'],
  };
}

function makeCottage(
  id: string,
  name: string,
  capacity: number,
  price: number,
  priceDisplay: string,
  mainImage: string,
  isLuxury: boolean,
  hasKitchen: boolean,
  description: string,
  gallery: string[],
  features: string[],
): Accommodation {
  const cottageAmenities = [...baseAmenities, 'Shaxsiy orqa tapchan', 'Kottej intererga ega'];
  if (hasKitchen) cottageAmenities.push('Shaxsiy kuxnya', 'Kuxnya jihozlari');

  const allGallery = [mainImage, ...gallery];

  return {
    id,
    name,
    type: 'cottage',
    category: isLuxury ? 'Lyuks kottej' : 'Standart kottej',
    capacity,
    price,
    priceDisplay,
    location: 'Resortning to\'g\'ri qismi',
    shortDescription: `${capacity} kishilik ${isLuxury ? 'lyuks' : 'standart'} kottej. ${hasKitchen ? 'Shaxsiy kuxnya bilan.' : 'Shaxsiy orqa tapchan bilan.'}`,
    description,
    amenities: cottageAmenities,
    mainImage,
    gallery: allGallery,
    video: null,
    tapchanImages: [],
    hasKitchen,
    kitchenImages: [],
    kitchenVideo: null,
    isLuxury,
    hasPrivateTapchan: true,
    features,
  };
}

export const accommodations: Accommodation[] = [
  // ===== 5 COTTAGES =====
  makeCottage(
    'cottage-1',
    '1-Kottej — Standart',
    10, 1500000, '1 500 000 so\'m',
    c1_1, false, false,
    '1-Kottej — Dugoba Resortning standart sinfidagi kottejidir. 10 kishi sig\'imiga ega bo\'lib, keng va qulay interyorga mo\'jallangan. Kottejning orqa qismida mehmonlar dam olishlari uchun shaxsiy so\'ri/tapchan mavjud. Tog\' manzarasidan bahramand bo\'lib, oilaviy yoki do\'stlar bilan katta guruh bo\'lib dam olish uchun ideal variant. Kottejda dush, sanuzel, Wi-Fi va televizor mavjud.',
    [c1_2, c1_3, c1_4],
    ['10 kishilik', 'Standart kottej', 'Shaxsiy orqa tapchan', 'Dush', 'Sanuzel', 'Wi-Fi', 'Televizor'],
  ),
  {
    ...makeCottage(
      'cottage-2',
      '2-Kottej — Standart',
      10, 1500000, '1 500 000 so\'m',
      c2_6, false, false,
      '2-Kottej — Standart sinfidagi 10 kishilik kottej. 1-Kottej bilan bir xil qulayliklarga ega, lekin boshqa joylashuv va interyorga ega. Orqa qismida shaxsiy so\'ri/tapchan mavjud. Katta oilalar yoki do\'stlar guruhi uchun juda mos. Kottejda barcha zarur qulayliklar: dush, sanuzel, Wi-Fi va televizor mavjud.',
      [c2_1, c2_2, c2_3, c2_4, c2_5],
      ['10 kishilik', 'Standart kottej', 'Shaxsiy orqa tapchan', 'Dush', 'Sanuzel', 'Wi-Fi', 'Televizor'],
    ),
    tapchanImages: [c2_6],
    video: v_standart2,
  },
  {
    ...makeCottage(
      'cottage-3',
      '3-Kottej — Standart',
      10, 1500000, '1 500 000 so\'m',
      c3_1, false, false,
      '3-Kottej — Standart sinfidagi 10 kishilik kottej. Resortning to\'g\'ri qismida joylashgan. Orqa qismida shaxsiy so\'ri/tapchan mavjud. Keng interyorga ega bo\'lib, 10 kishi uchun qulay dam olishni ta\'minlaydi. Barcha zarur qulayliklar: dush, sanuzel, Wi-Fi va televizor mavjud.',
      [c3_2, c3_3, c3_4, c3_5, c3_6, c3_7, c3_8, c3_9, c3_10],
      ['10 kishilik', 'Standart kottej', 'Shaxsiy orqa tapchan', 'Dush', 'Sanuzel', 'Wi-Fi', 'Televizor'],
    ),
    video: v_standart3,
  },
  makeCottage(
    'cottage-4',
    'Pollux',
    10, 2000000, '2 000 000 so\'m',
    c4_1, true, false,
    'Pollux — Dugoba Resortning premium sinfidagi kottejidir. 10 kishi sig\'imiga ega, lekin standart kottejlardan farqli ravishda yanada yuqori darajadagi interyer va qulayliklarga ega. Orqa qismida shaxsiy so\'ri/tapchan mavjud. Pollux kotteji mehmonlarga eng yuqori darajadagi dam olishni ta\'minlash uchun mo\'ljallangan. Premium dizayn, keng interyer va tog\' manzarasi bu kottejni maxsus qiladi.',
    [c4_2, c4_3, c4_4, c4_5, c4_6, c4_7, c4_8, c4_9, c4_10],
    ['10 kishilik', 'Premium kottej', 'Shaxsiy orqa tapchan', 'Dush', 'Sanuzel', 'Wi-Fi', 'Televizor', 'Premium dizayn'],
  ),
  {
    ...makeCottage(
      'cottage-5',
      'Lux Kottej',
      8, 2500000, '2 500 000 so\'m',
      c5_1, true, true,
      'Lux Kottej — Dugoba Resortning eng yuqori sinfidagi kottejidir. 8 kishi sig\'imiga ega. Boshqa barcha kottejlardan farqli ravishda, Lux kottejning ichida faqat ushbu kottej mehmonlari uchun mo\'ljallangan alohida kuxnya mavjud. Kuxnyada stol va stullar mavjud bo\'lib, mehmonlar o\'zlari ovqat tayyorlashlari mumkin. Orqa qismida shaxsiy so\'ri/tapchan mavjud. Eng yuqori darajadagi interyer, premium qulayliklar va eksklyuziv kuxnya bilan Lux kottej dam olishning eng yuqori cho\'qqisidir.',
      [c5_2, c5_3, c5_4, c5_5, c5_6, c5_7, c5_8, c5_9, c5_10],
      ['8 kishilik', 'Lyuks kottej', 'Shaxsiy kuxnya', 'Shaxsiy orqa tapchan', 'Dush', 'Sanuzel', 'Wi-Fi', 'Televizor', 'Premium dizayn'],
    ),
    kitchenImages: [c5_2],
    video: v_luxKotej,
  },

  // ===== 16 x 3-person rooms =====
  {
    ...make3pRoom('room-3p-1', 1, 'Old qism', r3p5, r3p1, r3p2),
    gallery: [r3p5, r3p1, r3p2, r3p3, r3p4],
    tapchanImages: [r3p5],
  },
  make3pRoom('room-3p-2', 2, 'Old qism', IMG.room2, IMG.room3, IMG.room4),
  make3pRoom('room-3p-3', 3, 'Old qism', IMG.room3, IMG.room4, IMG.room5),
  make3pRoom('room-3p-4', 4, 'Old qism', IMG.room4, IMG.room5, IMG.room6),
  make3pRoom('room-3p-5', 5, 'Old qism', IMG.room5, IMG.room6, IMG.room7),
  make3pRoom('room-3p-6', 6, 'Old qism', IMG.room6, IMG.room7, IMG.room8),
  make3pRoom('room-3p-7', 7, 'Old qism', IMG.room7, IMG.room8, IMG.room9),
  make3pRoom('room-3p-8', 8, 'Old qism', IMG.room8, IMG.room9, IMG.room10),
  make3pRoom('room-3p-9', 9, 'Orqa qism', IMG.room11, IMG.room12, IMG.room13),
  make3pRoom('room-3p-10', 10, 'Orqa qism', IMG.room12, IMG.room13, IMG.room14),
  make3pRoom('room-3p-11', 11, 'Orqa qism', IMG.room13, IMG.room14, IMG.room15),
  make3pRoom('room-3p-12', 12, 'Orqa qism', IMG.room14, IMG.room15, IMG.room16),
  make3pRoom('room-3p-13', 13, 'Orqa qism', IMG.room15, IMG.room16, IMG.room1),
  make3pRoom('room-3p-14', 14, 'Orqa qism', IMG.room16, IMG.room1, IMG.room2),
  make3pRoom('room-3p-15', 15, 'Orqa qism', IMG.room9, IMG.room10, IMG.room11),
  make3pRoom('room-3p-16', 16, 'Orqa qism', IMG.room10, IMG.room11, IMG.room12),

  // ===== 4 x 4-person rooms =====
  {
    ...make4pRoom('room-4p-1', 1, 'Old tomon', r4p5, r4p1, r4p2),
    gallery: [r4p5, r4p1, r4p2, r4p3, r4p4],
    tapchanImages: [r4p5],
    video: v_4kishi1,
  },
  { ...make4pRoom('room-4p-2', 2, 'Old tomon', IMG.room18, IMG.room19, IMG.room20), video: v_4kishi2 },
  { ...make4pRoom('room-4p-3', 3, 'Orqa tomon', IMG.room19, IMG.room20, IMG.room21), video: v_4kishi3 },
  make4pRoom('room-4p-4', 4, 'Orqa tomon', IMG.room20, IMG.room21, IMG.room22),

  // ===== 6-person room =====
  {
    id: 'room-6p-1',
    name: '6 kishilik xona',
    type: 'room',
    category: '6 kishilik',
    capacity: 6,
    price: 1200000,
    priceDisplay: '1 200 000 so\'m',
    location: 'Resort hududi',
    shortDescription: '6 kishilik keng xona — barcha qulayliklar va shaxsiy tapchan bilan.',
    description: '6 kishilik xona — keng oilalar yoki do\'stlar guruhi uchun mo\'ljallangan. Xonada zamonaviy dush, sanuzel, televizor va Wi-Fi mavjud. Mehmonlar uchun shaxsiy so\'ri/tapchan biriktirilgan. Tog\' manzarasi va resortning go\'zal muhiti dam olishni unutilmas qiladi.',
    amenities: [...baseAmenities],
    mainImage: IMG.room22,
    gallery: [IMG.room22, IMG.room23, IMG.room24, IMG.room25, IMG.bathroom5, IMG.bathroom6, IMG.tapchan5],
    video: null,
    tapchanImages: [IMG.tapchan5, IMG.tapchan6],
    hasKitchen: false,
    kitchenImages: [],
    kitchenVideo: null,
    isLuxury: false,
    hasPrivateTapchan: true,
    features: ['6 kishilik', 'Dush', 'Sanuzel', 'Wi-Fi', 'Televizor', 'Shaxsiy tapchan'],
  },

  // ===== 8-person room with kitchen =====
  {
    id: 'room-8p-1',
    name: '8 kishilik xona',
    type: 'room',
    category: '8 kishilik',
    capacity: 8,
    price: 1300000,
    priceDisplay: '1 300 000 so\'m',
    location: 'Resort hududi',
    shortDescription: '8 kishilik keng xona — alohida kuxnya va barcha qulayliklar bilan.',
    description: '8 kishilik xona — Dugoba Resortning keng xonalaridan biri. Bu xonaning asosiy afzalligi — ovqat pishirish uchun alohida kuxnya mavjudligi. Kuxnyada mehmonlar o\'zlari ovqat tayyorlashlari mumkin. Xonada 8 kishi uchun qulay joy, dush, sanuzel, Wi-Fi, televizor va shaxsiy so\'ri/tapchan mavjud. Bu xona Lux kottej bilan aralashtirilmasin — bu alohida 8 kishilik xonadir. Katta oilalar uchun eng ideal variant.',
    amenities: [...baseAmenities, 'Shaxsiy kuxnya', 'Kuxnya jihozlari'],
    mainImage: IMG.room23,
    gallery: [IMG.room23, IMG.room24, IMG.room25, IMG.kitchen1, IMG.kitchen2, IMG.kitchen3, IMG.kitchen4, IMG.bathroom5, IMG.bathroom6, IMG.tapchan7],
    video: null,
    tapchanImages: [IMG.tapchan7, IMG.tapchan8],
    hasKitchen: true,
    kitchenImages: [IMG.kitchen1, IMG.kitchen2, IMG.kitchen3, IMG.kitchen4, IMG.kitchen5, IMG.stove],
    kitchenVideo: null,
    isLuxury: false,
    hasPrivateTapchan: true,
    features: ['8 kishilik', 'Alohida kuxnya', 'Dush', 'Sanuzel', 'Wi-Fi', 'Televizor', 'Shaxsiy tapchan'],
  },

  // ===== 2 x 10-person standard rooms =====
  {
    id: 'room-10p-1',
    name: '10 kishilik standart xona №1',
    type: 'room',
    category: '10 kishilik standart',
    capacity: 10,
    price: 1200000,
    priceDisplay: '1 200 000 so\'m',
    location: 'Resortning pastki qismi',
    shortDescription: '10 kishilik standart xona — keng oilaviy dam olish uchun ideal.',
    description: '10 kishilik standart xona №1 — resortning pastki qismida joylashgan. 10 kishi uchun mo\'ljallangan keng xona. Xonada dush, sanuzel, Wi-Fi va televizor mavjud. Mehmonlar uchun shaxsiy so\'ri/tapchan biriktirilgan. Katta oilalar yoki do\'stlar guruhi uchun eng mos variant. Tog\' manzarasi va resortning tinch muhiti dam olishni yoqimli qiladi.',
    amenities: [...baseAmenities],
    mainImage: IMG.room26,
    gallery: [IMG.room26, IMG.room27, IMG.room24, IMG.room25, IMG.bathroom1, IMG.bathroom2, IMG.tapchan1],
    video: null,
    tapchanImages: [IMG.tapchan1, IMG.tapchan2],
    hasKitchen: false,
    kitchenImages: [],
    kitchenVideo: null,
    isLuxury: false,
    hasPrivateTapchan: true,
    features: ['10 kishilik', 'Standart xona', 'Dush', 'Sanuzel', 'Wi-Fi', 'Televizor', 'Shaxsiy tapchan'],
  },
  {
    id: 'room-10p-2',
    name: '10 kishilik standart xona №2',
    type: 'room',
    category: '10 kishilik standart',
    capacity: 10,
    price: 1200000,
    priceDisplay: '1 200 000 so\'m',
    location: 'Resortning pastki qismi',
    shortDescription: '10 kishilik standart xona — keng oilaviy dam olish uchun ideal.',
    description: '10 kishilik standart xona №2 — resortning pastki qismida joylashgan. 10 kishi uchun mo\'ljallangan keng xona. Xonada dush, sanuzel, Wi-Fi va televizor mavjud. Mehmonlar uchun shaxsiy so\'ri/tapchan biriktirilgan. №1 xona bilan bir xil qulayliklarga ega, lekin boshqa interyorga ega. Katta oilalar uchun juda mos.',
    amenities: [...baseAmenities],
    mainImage: IMG.room27,
    gallery: [IMG.room27, IMG.room26, IMG.room23, IMG.room24, IMG.bathroom3, IMG.bathroom4, IMG.tapchan3],
    video: null,
    tapchanImages: [IMG.tapchan3, IMG.tapchan4],
    hasKitchen: false,
    kitchenImages: [],
    kitchenVideo: null,
    isLuxury: false,
    hasPrivateTapchan: true,
    features: ['10 kishilik', 'Standart xona', 'Dush', 'Sanuzel', 'Wi-Fi', 'Televizor', 'Shaxsiy tapchan'],
  },
];

// ===== TOUR PACKAGES =====
export interface TourPackage {
  id: string;
  name: string;
  price: string;
  duration: string;
  description: string;
  includes: string[];
  image: string;
  gallery: string[];
}

export const tourPackages: TourPackage[] = [
  {
    id: 'tour-1',
    name: 'Standart Tur Paketi',
    price: 'Kelishuvga binoan',
    duration: '1-2 kun',
    description: 'Farg\'ona shahridan Dugoba Resortga kelish va qaytish. Mehmonlar tur paketi orqali resortga kelib-ketishlari mumkin. Transport xizmati kiritilgan. Resortda dam olish va barcha qulayliklardan foydalanish imkoniyati.',
    includes: ['Farg\'onadan borgan-kelgan transport', 'Resortda dam olish', 'Tog\' manzarasidan bahramand bo\'lish', 'Bolalar maydonchasidan foydalanish', 'O\'choqxona va magizindan foydalanish'],
    image: IMG.mountain1,
    gallery: [IMG.mountain1, IMG.mountain2, IMG.mountain3, IMG.resortAerial],
  },
  {
    id: 'tour-2',
    name: 'Premium Tur Paketi',
    price: 'Kelishuvga binoan',
    duration: '2-3 kun',
    description: 'Premium tur paketi — Farg\'ona shahridan Dugoba Resortga kelish va qaytish, shuningdek resortda 2-3 kun dam olish. Transport xizmati, joylashuv va barcha qulayliklar kiritilgan. Tog\' manzarasi va resortning barcha imkoniyatlaridan to\'liq foydalanish.',
    includes: ['Farg\'onadan borgan-keligan transport', '2-3 kun dam olish', 'Xona yoki kottej joylashuvi', 'Tog\' manzarasidan bahramand bo\'lish', 'Barcha qulayliklardan foydalanish', 'O\'choqxona va magizindan foydalanish'],
    image: IMG.mountain2,
    gallery: [IMG.mountain2, IMG.mountain4, IMG.mountain5, IMG.resortTerrace],
  },
  {
    id: 'tour-3',
    name: 'Oilaviy Tur Paketi',
    price: 'Kelishuvga binoan',
    duration: '3-5 kun',
    description: 'Oilaviy tur paketi — oilalar uchun maxsus mo\'ljallangan. Farg\'onadan transport, resortda 3-5 kun dam olish, bolalar maydonchasi va barcha oilaviy qulayliklar. Bolalar uchun bepul kirish. Oilaviy dam olishning eng yaxshi varianti.',
    includes: ['Farg\'onadan borgan-kelgan transport', '3-5 kun dam olish', 'Oilaviy xona joylashuvi', 'Bolalar maydonchasi', 'Bolalar uchun bepul kirish', 'O\'choqxona va magizindan foydalanish', 'Tog\' manzarasi va tabiat'],
    image: IMG.mountain3,
    gallery: [IMG.mountain3, IMG.mountain6, IMG.mountain7, IMG.playground1],
  },
];

// ===== AMENITIES =====
export interface Amenity {
  id: string;
  name: string;
  description: string;
  image: string;
}

export const amenities: Amenity[] = [
  { id: 'am-1', name: 'Tog\' manzarasi', description: 'Resort tog\'ning eng yuqori nuqtasida joylashgani sababli bu yerdan tog\'lar va go\'zal tog\' manzarasi juda yaxshi ko\'rinadi.', image: IMG.mountain1 },
  { id: 'am-2', name: 'Tur paketlari', description: 'Mehmonlar tur paketlari orqali resortga kelib-ketishlari mumkin. Transport xizmati kiritilgan.', image: IMG.mountain2 },
  { id: 'am-3', name: 'Kirish qismidagi magazin', description: 'Resortga kirib kelganda, eshik tagida kichik magazin mavjud. Zarur narsalarni xarid qilish mumkin.', image: IMG.shop1 },
  { id: 'am-4', name: 'O\'choqxona', description: 'Resort hududiga kirib kelganda mehmonlar uchun o\'choqxona mavjud. Mehmonlar o\'zlari ovqat pishirishlari mumkin.', image: IMG.stove },
  { id: 'am-5', name: 'O\'choqxona tapchanlari', description: 'O\'choqxona chap va o\'ng tomonlarida mehmonlar dam olishi uchun so\'ri/tapchanlar mavjud.', image: IMG.tapchan1 },
  { id: 'am-6', name: 'Bolalar maydonchasi', description: 'Resort hududida barcha mehmonlar uchun bitta umumiy bolalar maydonchasi mavjud.', image: IMG.playground1 },
  { id: 'am-7', name: '5 ta kottej', description: 'Resortning to\'g\'ri qismida jami 5 ta kottej mavjud. Har biri alohida obyekt.', image: IMG.cottage1 },
  { id: 'am-8', name: 'Shaxsiy orqa tapchanlar', description: 'Har bir kottej uchun shaxsiy orqa tapchan mavjud.', image: IMG.tapchan5 },
  { id: 'am-9', name: 'Xonalarda dush va sanuzel', description: 'Barcha xonalarda zamonaviy dush va sanuzel mavjud.', image: IMG.bathroom1 },
  { id: 'am-10', name: 'Wi-Fi', description: 'Barcha xona va kottejlarda Wi-Fi mavjud.', image: IMG.room1 },
  { id: 'am-11', name: 'Televizor', description: 'Barcha xona va kottejlarda televizor mavjud.', image: IMG.room2 },
  { id: 'am-12', name: 'Shaxsiy so\'ri/tapchan', description: 'Har bir xona uchun shaxsiy so\'ri/tapchan biriktirilgan.', image: IMG.tapchan3 },
];

// ===== GALLERY =====
export interface GalleryImage {
  url: string;
  category: string;
  caption: string;
}

export const galleryImages: GalleryImage[] = [
  { url: am_xonaKotej, category: 'Atrof-muhit', caption: 'Resort va kottejlar' },
  { url: am_tabiat0, category: 'Atrof-muhit', caption: 'Tabiat manzarasi' },
  { url: am_tabiat1, category: 'Atrof-muhit', caption: 'Tabiat manzarasi' },
  { url: am_tabiat2, category: 'Atrof-muhit', caption: 'Tabiat manzarasi' },
  { url: am_tabiat3, category: 'Atrof-muhit', caption: 'Tabiat manzarasi' },
  { url: am_tabiat4, category: 'Atrof-muhit', caption: 'Tabiat manzarasi' },
  { url: am_tabiat5, category: 'Atrof-muhit', caption: 'Tabiat manzarasi' },
  { url: am_tabiat6, category: 'Atrof-muhit', caption: 'Tabiat manzarasi' },
  { url: am_tabiat7, category: 'Atrof-muhit', caption: 'Tabiat manzarasi' },
  { url: am_tabiat8, category: 'Atrof-muhit', caption: 'Tabiat manzarasi' },
];

// ===== VIDEO GALLERY =====
export interface VideoItem {
  id: string;
  title: string;
  category: string;
  description: string;
  thumbnail: string;
  youtubeId: string | null;
  videoSrc?: string | null;
}

export const videoItems: VideoItem[] = [
  { id: 'vid-1', title: 'Dugoba Resort — Umumiy ko\'rinish', category: 'Resort hududi', description: 'Resort hududining to\'liq ko\'rinishi va qulayliklari.', thumbnail: IMG.resortAerial, youtubeId: null, videoSrc: v_bolim1 },
  { id: 'vid-2', title: 'Tog\' manzarasi', category: 'Tog\' manzarasi', description: 'Resortdan tog\' manzarasining go\'zal ko\'rinishi.', thumbnail: IMG.mountain1, youtubeId: null, videoSrc: v_bolim2 },
  { id: 'vid-3', title: 'Kottejlar', category: 'Kottej videolari', description: 'Resort kottejlarining ichki va tashqi ko\'rinishi.', thumbnail: IMG.cottage1, youtubeId: null, videoSrc: v_bolim3 },
  { id: 'vid-4', title: 'Xonalar', category: 'Xona videolari', description: 'Resort xonalarining ichki ko\'rinishi va qulayliklari.', thumbnail: IMG.room1, youtubeId: null, videoSrc: v_bolim4 },
];

export const videoCategories = ['Resort hududi', 'Tog\' manzarasi', 'Kottej videolari', 'Xona videolari'];

export function getAccommodationById(id: string): Accommodation | undefined {
  return accommodations.find((a) => a.id === id);
}

export function getRelatedAccommodations(id: string, limit: number = 3): Accommodation[] {
  const current = getAccommodationById(id);
  if (!current) return [];
  return accommodations
    .filter((a) => a.id !== id && a.capacity === current.capacity)
    .slice(0, limit);
}

export const resortInfo = {
  name: 'Dugoba Resort',
  location: 'Farg\'ona viloyati, Shohimardon qishlog\'i',
  description: 'Dugoba Resort Farg\'ona viloyati, Shohimardon qishlog\'ining eng yuqori nuqtasida joylashgan. Resort tog\'ning eng yuqori qismida joylashgani sababli bu yerdan tog\'lar va go\'zal tog\' manzarasi juda yaxshi ko\'rinadi. Resortda tur paketlari ham mavjud. Mehmonlar tur paketlari orqali resortga kelib-ketishlari mumkin.',
  phone: '+998 90 407 05 01',
  mapUrl: 'https://yandex.uz/maps/-/CTgzIW7o',
  telegram: 'https://t.me/sherzod015',
  telegramUsername: '@sherzod015',
  totalCottages: 5,
  totalRooms: 24,
  totalAccommodations: 29,
};
