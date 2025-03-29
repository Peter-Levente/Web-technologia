// Globális változó a kiválasztott méret tárolására
var selectedSize = null;

// Méretgombok kattintáskezelői
$('.meret-gomb').click(function () {
    // Kijelölési osztály eltávolítása az összes gombtól
    $('.meret-gomb').removeClass('active');
    // Az aktuálisan kattintott gombhoz hozzáadása a kijelölési osztály
    $(this).addClass('active');
    // Kiválasztott méret mentése a globális változóba
    selectedSize = $(this).attr('data-meret');
});


$('#kosar-ikon').click(function () {
    $('#kosar').fadeToggle(); // Animált megjelenítés vagy elrejtés lassú áttűnéssel
});


var termekek = [];

// JSON fájl betöltése a jQuery függvény segítségével
$.getJSON("termekek.json", function (data) {
    termekek = data;

    termekLetrehozas();

    $('#addKosarGomb').click(function () {
        addToKosar();
    });

}).fail(function () {
    console.error("Nem sikerült betölteni a JSON fájlt!");
});


function termekLetrehozas() {
    // Az URL-ből kiolvassuk string-et
    const linkString = window.location.search;

    const urlParams = new URLSearchParams(linkString);

    // A következő sor kinyeri az értéket, tehát az "1"-et
    const termekId = urlParams.get('termek_id');

    var uj_termek, nev, ar;
    for (var index = 0; index < termekek.length; index++) {
        if (termekek[index].id === parseInt(termekId)) {
            uj_termek = termekek[index].kep;
            nev = termekek[index].nev;
            ar = termekek[index].ar;
            break; // Stop the loop when the product is found
        }
    }

    // Ellenőrizzük, hogy megtaláltuk-e a terméket
    if (uj_termek && nev && ar) {
        // Az elemek megjelenítése
        $('#termek-item').html('<img class="termek_kepe" src="' + uj_termek + '" alt="">');
        $('#adatok').html('<h1 class="termek_neve">' + nev + '</h1>');
        $('#adatok').append('<span class="termek_ara">' + ar + ' lei</span>');
    } else {
        console.error("Nem található a termék az adott ID-vel.");
    }
}


function addToKosar() {
    // Az URL-ből kiolvassuk string-et
    const linkString = window.location.search;
    const urlParams = new URLSearchParams(linkString);
    const termekId = urlParams.get('termek_id');

    var uj_termek, nev, ar, meret;
    for (var index = 0; index < termekek.length; index++) {
        if (termekek[index].id === parseInt(termekId)) {
            uj_termek = termekek[index].kep;
            nev = termekek[index].nev;
            ar = termekek[index].ar;
            meret = termekek[index].meret;
            break;
        }
    }

    // Ellenőrizzük, hogy van-e kiválasztva méret
    if (!meret && !selectedSize) {
        alert('Kérlek válassz méretet!');
        return;
    }

    // Ha van méret attribútum, azt használjuk, különben a kiválasztott méretet például labdáknál van alapbol méret
    const kivalasztottMeret = meret ? meret : selectedSize;

    // Adatok JSON formátumba alakítása
    var ujTermekAdatok = {
        kep: uj_termek,
        nev: nev,
        ar: ar,
        meret: kivalasztottMeret
    };

    // Kosár adatok betöltése a localStorage-ból
    // Ha az érték nem létezik (például, ha ez az első alkalom, hogy az oldalt meglátogatták), vagy nem érvényes JSON, akkor egy üres listát ([]) fog visszaadni.
    var kosarAdatok = JSON.parse(localStorage.getItem('kosarAdatok')) || [];

    // Új termék hozzáadása a kosárhoz
    kosarAdatok.push(ujTermekAdatok);

    // Frissített kosár adatok mentése a localStorage-ba
    localStorage.setItem('kosarAdatok', JSON.stringify(kosarAdatok));

    // Kosár megjelenítése
    megjelenitKosar();
}


function megjelenitKosar() {
    var kosarDiv = $('#kosar');
    kosarDiv.empty(); // Kosár tartalmának törlése

    // Kosár adatok betöltése a localStorage-ból
    var kosarAdatok = JSON.parse(localStorage.getItem('kosarAdatok')) || [];
    var osszkoltseg = 0; // Összköltség inicializálása

    // Kosár bezárása gomb hozzáadása
    var kosarBezaras = $('<button class="kosarBezarasGomb">X</button>');

    var kosar_cim = $('<h2 class="kosar-cime">Kosaram</h2>');
    kosarDiv.append(kosar_cim);

    // Kosár bezárásának funkciója
    kosarBezaras.click(function () {
        kosarDiv.fadeOut(); // Animált elrejtés lassú áttűnéssel
    });

    // Kosár bezárás gomb hozzáadása a kosárhoz
    kosarDiv.append(kosarBezaras);

    // Minden termék hozzáadása a kosárhoz
    kosarAdatok.forEach(function (termek, index) {
        // Container div létrehozása a kép és az adatok számára
        var termekContainer = $('<div class="termekContainer"></div>');

        // Kép elem hozzáadása
        var kepDiv = $('<div class="kepDiv"></div>');
        kepDiv.append('<img class="termek_kepe" src="' + termek.kep + '" alt="">');
        termekContainer.append(kepDiv);

        // Adatok elem hozzáadása
        var adatokDiv = $('<div class="adatokDiv"></div>');
        adatokDiv.append('<span class="termek_neve">' + termek.nev + '</span>');
        adatokDiv.append('<span class="termekara"> Ár: ' + termek.ar + ' lei</span>');
        adatokDiv.append('<span class="termek_meret"> Méret: ' + termek.meret + '</span>');

        // Darabszám beolvasása
        var darabInput = $('.darab'); // Az összes darabszám input mező
        var darab = parseInt(darabInput.val()); // Beolvasott darabszám átalakítása számmá

        // Ha a beolvasott érték nem szám, vagy kisebb, mint 1, akkor az alapértelmezett érték lesz 1
        if (isNaN(darab) || darab < 1) {
            darab = 1;
        }

        // Összköltség számítása
        var koltseg = termek.ar * darab; // Termék összköltsége
        osszkoltseg += koltseg; // Összköltség frissítése

        // Darabszám megjelenítése és hozzáadása az összköltséghez
        adatokDiv.append('<span class="termek_darab"> Darab: ' + darab + '</span>');
        adatokDiv.append('<span class="termek_koltseg"> Összesen: ' + koltseg + ' lei</span>');

        // Törlés gomb hozzáadása
        var torlesGomb = $('<button class="torlesGomb">Törlés a kosárból</button>');
        torlesGomb.click(function () {
            torolKosarbol(index);
        });
        adatokDiv.append(torlesGomb);

        // Adatok és kép hozzáadása a containerhez
        termekContainer.append(adatokDiv);

        // Container hozzáadása a kosárhoz
        kosarDiv.append(termekContainer);
    });

    // Összköltség megjelenítése
    var osszkoltsegDiv = $('<div class="osszkoltsegDiv"></div>');
    osszkoltsegDiv.append('<h3 class="osszkoltseg">Fizetendő: ' + osszkoltseg.toFixed(2) + ' lei</h3>');
    kosarDiv.append(osszkoltsegDiv);

    // Fizetési gomb hozzáadása
    var fizetendoGomb = $('<a href="Rendeles.html" class="rendelesgomb">Rendelés végrehajtása</a>');

    kosarDiv.append(fizetendoGomb); // fizetendoGomb hozzáadása a kosárhoz
}


function torolKosarbol(index) {
    // Kosár adatok betöltése a localStorage-ból
    var kosarAdatok = JSON.parse(localStorage.getItem('kosarAdatok')) || [];

    // Adott indexű elem eltávolítása
    kosarAdatok.splice(index, 1);

    // Frissített kosár adatok mentése a localStorage-ba
    localStorage.setItem('kosarAdatok', JSON.stringify(kosarAdatok));

    // Kosár újra megjelenítése
    megjelenitKosar();
}

// Kosár megjelenítése az oldal betöltésekor
$(document).ready(function () {
    megjelenitKosar();
});


$('#mobil-menu-ikon').click(function () {
    var mobilMenu = $('#mobil-menu');
    if (mobilMenu.children().length === 0) {
        mobilMenu.html('<div class="mobil-menu">' +
            '<a href="Melegitok.html">Klubok ruházatai</a>' +
            '<a href="Mezek.html">Klubok mezei</a>' +
            '<a href="Cipok.html" class="szelesebb_link">Focicipők</a>' +
            '<a href="Labdak.html">Futball labdák</a>' +
            '</div>');
    }
    mobilMenu.fadeToggle();
})


document.getElementById('submitGomb').addEventListener('click', function (event) {
    // Az alapértelmezett esemény megakadályozása
    event.preventDefault();
    // A FormEllenorzes függvény meghívása
    FormEllenorzes();
});


function FormEllenorzes() {
    var nevMezo = document.getElementById('nev');
    var email = document.getElementById('email').value.trim();
    var telefonszam = document.getElementById('telefonszam').value.trim();
    var megyeElem = document.getElementById('megye');
    var telepulesInput = document.getElementById("telepules");
    var iranyitoszamInput = document.getElementById("iranyitoszam");
    var lakcimInput = document.getElementById("lakcim");
    var fizetesInput = document.getElementById("fizetes");

    var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    var valid = true;

    if (nevMezo.value.trim().length < 4) {
        nevMezo.style.border = '2px solid red';
        alert('Kérem adja meg a nevét az első kérésnél!');
        valid = false;
    } else {
        nevMezo.style.border = '';
    }

    if (!emailRegex.test(email)) {
        document.getElementById('email').style.border = '2px solid red';
        alert("Kérjük, adjon meg egy érvényes e-mail címet!");
        valid = false;
    } else {
        document.getElementById('email').style.border = '';
    }

    if (telefonszam.length !== 10 || isNaN(telefonszam)) {
        document.getElementById('telefonszam').style.border = '2px solid red';
        alert('Kérem adja meg helyesen a telefonszámát!');
        valid = false;
    } else {
        document.getElementById('telefonszam').style.border = '';
    }

    if (megyeElem.value.length === 0) {
        megyeElem.style.border = '2px solid red';
        alert("Kérem válasszon megyét!");
        valid = false;
    } else {
        megyeElem.style.border = '';
    }

    if (telepulesInput.value.trim().length < 4) {
        telepulesInput.style.border = '2px solid red';
        alert("Kérem adja meg a települést!");
        valid = false;
    } else {
        telepulesInput.style.border = '';
    }

    if (iranyitoszamInput.value.trim().length !== 6 || isNaN(iranyitoszamInput.value.trim())) {
        iranyitoszamInput.style.border = '2px solid red';
        alert("Az irányítószámnak 6 karakterből kell állnia! Adja meg az irányítószámot!");
        valid = false;
    } else {
        iranyitoszamInput.style.border = '';
    }

    if (lakcimInput.value.trim().length < 10) {
        lakcimInput.style.border = '2px solid red';
        alert("Kérem adja meg a lakcímet helyesen!");
        valid = false;
    } else {
        lakcimInput.style.border = '';
    }

    if (fizetesInput.value.trim() === "") {
        fizetesInput.style.border = '2px solid red';
        alert("Kérem válasszon fizetési módot!");
        valid = false;
    } else {
        fizetesInput.style.border = '';
    }

    if (valid) {

        alert("Köszönjük a vásárlást!\n\n" +
            "Örömmel értesítjük, hogy rendelését sikeresen rögzítettük. " +
            "Hamarosan feldolgozzuk, és értesítést küldünk Önnek a szállítás várható időpontjáról.\n\n" +
            "Amennyiben bármilyen kérdése van, kérjük, ne habozzon felvenni velünk a kapcsolatot. " +
            "Szívesen állunk rendelkezésére minden további információval.\n\n" +
            "Köszönjük, hogy minket választott! Reméljük, hamarosan újra látjuk Önt.");

        // Kosár elemek törlése a localStorage-ból
        localStorage.removeItem('kosarAdatok');
        window.location.href = "index.html"
        // Visszatérés false értékkel, hogy ne küldje el az űrlapot
        return false;
    }
}