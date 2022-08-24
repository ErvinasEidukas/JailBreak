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

//Map level
let MapLevel = 1;

//Enemy size
const Enemy_numberOfRows = 8;
const Enemy_numberOfColumn = 16;

//Dinamik variables

let gameZone_width, gameZone_Height;

//Window size variables
if (true) {
    gameZone_width = window.innerWidth * 0.8;
    gameZone_Height = window.innerHeight * 0.8;
    gameZoneStyle.style.width = gameZone_width + "px";
    gameZoneStyle.style.height = gameZone_Height + "px";
}

//hood variables
hoodStyle.style.height = 5 / 64 * gameZone_Height + "px";
let score = 0;

//Ball variables
const StartingBallSpeed = gameZone_width * 0.00125;
let ballSpeed = StartingBallSpeed;
let ballSpeed_x = StartingBallSpeed;
let ballSpeed_y = StartingBallSpeed;
let ball_x, ball_y;
let ball_size;
let drag = 0;
let puwerUpCounter_forBall = 0;

//Platform variables
let platform_With = gameZone_width * 0.2;
let Platform_height = gameZone_Height * 0.03;
let platform_Speed = platform_With * 3 / 200;
let platform_x = gameZone_width / 2 - platform_With / 2;

//Timers
let RightButtonTimer;
let LeftButtonTimer;
let GameLoop;

// Enemy Box Size
let enemyBoxSize_x = gameZone_width * 0.8 / Enemy_numberOfColumn;
let enemyBoxSize_y = gameZone_Height * 0.3 / Enemy_numberOfRows;

//Ball Size selector
if (enemyBoxSize_x > enemyBoxSize_y) {
    ball_size = enemyBoxSize_y * 3 / 4;
}
else {
    ball_size = enemyBoxSize_x * 3 / 4;
}
ballStyle.style.width = ball_size + "px";
ballStyle.style.height = ball_size + "px";

// Touch Control
document.getElementById("RightButton").addEventListener("touchstart", RightButtonAction);
document.getElementById("RightButton").addEventListener("touchend", ButtonActionMouseUp);

document.getElementById("LeftButton").addEventListener("touchstart", LeftButtonAction);
document.getElementById("LeftButton").addEventListener("touchend", ButtonActionMouseUp);


//Key bord control KeyDown
document.addEventListener('keydown', function (e) {
    switch (e.keyCode) {
        case 37:
            // alert('left');
            LeftButtonAction();
            break;
        case 39:
            // alert('right');
            RightButtonAction()
            break;
    }
});

//Key bord control KeyUp
document.addEventListener('keyup', function (e) {
    switch (e.keyCode) {
        case 37:
            // alert('left');
            ButtonActionMouseUp();
            break;
        case 39:
            // alert('right');
            ButtonActionMouseUp();
            break;
    }
});

//Function for initiation
MapCreation();

//OK
//Event button holding
//Right Button
function WhileHoldingRight() {

    //Cheking for Right wall colision
    if (platform_x + platform_Speed > gameZone_width - platform_With) {
        platformStyle.style.left = gameZone_width - platform_With + "px";
        return;
    }

    //Platfor movment
    platform_x += platform_Speed;
    platformStyle.style.left = platform_x + "px";
}

function RightButtonAction() {
    //Reset Button click 
    ButtonActionMouseUp();

    //Check Ball speed
    if (ballSpeed_x == 0 && ballSpeed_y == 0) {
        ballSpeed = StartingBallSpeed;
        ballSpeed_x = ballSpeed;
        ballSpeed_y = -ballSpeed;
    }

    // Start moving platform
    RightButtonTimer = setInterval(WhileHoldingRight, 1);
}

//Left Button
function WhileHoldingLeft() {

    //Cheking for left wall colision
    if (platform_x - platform_Speed < 0) {
        platformStyle.style.left = "0px";
        return;
    }

    //Platfor movment
    platform_x -= platform_Speed;
    platformStyle.style.left = platform_x + "px";
}

function LeftButtonAction() {
    //Reset Button click 
    ButtonActionMouseUp();

    //Check Ball speed
    if (ballSpeed_x == 0 && ballSpeed_y == 0) {
        ballSpeed = StartingBallSpeed;
        ballSpeed_x = -ballSpeed;
        ballSpeed_y = -ballSpeed;
    }

    // Start moving platform
    LeftButtonTimer = setInterval(WhileHoldingLeft, 0);
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
            newBox.classList.add("Row_" + i);
            newBox.classList.add("Column_" + j);
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

        //pan.play();
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
    ballSpeed = 0;
    ballSpeed_x = ballSpeed;
    ballSpeed_y = ballSpeed;
    ball_x = platform_x + platform_With / 2 - ball_size / 2;
    ball_y = gameZone_Height - Platform_height - ball_size;
    ballStyle.style.top = ball_y + "px";
    ballStyle.style.left = ball_x + "px";
}

//OK
//Seting Enemy box position shift from left and top
function setEnemyMap() {
    enemyMap.style.position = "absolute"
    enemyMap.style.top = enemyBoxSize_y * 3 + "px";
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
            ResetAfterLiveLost();
            lives[0].classList.remove("heart-shape_red");
            //No lives left
            if (lives[0] == null) {
                clearInterval(GameLoop);
                document.getElementById("GameOver-menu").style.display = "flex";
                document.getElementById("GameOver-Score").innerHTML = "Your Score: " + score;
                MapLevel = 1;
                return;
            }
        }
    }
}

function BlockDestroySelector() {

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

            //ResetBallSizeCounter (power up)
            ResetBallSizeCounter();

            //put in a function
            //Block destroy selector

            // Regular Bloks (Grey)
            if (Boxes[i].classList.contains("Box-Type_gray")) {
                score += Math.floor(ballSpeed / StartingBallSpeed * 100);
                scoreStyle.innerHTML = "Score: " + score;
                Boxes[i].classList.remove("Box_show");
                BallSpeedIncrease();
            }

            // Double tuch bloks (Orange)
            else if (Boxes[i].classList.contains("Box-Type_orange")) // Orange_box
            {
                Boxes[i].classList.remove("Box-Type_orange");
                Boxes[i].classList.add("Box-Type_gray");
            }

            //Power Up box(Blue)
            else if (Boxes[i].classList.contains("Box-Type_blue")) // purple_box
            {
                Boxes[i].classList.remove("Box-Type_blue");
                let doubleBallSize = ball_size * 2;
                ballStyle.style.width = doubleBallSize + "px";
                ballStyle.style.height = doubleBallSize + "px";
                puwerUpCounter_forBall = 5;

                //change
                score += Math.floor(ballSpeed / StartingBallSpeed * 100);
                scoreStyle.innerHTML = "Score: " + score;
                Boxes[i].classList.remove("Box_show");
                BallSpeedIncrease();
            }

            // Explosion box (Red)
            else if (Boxes[i].classList.contains("Box-Type_red")) // red_Box
            {
                //Found element;
                let allRows = document.getElementsByClassName("Row");
                let BoxRow;
                let BoxColumn;

                //find row
                for (let row = 0; row < allRows.length; row++) {
                    if (Boxes[i].classList.contains("Row_" + row)) {
                        BoxRow = row;
                        break;
                    }
                }

                //find column
                let Collumn = document.getElementsByClassName("Row_" + BoxRow);
                for (let column = 0; column < Collumn.length; column++) {
                    if (Boxes[i].classList.contains("Column_" + column)) {
                        BoxColumn = column;
                        break;
                    }
                }

                //Find suraunding elements and Change to white_color
                for (let j = 0; j < Boxes.length; j++) {
                    //above explosion row
                    //current explosion row
                    //Below explosion row

                    if (Boxes[j].classList.contains("Row_" + (BoxRow - 1)) ||
                        (Boxes[j].classList.contains("Row_" + BoxRow)) ||
                        (Boxes[j].classList.contains("Row_" + (BoxRow + 1)))) {
                        if (Boxes[j].classList.contains("Column_" + (BoxColumn - 1)) ||
                            Boxes[j].classList.contains("Column_" + BoxColumn) ||
                            Boxes[j].classList.contains("Column_" + (BoxColumn + 1))) {

                            Boxes[j].classList.add("Box-Type_lightGrey");
                        }
                    }
                }
                //RemoveAllExlodedBoxes();
                const explosionTime = setTimeout(RemoveAllExlodedBoxes, 500);
            }



            //Game exit point
            if (Boxes[0] == null) {
                MapLevel();
                ResetLvl();
            }
            break;
        }
    }
}

//Removes all "Special" Types of box
function RemuveAllEnemyClasses(element) {
    element.classList.remove("Box_show");
    element.classList.remove("Box-Type_gray");
    element.classList.remove("Box-Type_orange");
    element.classList.remove("Box-Type_blue");
    element.classList.remove("Box-Type_red");
    element.classList.remove("Box-Type_lightGrey");
    element.classList.remove("Box-Type_lightGrey");
}

//Remuves all exploted boxes
function RemoveAllExlodedBoxes() {
    let allExplodedElements = document.getElementsByClassName("Box-Type_lightGrey");
    while (allExplodedElements[0] != null) {
        RemuveAllEnemyClasses(allExplodedElements[0]);
        // adding score
        score += Math.floor(ballSpeed / StartingBallSpeed * 100);
        scoreStyle.innerHTML = "Score: " + score;
    }
    //Game Exit point
    if (Boxes[0] == null) {
        MapLevel++;
        ResetLvl();
    }
}

// Live lose Reset (but still alive)
function ResetAfterLiveLost() {
    ButtonActionMouseUp();
    BallSpeedReset();
    BallStartingPosition();
    ResetBallSize();
}

//Ball Speed Increase
function BallSpeedIncrease() {
    ballSpeed += StartingBallSpeed / 100;
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

//Reset ball size after puwer up
function ResetBallSize() {
    ballStyle.style.width = ball_size + "px";
    ballStyle.style.height = ball_size + "px";
    puwerUpCounter_forBall = 0;
}

//Ball size power up Counter
function ResetBallSizeCounter() {
    //Ball size counter (power up counter)
    if (puwerUpCounter_forBall > 0) {
        puwerUpCounter_forBall--;
        if (puwerUpCounter_forBall <= 0) {
            //Reset ball size;
            ResetBallSize();
        }
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

//Reset level // and loud the next level
function ResetLvl() {
    ResetBallSize();
    ResetEnemyMap();
    setEnemyMap();
    BallSpeedReset();
    for (let i = 0; i < AllBoxes.length; i++) {
        RemuveAllEnemyClasses(AllBoxes[i]);
    }
    LouadMap();
    BallStartingPosition();
    setPlatformStartingPosition();
}

//Clear all Enemy boxes
function ClearAllEnemyBoxes() {
    while (Boxes[0] != null) {
        Boxes[0].classList.remove("Box_show");
    }
}

//Remove Row (gap)
function RemoveEnemyRow(row) {
    let tmp = document.getElementsByClassName("Row_" + row);

    for (let i = 0; i < tmp.length; i++) {
        tmp[i].classList.remove("Box_show");
    }
}

// ChangeEnemy type in the row
function ChangeEnemyTypeInTheRow(row, type) {
    let tmp = document.getElementsByClassName("Row_" + row);

    for (let i = 0; i < tmp.length; i++) {
        tmp[i].classList.add("Box_show");
        tmp[i].classList.add(type);
    }
}

// ChangeEnemy type in the column
function ChangeEnemyTypeInTheColumn(column, type) {
    let tmp = document.getElementsByClassName("Column_" + column);

    for (let i = 0; i < tmp.length; i++) {
        tmp[i].classList.add("Box_show");
        tmp[i].classList.add(type);
    }
}

//Not Working
function ChangeEnemyTypeInSquire(RowStart, RowEnd, ColumnStart, ColumnEnd, Type) {

    let ClassSelector = "Row_" + i + " " + "Column_" + j;
    let tmp = document.getElementsByClassName(ClassSelector);
    for (let i = RowStart; i < RowEnd; i++) //column
    {
        for (let j = ColumnStart; j < ColumnEnd; j++) //Row
        {
            ClassSelector = "Row_" + i + " " + "Column_" + j;
            tmp = document.getElementsByClassName(ClassSelector);
            tmp[0].classList.add("Box_show");
            tmp[0].classList.add(Type);
        }
    }

}

// LVL 1
function CreatLvl_1() {
    let AllRows = document.getElementsByClassName("Row")
    for (let i = 0; i < AllRows.length; i++) {
        let selector = i % 16;
        switch (selector) {
            case 0:
                {
                    ChangeEnemyTypeInTheRow(i, "Box-Type_red");
                    break;
                }
            case 1:
                {
                    ChangeEnemyTypeInTheRow(i, "Box-Type_red");
                    break;
                }
            case 2:
                {
                    RemoveEnemyRow(i);
                    break;
                }
            case 3:
                {
                    RemoveEnemyRow(i);
                    break;
                }
            default:
                {
                    RemoveEnemyRow(i);
                    break;
                }
        }
    }
}

// LVL 2
function CreatLvl_2() {
    let AllRows = document.getElementsByClassName("Row")
    for (let i = 0; i < AllRows.length; i++) {
        ChangeEnemyTypeInTheRow(i, "Box-Type_gray");
    }
}

//Map selector
function LouadMap() {
    switch (MapLevel) {
        case 1:
            {
                CreatLvl_1();
                break;
            }
        case 2:
            {
                CreatLvl_2();
                break;
            }
        default:
            {
                CreatLvl_1();
                break;
            }
    }
}

// Start Game Function (main function)
function StartGame() {
    //Starting configurations
    ResetLvl();
    ResetLives();
    ResetScore();

    //making invisable menu bar
    document.getElementById("GameOver-menu").style.display = "none";
    document.getElementById("GameStart-menu").style.display = "none";

    // Starting game loop
    GameLoop = setInterval(moveBall, 1);
}

