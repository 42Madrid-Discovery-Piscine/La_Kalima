
// reiniciarjuego()
const MAXIMOS_INTENTOS = 8, // Intentos máximos que tiene el jugador
    COLUMNAS = 4, // Columnas del memorama
    SEGUNDOS_ESPERA_VOLTEAR_IMAGEN = 1, // Por cuántos segundos mostrar ambas imágenes
    NOMBRE_IMAGEN_OCULTA = "./img/reverso.png"; // La imagen que se muestra cuando la real está oculta
new Vue({
    el: "#app",
    data: () => ({
        
        imagenes: [
            "./img/morado.png",
            "./img/verde.png",
            "./img/rojo.png",
            "./img/morado.png",
            "./img/verde.png",
            "./img/rojo.png",
           
            
        ],
        memorama: [],
        // Útiles para saber cuál fue la carta anteriormente seleccionada
        ultimasCoordenadas: {
            indiceFila: null,
            indiceImagen: null,
        },
        NOMBRE_IMAGEN_OCULTA: NOMBRE_IMAGEN_OCULTA,
        MAXIMOS_INTENTOS: MAXIMOS_INTENTOS,
        intentos: 0,
        aciertos: 0,
        esperandoTimeout: false,
    }),
    methods: {
        mostrarCreditos() {
            Swal.fire({
                title: "Manual de usuario",
                html: `
                
                <p>
                -La dinamica del juego consiste en encontrar todas las parejas pichando en cada carta.
                <br>
                -Si al pinchar en las cartas no son iguales,se da la vuelta hasta que sean iguales
                <br>
                -Al encontrar una pareja,esta se queda dada la vuelta.
                <br>
                -Tienes un maximo de 8 intentos,si superas los 8 intentos,pierdes la partida.

                </p>
                
                `,
                confirmButtonText: "Cerrar",
                allowOutsideClick: false,
                allowEscapeKey: false,
            });
        },
        // Método que muestra la alerta indicando que el jugador ha perdido; después
        // de mostrarla, se reinicia el juego
        indicarFracaso() {
            // Swal.fire({
            //         title: "Perdiste",
            //         html: `
            //     <img class="img-fluid" src="./img/perdiste.png" alt="Perdiste">
            //     <p class="h4">Agotaste tus intentos</p>`,
            //         confirmButtonText: "Jugar de nuevo",
            //         allowOutsideClick: false,
            //         allowEscapeKey: false,
            //     })
            //    .then(this.reiniciarJuego)
            this.reiniciarJuego();
            window.location.href = "Perder.html"
        },
        // Mostrar alerta de victoria y reiniciar juego
        indicarVictoria() {
            // alert("Has ganado");
            window.location.href = "./preview.html"

        },
        // Método que indica si el jugador ha ganado
        haGanado() {
            return this.memorama.every(arreglo => arreglo.every(imagen => imagen.acertada));
        },
        // Ayudante para mezclar un arreglo
        mezclarArreglo(a) {
            var j, x, i;
            for (i = a.length - 1; i > 0; i--) {
                j = Math.floor(Math.random() * (i + 1));
                x = a[i];
                a[i] = a[j];
                a[j] = x;
            }
            return a;
        },
        // Aumenta un intento y verifica si el jugador ha perdido
        aumentarIntento() {
            this.intentos++;
            if (this.intentos >= MAXIMOS_INTENTOS) {
                this.indicarFracaso();
            }
        },
        // Se desencadena cuando se hace click en la imagen
        voltear(indiceFila, indiceImagen) {
            // Si se está regresando una imagen a su estado original, detener flujo
            if (this.esperandoTimeout) {
                return;
            }
            // Si es una imagen acertada, no nos importa que la intenten voltear
            if (this.memorama[indiceFila][indiceImagen].acertada) {
                return;
            }
            // Si es la primera vez que la selecciona
            if (this.ultimasCoordenadas.indiceFila === null && this.ultimasCoordenadas.indiceImagen === null) {
                this.memorama[indiceFila][indiceImagen].mostrar = true;
                this.ultimasCoordenadas.indiceFila = indiceFila;
                this.ultimasCoordenadas.indiceImagen = indiceImagen;
                return;
            }
            // Si es el que estaba mostrada, lo ocultamos de nuevo
            let imagenSeleccionada = this.memorama[indiceFila][indiceImagen];
            let ultimaImagenSeleccionada = this.memorama[this.ultimasCoordenadas.indiceFila][this.ultimasCoordenadas.indiceImagen];
            if (indiceFila === this.ultimasCoordenadas.indiceFila &&
                indiceImagen === this.ultimasCoordenadas.indiceImagen) {
                this.memorama[indiceFila][indiceImagen].mostrar = false;
                this.ultimasCoordenadas.indiceFila = null;
                this.ultimasCoordenadas.indiceImagen = null;
                this.aumentarIntento();
                return;
            }

            // En caso de que la haya encontrado, ¡acierta!
            // Se basta en ultimaImagenSeleccionada
            this.memorama[indiceFila][indiceImagen].mostrar = true;
            if (imagenSeleccionada.ruta === ultimaImagenSeleccionada.ruta) {
                this.aciertos++;
                this.memorama[indiceFila][indiceImagen].acertada = true;
                this.memorama[this.ultimasCoordenadas.indiceFila][this.ultimasCoordenadas.indiceImagen].acertada = true;
                this.ultimasCoordenadas.indiceFila = null;
                this.ultimasCoordenadas.indiceImagen = null;
                // Cada que acierta comprobamos si ha ganado
                if (this.haGanado()) {
                    this.indicarVictoria();
                }
            } else {
                // Si no acierta, entonces giramos ambas imágenes

                this.esperandoTimeout = true;
                setTimeout(() => {
                    this.memorama[indiceFila][indiceImagen].mostrar = false;
                    this.memorama[indiceFila][indiceImagen].animacion = false;
                    this.memorama[this.ultimasCoordenadas.indiceFila][this.ultimasCoordenadas.indiceImagen].mostrar = false;
                    this.ultimasCoordenadas.indiceFila = null;
                    this.ultimasCoordenadas.indiceImagen = null;
                    this.esperandoTimeout = false;
                }, SEGUNDOS_ESPERA_VOLTEAR_IMAGEN * 1000);
                this.aumentarIntento();
                //window.location.href = "Perder.html"
            }
        },
        reiniciarJuego() {
             let memorama = [];
             this.imagenes.forEach((imagen, indice) => {
                 let imagenDeMemorama = {
                     ruta: imagen,
                     mostrar: false, // No se muestra la original
                     acertada: false, // No es acertada al inicio
                 };
            //     // Poner dos veces la misma imagen
                memorama.push(imagenDeMemorama, Object.assign({}, imagenDeMemorama));
             });

            // // Sacudir o mover arreglo; es decir, hacerlo aleatorio
             this.mezclarArreglo(memorama);

             // Dividirlo en subarreglos o columnas
             let memoramaDividido = [];
            for (let i = 0; i < memorama.length; i += COLUMNAS) {
                memoramaDividido.push(memorama.slice(i, i + COLUMNAS));
             }
            // // Reiniciar intentos
            this.intentos = 0;
            this.aciertos = 0;
            // // Asignar a instancia de Vue para que lo dibuje
             this.memorama = memoramaDividido;
            // window.location.href = "Perder.html"
        },
        // Método que precarga las imágenes para que las mismas ya estén cargadas
        // cuando el usuario gire la tarjeta
        precargarImagenes() {
            // Mostrar la alerta
            Swal.fire({
                    title: "Cargando",
                    html: `Cargando imágenes...`,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                })
                .then(this.reiniciarJuego)
                // Ponerla en modo carga
            Swal.showLoading();


            let total = this.imagenes.length,
                contador = 0;
            let imagenesPrecarga = Array.from(this.imagenes);
            // También vamos a precargar la "espalda" de la tarjeta
            imagenesPrecarga.push(NOMBRE_IMAGEN_OCULTA);
            // Cargamos cada imagen y en el evento load aumentamos el contador
            imagenesPrecarga.forEach(ruta => {
                const imagen = document.createElement("img");
                imagen.src = ruta;
                imagen.addEventListener("load", () => {
                    contador++;
                    if (contador >= total) {
                        // Si el contador >= total entonces se ha terminado la carga de todas
                        this.reiniciarJuego();
                        Swal.close();
                    }
                });
                // Agregamos la imagen y la removemos instantáneamente, así no se muestra
                // pero sí se carga
                document.body.appendChild(imagen);
                document.body.removeChild(imagen);
            });
        },
    },
    mounted() {
        this.precargarImagenes();
    },
});