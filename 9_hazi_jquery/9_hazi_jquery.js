function cimekKiirasa() {
    var h2Elements = $("h2");

    console.log('');
    console.log('A tömb hossza: ' + h2Elements.length);
    console.log('');
    for (var j = 0; j < h2Elements.length; j++) {
        console.log(h2Elements[j]);
    }
}

function szinParatlanra() {
    var pElements = $("p");

    for (var j = 0; j < pElements.length; j++) {
        if (j % 2 === 0) {
            if ($(pElements[j]).hasClass('szin')) {
                $(pElements[j]).removeClass('szin');
            } else {
                $(pElements[j]).addClass('szin');
            }
        }
    }
}

var dolt = false;
function doltParosra() {
    var pElements = $("p");

    for (var j = 0; j < pElements.length; j++) {
        if (j % 2 !== 0) {
            if (!dolt) {
                $(pElements[j]).css('font-style', 'italic');
            } else {
                $(pElements[j]).css('font-style', 'normal');
            }
        }
    } dolt = !dolt;
}

function vonalBeszuras() {
    $('p').each(function () {
        if ($(this).children('hr').length == 0) {
            $(this).append('<hr>');
        } else {
            $(this).children('hr').remove();
        }
    });
}

$('h2').click(function () {
    $(this).toggleClass('keret');
    $(this).toggleClass('h2-kinyitva');

    var innerElem = $(this).parent().children('.inner');

    if ($(this).hasClass('h2-kinyitva') && $(this).parent().hasClass('lecsukhatos')) {
        innerElem.slideUp();
    } else if (!$(this).hasClass('h2-kinyitva') && $(this).parent().hasClass('lecsukhatos')) {
        innerElem.slideDown();
    }
});