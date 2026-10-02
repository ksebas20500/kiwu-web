import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// El dominio público se define con la variable SITE_URL (p. ej. https://kiwu.ejemplo.com), sin barra final.
// Si no está definida, el sitio compila igualmente pero se marca noindex y no se anuncia sitemap (ver README).
const site = process.env.SITE_URL?.replace(/\/+$/, '') || 'http://localhost:4321';

export default defineConfig({
  site,
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  integrations: [sitemap({ filter: (page) => !page.includes('/404') })],
});
