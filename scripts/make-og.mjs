// Genera public/og.png (1200x630) a partir del banner de la marca. Ejecutar: node scripts/make-og.mjs
import sharp from 'sharp';
await sharp('src/assets/vista-previa.png').resize(1200, 630, { fit: 'cover' }).png({ compressionLevel: 9 }).toFile('public/og.png');
