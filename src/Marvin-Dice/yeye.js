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

    randomSolo = ("" + Math.floor(Math.random() * (7) + 1))

    numeroRandom += randomSolo


}

const myTimeout = setTimeout(aleatorioIndi, 3000);

function generarAleatorio() {
    numeroRandom = ""

    for (let index = 0; index < 7; index++) {


        aleatorioIndi();
        //console.log(randomSolo)

    }

    i = 0
    for (let index = 0; index < 7; index++) {

        setTimeout(mostrarCartas, 1000 * index);

    }

    numeroRandomFijo = numeroRandom;
    contador++;
}

generarAleatorio();

// numeroUsuario = numeroRandom

function pulsarBoton(valor) {

    //generarAleatorio();


    if (numerosPulsados == 7 - 1) {
        document.getElementById('btnComprobar').classList.remove('invisible')
        document.getElementById('btnComprobar').classList.add('visible')
    }


    if (numerosPulsados < 7) {

        numeroUsuario += "" + valor
        numerosPulsados++

    }

}

function comprobar() {

    if (numerosPulsados == 7) {

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

setTimeout(habilitarbotones, 7000)