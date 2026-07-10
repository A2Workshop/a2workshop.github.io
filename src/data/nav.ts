import type { Locale } from '../i18n/config';
import { localizeHref } from '../i18n/config';

export interface NavMenuItem {
  href: string;
  imgPath: string;
  alt: string;
  text: string;
}

type NavMenuItemDef = Omit<NavMenuItem, 'text'> & {
  text: Record<Locale, string>;
};

const menuItemDefs: NavMenuItemDef[] = [
  {
    href: '/proyectos/blackopsiiilatino',
    imgPath: '/assets/img/BO3/logo.webp',
    alt: 'bo3lalogo',
    text: {
      es: '(PC) Call of Duty: Black Ops III Espanol Latino',
      en: '(PC) Call of Duty: Black Ops III Latin American Spanish',
    },
  },
  {
    href: '/proyectos/blackopslatino',
    imgPath: '/assets/img/BO1/logo.webp',
    alt: 'bolalogo',
    text: {
      es: '(PC) Call of Duty: Black Ops Zombies Espanol Latino',
      en: '(PC) Call of Duty: Black Ops Zombies Latin American Spanish',
    },
  },
  {
    href: '/proyectos/infinitewarfarelatino',
    imgPath: '/assets/img/IW/images.steamusercontent.jpeg',
    alt: 'iwlalogo',
    text: {
      es: '(PC) Call of Duty: Infinite Warfare Espanol Latino',
      en: '(PC) Call of Duty: Infinite Warfare Latin American Spanish',
    },
  },
  {
    href: '/proyectos/modernwarfarerlatino',
    imgPath: '/assets/img/MWR/MWR.webp',
    alt: 'mwlalogo',
    text: {
      es: '(PC) Call of Duty: Modern Warfare Remastered Espanol Latino',
      en: '(PC) Call of Duty: Modern Warfare Remastered Latin American Spanish',
    },
  },
  {
    href: '/proyectos/legobatman2latino',
    imgPath: '/assets/img/LB2/icon.jpg',
    alt: 'legobatman2latino',
    text: {
      es: '(PC) Lego Batman 2 en Espanol Latino',
      en: '(PC) Lego Batman 2 in Latin American Spanish',
    },
  },
  {
    href: '/traducciones/pq2espanol',
    imgPath: '/pq2/img/es_logo/blackbg.webp',
    alt: 'pq2eslogo',
    text: {
      es: '(3DS) Persona Q2 Traduccion al Espanol',
      en: '(3DS) Persona Q2 Spanish Translation',
    },
  },
  {
    href: '/traducciones/p4despanol',
    imgPath: '/p4d/img/es_logo/blackbg.webp',
    alt: 'p4deslogo',
    text: {
      es: '(PS4/PSV) Persona 4 Dancing Traduccion al Espanol',
      en: '(PS4/PSV) Persona 4 Dancing Spanish Translation',
    },
  },
  {
    href: '/proyectos/bo3customdubs',
    imgPath: '/assets/img/Custom/logo.gif',
    alt: 'custommapdubslogo',
    text: {
      es: '(PC) Call of Duty: Black Ops III Custom Map Dubs',
      en: '(PC) Call of Duty: Black Ops III Custom Map Dubs',
    },
  },
];

const englishRouteHrefs = new Set([
  '/proyectos/blackopsiiilatino',
  '/proyectos/blackopslatino',
  '/proyectos/bo3customdubs',
  '/proyectos/infinitewarfarelatino',
  '/proyectos/modernwarfarerlatino',
]);

export function getMenuItems(locale: Locale): NavMenuItem[] {
  const orderedItems =
    locale === 'en'
      ? [...menuItemDefs].sort((a, b) =>
          a.href === '/proyectos/bo3customdubs' ? -1 : b.href === '/proyectos/bo3customdubs' ? 1 : 0,
        )
      : menuItemDefs;

  return orderedItems.map((item) => ({
    href:
      locale === 'en' && !englishRouteHrefs.has(item.href)
        ? item.href
        : localizeHref(locale, item.href),
    imgPath: item.imgPath,
    alt: item.alt,
    text: item.text[locale],
  }));
}

export const menuItems = getMenuItems('es');

export type NavKey =
  | 'index'
  | 'contacto'
  | 'gamebanana'
  | 'pq2install'
  | 'p4d'
  | 'default';

export interface NavbarOptions {
  activeKey?: NavKey;
  showLogo?: boolean;
  extraContainerClass?: string;
  boldProyecto?: boolean;
  boldContacto?: boolean;
}
