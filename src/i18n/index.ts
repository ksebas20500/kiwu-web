import * as S from '../site';

export type Lang = 'es' | 'en' | 'pt';
export const langs: Lang[] = ['es', 'en', 'pt'];
export const prefix: Record<Lang, string> = { es: '', en: 'en', pt: 'pt-br' };
export const htmlLang: Record<Lang, string> = { es: 'es', en: 'en', pt: 'pt-BR' };
export const ogLocale: Record<Lang, string> = { es: 'es_ES', en: 'en_US', pt: 'pt_BR' };
export const langName: Record<Lang, string> = { es: 'Español', en: 'English', pt: 'Português' };

// Cada clave de ruta tiene su slug por idioma. El español conserva las URLs originales.
export const routes = {
  home: { es: '', en: '', pt: '' },
  features: { es: 'funciones', en: 'features', pt: 'recursos' },
  tasks: { es: 'funciones/tareas-y-tablero', en: 'features/tasks-and-board', pt: 'recursos/tarefas-e-quadro' },
  calendar: { es: 'funciones/calendario', en: 'features/calendar', pt: 'recursos/calendario' },
  notes: { es: 'funciones/notas', en: 'features/notes', pt: 'recursos/notas' },
  android: { es: 'android', en: 'android', pt: 'android' },
  students: { es: 'para-estudiantes', en: 'for-students', pt: 'para-estudantes' },
  install: { es: 'instalar', en: 'install', pt: 'instalar' },
  macos: { es: 'macos', en: 'macos', pt: 'macos' },
  linux: { es: 'linux', en: 'linux', pt: 'linux' },
  nocloud: { es: 'sin-nube', en: 'no-cloud', pt: 'sem-nuvem' },
  privacy: { es: 'privacidad', en: 'privacy', pt: 'privacidade' },
  faq: { es: 'preguntas-frecuentes', en: 'faq', pt: 'perguntas-frequentes' },
  license: { es: 'licencia', en: 'license', pt: 'licenca' },
} as const;
export type Route = keyof typeof routes;

export function path(lang: Lang, route: Route): string {
  const parts = [prefix[lang], routes[route][lang]].filter(Boolean);
  return '/' + parts.join('/') + (parts.length ? '/' : '');
}

export function routeOf(pathname: string): { lang: Lang; route: Route } | null {
  for (const lang of langs) for (const route of Object.keys(routes) as Route[]) if (path(lang, route) === pathname) return { lang, route };
  return null;
}

// Sustituye {{clave}} por la ruta localizada o por una constante de site.ts.
const consts: Record<string, string> = {
  REPO: S.REPO, ISSUES: S.ISSUES, RELEASES: S.RELEASES, TESTER: S.TESTER_FORM, APK: S.ANDROID_APK, SUMS: S.ANDROID_SUMS,
  ANDROID_RELEASE: S.ANDROID_RELEASE, MACOS_DMG: S.MACOS_DMG, MACOS_RELEASE: S.MACOS_RELEASE, LINUX_RELEASE: S.LINUX_RELEASE,
  LINUX_TARBALL: S.LINUX_TARBALL, RAW: S.RAW,
};
export function fill(lang: Lang, html: string): string {
  return html.replace(/\{\{(\w+)\}\}/g, (m, k) => (k in routes ? path(lang, k as Route) : consts[k] ?? m));
}

export const ui = {
  es: {
    skip: 'Saltar al contenido', home: 'Kiwu, inicio', main: 'Principal', footerNav: 'Pie de página', tester: 'Ser tester',
    theme: 'Cambiar entre modo claro y oscuro', themeTitle: 'Cambiar tema', langLabel: 'Idioma',
    nav: { features: 'Funciones', android: 'Android', students: 'Para estudiantes', install: 'Instalar', macos: 'macOS', linux: 'Linux', privacy: 'Privacidad', faq: 'Preguntas' },
    footerText: 'Tareas, calendario, horario y apuntes para estudiantes, en Android, macOS y Linux. Software libre bajo licencia MIT.',
    footerLinks: { install: 'Instalar', nocloud: 'Sin nube', privacy: 'Privacidad', license: 'Licencia' }, github: 'Código en GitHub',
    copy: 'Copiar', copied: 'Copiado', copyFail: 'Selecciona y copia', titleSuffix: ' · Kiwu',
    ogAlt: 'Kiwu, el gato mago, sobre un degradado violeta y azul',
  },
  en: {
    skip: 'Skip to content', home: 'Kiwu, home', main: 'Main', footerNav: 'Footer', tester: 'Become a tester',
    theme: 'Switch between light and dark mode', themeTitle: 'Change theme', langLabel: 'Language',
    nav: { features: 'Features', android: 'Android', students: 'For students', install: 'Install', macos: 'macOS', linux: 'Linux', privacy: 'Privacy', faq: 'FAQ' },
    footerText: 'Tasks, calendar, timetable and notes for students, on Android, macOS and Linux. Free software under the MIT license.',
    footerLinks: { install: 'Install', nocloud: 'No cloud', privacy: 'Privacy', license: 'License' }, github: 'Code on GitHub',
    copy: 'Copy', copied: 'Copied', copyFail: 'Select and copy', titleSuffix: ' · Kiwu',
    ogAlt: 'Kiwu, the wizard cat, on a violet and blue gradient',
  },
  pt: {
    skip: 'Pular para o conteúdo', home: 'Kiwu, início', main: 'Principal', footerNav: 'Rodapé', tester: 'Ser testador',
    theme: 'Alternar entre modo claro e escuro', themeTitle: 'Mudar tema', langLabel: 'Idioma',
    nav: { features: 'Recursos', android: 'Android', students: 'Para estudantes', install: 'Instalar', macos: 'macOS', linux: 'Linux', privacy: 'Privacidade', faq: 'Perguntas' },
    footerText: 'Tarefas, calendário, horário e anotações para estudantes, no Android, macOS e Linux. Software livre sob licença MIT.',
    footerLinks: { install: 'Instalar', nocloud: 'Sem nuvem', privacy: 'Privacidade', license: 'Licença' }, github: 'Código no GitHub',
    copy: 'Copiar', copied: 'Copiado', copyFail: 'Selecione e copie', titleSuffix: ' · Kiwu',
    ogAlt: 'Kiwu, o gato mago, sobre um degradê violeta e azul',
  },
} as const;
