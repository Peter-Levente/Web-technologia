function searchHotel(adat) {
  $('.celelem').empty();
  console.log("Szervertől kapott adat: ");

  for (var i = 0; i < adat.length; i++) {
    var hotel = adat[i];
    console.log(hotel)

    var hotelElem = '<div class="hotel">' +
      '<h3>' + hotel.name + '</h3>' +
      '<img src="https://students.csik.sapientia.ro/~student/webtech/' + hotel.thumb + '"/>' + "<br>" +
      '<span>Csillagok szama: ' + hotel.stars + '<span/>' + "<br>" +
      '<span>Ar: ' + hotel.price + '<span/>' + "<br>" +
      '<span>Ertekeles: ' + hotel.rating + '<span/>' + "<br>" +
      '<span>Megtekintesek szama: ' + hotel.nr_rewviews + '<span/>' + "<br>" +
      '</div>'

    $('.celelem').append(hotelElem);
  }
}

$.ajax({
  method: "GET",
  url: "https://students.csik.sapientia.ro/~student/webtech/hotelapi.php"
})

  .done(searchHotel);


function adatListaz() {
  var parameterek = {}

  var name = $("#name").val()
  var minstars = $("#minstars").val()
  var maxstars = $("#maxstars").val()
  var minrating = $("#minrating").val()
  var maxrating = $("#maxrating").val()
  var minprice = $("#minprice").val()
  var maxprice = $("#maxprice").val()

  if (name) parameterek.name = name;
  if (minstars) parameterek.minstars = minstars;
  if (maxstars) parameterek.maxstars = maxstars;
  if (minrating) parameterek.minrating = minrating;
  if (maxrating) parameterek.maxrating = maxrating;
  if (minprice) parameterek.minprice = minprice;
  if (maxprice) parameterek.maxprice = maxprice;

  $.ajax({
    method: "POST",
    url: "https://students.csik.sapientia.ro/~student/webtech/hotelapi.php",
    data: parameterek
  })

    .done(searchHotel);

}



/*$.ajax({
  method: "POST",
  url: "https://students.csik.sapientia.ro/~student/webtech/hotelapi.php",
  data: { name: "Hotel", maxstars: 3 }
})

.done(function (adat) {
  console.log("Szervertol kapott adat: ");
  console.log(adat)
});*/

