$(document).ready(function () {
    function szoSzamolo() {
        var szokoz = 0;

        var paragrafus = $('p.info').text()

        for (var i = 0; i < paragrafus.length; i++) {
            if (paragrafus[i] === " ") {
                szokoz++;
            }
        }
        $('#eredmeny').val(szokoz);
    }

    szoSzamolo();

    $('.anim input[type="button"]').click(function () {
        $('.box').animate({ left: '700px' }, 3000, function () {
            $('.box').animate({ left: '10px' }, 1000);
        })
    })
});