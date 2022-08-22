//Constant variables

const hoodStyle = document.getElementById("hood");
const livesStyle = document.getElementsByClassName("heart-shape");
const lives = document.getElementsByClassName("heart-shape_red");
const scoreStyle = document.getElementById("score");
const ballStyle = document.getElementById("Ball");
const platformStyle = document.getElementById("Platform");
const gameZoneStyle = document.getElementById("GameZone");
const enemyMap = document.getElementById("EnemyMap");
const Boxes = document.getElementsByClassName("Box_show");
const AllBoxes = document.getElementsByClassName("Box");
const RightButton = document.getElementById("RightButton");
ballStyle.style.backgroundColor = "blue";

const Enemy_numberOfRows = 5;
const Enemy_numberOfColumn = 12;

//Dinamik variables

let gameZone_width, gameZone_Height;

//Window size variables
if (true) {
    gameZone_width = window.innerWidth * 0.8;
    gameZone_Height = window.innerHeight * 0.92;
    gameZoneStyle.style.width = gameZone_width + "px";
    gameZoneStyle.style.height = gameZone_Height + "px";
}

//hood variables
hoodStyle.style.height = 1 / 16 * gameZone_Height + "px";
let score = 0;

//Ball variables
const StartingBallSpeed = gameZone_width * 0.00125;
let ballSpeed = StartingBallSpeed;
let ballSpeed_x = StartingBallSpeed;
let ballSpeed_y = StartingBallSpeed;
let ball_x, ball_y;
let ball_size;

//Platform variables
let platform_With = gameZone_width * 0.2;
let Platform_height = gameZone_Height * 0.03;
let platform_Speed = platform_With * 3 / 200;
let platform_x = gameZone_width / 2 - platform_With / 2;

//Timers
let RightButtonTimer;
let LeftButtonTimer;
let GameLoop;


let enemyBoxSize_x = gameZone_width * 0.9 / Enemy_numberOfColumn;
let enemyBoxSize_y = gameZone_Height * 0.3 / Enemy_numberOfRows;
ball_size = enemyBoxSize_y * 0.5;
ballStyle.style.width = ball_size + "px";
ballStyle.style.height = ball_size + "px";

// Touch variables
document.getElementById("RightButton").addEventListener("touchstart", RightButtonAction);
document.getElementById("RightButton").addEventListener("touchend", ButtonActionMouseUp);

document.getElementById("LeftButton").addEventListener("touchstart", LeftButtonAction);
document.getElementById("LeftButton").addEventListener("touchend", ButtonActionMouseUp);

//Function for initiation
MapCreation();

//OK
//Event button holding
//Right Button
function WhyleHoldingRight() {

    if (platform_x + platform_Speed > gameZone_width - platform_With) {
        platformStyle.style.left = gameZone_width - platform_With + "px";
        return;
    }

    platform_x += platform_Speed;
    platformStyle.style.left = platform_x + "px";
}

function RightButtonAction() {
    ButtonActionMouseUp()
    RightButtonTimer = setInterval(WhyleHoldingRight, 1);
}

//Left Button
function WhyleHoldingLeft() {

    if (platform_x - platform_Speed < 0) {
        platformStyle.style.left = "0px";
        return;
    }

    platform_x -= platform_Speed;
    platformStyle.style.left = platform_x + "px";
}

function LeftButtonAction() {
    ButtonActionMouseUp()
    LeftButtonTimer = setInterval(WhyleHoldingLeft, 1);
}

//Bouth buttons
function ButtonActionMouseUp() {
    clearInterval(RightButtonTimer);
    clearInterval(LeftButtonTimer);
}
//Button Events End

//OK
//Platform Starting position
function setPlatformStartingPosition() {
    platform_x = gameZone_width / 2 - platform_With / 2;
    platformStyle.style.width = platform_With + "px";
    platformStyle.style.height = Platform_height + "px";
    platformStyle.style.left = platform_x + "px";
    platformStyle.style.bottom = 0 + "px";
}

//OK
// Window close function For browser
function WindowClose() {
    window.close();
}

//OK
//Map - Enemy block creation
function MapCreation() {
    for (let i = 0; i < Enemy_numberOfRows; i++) {
        let newRow = document.createElement("div");
        newRow.classList.add("Row");
        enemyMap.appendChild(newRow);

        for (let j = 0; j < Enemy_numberOfColumn; j++) {
            let newBox = document.createElement("div");
            newBox.classList.add("Box");
            newBox.classList.add("Box_show");
            newBox.style.width = enemyBoxSize_x + "px";
            newBox.style.height = enemyBoxSize_y + "px";
            newRow.appendChild(newBox);
        }
    }
}

//OK
//Box creation
function CreatNewBox(element) {
    let newBox = document.createElement("div");
    newBox.classList.add("Box");
    newBox.classList.add("Box_show");
    element.appendChild(newBox);
}

//OK
//Chek colision
//Black magick part (core of the game)
function checkColision(element) {
    let elementPosition = element.getBoundingClientRect();
    let ballPosition = ballStyle.getBoundingClientRect();

    // Colision rules
    if (elementPosition.bottom >= ballPosition.top &&
        elementPosition.top <= ballPosition.bottom &&
        elementPosition.right >= ballPosition.left &&
        elementPosition.left <= ballPosition.right) {


        ballStyle.style.backgroundColor = "red";

        //Fals from the left_top
        if (ballSpeed_x > 0 && ballSpeed_y > 0) {
            if (ballPosition.right < elementPosition.left + ballSpeed_y) {
                ballSpeed_x *= -1;
            }
            else {
                ballSpeed_y *= -1;

            }
        }
        //Fals from the right_top
        else if (ballSpeed_x < 0 && ballSpeed_y > 0) {
            if (ballPosition.left > elementPosition.right - ballSpeed_y) {
                ballSpeed_x *= -1;
            }
            else {
                ballSpeed_y *= -1;

            }
        }
        //Fals from the right_bottom
        else if (ballSpeed_x > 0 && ballSpeed_y < 0) {
            if (ballPosition.right < elementPosition.left - ballSpeed_y) {
                ballSpeed_x *= -1;
            }
            else {
                ballSpeed_y *= -1;

            }
        }
        //Fals from the right_top
        else if (ballSpeed_x < 0 && ballSpeed_y < 0) {
            if (ballPosition.left > elementPosition.right + ballSpeed_y) {
                ballSpeed_x *= -1;
            }
            else {
                ballSpeed_y *= -1;

            }
        }
        return true;
    }
    else {
        // ballStyle.style.backgroundColor = "green";
    }
}

//OK
//Platform Colision
function checkPlatformColision() {
    let elementPosition = platformStyle.getBoundingClientRect();
    let ballPosition = ballStyle.getBoundingClientRect();

    // Colision rules
    if (elementPosition.bottom >= ballPosition.top &&
        elementPosition.top <= ballPosition.bottom &&
        elementPosition.right >= ballPosition.left &&
        elementPosition.left <= ballPosition.right) {


        ballStyle.style.backgroundColor = "blue";

        //Fals from the left_top
        if (ballSpeed_x > 0 && ballSpeed_y > 0) {
            if (ballPosition.right < elementPosition.left + ballSpeed_y) {
                ballSpeed_x *= -1;
            }
            else {
                ballSpeed_y *= -1;

            }
        }
        //Fals from the right_top
        else if (ballSpeed_x < 0 && ballSpeed_y > 0) {
            if (ballPosition.left > elementPosition.right - ballSpeed_y) {
                ballSpeed_x *= -1;
            }
            else {
                ballSpeed_y *= -1;

            }
        }
        return true;
    }
    else {
        return false;
    }
}

//OK
//Ball Starting position
function BallStartingPosition() {
    ballSpeed_x = ballSpeed;
    ballSpeed_y = ballSpeed;
    ball_x = platform_x + platform_With / 2 - ball_size / 2;
    ball_y = gameZone_Height - Platform_height - ball_size;
    ballStyle.style.top = ball_y + "px";
    ballStyle.style.left = ball_x + "px";
}

//OK
//Seting Enemy box position in the midle and with shift
function setEnemyMap() {
    enemyMap.style.position = "absolute"
    enemyMap.style.top = ball_size * 3 + "px";
    enemyMap.style.left = (gameZone_width / 2 - (enemyBoxSize_x * (Enemy_numberOfColumn / 2.0))) + "px";
}

//OK
//Wall Colision
function WallColision() {
    //right Wall || left wall
    if (ball_x >= gameZone_width - ball_size || ball_x <= 0) {
        if (ball_x >= gameZone_width - ball_size) {
            ball_x = gameZone_width - ball_size;
        }
        else {
            ball_x = 0
        }
        ballSpeed_x *= -1;
    }

    //top wall
    if (ball_y < 0) {
        ball_y = 0;
        ballSpeed_y *= -1;
    }

    //bottom wall
    if (ball_y + ball_size >= gameZone_Height) {
        //Do you have some lives?
        if (lives[0] != null) {
            BallSpeedReset();
            BallStartingPosition();
            lives[0].classList.remove("heart-shape_red")
            //No
            if (lives[0] == null) {
                clearInterval(GameLoop);
                document.getElementById("GameOver-menu").style.display = "flex";
                document.getElementById("GameOver-Score").innerHTML = "Your Score: " + score;
                return;
            }
        }
    }
}

//OK
//Ball movement
function moveBall() {

    //Ball movement
    ball_x += ballSpeed_x;
    ball_y += ballSpeed_y;
    ballStyle.style.left = ball_x + "px";
    ballStyle.style.top = ball_y + "px";

    //Platform Colision check
    if (checkPlatformColision()) {
        return;
    }

    // Wall colision Check
    WallColision();

    //Enemy Colision check
    for (let i = 0; i < Boxes.length; i++) {
        let found = checkColision(Boxes[i]);
        if (found) {
            Boxes[i].classList.remove("Box_show");
            score += Math.floor(ballSpeed / StartingBallSpeed * 100);
            scoreStyle.innerHTML = "Score: " + score;
            BallSpeedIncrease()
            break;
        }
    }
}

//Ball Speed Increase
function BallSpeedIncrease() {
    ballSpeed += StartingBallSpeed / 60;
    if (ballSpeed_x > 0) {
        ballSpeed_x = ballSpeed;
    }
    else {
        ballSpeed_x = -ballSpeed;
    }

    if (ballSpeed_y > 0) {
        ballSpeed_y = ballSpeed;
    }
    else {
        ballSpeed_y = -ballSpeed;
    }
}

// Reset all Enemys To "Box_show"
function ResetEnemyMap() {
    for (let i = 0; i < AllBoxes.length; i++) {
        AllBoxes[i].classList.add("Box_show");
    }
}

// Reset all Lives/hearts To "heart-shape_red"
function ResetLives() {
    for (let i = 0; i < livesStyle.length; i++) {
        livesStyle[i].classList.add("heart-shape_red");
    }
}

// Reset ball Speed
function BallSpeedReset() {
    ballSpeed = StartingBallSpeed;
}

// Reset Score
function ResetScore() {
    score = 0;
    scoreStyle.innerHTML = "Score: " + 0;
}

// Start Game Function (main function)
function StartGame() {
    //Starting configurations
    ResetEnemyMap();
    setPlatformStartingPosition();
    BallStartingPosition();
    setEnemyMap();
    ResetLives();
    BallSpeedReset();
    ResetScore();

    document.getElementById("GameOver-menu").style.display = "none";
    document.getElementById("GameStart-menu").style.display = "none";
    GameLoop = setInterval(moveBall, 1);
}

