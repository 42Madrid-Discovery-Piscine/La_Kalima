let numeroRandom = ""
let numeroUsuario = ""
let boolean = false
let numerosPulsados = 0;
let numeroRandomFijo = ""
let contador = 0;
let fallado = true
let randomSolo = ""
let randomMuestra = ""
let i = 0

function mostrarCartas() {
            
        randomMuestra = String(numeroRandomFijo).charAt(i)
            console.log(randomMuestra)
            i++
}


function aleatorioIndi() {

    randomSolo = ("" + Math.floor(Math.random() * (9) + 1))

    numeroRandom += randomSolo
    

}

        const myTimeout = setTimeout(aleatorioIndi, 5000);




function generarAleatorio() {
    numeroRandom = ""



    for (let index = 0; index < 9; index++) {


        aleatorioIndi();
        //console.log(randomSolo)

    }
    if (contador == 0) {
 i = 0
        for (let index = 0; index < 9; index++) {
            
            setTimeout(mostrarCartas, 4000*index);
                   

        }

        numeroRandomFijo = numeroRandom;
        contador++;
    }
    console.log(numeroRandomFijo)
}

// numeroUsuario = numeroRandom
function pulsarBoton(valor) {

    generarAleatorio();


    if (numerosPulsados == 8) {
        document.getElementById('btnComprobar').classList.remove('invisible')
    }


    if (numerosPulsados < 9) {

        numeroUsuario += "" + valor
        numerosPulsados++

        console.log(numeroUsuario)
        console.log(numerosPulsados);



    }

}


function comprobar() {

    if (numerosPulsados == 9) {





        if (numeroUsuario == numeroRandomFijo) {
            alert("NIVEL SUPERADO")
            boolean = true

        } else {
            alert("Mal, Prueba otra vez ")
            numeroUsuario = ""
            numerosPulsados = 0;
        }

    } else {

        alert("Aún no has copletado el tablero")

    }



}


