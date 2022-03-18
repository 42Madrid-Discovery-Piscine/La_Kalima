var respuesta;


function validacion(respuestaDada) {
    respuesta = document.getElementById("respuestaDada").value;
        if (respuesta != 18) {
            document.body.innerHTML= "";
            document.getElementById("css").outerHTML="";
            document.body.style.backgroundImage = "url('images/5.jpg')";
            document.body.style.backgroundRepeat= "no-repeat";
            document.body.style.backgroundSize= "cover";
            document.body.style.backgroundAttachment = "fixed";
            document.body.style.backgroundPosition = "center";
            setTimeout(final1, 3000);
                function final1() {
                    document.location.reload()
                }

        }

    else{
        //document.write("");
        document.body.innerHTML= "";
        document.getElementById("css").outerHTML="";
        document.body.style.backgroundImage = "url('images/6.jpg')";
        document.body.style.backgroundRepeat= "no-repeat";
        document.body.style.backgroundSize= "cover";
<<<<<<< HEAD:src/enigma/juego/Pregunta1/Script1.js
        setTimeout(() => {
			window.location.href = "https://www.google.es"
		}, 3000);
=======
        document.body.style.backgroundAttachment = "fixed";
        document.body.style.backgroundPosition = "center";
        setTimeout(final, 3000);
        function final() {
            window.location.href = "../Memorama/index.html"
        }
>>>>>>> 9c2166b7a1d2fa51f56a427ed915dc823c8e49e3:src-v2/Enigma/Script1.js
    }
}
