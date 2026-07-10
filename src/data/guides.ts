export interface Creator {
  name: string;
  img: string;
  buttonLabel?: string | null;
  buttonHref?: string | null;
}

export interface IndexItem {
  href: string;
  label: string;
}

export interface DownloadCount {
  staticDownloads?: number;
  sources: string;
}

export interface GuideHeaderData {
  logo: string;
  title: string;
  description?: string | null;
  steamUrl?: string | null;
}

export interface GuideProject {
  key: string;
  title: string;
  description: string;
  ogImage: string;
  themeColor: string;
  bgBase?: string;
  bgAccent?: string;
  disclaimer: string;
  accent: string;
  accentText?: string;
  gridVariant?: 'default' | 'single' | 'row250';
  header: GuideHeaderData;
  creators: Creator[];
  indice: IndexItem[];
  downloadCount?: DownloadCount | null;
  md5Path?: string | null;
  commentsTextareaUrl: string;
}

const CONTACT = '/contacto';

export const guides = {
  blackopsiiilatino: {
    key: 'blackopsiiilatino',
    title: 'COD: Black Ops III PC Español Latino',
    description: 'Guía para cambiar el idioma del Call of Duty: Black Ops 3 de PC al Español Latino.',
    ogImage: 'https://a2workshop.github.io/assets/img/BO3/webpreview.webp',
    themeColor: '#090D12',
    bgBase: '#1b2838',
    bgAccent: '#4b2b16',
    disclaimer: 'Este proyecto no está afiliado con Activision o Treyarch. Todos los derechos reservados por sus respectivos propietarios.',
    accent: '#FF6500',
    accentText: '#fdfdfd',
    gridVariant: 'default',
    header: {
      logo: '/assets/img/BO3/logo.webp',
      title: 'Call of Duty: Black Ops III Traducción Español Latino',
      description: 'Guía para cambiar el idioma del Call of Duty: Black Ops III de PC al Español Latino.',
      steamUrl: 'https://steamcommunity.com/sharedfiles/filedetails/?id=3476068089',
    },
    creators: [
      { name: 'atuburapaler', img: '/assets/img/Profile/atuburapaler.jpg' },
      { name: 'Artur16211', img: '/assets/img/Profile/Artur16211.webp', buttonLabel: 'Contacto', buttonHref: CONTACT },
    ],
    indice: [
      { href: '#item-1', label: 'Introducción' },
      { href: '#item-2', label: '¿Qué hay de nuevo?' },
      { href: '#item-3', label: 'Avances' },
      { href: '#item-4', label: 'Información' },
      { href: '#descargar', label: 'Descargas' },
      { href: '#MD5', label: 'MD5' },
      { href: '#item-6', label: 'Instalación' },
      { href: '#item-7', label: 'Errores Conocidos' },
      { href: '#item-8', label: 'Workshop - Zombies' },
      { href: '#item-9', label: 'Créditos' },
      { href: '#item-10', label: 'Comentarios' },
    ],
    downloadCount: {
      staticDownloads: 21856,
      sources: '[{"folderKey":"fxa4xrrlre40k","filename":"Core (Requerido).7z"},{"folderKey":"y5qw1e4we6y50","filename":"BO3_MSPC_FULL_3.0.7z"},{"folderKey":"jizltsp4dmgfy","filename":"BO3_MSPC_FULL_3.0_MSStore.7z"}]',
    },
    md5Path: '/assets/md5/bo3/md5.txt',
    commentsTextareaUrl: 'https://steamcommunity.com/sharedfiles/filedetails/?id=3476068089#commentthread_PublishedFile_Public_76561198840412181_3476068089_textarea',
  },
  blackopslatino: {
    key: 'blackopslatino',
    title: 'COD: Black Ops PC Español Latino',
    description: 'Guía para cambiar el idioma del Call of Duty: Black Ops al Español Latino.',
    ogImage: 'https://a2workshop.github.io/assets/img/BO1/webpreview.webp',
    themeColor: '#090D12',
    bgBase: '#1b2838',
    bgAccent: '#3a3f46',
    disclaimer: 'Este proyecto no está afiliado con Activision o Treyarch. Todos los derechos reservados por sus respectivos propietarios.',
    accent: '#dbdbdb',
    gridVariant: 'single',
    header: {
      logo: '/assets/img/BO1/logo.webp',
      title: 'Call of Duty: Black Ops Zombies Traducción Español Latino',
      description: 'Guía para cambiar el idioma del Call of Duty: Black Ops Zombies al Español Latino.',
      steamUrl: 'https://steamcommunity.com/sharedfiles/filedetails/?id=3478642806',
    },
    creators: [
      { name: 'atuburapaler', img: '/assets/img/Profile/atuburapaler.jpg' },
      { name: 'Artur16211', img: '/assets/img/Profile/Artur16211.webp', buttonLabel: 'Contacto', buttonHref: CONTACT },
    ],
    indice: [
      { href: '#item-1', label: 'Introducción' },
      { href: '#item-3', label: 'Avances' },
      { href: '#Updates', label: '¿Qué hay de nuevo?' },
      { href: '#item-4', label: 'Mapas Disponibles' },
      { href: '#descargar', label: 'Descargas' },
      { href: '#item-6', label: 'Instalación' },
      { href: '#item-8', label: 'Notas' },
      { href: '#item-9', label: 'Comentarios' },
    ],
    downloadCount: null,
    md5Path: null,
    commentsTextareaUrl: 'https://steamcommunity.com/sharedfiles/filedetails/?id=3478642806#commentthread_PublishedFile_Public_76561198840412181_3478642806_textarea',
  },
  infinitewarfarelatino: {
    key: 'infinitewarfarelatino',
    title: 'COD: Infinite Warfare PC Español Latino',
    description: 'Guía para cambiar el idioma del Call of Duty: Infinite Warfare de PC al Español Latino versión Win32(Steam).',
    ogImage: 'https://a2workshop.github.io/assets/img/IW/webpreview.webp',
    themeColor: '#090D12',
    bgBase: '#1b2838',
    bgAccent: '#484616',
    disclaimer: 'Este proyecto no está afiliado con Activision o Infinity Ward. Todos los derechos reservados por sus respectivos propietarios.',
    accent: '#FFFD01',
    gridVariant: 'row250',
    header: {
      logo: '/assets/img/IW/images.steamusercontent.jpeg',
      title: 'Call of Duty: Infinite Warfare Traducción Español Latino Win32(Steam)',
      description: 'Guía para cambiar el idioma del Call of Duty: Infinite Warfare de PC al Español Latino versión Win32(Steam).',
      steamUrl: 'https://steamcommunity.com/sharedfiles/filedetails/?id=3438530146',
    },
    creators: [
      { name: 'Namish9741', img: 'https://cdn.fastly.steamstatic.com/steamcommunity/public/images/items/1504020/4495cb7125faf0795bf63ce532290bc28bebb440.gif', buttonLabel: 'Perfil de Steam', buttonHref: 'https://steamcommunity.com/profiles/76561199112392013' },
      { name: 'atuburapaler', img: '/assets/img/Profile/atuburapaler.jpg' },
      { name: 'Artur16211', img: '/assets/img/Profile/Artur16211.webp', buttonLabel: 'Contacto', buttonHref: CONTACT },
    ],
    indice: [
      { href: '#item-1', label: 'Introducción' },
      { href: '#item-2', label: 'Actualizaciones' },
      { href: '#item-3', label: 'Avances' },
      { href: '#item-4', label: 'Información' },
      { href: '#descargar', label: 'Descargas' },
      { href: '#MD5', label: 'MD5' },
      { href: '#item-6', label: 'Instalación' },
      { href: '#item-9', label: 'Créditos' },
      { href: '#item-10', label: 'Comentarios' },
    ],
    downloadCount: {
      sources: '[{"folderKey":"l9ottw7iwgflo","filename":"IW_NAPC_BASE_1.0.7z"},{"folderKey":"6kixy5n3felno","filename":"IW_NAPC_DLC_1.0.7z"}]',
    },
    md5Path: '/assets/md5/iw/md5.txt',
    commentsTextareaUrl: 'https://steamcommunity.com/sharedfiles/filedetails/?id=3438530146#commentthread_PublishedFile_Public_76561199112392013_3438530146_textarea',
  },
  modernwarfarerlatino: {
    key: 'modernwarfarerlatino',
    title: 'COD: Modern Warfare Remastered PC Español Latino',
    description: 'Guía para cambiar el idioma del Call of Duty: Modern Warfare Remastered de PC al Español Latino versión Win32(Steam).',
    ogImage: 'https://a2workshop.github.io/assets/img/MWR/webpreview.webp',
    themeColor: '#090D12',
    bgBase: '#1b2838',
    bgAccent: '#173f18',
    disclaimer: 'Este proyecto no está afiliado con Activision o Raven Software. Todos los derechos reservados por sus respectivos propietarios.',
    accent: '#0EF40A',
    gridVariant: 'single',
    header: {
      logo: '/assets/img/MWR/MWR.webp',
      title: 'Call of Duty: Modern Warfare Remastered Traducción Español Latino Win32(Steam)',
      description: 'Guía para cambiar el idioma del Call of Duty: Modern Warfare Remastered de PC al Español Latino versión Win32(Steam).',
      steamUrl: 'https://steamcommunity.com/sharedfiles/filedetails/?id=3478574794',
    },
    creators: [
      { name: 'Namish9741', img: 'https://cdn.fastly.steamstatic.com/steamcommunity/public/images/items/1504020/4495cb7125faf0795bf63ce532290bc28bebb440.gif', buttonLabel: 'Perfil de Steam', buttonHref: 'https://steamcommunity.com/profiles/76561199112392013' },
      { name: 'atuburapaler', img: '/assets/img/Profile/atuburapaler.jpg' },
      { name: 'Artur16211', img: '/assets/img/Profile/Artur16211.webp', buttonLabel: 'Contacto', buttonHref: CONTACT },
    ],
    indice: [
      { href: '#item-1', label: 'Introducción' },
      { href: '#item-2', label: 'Actualizaciones' },
      { href: '#item-3', label: 'Avances' },
      { href: '#item-4', label: 'Información' },
      { href: '#descargar', label: 'Descargas' },
      { href: '#MD5', label: 'MD5' },
      { href: '#item-6', label: 'Instalación' },
      { href: '#item-9', label: 'Créditos' },
      { href: '#item-10', label: 'Comentarios' },
    ],
    downloadCount: null,
    md5Path: '/assets/md5/mwr/md5.txt',
    commentsTextareaUrl: 'https://steamcommunity.com/sharedfiles/filedetails/?id=3478574794#commentthread_PublishedFile_Public_76561199112392013_3478574794_textarea',
  },

  bo3customdubs: {
    key: 'bo3customdubs',
    title: 'COD: Black Ops III Custom Map Dubs',
    description: 'Guía para cambiar el audio de algunos Custom Maps de Black Ops III por sus doblajes de Black Ops II.',
    ogImage: 'https://a2workshop.github.io/assets/img/BO3/webpreview.webp',
    themeColor: '#090D12',
    bgBase: '#1b2838',
    bgAccent: '#4b2b16',
    disclaimer: 'Este proyecto no está afiliado con Activision o Treyarch. Todos los derechos reservados por sus respectivos propietarios.',
    accent: '#db5903',
    accentText: '#fdfdfd',
    gridVariant: 'default',
    header: {
      logo: '/assets/img/Custom/logo.gif',
      title: 'Call of Duty: Black Ops III Custom Map Dubs',
      description: 'Guía para cambiar el audio de algunos Custom Maps de Black Ops III por sus doblajes de Black Ops II.',
      steamUrl: '',
    },
    creators: [
      { name: 'Artur16211', img: '/assets/img/Profile/Artur16211.webp', buttonLabel: 'Contacto', buttonHref: CONTACT },
      { name: 'atuburapaler', img: '/assets/img/Profile/atuburapaler.jpg' },
    ],
    indice: [
      { href: '#item-1', label: 'Introducción' },
      { href: '#item-2', label: 'Información' },
      { href: '#download', label: 'Descargas' },
      { href: '#item-6', label: 'Instalación' },
      { href: '#item-9', label: 'Créditos' },
      { href: '#item-10', label: 'Comentarios' },
    ],
    md5Path: '/assets/md5/bo3/md5.txt',
    commentsTextareaUrl: '',
  },
} satisfies Record<string, GuideProject>;

export type GuideKey = keyof typeof guides;
