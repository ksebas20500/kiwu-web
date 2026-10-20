// Datos verificados en el repositorio de la app (ver README del sitio, «Inventario»).
export const REPO = 'https://github.com/ksebas20500/kiwu';
export const RELEASES = `${REPO}/releases`;
export const MACOS_DMG = `${REPO}/releases/latest/download/Kiwu.dmg`;
export const MACOS_RELEASE = `${REPO}/releases/tag/v2.0.0`;
export const LINUX_RELEASE = `${REPO}/releases/tag/linux-v0.1.0`;
export const LINUX_TARBALL = `${REPO}/releases/download/linux-v0.1.0/kiwu-linux.tar.gz`;
export const ANDROID_RELEASE = `${REPO}/releases/tag/android-v0.1.0`;
export const ANDROID_APK = `${REPO}/releases/download/android-v0.1.0/kiwu-android-0.1.0.apk`;
export const ANDROID_SUMS = `${REPO}/releases/download/android-v0.1.0/SHA256SUMS.txt`;
export const ISSUES = `${REPO}/issues`;
export const RAW = 'https://raw.githubusercontent.com/ksebas20500/kiwu/main';
export const INSTALL_CMD = `curl -fsSL ${RAW}/install.sh | bash`;
export const SITE_URL_SET = Boolean(process.env.SITE_URL);
export const nav = [
  { href: '/funciones/', label: 'Funciones' },
  { href: '/para-estudiantes/', label: 'Para estudiantes' },
  { href: '/macos/', label: 'macOS' },
  { href: '/linux/', label: 'Linux' },
  { href: '/android/', label: 'Android' },
  { href: '/instalar/', label: 'Instalar' },
  { href: '/privacidad/', label: 'Privacidad' },
  { href: '/preguntas-frecuentes/', label: 'Preguntas' },
];
