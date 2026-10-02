// Validaciones sobre dist/: títulos/descripciones únicos, canonical, h1, lang, JSON-LD, enlaces internos, sitemap y robots.
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';
const dist = 'dist';
const errs = [];
const pages = [];
(function walk(d) { for (const f of readdirSync(d)) { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') && pages.push(p); } })(dist);
const urlOf = (p) => '/' + p.slice(dist.length + 1).replace(/index\.html$/, '').replace(/404\.html$/, '404.html');
const known = new Set(pages.map(urlOf));
const titles = new Map(), descs = new Map();
for (const p of pages) {
  const h = readFileSync(p, 'utf8'), u = urlOf(p);
  const get = (re) => h.match(re)?.[1];
  if (!/<html lang="es"/.test(h)) errs.push(`${u}: falta lang=es`);
  const t = get(/<title>([^<]*)<\/title>/), d = get(/<meta name="description" content="([^"]*)"/);
  if (!t) errs.push(`${u}: sin title`); else titles.has(t) ? errs.push(`${u}: title duplicado con ${titles.get(t)}`) : titles.set(t, u);
  if (!d) errs.push(`${u}: sin description`); else descs.has(d) ? errs.push(`${u}: description duplicada con ${descs.get(d)}`) : descs.set(d, u);
  if ((h.match(/<h1[ >]/g) || []).length !== 1) errs.push(`${u}: debe haber exactamente un h1`);
  if (!/<link rel="canonical" href="https?:\/\//.test(h)) errs.push(`${u}: canonical no absoluta`);
  for (const m of h.matchAll(/<img\b[^>]*>/g)) if (!/ alt="/.test(m[0]) || !/ width="/.test(m[0]) || !/ height="/.test(m[0])) errs.push(`${u}: img sin alt/dimensiones: ${m[0].slice(0, 80)}`);
  for (const m of h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) { try { const j = JSON.parse(m[1]); if (/aggregateRating|review|offers/i.test(m[1])) errs.push(`${u}: JSON-LD con propiedades no verificadas`); } catch { errs.push(`${u}: JSON-LD inválido`); } }
  for (const m of h.matchAll(/<a [^>]*href="(\/[^"#]*)(#[^"]*)?"/g)) { if (!known.has(m[1]) && !existsSync(join(dist, m[1]))) errs.push(`${u}: enlace roto ${m[1]}`); }
}
for (const f of ['robots.txt', 'sitemap-index.xml', 'og.png', 'favicon.png']) if (!existsSync(join(dist, f))) errs.push(`falta dist/${f}`);
if (existsSync(join(dist, 'sitemap-0.xml'))) { const s = readFileSync(join(dist, 'sitemap-0.xml'), 'utf8'); if (/404/.test(s)) errs.push('sitemap incluye 404'); console.log('URLs en sitemap:', (s.match(/<loc>/g) || []).length); }
console.log(`Páginas HTML: ${pages.length}`);
if (errs.length) { console.error('\nERRORES:\n' + errs.join('\n')); process.exit(1); }
console.log('Validación OK');
