import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';

const url = process.argv[2] || 'http://localhost:5174/';

const chrome = await chromeLauncher.launch({
  chromePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  chromeFlags: ['--headless=new', '--no-sandbox', '--disable-gpu'],
});

try {
  const result = await lighthouse(url, {
    port: chrome.port,
    output: 'json',
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    formFactor: 'desktop',
    screenEmulation: { disabled: true },
    throttlingMethod: 'simulate',
  });

  const lhr = result.lhr;
  const scores = {};
  for (const [key, cat] of Object.entries(lhr.categories)) {
    scores[key] = Math.round(cat.score * 100);
  }
  console.log('SCORES:', JSON.stringify(scores, null, 2));

  const failing = [];
  for (const cat of Object.values(lhr.categories)) {
    for (const ref of cat.auditRefs) {
      if (ref.weight === 0) continue;
      const audit = lhr.audits[ref.id];
      if (audit && audit.score !== null && audit.score < 1) {
        failing.push({ id: audit.id, title: audit.title, score: audit.score, category: cat.title });
      }
    }
  }
  failing.sort((a, b) => a.score - b.score);
  console.log('\nFAILING AUDITS:');
  for (const f of failing) {
    console.log(`[${f.category}] ${f.id} (score=${f.score}) — ${f.title}`);
  }

  const fs = await import('fs');
  fs.writeFileSync('scripts/lighthouse-report.json', JSON.stringify(lhr, null, 2));
} finally {
  await chrome.kill();
}
