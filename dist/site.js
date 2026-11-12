const descriptions = {"kebap":"Izgaradan çıkan kebap, tepsinin ortasında.","meze":"Küçük meze tabakları, tepsinin çevresinde.","lavas":"İnce lavaş, kebabın hemen yanında."};
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
