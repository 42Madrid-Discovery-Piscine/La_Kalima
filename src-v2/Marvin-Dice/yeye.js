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
var botonComprobar

function mostrarCartas() {

    randomMuestra = String(numeroRandomFijo).charAt(i)
    console.log(randomMuestra)

    function coloritos() {
        //alert(randomMuestra)
        document.getElementById(randomMuestra).style.color = "red";
    }

    function coloritosre() {
        //alert(randomMuestra)
        document.getElementById(randomMuestra).style.color = "black";
    }
    setTimeout(coloritos, 100)
    setTimeout(coloritosre, 750)

    i++
}

function aleatorioIndi() {

    randomSolo = ("" + Math.floor(Math.random() * (9) + 1))

    numeroRandom += randomSolo


}

const myTimeout = setTimeout(aleatorioIndi, 3000);

function generarAleatorio() {
    numeroRandom = ""



    for (let index = 0; index < 9; index++) {


        aleatorioIndi();
        //console.log(randomSolo)

    }

    i = 0
    for (let index = 0; index < 9; index++) {

        setTimeout(mostrarCartas, 1000 * index);


    }

    numeroRandomFijo = numeroRandom;
    contador++;



    console.log(numeroRandomFijo)
}

generarAleatorio();

// numeroUsuario = numeroRandom

function pulsarBoton(valor) {

    //generarAleatorio();


    if (numerosPulsados == 8) {
        document.getElementById('btnComprobar').classList.remove('invisible')
        document.getElementById('btnComprobar').classList.add('visible')
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
            //alert("NIVEL SUPERADO")
            window.location.href = "./preview.html"
            boolean = true
        } else {
            
            window.location.href = "Perder.html"
            numeroUsuario = ""

            numerosPulsados = 0;
            //document.getElementById('btnComprobar').classList.add('invisible');

            generarAleatorio()

        }

    } else {

        alert("Aún no has copletado el tablero")

    }



}

function deshabilitarbotones() {
    document.getElementById("1").disabled = true;
    document.getElementById("2").disabled = true;
    document.getElementById("3").disabled = true;
    document.getElementById("4").disabled = true;
    document.getElementById("5").disabled = true;
    document.getElementById("6").disabled = true;
    document.getElementById("7").disabled = true;
    document.getElementById("8").disabled = true;
    document.getElementById("9").disabled = true;
}

function habilitarbotones() {
    document.getElementById("1").disabled = false;
    document.getElementById("2").disabled = false;
    document.getElementById("3").disabled = false;
    document.getElementById("4").disabled = false;
    document.getElementById("5").disabled = false;
    document.getElementById("6").disabled = false;
    document.getElementById("7").disabled = false;
    document.getElementById("8").disabled = false;
    document.getElementById("9").disabled = false;
}

deshabilitarbotones()

setTimeout(habilitarbotones, 9000)