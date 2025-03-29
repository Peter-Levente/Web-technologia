function parosValogato(arrayName) {
    var uresTomb = [];

    if (!Array.isArray(arrayName) || arrayName.length === 0 || typeof arrayName === undefined || arrayName.every(elem => typeof elem !== 'number')) {
        console.warn('Rossz a bemenet!');
        console.log(uresTomb);
        console.log('\n');
        return uresTomb;
    }

    console.log('A megadott parameter egy tömb!');
    var parosok = [];
    for (const elem of arrayName) {

        if (typeof elem === 'number' && elem % 2 === 0) {
            parosok.push(elem);
        }
    }

    console.log('Paros szamok: ' + parosok);
    console.log('\n');
    return parosok

}

// Tesztelés
parosValogato('alma');
parosValogato([1, 2, 3, 'korte']);
parosValogato(1, 2, 3, 'korte');
parosValogato(1, 2, [2, 3, 4, 5], function () { return 2; }, {}, 8, 10, 12);
parosValogato([]);
parosValogato([[], {}, function () { }]); 
