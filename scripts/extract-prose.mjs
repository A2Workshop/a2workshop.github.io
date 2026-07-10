import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { parse } from 'node-html-parser';

const ROOT = resolve(process.cwd());
const keys = [
  'blackopsiiilatino',
  'blackopslatino',
  'infinitewarfarelatino',
  'modernwarfarerlatino',
];

for (const key of keys) {
  const path = resolve(ROOT, 'src/generated', `${key}.html`);
  const root = parse(readFileSync(path, 'utf8'));
  const scrollspy = root.querySelector('.scrollspy-example-2');
  if (!scrollspy) {
    console.error(`! ${key}: .scrollspy-example-2 not found — left unchanged`);
    continue;
  }
  writeFileSync(path, scrollspy.innerHTML.trim(), 'utf8');
  console.log(`✓ ${key}: prose extracted (${scrollspy.innerHTML.length} bytes)`);
}
