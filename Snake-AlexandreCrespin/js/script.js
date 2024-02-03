const canvas = document.querySelector("#canvas"); //recupere le canvas
const context = canvas.getContext('2d'); //permet de ouvoir displayr sur le canvas
const unitSize = 50; //division du canvas en cases de 50px
const startSnake = [        //position et arrangement du snake au debut du jeu
    {x:unitSize * 2,y:0},   //tete
    {x:unitSize,y:0},
    {x:0,y:0}
];
let snake = startSnake; //variable de snake permettant de stocké la longueur et les positions des cases du snake
let running = false;    //variable de fonctionnement du jeu
let xVel = unitSize;    //velocite sur l'axe x
let yVel = 0;   //velocite sur l'axe y
let appleX; //position x de la pomme
let appleY; //position y de la pomme
let score = 0;  //score

window.addEventListener("keydown",changeDirection); //verification de l'appuis d'une touche

setupGame();    //lancementdu jeu

//------------------------fonctions de boucle de jeu---------------------------------

/**
 * function setupGame()
 * permet de mettre en place le jeu au niveaux graphique
 */
function setupGame() {
    displayScore(score);
    game();
}

/**
 * function game()
 * permet de faire le lancement du jeu
 */
function game() {
    running = true;
    createApple();
    nextTick();
}

/**
 * function nextTick()
 * fonction de bouclage sur chaque tick du jeu
 * on utilise un setTimeout avec la boucle de jeu à l'intérieur
 * la valeur du setTimeout peut etre change selon l'envie de vitesse du jeu
 * dans le boucle de jeu, l'ordre des appels de fonction a été donné pour limité l'apparition de bug
 */
function nextTick() {
    if (running) {
        setTimeout(()=>{
            clear();
            displayScore(score);
            moveSnake();
            isGameOver();
            displaySnake();
            displayApple();
            nextTick();
        }, 200);
    }
    else{
        displayGameOver();
    }
}

//------------------------fonctions de logique du jeu---------------------------------

/**
 * function createApple()
 * permet de creer une pomme dans une position random
 * on verifie aussi si la pomme que l'on creer n'est pas dans le snake
 */
function createApple() {
    appleX = randomApple(0,canvas.width - unitSize);
    appleY = randomApple(0, canvas.height - unitSize);
}

/**
 * function isValidSpace()
 * @returns bool
 * 
 * permet de verifier si l'espace de creation de la pomme n'est pas sur le snake
 */
function isValidSpace(appleX,appleY) {
    let imageData = context.getImageData(appleX + unitSize/2,appleY + unitSize/2,1,1);
    if (imageData.data[0] == 255) {
        return false;
    }
    return true;
}

/**
 * function randomApple()
 * @param {int} min 
 * @param {int} max 
 * @returns int
 * 
 * permet de donne une coordonne random qui soit dans tout les cas coherent avec notre unitSize
 */
function randomApple(min,max) {
    const randNum = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
    return randNum;
}

/**
 * function moveSnake()
 * permet de faire le deplacement du snake selon sa direction
 * creer d'abord une case en tete du snake
 * verifie si la tete touche une pomme
 * si oui on garde la tete ce qui fait grandir le snake
 * sinon on supprime la derniere case du snake
 */
function moveSnake() {
    const head = {
        x: snake[0].x + xVel,
        y: snake[0].y + yVel
    }
    snake.unshift(head);
    if (snake[0].x == appleX && snake[0].y == appleY) {
        score+=1
        createApple();
    }
    else{
        snake.pop();
    }
}

/**
 * function changeDirection()
 * @param {event} event
 * 
 * permet de changer la direction du snake selon la touche du clavier presse
 */
function changeDirection(event) {
    const keyPressed = event.keyCode;
    const LEFT = 37;                    //fleche de gauche
    const RIGHT = 39;                   //fleche de droite
    const UP = 38;                      //fleche du haut
    const DOWN = 40;                    //fleche du bas

    switch (true) {
        case (keyPressed == LEFT):
            xVel = -unitSize;
            yVel = 0;
            break;
        case (keyPressed == RIGHT):
            xVel = unitSize;
            yVel = 0;
            break;
        case (keyPressed == UP):
            xVel = 0;
            yVel = -unitSize;
            break;
        case (keyPressed == DOWN):
            xVel = 0;
            yVel = unitSize;
            break;
    }
}

/**
 * function isGameOver()
 * permet de verifier si le jeu est fini ou pas selon les differentes possibilite
 * si le jeu doit s'arreter alors on met running a false
 */
function isGameOver() {
    switch (true) {
        case (snake[0].x < 0):
            running = false
            break;
        case (snake[0].x >= canvas.width):
            running = false
            break;
        case (snake[0].y < 0):
            running = false
            break;
        case (snake[0].y >= canvas.height):
            running = false
            break;
    }
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
            running = false;
        }
    }
}

//------------------------fonctions de dessin sur le canvas---------------------------------

/**
 * function clear()
 * permet de clear le canvas
 */
function clear() {
    context.clearRect(0,0,canvas.width,canvas.height);
}

/**
 * function displayScore()
 * @param {int} score 
 * 
 * permet d'afficher le score dans le fond du canvas
 */
function displayScore(score) {
    context.font="400px MV Boli";
    context.fillStyle="gray";
    context.fillText(score,canvas.width/2 - unitSize*3,canvas.height/2 + unitSize*3);
}

/**
 * function displayApple()
 * permet d'afficher la pomme sur le canvas
 */
function displayApple() {
    if (!isValidSpace(appleX,appleY)) {
        createApple();
    }
    context.fillStyle = "green";
    context.beginPath();
    context.arc(appleX + unitSize/2,appleY + unitSize/2,unitSize/2.2,0,2*Math.PI,false);
    context.fill();
}

/**
 * function displaySnake()
 * permet d'afficher le snake sur le canvas
 * si running == true on le dessine normalement
 * sinon on avait un bug avec le snake qui rentrait dans la bordure de 1 case
 * donc si running == false on creer une nouvelle case en queue
 */
function displaySnake() {
    context.fillStyle = "red";
    if (running) {
        snake.forEach(snakePart =>{
            context.fillRect(snakePart.x,snakePart.y,unitSize,unitSize)
        });
    }
    else{
        const tail = {
            x: snake[snake.length-1].x - xVel,
            y: snake[snake.length-1].y - yVel
        }
        snake.unshift(tail);
        snake.forEach(snakePart =>{
            context.fillRect(snakePart.x,snakePart.y,unitSize,unitSize)
        });
    }
}

/**
 * fuction displayGameOver()
 * permet d'afficher le game over quand le jeu est fini
 */
function displayGameOver() {
    context.font = "100px MV Boli";
    context.fillStyle = "gray";
    context.textAligne = "center";
    context.fillText("GAME OVER",unitSize*3,unitSize*2);
    running = false;
}

/**
 * function displayVictiry()
 * permet d'afficher la victoire du joueur
 */
function displayVictory() {
    context.font = "100px MV Boli";
    context.fillStyle = "gray";
    context.textAligne = "center";
    context.fillText("VICTORY",unitSize*3,unitSize*2);
    running = false;
}