import { guides, type GuideKey, type GuideProject } from './guides';
import type { Locale } from '../i18n/config';
import { localizeHref } from '../i18n/config';

const englishDisclaimers: Partial<Record<GuideKey, string>> = {
  blackopsiiilatino:
    'This project is not affiliated with Activision or Treyarch. All rights reserved by their respective owners.',
  blackopslatino:
    'This project is not affiliated with Activision or Treyarch. All rights reserved by their respective owners.',
  infinitewarfarelatino:
    'This project is not affiliated with Activision or Infinity Ward. All rights reserved by their respective owners.',
  modernwarfarerlatino:
    'This project is not affiliated with Activision or Raven Software. All rights reserved by their respective owners.',
  bo3customdubs:
    'This project is not affiliated with Activision or Treyarch. All rights reserved by their respective owners.',
};

function cloneGuide(guide: GuideProject): GuideProject {
  return {
    ...guide,
    header: { ...guide.header },
    creators: guide.creators.map((creator) => ({ ...creator })),
    indice: guide.indice.map((item) => ({ ...item })),
    downloadCount: guide.downloadCount ? { ...guide.downloadCount } : guide.downloadCount,
  };
}

export function getGuideProject(key: GuideKey, locale: Locale): GuideProject {
  const guide = cloneGuide(guides[key]);

  guide.creators = guide.creators.map((creator) => ({
    ...creator,
    buttonHref: creator.buttonHref ? localizeHref(locale, creator.buttonHref) : creator.buttonHref,
  }));

  if (locale === 'en') {
    guide.disclaimer = englishDisclaimers[key] ?? guide.disclaimer;
  }

  if (locale === 'en' && key === 'bo3customdubs') {
    guide.title = 'COD: Black Ops III Custom Map Dubs';
    guide.description =
      'Guide for replacing the audio of some Black Ops III Custom Maps with Black Ops II dubs.';
    guide.header = {
      ...guide.header,
      logo: '/assets/img/Custom/logo.webp',
      title: 'Call of Duty: Black Ops III Custom Map Dubs',
      description:
        'Guide for replacing the audio of some Black Ops III Custom Maps with Black Ops II dubs.',
    };
    guide.indice = [
      { href: '#item-1', label: 'Introduction' },
      { href: '#item-2', label: 'Information' },
      { href: '#download', label: 'Downloads' },
      { href: '#item-6', label: 'Installation' },
      { href: '#item-9', label: 'Credits' },
      { href: '#item-10', label: 'Comments' },
    ];
    guide.creators = guide.creators.map((creator) =>
      creator.buttonLabel === 'Contacto'
        ? { ...creator, buttonLabel: 'Contact' }
        : creator,
    );
  }

  return guide;
}
