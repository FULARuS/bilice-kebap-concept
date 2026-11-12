import { readFile, writeFile, copyFile } from 'node:fs/promises';
const c = JSON.parse(await readFile(new URL('./content.json', import.meta.url), 'utf8'));
const esc = s => String(s).replace(/[&<>"']/g, v => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[v]));
const lines = s => esc(s).replace(/\n/g, '<br> ');
const arrow = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14" stroke="currentColor" stroke-width="1.7"/></svg>';
const down = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 4v16m-7-7 7 7 7-7" stroke="currentColor" stroke-width="1.7"/></svg>';
const brand = `<span class="brand-name">${esc(c.name)}</span><span class="brand-bottom"><span>${esc(c.nameSuffix)}</span><i aria-hidden="true"></i></span>`;
const button = (label,href,kind='solid',icon=arrow)=>`<a class="button ${kind}" href="${esc(href)}">${esc(label)}${icon}</a>`;
const img = (key,alt,extra='')=>`<img src="${c.images[key]}" alt="${esc(c.images[alt])}" ${extra}>`;
const highlights = `<svg class="highlights" viewBox="0 0 100 100" aria-hidden="true"><rect class="highlight kebap" x="39" y="17" width="21" height="57" rx="9"/><g class="highlight meze"><ellipse cx="28" cy="18" rx="12" ry="11"/><ellipse cx="70" cy="18" rx="12" ry="11"/><ellipse cx="19" cy="40" rx="12" ry="10"/><ellipse cx="80" cy="40" rx="12" ry="10"/><ellipse cx="20" cy="62" rx="12" ry="11"/><ellipse cx="80" cy="62" rx="12" ry="11"/><ellipse cx="30" cy="82" rx="13" ry="11"/><ellipse cx="70" cy="82" rx="13" ry="11"/></g><ellipse class="highlight lavas" cx="35" cy="48" rx="7" ry="21"/></svg>`;
const html = `<!doctype html>
<html lang="tr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><meta name="theme-color" content="#efede7"><title>${esc(c.title)}</title><meta name="description" content="${esc(c.description)}"><link rel="icon" href="favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="style.css"><script src="site.js" defer></script></head>
<body id="top"><a class="skip" href="#main">${esc(c.labels.skip)}</a>
<header class="header"><a class="brand" href="#top" aria-label="${esc(c.name+' '+c.nameSuffix)}">${brand}</a><p class="header-location">${esc(c.location)}<span>İstanbul</span></p><nav aria-label="${esc(c.labels.nav)}"><a href="#sofra">${esc(c.labels.table)}</a><a href="#menu">${esc(c.labels.menu)}</a><a href="#ziyaret">${esc(c.labels.visit)} ${arrow}</a></nav><button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-nav" aria-label="${esc(c.labels.navigation)}"><span>MENÜ</span><i></i><i></i></button></header>
<nav class="mobile-nav" id="mobile-nav" aria-label="Mobil menü" hidden><a href="#sofra">${esc(c.labels.table)}</a><a href="#menu">${esc(c.labels.menu)}</a><a href="#ziyaret">${esc(c.labels.visit)} ${arrow}</a></nav>
<main id="main">
<section class="hero" aria-labelledby="hero-title"><div class="hero-heading"><p class="eyebrow">${esc(c.location)}</p><h1 id="hero-title">${esc(c.hero.first)} <span>${esc(c.hero.second)}</span></h1></div>
<div class="food-wall">
<div class="food-side side-left" aria-hidden="true"><figure>${img('grill','grillAlt','width="1100" height="825" decoding="async"')}</figure><figure>${img('meze','mezeAlt','width="840" height="1120" decoding="async"')}</figure></div>
<div class="center-stage"><figure class="dish-view" id="sofra" data-active="none"><picture><source media="(max-width:700px)" srcset="${c.images.mobile}">${img('hero','heroAlt','width="1100" height="1100" fetchpriority="high"')}</picture>${highlights}</figure><div class="tray-controls"><span class="tray-label">${esc(c.table.hint)} <span aria-hidden="true">→</span></span><div class="picker" role="group" aria-label="${esc(c.labels.picker)}">${c.dishes.map(d=>`<button type="button" data-dish="${d.id}" aria-pressed="false" aria-controls="dish-description">${esc(d.name)}</button>`).join('')}</div></div></div>
<div class="food-side side-right" aria-hidden="true"><figure>${img('lavas','lavasAlt','width="1100" height="825" decoding="async"')}</figure><figure>${img('kebap','kebapAlt','width="840" height="1120" decoding="async"')}</figure></div>
</div>
<p class="dish-description" id="dish-description" aria-live="polite">${esc(c.hero.intro)}</p><div class="hero-actions">${button(c.labels.explore,c.links.menu,'solid',down)}${button(c.labels.directions,c.links.directions,'outline')}</div>
</section>
<section class="story" aria-labelledby="story-title"><div class="story-inner"><div class="story-photo">${img('grill','grillAlt','width="1100" height="825" loading="lazy"')}<span class="photo-label">${esc(c.name+' '+c.nameSuffix)} / ${esc(c.location)}</span></div><div class="story-copy"><p class="eyebrow">${esc(c.table.eyebrow)}</p><h2 id="story-title">${lines(c.table.title)}</h2><p>${esc(c.table.intro)}</p><a class="text-link" href="#menu">${esc(c.labels.explore)} ${arrow}</a></div></div></section>
<section class="menu-section shell" id="menu" aria-labelledby="menu-title"><div class="menu-heading"><div><p class="eyebrow">${esc(c.menu.eyebrow)}</p><h2 id="menu-title">${esc(c.menu.title)}<span class="title-dot">.</span></h2></div><p>${esc(c.menu.note)}</p></div><div class="menu-list">${c.dishes.map((d,i)=>`<article class="menu-row"><span class="item-number">0${i+1}</span><h3>${esc(d.name)}</h3><p>${esc(d.menu)}</p><img src="${c.images[d.id==='kebap'?'kebap':d.id==='meze'?'meze':'lavas']}" alt="${esc(d.name)}" width="160" height="120" loading="lazy"></article>`).join('')}</div></section>
<section class="gallery-section" aria-labelledby="gallery-title"><div class="gallery-heading shell"><p class="eyebrow">${esc(c.gallery.eyebrow)}</p><h2 id="gallery-title">${lines(c.gallery.title)}</h2></div><div class="gallery"><figure class="gallery-one">${img('kebap','kebapAlt','width="840" height="1120" loading="lazy"')}<figcaption><span>01</span>${esc(c.gallery.captions[0])}</figcaption></figure><figure class="gallery-two">${img('meze','mezeAlt','width="840" height="1120" loading="lazy"')}<figcaption><span>02</span>${esc(c.gallery.captions[1])}</figcaption></figure></div><p class="caption shell">${esc(c.gallery.disclaimer)}</p></section>
<section class="visit" id="ziyaret" aria-labelledby="visit-title"><div class="visit-top shell"><p class="eyebrow">${esc(c.labels.visit)} / ${esc(c.visit.eyebrow)}</p><h2 id="visit-title">${lines(c.visit.title)}</h2><a class="big-arrow" href="${esc(c.links.directions)}" aria-label="${esc(c.labels.directions)}">${arrow}</a></div><div class="visit-bottom shell"><address>${esc(c.visit.address)}<br>${esc(c.visit.city)}</address><a class="phone" href="${esc(c.links.phone)}">${esc(c.visit.phone)}</a><div class="actions">${button(c.labels.directions,c.links.directions,'light')}${button(c.labels.call,c.links.phone,'dark-outline')}</div></div><div class="shell"><a class="map-link" href="${esc(c.links.maps)}">${esc(c.labels.maps)} ${arrow}</a></div></section>
</main><footer class="footer shell"><a class="brand" href="#top" aria-label="${esc(c.name+' '+c.nameSuffix)}">${brand}</a><small>${esc(c.footer)}</small><a class="back-top" href="#top" aria-label="Başa dön">${down}</a></footer></body></html>`;
await writeFile(new URL('./dist/index.html',import.meta.url),html);
await writeFile(new URL('./dist/site.js',import.meta.url),`const descriptions = ${JSON.stringify(Object.fromEntries(c.dishes.map(d=>[d.id,d.description])))};
const picker = document.querySelector('.picker');
picker.addEventListener('click', event => {
 const button = event.target.closest('button[data-dish]');
 if (!button) return;
 for (const option of picker.querySelectorAll('button')) option.setAttribute('aria-pressed', String(option === button));
 document.querySelector('.dish-view').dataset.active = button.dataset.dish;
 document.querySelector('.dish-description').textContent = descriptions[button.dataset.dish];
});
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.mobile-nav');
const closeNav = () => { nav.hidden=true; toggle.setAttribute('aria-expanded','false'); };
toggle.addEventListener('click',()=> { const open=toggle.getAttribute('aria-expanded')!=='true'; nav.hidden=!open; toggle.setAttribute('aria-expanded',String(open)); });
nav.addEventListener('click',event=>{if(event.target.closest('a'))closeNav();});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!nav.hidden){closeNav();toggle.focus();}});
matchMedia('(min-width:701px)').addEventListener('change',event=>{if(event.matches)closeNav();});
`);
await copyFile(new URL('./style.css',import.meta.url),new URL('./dist/style.css',import.meta.url));
await copyFile(new URL('./watermark.svg',import.meta.url),new URL('./dist/watermark.svg',import.meta.url));
await writeFile(new URL('./dist/favicon.svg',import.meta.url),'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="8" fill="#b7502c"/><text x="13" y="49" font-family="Arial,sans-serif" font-size="48" font-weight="900" fill="#efede7">B</text></svg>');
console.log('Built Bilice Kebap v2');
