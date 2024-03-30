const juegoCanvas = document.getElementById("juego");
const pantalla = juegoCanvas.getContext("2d");

// let posicionInicialX=10,  posicionInicialY=10;
let direccion;

const DIRECCIONES = {
    ARRIBA: 1,
    ABAJO: 2,
    IZQUIERDA: 3,
    DERECHA: 4
}

let culebra = [
    { posX:10, posY:10 },
    { posX:20, posY:10 },
    { posX:30, posY:10 },
    { posX:40, posY:10 },
]



function dibujarCulebra(){
    for (let cuerpoCulebra of culebra) {
        pantalla.beginPath();
        pantalla.rect(cuerpoCulebra.posX,cuerpoCulebra.posY,10,10);
        pantalla.stroke();
    }
}


function limpiarPantalla(){
    pantalla.clearRect(0,0,juegoCanvas.width,juegoCanvas.height);
}

function ajustarPosicion(){
    if(direccion === DIRECCIONES.IZQUIERDA){
        for (let i = 1; i < culebra.length-1; i++) {
            culebra[culebra.length-i].posX=culebra[culebra.length-(i+1)].posX;
            // culebra[culebra.length-i].posY=culebra[culebra.length-(i+1)].posY;
        }
        culebra[3].posX-=10;
    }else if(direccion===DIRECCIONES.DERECHA){
        for (cuerpoCulebra of culebra){
            cuerpoCulebra.posX+=10;
        }

    }else if(direccion===DIRECCIONES.ABAJO){
        for (let i = 1; i < culebra.length-1; i++) {
            culebra[culebra.length-i/*3*/].posY=culebra[culebra.length-(i+1)].posY;
            culebra[culebra.length-i].posX=culebra[culebra.length-(i+1)].posX;
            // culebra[culebra.length-i].posY=culebra[culebra.length-(i+1)].posY;
        }
        culebra[3].posY+=10;
    }else if(direccion===DIRECCIONES.ARRIBA){
        for (let cuerpoCulebra of culebra) {
            cuerpoCulebra.posY-=10;
        }
    }
}


document.addEventListener('keydown',function(event) {
    if (event.key == 'ArrowLeft') {
        direccion=DIRECCIONES.IZQUIERDA;
    }else if (event.key == 'ArrowRight') {
        direccion=DIRECCIONES.DERECHA;
    }else if (event.key == 'ArrowUp') {
        direccion=DIRECCIONES.ARRIBA;
    }else if (event.key == 'ArrowDown') {
        direccion=DIRECCIONES.ABAJO;
    }

    limpiarPantalla();
    ajustarPosicion();
    dibujarCulebra();
})