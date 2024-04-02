//Obtengo el lienzo
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

//Tamaño de cada segmento y velocidad
const segmentSize = 20;
const segmentSpeed = 70;

//Dimensiones del lienzo
canvas.width=canvas.clientWidth;
canvas.height=canvas.clientHeight;

//Inicializar la serpiente y el punto de comida
let snake=[{ x: 0, y: 0 }];
let food=[{ x: 0, y: 0}];

//Direccion inicial de la serpiente
let dx=segmentSize;
let dy=0;

//Iniciador del juego
let reset = false;

//Obtener el score
let puntaje = document.getElementById("score");
puntaje.innerHTML= 0;

//Generar aleatoriamente la comida
function generateFood(){
    food.x= Math.floor(Math.random() * (canvas.width / segmentSize)) * segmentSize;
    food.y= Math.floor(Math.random() * (canvas.height / segmentSize)) * segmentSize;
}

//Funcion reiniciar juego
function resetGame(){
    snake = [{ x: 0, y: 0}];
    dx = segmentSize;
    dy = 0;
    puntaje.innerHTML=0;
    generateFood();
    reset=false;
}

// Funcion para verificar si la serpiente ha chocado con el borde
function checkColision(){
    const head = snake[0];
    if (head.x < 0 ||
        head.x >= canvas.width || 
        head.y < 0 || 
        head.y >= canvas.height
        ){
        reset=true;
    }
}

//Funcion para verificar si la serpiente ha chocado consigo misma
function checkSelfColision(){
    const head = snake[0];
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
            reset=true;
            break
        }
    }
}

function update(){
    const head = {x:snake[0].x + dx, y:snake[0].y + dy};

    //verificar si la serpiente ha chocado con el borde
    checkColision();
    //Verificar si la serpiente ha chocado consigo misma
    checkSelfColision();
    //Resetear el juego si la serpiente ha chocado
    if (reset){
        resetGame();
        return;
    }

    snake.unshift(head);

    //Comprobar si la serpiente ha comido el punto de comida
    if (head.x===food.x && head.y===food.y) {
        //Genera un punto de comida y hace crecer la serpiente
        puntaje.innerHTML++;
        generateFood();
    }else{
        snake.pop();
    }
}

function draw(){
    //Limpiar el lienzo
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    //Dibujar la serpiente
    ctx.fillStyle = "green";
    snake.forEach((segment) =>{
        ctx.fillRect(segment.x,segment.y,segmentSize,segmentSize);
    });

    //Dibujar el punto de comida
    ctx.fillStyle = "red";
    ctx.fillRect(food.x,food.y,segmentSize,segmentSize);
}

document.addEventListener("keydown", (event) =>{
    if (event.key === "ArrowUp" && dy !== segmentSize){
        dx=0;
        dy= -segmentSize;
    }else if(event.key === "ArrowDown" && dy !== -segmentSize){
        dx=0;
        dy=segmentSize;
    }else if(event.key === "ArrowLeft" && dx !== segmentSize){
        dx=-segmentSize;
        dy=0;
    }else if(event.key === "ArrowRight" && dx !== -segmentSize){
        dx=segmentSize;
        dy=0;
    } 
});

//Funcion de bucle del juego
function gameLoop(){
    update();
    draw();
    setTimeout(gameLoop,segmentSpeed);
}

//Genera el primer punto de comida
generateFood();
//Iniciar el bucle del juego
gameLoop();


