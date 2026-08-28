// One-off image optimization pass: converts oversized PNG/JPG photos to
// resized, quality-tuned WebP. Run with: node scripts/optimize-images.mjs
import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const HERO_MAX_WIDTH = 1920;
const GALLERY_MAX_WIDTH = 900;
const HERO_QUALITY = 80;
const GALLERY_QUALITY = 78;

// Local files that are used as full-width hero / page-header / parallax
// backgrounds (mainImage of an accommodation, atrof-muhit photos, video
// posters). Everything else photographic gets the smaller gallery bucket.
const HERO_FILES = new Set([
  'src/atrof-muhit/resort.png',
  'src/atrof-muhit/tabiat.png',
  'src/atrof-muhit/tabiat1.png',
  'src/atrof-muhit/tabiat2.png',
  'src/atrof-muhit/tabiat3.png',
  'src/atrof-muhit/tabiat4.png',
  'src/atrof-muhit/tabiat5.png',
  'src/atrof-muhit/tabiat6.png',
  'src/atrof-muhit/tabiat7.png',
  'src/atrof-muhit/tabiat8.png',
  'src/atrof-muhit/tog.png',
  'src/atrof-muhit/xona-kotej.png',
  'src/xonalar/10-kishilik-1-standart/1-standart.png',
  'src/xonalar/10-kishilik-3-standart/standart-1.png',
  'src/xonalar/10-kishilik-pollux/10kishi-pollux1.png',
  'src/xonalar/8-kishilik-luks/8kishi-lux1.png',
  'src/xonalar/3kishilik/3kishi5.png',
  'src/xonalar/4kishilik/4kishi5.png',
  'src/xonalar/4kishilik2/4kishilik-1.png',
  'src/xonalar/10kishilik-1/2-10kishi6.png',
].map((p) => p.replace(/\//g, path.sep)));

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  let files = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) files = files.concat(await walk(full));
    else files.push(full);
  }
  return files;
}

async function main() {
  const targets = [];

  const xonalarDir = path.join(ROOT, 'src', 'xonalar');
  const atrofDir = path.join(ROOT, 'src', 'atrof-muhit');
  const videoPostersDir = path.join(ROOT, 'src', 'videos', 'posters');
  const tabiatPostersDir = path.join(ROOT, 'src', 'tabiat-videos', 'posters');

  for (const f of await walk(xonalarDir)) {
    if (/\.png$/i.test(f)) targets.push({ file: f, kind: 'xonalar' });
  }
  for (const f of await walk(atrofDir)) {
    if (/\.png$/i.test(f) && !f.endsWith('dugobba.png')) targets.push({ file: f, kind: 'hero' });
  }
  for (const f of await walk(videoPostersDir)) {
    if (/\.jpe?g$/i.test(f)) targets.push({ file: f, kind: 'hero' });
  }
  for (const f of await walk(tabiatPostersDir)) {
    if (/\.jpe?g$/i.test(f)) targets.push({ file: f, kind: 'hero' });
  }

  const manifest = [];
  let totalBefore = 0;
  let totalAfter = 0;

  for (const { file, kind } of targets) {
    const rel = path.relative(ROOT, file);
    const isHero = kind === 'hero' || HERO_FILES.has(rel);
    const maxWidth = isHero ? HERO_MAX_WIDTH : GALLERY_MAX_WIDTH;
    const quality = isHero ? HERO_QUALITY : GALLERY_QUALITY;

    const before = (await fs.stat(file)).size;
    const outFile = file.replace(/\.(png|jpe?g)$/i, '.webp');

    const img = sharp(file).rotate();
    const meta = await img.metadata();
    const pipeline = meta.width && meta.width > maxWidth
      ? img.resize({ width: maxWidth, withoutEnlargement: true })
      : img;

    await pipeline.webp({ quality }).toFile(outFile);
    await fs.unlink(file);

    const after = (await fs.stat(outFile)).size;
    const outMeta = await sharp(outFile).metadata();
    totalBefore += before;
    totalAfter += after;

    manifest.push({
      oldPath: rel,
      newPath: path.relative(ROOT, outFile),
      oldBasename: path.basename(file),
      newBasename: path.basename(outFile),
      width: outMeta.width,
      height: outMeta.height,
      bucket: isHero ? 'hero' : 'gallery',
    });

    console.log(
      `${rel} -> ${path.relative(ROOT, outFile)}  ${(before / 1024 / 1024).toFixed(2)}MB -> ${(after / 1024).toFixed(0)}KB  (${outMeta.width}x${outMeta.height}, ${isHero ? 'hero' : 'gallery'})`
    );
  }

  await fs.writeFile(
    path.join(ROOT, 'scripts', 'image-manifest.json'),
    JSON.stringify(manifest, null, 2)
  );

  console.log('\n--- SUMMARY ---');
  console.log(`Files processed: ${manifest.length}`);
  console.log(`Total before: ${(totalBefore / 1024 / 1024).toFixed(1)} MB`);
  console.log(`Total after:  ${(totalAfter / 1024 / 1024).toFixed(1)} MB`);
  console.log(`Saved: ${(((totalBefore - totalAfter) / totalBefore) * 100).toFixed(1)}%`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
