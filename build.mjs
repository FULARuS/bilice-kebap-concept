import { readFile, writeFile, mkdir, copyFile } from 'node:fs/promises';
const c = JSON.parse(await readFile(new URL('./content.json', import.meta.url), 'utf8'));
const esc = s => String(s).replace(/[&<>"']/g, v => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[v]));
const lines = s => esc(s).replace(/\n/g, '<br> ');
const brand = `<span class="brand-main">${esc(c.name)}</span><span class="brand-sub">${esc(c.nameSuffix)}</span>`;
const arrow = '<span aria-hidden="true">↗</span>';
const route = `<a class="button outline" href="${esc(c.links.directions)}">${esc(c.labels.directions)}${arrow}</a>`;
await mkdir(new URL('./dist', import.meta.url), {recursive:true});
await writeFile(new URL('./dist/index.html', import.meta.url), `<!doctype html>
<html lang="tr">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex,nofollow"><meta name="theme-color" content="#191916"><title>${esc(c.title)}</title><meta name="description" content="${esc(c.description)}"><link rel="icon" href="favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="style.css"><script src="site.js" defer></script></head>
<body id="top">
<a class="skip" href="#main">${esc(c.labels.skip)}</a>
<header class="shell header"><a class="brand" href="#top" aria-label="${esc(c.name+' '+c.nameSuffix)}">${brand}</a><nav aria-label="${esc(c.labels.nav)}"><a href="${c.links.table}">${esc(c.labels.table)}</a><a href="${c.links.menu}">${esc(c.labels.menu)}</a><a href="${c.links.visit}">${esc(c.labels.visit)} ${arrow}</a></nav></header>
<main id="main">
<section class="shell hero" aria-labelledby="hero-title"><div class="hero-copy"><p class="eyebrow">${esc(c.location)}</p><h1 id="hero-title">${esc(c.hero.first)} <em>${esc(c.hero.second)}</em></h1><p class="intro">${lines(c.hero.intro)}</p><div class="actions"><a class="button solid" href="${c.links.menu}">${esc(c.labels.explore)}<span aria-hidden="true">↓</span></a>${route}</div></div><figure class="hero-photo"><picture><source media="(max-width:700px)" srcset="${c.images.mobile}"><img src="${c.images.hero}" width="1100" height="1100" alt="${esc(c.images.heroAlt)}" fetchpriority="high"></picture><figcaption>${esc(c.hero.caption)}<span aria-hidden="true">01 / 03</span></figcaption></figure></section>
<section class="table-section" id="sofra" aria-labelledby="table-title"><div class="shell table-grid"><div class="table-copy"><p class="eyebrow">01 — ${esc(c.table.eyebrow)}</p><h2 id="table-title">${lines(c.table.title)}</h2><p class="section-intro">${esc(c.table.intro)}</p><div class="picker" role="group" aria-label="${esc(c.labels.picker)}">${c.dishes.map((d,i)=>`<button type="button" aria-pressed="${i===0}" aria-controls="dish-description" data-dish="${d.id}">${esc(d.name)}</button>`).join('')}</div><p class="dish-description" id="dish-description" aria-live="polite">${esc(c.dishes[0].description)}</p><p class="hint">${esc(c.table.hint)}</p></div><div class="dish-view" data-active="kebap"><img src="${c.images.hero}" width="1100" height="1100" loading="lazy" alt="${esc(c.images.heroAlt)}"><svg class="highlights" viewBox="0 0 100 100" aria-hidden="true"><rect class="highlight kebap" x="39" y="17" width="21" height="57" rx="9"/><g class="highlight meze"><ellipse cx="28" cy="18" rx="12" ry="11"/><ellipse cx="70" cy="18" rx="12" ry="11"/><ellipse cx="19" cy="40" rx="12" ry="10"/><ellipse cx="80" cy="40" rx="12" ry="10"/><ellipse cx="20" cy="62" rx="12" ry="11"/><ellipse cx="80" cy="62" rx="12" ry="11"/><ellipse cx="30" cy="82" rx="13" ry="11"/><ellipse cx="70" cy="82" rx="13" ry="11"/></g><ellipse class="highlight lavas" cx="35" cy="48" rx="7" ry="21"/></svg></div></div></section>
<section class="shell menu-section" id="menu" aria-labelledby="menu-title"><div><p class="eyebrow">02 — ${esc(c.menu.eyebrow)}</p><h2 id="menu-title">${esc(c.menu.title)}</h2><p class="menu-note">${esc(c.menu.note)}</p></div><dl class="menu-list">${c.dishes.map((d,i)=>`<div><dt><span class="item-number">0${i+1}</span>${esc(d.name)}</dt><dd>${esc(d.menu)}</dd></div>`).join('')}</dl></section>
<section class="shell gallery-section" aria-labelledby="gallery-title"><div class="section-heading"><p class="eyebrow">03 — ${esc(c.gallery.eyebrow)}</p><h2 id="gallery-title">${esc(c.gallery.title)}</h2></div><div class="gallery"><figure><img src="${c.images.kebap}" width="840" height="1120" loading="lazy" alt="${esc(c.images.kebapAlt)}"><figcaption>${esc(c.gallery.captions[0])}</figcaption></figure><figure><img src="${c.images.meze}" width="840" height="1120" loading="lazy" alt="${esc(c.images.mezeAlt)}"><figcaption>${esc(c.gallery.captions[1])}</figcaption></figure></div><p class="caption">${esc(c.gallery.disclaimer)}</p></section>
<section class="visit" id="ziyaret" aria-labelledby="visit-title"><div class="shell visit-grid"><div><p class="eyebrow">${esc(c.visit.eyebrow)}</p><h2 id="visit-title">${lines(c.visit.title)}</h2></div><div class="visit-details"><h3>${esc(c.labels.visit)}</h3><address>${esc(c.visit.address)}<br>${esc(c.visit.city)}</address><a class="phone" href="${c.links.phone}">${esc(c.visit.phone)}</a><div class="actions"><a class="button solid" href="${esc(c.links.directions)}">${esc(c.labels.directions)}${arrow}</a><a class="button outline" href="${c.links.phone}">${esc(c.labels.call)}${arrow}</a></div><a class="map-link" href="${esc(c.links.maps)}">${esc(c.labels.maps)} ${arrow}</a></div></div></section>
</main><footer class="shell footer"><a class="brand" href="#top" aria-label="${esc(c.name+' '+c.nameSuffix)}">${brand}</a><small>${esc(c.footer)}</small><a class="back-top" href="#top" aria-label="Başa dön">↑</a></footer></body></html>`);
await writeFile(new URL('./dist/site.js', import.meta.url), `const descriptions = ${JSON.stringify(Object.fromEntries(c.dishes.map(d=>[d.id,d.description])))};
const picker = document.querySelector('.picker');
picker.addEventListener('click', event => {
 const button = event.target.closest('button[data-dish]');
 if (!button) return;
 for (const option of picker.querySelectorAll('button')) option.setAttribute('aria-pressed', String(option === button));
 document.querySelector('.dish-view').dataset.active = button.dataset.dish;
 document.querySelector('.dish-description').textContent = descriptions[button.dataset.dish];
});\n`);
await copyFile(new URL('./style.css',import.meta.url),new URL('./dist/style.css',import.meta.url));
await writeFile(new URL('./dist/favicon.svg',import.meta.url),'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="#191916"/><text x="14" y="49" font-family="Georgia,serif" font-size="49" fill="#e0a577">B</text></svg>');
await writeFile(new URL('./dist/robots.txt',import.meta.url),'User-agent: *\nDisallow: /\n');
await writeFile(new URL('./dist/_headers',import.meta.url),'/*\n  X-Robots-Tag: noindex, nofollow\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n');
console.log('Built static Bilice Kebap site in dist/');

