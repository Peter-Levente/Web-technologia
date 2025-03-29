const rangeInput = document.getElementById('ertek');
const csuszkaErtek = document.getElementById('csuszka-ertek');
const emoji = document.getElementById('emoji');


// Az érték megjelenítése az alapértelmezett értékkel
updateEmoji();

// Az érték frissítése, amikor a csúszkát mozgatjuk
rangeInput.addEventListener('input', function () {
    updateEmoji();
});

function updateEmoji() {
    const emojiCount = parseInt(rangeInput.value); // Az aktuális érték számjegyeinek száma lesz az emoji-k száma
    const emojis = '🍺'.repeat(emojiCount); // Egy emoji ismétlődése az aktuális érték alapján
    csuszkaErtek.textContent = rangeInput.value; // szam a csuszka alatt 
    emoji.textContent = emojis; // Az emoji-k megjelenítése a szam alatt

}