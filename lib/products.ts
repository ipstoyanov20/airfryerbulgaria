export type Category = 'single' | 'dual' | 'oven';

export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: Category;
  /** Product photo under /public/images. */
  image: string;
  price: number;
  oldPrice?: number;
  capacity: string;
  power: string;
  /** Shipping weight in kg, used for the Econt label. */
  weight: number;
  rating: number;
  reviews: number;
  badge?: string;
  colors: { name: string; body: string; accent: string }[];
  features: string[];
  specs: Record<string, string>;
}

export const categories: { id: Category; name: string; hint: string }[] = [
  { id: 'single', name: 'Една кошница', hint: 'От 3.5 до 8 л' },
  { id: 'dual', name: 'Двойна кошница', hint: 'Две ястия наведнъж' },
  { id: 'oven', name: 'Фурна-фритюрник', hint: 'Печене, сушене, грил' },
];

const graphite = { name: 'Графит', body: '#26231f', accent: '#ff5a1f' };
const cream = { name: 'Крем', body: '#efe6d8', accent: '#26231f' };
const sage = { name: 'Градински', body: '#9aa88f', accent: '#26231f' };
const clay = { name: 'Теракота', body: '#c8643b', accent: '#fff4e8' };
const steel = { name: 'Инокс', body: '#c9c7c2', accent: '#26231f' };

export const products: Product[] = [
  {
    id: 'aira-mini-3-5',
    name: 'Aira Mini',
    tagline: 'Малък на ръст, голям на вкус',
    description:
      'Компактен фритюрник с горещ въздух за едно или двама души. Загрява се за под 2 минути и се побира и в най-малката кухня.',
    category: 'single',
    image: '/images/aira-mini.jpg',
    price: 59.9,
    oldPrice: 79.9,
    capacity: '3.5 л',
    power: '1400 W',
    weight: 3.6,
    rating: 4.8,
    reviews: 412,
    badge: '−25%',
    colors: [cream, graphite, sage],
    features: ['Загряване за 90 сек.', '6 готови програми', 'Незалепващо покритие без PFAS'],
    specs: { Обем: '3.5 л', Мощност: '1400 W', Температура: '80–200 °C', Таймер: '60 мин', Размери: '26 × 30 × 29 см' },
  },
  {
    id: 'aira-classic-5-5',
    name: 'Aira Classic',
    tagline: 'Любимецът на България',
    description:
      'Балансираният избор за ежедневно готвене. Технологията Vortex 360° разпределя въздуха равномерно — хрупкаво отвън, сочно отвътре.',
    category: 'single',
    image: '/images/aira-classic.jpg',
    price: 89.9,
    capacity: '5.5 л',
    power: '1700 W',
    weight: 5.4,
    rating: 4.9,
    reviews: 1287,
    badge: 'Бестселър',
    colors: [graphite, cream, clay],
    features: ['Vortex 360° въздушен поток', '8 програми + ръчен режим', 'Кошница за съдомиялна'],
    specs: { Обем: '5.5 л', Мощност: '1700 W', Температура: '80–200 °C', Таймер: '60 мин', Размери: '29 × 35 × 32 см' },
  },
  {
    id: 'aira-vision-6',
    name: 'Aira Vision',
    tagline: 'Виж как става хрупкаво',
    description:
      'Прозорец от закалено стъкло и вътрешна светлина — следиш готвенето, без да отваряш и без да губиш топлина.',
    category: 'single',
    image: '/images/aira-vision.jpg',
    price: 119.9,
    capacity: '6 л',
    power: '1800 W',
    weight: 6.1,
    rating: 4.9,
    reviews: 538,
    badge: 'Ново',
    colors: [graphite, steel],
    features: ['Прозорец + LED осветление', 'Сензорен дисплей', 'Тих режим 48 dB'],
    specs: { Обем: '6 л', Мощност: '1800 W', Температура: '40–230 °C', Таймер: '24 ч', Размери: '30 × 37 × 33 см' },
  },
  {
    id: 'aira-duo-9',
    name: 'Aira Duo',
    tagline: 'Основно и гарнитура. Едновременно.',
    description:
      'Две независими кошници по 4.5 л. Функцията Sync Finish ги приключва в една и съща секунда — вечерята е готова наведнъж.',
    category: 'dual',
    image: '/images/aira-duo.jpg',
    price: 169.9,
    oldPrice: 199.9,
    capacity: '2 × 4.5 л',
    power: '2400 W',
    weight: 8.9,
    rating: 4.9,
    reviews: 864,
    badge: '−15%',
    colors: [graphite, cream],
    features: ['Sync Finish & Match Cook', 'Две независими зони', 'Общо 9 л обем'],
    specs: { Обем: '2 × 4.5 л', Мощност: '2400 W', Температура: '40–240 °C', Таймер: '24 ч', Размери: '40 × 38 × 32 см' },
  },
  {
    id: 'aira-max-8',
    name: 'Aira Max XXL',
    tagline: 'Цяло пиле. Без проблем.',
    description:
      'Най-голямата единична кошница в гамата — побира цяло пиле до 2 кг. Подходящ, когато готвите за повече хора.',
    category: 'single',
    image: '/images/aira-max.jpg',
    price: 139.9,
    capacity: '8 л',
    power: '2000 W',
    weight: 7.2,
    rating: 4.7,
    reviews: 341,
    colors: [graphite, clay],
    features: ['Побира цяло пиле 2 кг', 'Двоен нагревател', 'Функция за поддържане на топло'],
    specs: { Обем: '8 л', Мощност: '2000 W', Температура: '80–220 °C', Таймер: '60 мин', Размери: '33 × 39 × 35 см' },
  },
  {
    id: 'aira-smart-5',
    name: 'Aira Smart Wi-Fi',
    tagline: 'Готви от телефона',
    description:
      'Стартирай, следи и получи известие, когато е готово. 200+ рецепти в приложението с автоматични настройки.',
    category: 'single',
    image: '/images/aira-smart.jpg',
    price: 129.9,
    capacity: '5 л',
    power: '1700 W',
    weight: 5.2,
    rating: 4.8,
    reviews: 276,
    colors: [cream, graphite],
    features: ['Wi-Fi + приложение', 'Гласов контрол', '200+ рецепти'],
    specs: { Обем: '5 л', Мощност: '1700 W', Температура: '40–230 °C', Таймер: '24 ч', Размери: '28 × 34 × 31 см' },
  },
  {
    id: 'aira-oven-pro-12',
    name: 'Aira Oven Pro',
    tagline: 'Фритюрник, фурна, дехидратор',
    description:
      'Фурна с горещ въздух и три нива. Пече, запича, суши плодове и върти шиш — 12 функции в един уред.',
    category: 'oven',
    image: '/images/aira-oven-pro.jpg',
    price: 209.9,
    oldPrice: 239.9,
    capacity: '12 л',
    power: '1800 W',
    weight: 9.8,
    rating: 4.8,
    reviews: 198,
    badge: '−12%',
    colors: [steel, graphite],
    features: ['3 нива + въртящ се шиш', '12 функции', 'Двойно стъкло на вратата'],
    specs: { Обем: '12 л', Мощност: '1800 W', Температура: '40–230 °C', Таймер: '24 ч', Размери: '36 × 33 × 38 см' },
  },
  {
    id: 'aira-duo-steam-10',
    name: 'Aira Duo Steam',
    tagline: 'Пара + горещ въздух',
    description:
      'Двойна кошница с инжекция на пара — сочно месо, пухкав хляб и хрупкава коричка. Флагманът в гамата.',
    category: 'dual',
    image: '/images/aira-duo-steam.jpg',
    price: 229.9,
    capacity: '2 × 5 л',
    power: '2600 W',
    weight: 10.4,
    rating: 5.0,
    reviews: 87,
    badge: 'Флагман',
    colors: [sage, graphite],
    features: ['Пара + горещ въздух', 'Резервоар 300 мл', 'Самопочистващ режим'],
    specs: { Обем: '2 × 5 л', Мощност: '2600 W', Температура: '40–240 °C', Таймер: '24 ч', Размери: '42 × 39 × 33 см' },
  },
];

export function getProduct(id: string) {
  return products.find((p) => p.id === id);
}

export function formatPrice(value: number) {
  return new Intl.NumberFormat('bg-BG', { style: 'currency', currency: 'EUR' }).format(value);
}
