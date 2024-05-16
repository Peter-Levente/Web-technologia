$('#kosar-ikon').click(function () {
  $('#kosar').fadeToggle(1000); // Animált megjelenítés vagy elrejtés lassú áttűnéssel
});

var termekek = []
// JSON fájl betöltése a jQuery $.getJSON() függvény segítségével
$.getJSON("termekek.json", function (data) {
  termekek = data
}).fail(function () {
  console.error("Nem sikerült betölteni a JSON fájlt!");
});

$('.melegito').click(function () {
  var kattintott_kep = $(this).children('div').children('img').attr('src');
  var uj_kep;

  for (var i = 0; i < termekek.length; i++) {
    if (kattintott_kep === termekek[i].kep) {
      uj_kep = termekek[i].kep;
      break;
    }
  }


  $('#termek').html('<img src="' + uj_kep + '" alt="">');
});
