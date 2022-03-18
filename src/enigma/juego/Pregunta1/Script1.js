var respuesta;


function validacion(respuestaDada) {
    respuesta = document.getElementById("respuestaDada").value;
        if (respuesta != 18) {
            document.body.innerHTML= "";
            document.getElementById("css").outerHTML="";
            document.body.style.backgroundImage = "url('images/5.jpg')";
            document.body.style.backgroundRepeat= "no-repeat";
            document.body.style.backgroundSize= "cover";
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
        setTimeout(() => {
			window.location.href = "https://www.google.es"
		}, 3000);
    }
}