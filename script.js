const juegoCanvas = document.getElementById("juego");
const pantalla = juegoCanvas.getContext("2d");

const DIRECCIONES = {
    ARRIBA: 1,
    ABAJO: 2,
    IZQUIERDA: 3,
    DERECHA: 4
}

let direccion  = DIRECCIONES.DERECHA;
let cabezaPosX = 10, cabezaPosY=10;

let culebra = [
    { posX:10, posY:10 },
    { posX:20, posY:10 },
    { posX:30, posY:10 },
    { posX:40, posY:10 },
]



function dibujarCulebra() {
    for (let unidadDeCulebra of culebra) {
        pantalla.beginPath()
        pantalla.rect(unidadDeCulebra.posX, unidadDeCulebra.posY, 10, 10)
        pantalla.stroke()       
    }
}

function ajustarPosicion(){
    if(direccion === DIRECCIONES.DERECHA) cabezaPosX+=10;
    else if (direccion === DIRECCIONES.IZQUIERDA) cabezaPosX-=10;
    else if (direccion === DIRECCIONES.ABAJO) cabezaPosY+=10;
    else if (direccion === DIRECCIONES.ARRIBA) cabezaPosY-=10;
    else throw new Error("direccion tiene un valor inválido asignado");
}



document.addEventListener('keydown', (e) =>{
    if(e.code === "ArrowUp")    direccion = DIRECCIONES.ARRIBA;//direccion=1
    if(e.code === "ArrowDown")    direccion = DIRECCIONES.ABAJO;//direccion=2
    if(e.code === "ArrowLeft")    direccion = DIRECCIONES.IZQUIERDA;//direccion=3
    if(e.code === "ArrowRight")    direccion = DIRECCIONES.DERECHA;//direccion=4

    limpiarPantalla()
    ajustarPosicion()
    dibujarCulebra()
});

