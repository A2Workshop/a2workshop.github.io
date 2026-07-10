import type { Locale } from './config';

export const ui = {
  es: {
    nav: {
      projects: 'Proyectos',
      contact: 'Contacto',
      closeMenu: 'Cerrar menu',
    },
    footer: {
      defaultDisclaimer:
        'Este proyecto no esta afiliado con las marcas mencionadas. Todos los derechos reservados por sus respectivos propietarios.',
    },
    notFound: {
      title: 'Error 404: Pagina no encontrada',
      body: 'Ups, algo salio mal. La pagina que buscas no existe o esta en otro lugar.',
      cta: 'Volver a A2Workshop',
    },
  },
  en: {
    nav: {
      projects: 'Projects',
      contact: 'Contact',
      closeMenu: 'Close menu',
    },
    footer: {
      defaultDisclaimer:
        'This project is not affiliated with the mentioned brands. All rights reserved by their respective owners.',
    },
    notFound: {
      title: '404 Error: Page not found',
      body: 'Oops, something went wrong. The page you are looking for does not exist or was moved.',
      cta: 'Back to A2Workshop',
    },
  },
} as const satisfies Record<Locale, unknown>;

export function getUiCopy(locale: Locale) {
  return ui[locale];
}
