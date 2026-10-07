import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'src', 'stok');

const MAX_WIDTH = 1600;
const QUALITY = 76;

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  const entries = JSON.parse(await fs.readFile(path.join(ROOT, 'scripts', 'pexels-map.json'), 'utf8'));

  const manifest = [];
  let i = 0;
  for (const [url, keys] of entries) {
    i++;
    const baseName = keys[0].replace(/[^a-zA-Z0-9-]/g, '');
    const outFile = path.join(OUT_DIR, `${baseName}.webp`);

    process.stdout.write(`[${i}/${entries.length}] ${keys.join(',')} <- ${url}\n`);

    const res = await fetch(url);
    if (!res.ok) {
      console.error(`  FAILED (${res.status}): ${url}`);
      manifest.push({ url, keys, ok: false });
      continue;
    }
    const buf = Buffer.from(await res.arrayBuffer());

    const img = sharp(buf).rotate();
    const meta = await img.metadata();
    const pipeline = meta.width && meta.width > MAX_WIDTH
      ? img.resize({ width: MAX_WIDTH, withoutEnlargement: true })
      : img;
    await pipeline.webp({ quality: QUALITY }).toFile(outFile);

    const outMeta = await sharp(outFile).metadata();
    const outSize = (await fs.stat(outFile)).size;

    manifest.push({
      url,
      keys,
      ok: true,
      file: `src/stok/${baseName}.webp`,
      width: outMeta.width,
      height: outMeta.height,
      sizeKB: Math.round(outSize / 1024),
    });
  }

  await fs.writeFile(path.join(ROOT, 'scripts', 'pexels-manifest.json'), JSON.stringify(manifest, null, 2));

  const failed = manifest.filter((m) => !m.ok);
  console.log(`\nDone. ${manifest.length - failed.length}/${manifest.length} succeeded.`);
  if (failed.length) {
    console.log('Failed:', failed.map((f) => f.url).join('\n'));
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
