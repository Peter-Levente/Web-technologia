function FormEllenorzes() {
    var nevMezo = document.getElementById('diakneve');
    var futballSzeretetChecked = document.querySelector('input[name="foci-szeretet"]:checked');
    var klubokSzama = document.getElementById("klubok-szama");
    var jatekosFelismeres = document.querySelectorAll('.valasz:checked').length === 5; // Összesen 5 játékos van

    if (nevMezo.value.length < 4) {
        nevMezo.style.border = '2px solid red';
        alert('Kérem adja meg a nevét az első kérdésnél!');
        return false;
    } else if (!futballSzeretetChecked) {
        alert('Kerem jeloljon be egy valaszt a "Futball szeretet" resznel!')
        return false;
    } else if (klubokSzama.value == 0) {
        alert('Kerem irjon be egy szamot vagy allitsa be az Onnek megfelelo szamot a leptetonyil segitsegevel "Klubok (foci csapatok) követése" resznel!')
        return false;
    } else if (!jatekosFelismeres) {
        alert('Kerem, hogy minden kep alatt jeloljon be EGY valaszt a "Magyarok válogatott játékosok felismerése" resznel!')
        return false;
    }
    return true;
}

