import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { parse } from 'node-html-parser';

const ROOT = resolve(process.cwd());
const keys = ['blackopsiiilatino', 'blackopslatino', 'infinitewarfarelatino', 'modernwarfarerlatino'];

for (const key of keys) {
  const path = resolve(ROOT, 'src/generated', `${key}.html`);
  const root = parse(readFileSync(path, 'utf8'), { comment: true });

  // 1) accordion -> <details>
  root.querySelectorAll('.accordion').forEach((acc) => {
    const details = acc.querySelectorAll('.accordion-item').map((item) => {
      const btn = item.querySelector('.accordion-button');
      const summary = btn ? btn.text.trim() : '';
      const collapse = item.querySelector('.accordion-collapse');
      const open = collapse && collapse.classList.contains('show') ? ' open' : '';
      const body = item.querySelector('.accordion-body');
      const bodyHtml = body ? body.innerHTML.trim() : '';
      return `<details class="changelog-item"${open}>\n  <summary class="changelog-summary">${summary}</summary>\n  <div class="changelog-body">${bodyHtml}</div>\n</details>`;
    }).join('\n');
    acc.set_content(details);
    acc.setAttribute('class', 'changelog mt-3');
  });

  // 2) drop mobile-twin copies
  root.querySelectorAll('.hide-desktop, .hide-desktop2, .hide-desktop3').forEach((el) => el.remove());

  // 3) unhide the kept desktop copies so they're always shown (CSS makes them responsive)
  root.querySelectorAll('.hide-mobile, .hide-mobile2, .hide-mobile3').forEach((el) => {
    const cls = (el.getAttribute('class') || '')
      .split(/\s+/)
      .filter((c) => c && !/^hide-mobile\d?$/.test(c))
      .join(' ');
    el.setAttribute('class', cls);
  });

  writeFileSync(path, root.toString(), 'utf8');
  console.log(`✓ ${key}: accordion→details, twins collapsed`);
}
