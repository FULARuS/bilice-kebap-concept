const descriptions = {"kebap":"Izgaradan çıkan kebap, tepsinin ortasında.","meze":"Küçük meze tabakları, tepsinin çevresinde.","lavas":"İnce lavaş, kebabın hemen yanında."};
const picker = document.querySelector('.picker');
picker.addEventListener('click', event => {
 const button = event.target.closest('button[data-dish]');
 if (!button) return;
 for (const option of picker.querySelectorAll('button')) option.setAttribute('aria-pressed', String(option === button));
 document.querySelector('.dish-view').dataset.active = button.dataset.dish;
 document.querySelector('.dish-description').textContent = descriptions[button.dataset.dish];
});
