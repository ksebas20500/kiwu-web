// Genera public/og.png (1200x630) con el icono y una captura real de Kiwu. Ejecutar: node scripts/make-og.mjs
import sharp from 'sharp';
const shot = await sharp('src/assets/tablero.png').resize({ width: 640 }).png().toBuffer();
const icon = await sharp('src/assets/icono.png').resize(120).png().toBuffer();
const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg"><rect width="1200" height="630" fill="#fbf4ee"/>
<text x="80" y="330" font-family="Helvetica, Arial, sans-serif" font-size="96" font-weight="700" fill="#2b2523">Kiwu</text>
<text x="80" y="400" font-family="Helvetica, Arial, sans-serif" font-size="34" fill="#5c514c">Tareas, calendario y apuntes.</text>
<text x="80" y="446" font-family="Helvetica, Arial, sans-serif" font-size="34" fill="#5c514c">Todo en tu equipo.</text>
<text x="80" y="560" font-family="Helvetica, Arial, sans-serif" font-size="26" fill="#b4402b">macOS · Linux · código abierto</text></svg>`;
await sharp(Buffer.from(svg)).composite([{ input: icon, left: 80, top: 130 }, { input: shot, left: 520, top: 150 }]).png({ compressionLevel: 9 }).toFile('public/og.png');
