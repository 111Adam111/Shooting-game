// HTML elements
var gameWindowEl = document.getElementsByClassName('game-window')[0];
var startScreenEl = document.getElementsByClassName('start-screen')[0];
var endScreenEL = document.getElementsByClassName('end-screen')[0];
var menuEl = document.getElementsByClassName('menu')[0];
var timerEl = document.getElementById('timer');
var scoreEl = document.getElementById('score');
var statsSCoreEL = document.getElementById('stats-score');
var targetsShotEL = document.getElementById('targets-shot');
var shotsPerSecondEL = document.getElementById('shots-per-second');
var avgScorePerTargetEl = document.getElementById('avg-score-per-target');
// game settings
var targetAmount = 5;
var totalScore = 0;
var gameDuration = 30;
var countDown = gameDuration;
var shots = 0;
var isRunning = false;
var canRestart = false;
var maxPointsPerShot = 100;
// Click to start
startScreenEl.addEventListener('click', function () {
    start();
    startScreenEl.classList.add('hide');
});
// starts game and spawns entry targets
function start() {
    if (!isRunning) {
        isRunning = true;
        for (var i = 0; i < targetAmount; i++) {
            spawnTarget();
        }
        countDown = gameDuration;
    }
}
// Counts time left and ends the game
var gameEnder = setInterval(function () {
    if (isRunning && countDown > 0) {
        countDown -= 0.1; // 100 milliseconds or 0.1 second
        timerEl.innerHTML
            = "Time: ".concat(Math.abs(Math.round(countDown * 10) / 10).toFixed(1));
    }
    if (countDown <= 0) {
        isRunning = false;
        gameWindowEl.innerHTML = '';
        endScreenEL.classList.remove('hide');
        totalScore = 0;
        shots = 0;
        canRestartTimer();
    }
}, 100); // 100 milliseconds or 0.1 second
// spawns target at random location within game window
function spawnTarget() {
    var element = document.createElement('div');
    element.classList.add('target');
    element.innerHTML = "<img src=\"public/target.png\" alt=\"\">";
    var randomPosition = function (max) { return Math.random() * max; };
    var windowWidth = gameWindowEl.clientWidth;
    var windowHeight = gameWindowEl.clientHeight;
    var elementSize = windowHeight / 5; // 19vh
    var navbarHeight = windowHeight / 19; // 5vh
    var targetX = randomPosition(windowWidth - elementSize);
    var targetY = randomPosition(windowHeight - elementSize) + navbarHeight;
    element.style.left = "".concat(targetX, "px");
    element.style.top = "".concat(targetY, "px");
    element.addEventListener('mousedown', function (click) {
        shot({ click: click, element: element, targetX: targetX, targetY: targetY, elementSize: elementSize });
    });
    gameWindowEl.appendChild(element);
}
//  target click and score per shot calculation
function shot(_a) {
    var click = _a.click, element = _a.element, targetX = _a.targetX, targetY = _a.targetY, elementSize = _a.elementSize;
    // calculation
    var radius = elementSize / 2;
    var targetCenterX = targetX + radius;
    var targetCenterY = targetY + radius;
    var distance = Math.sqrt(Math.pow((click.x - targetCenterX), 2)
        + Math.pow((click.y - targetCenterY), 2));
    var score = maxPointsPerShot - Math.floor(distance * maxPointsPerShot / radius);
    // action - updates score, removes target, spawns new target
    // and shows score for shot
    if (score > 0) {
        scoreUpdate(score);
        gameWindowEl.removeChild(element);
        isRunning && spawnTarget();
        hitValuePop(score, click);
    }
}
// pop up containing score for every shot
var hitValuePop = function (value, click) {
    var element = document.createElement('p');
    element.classList.add('slide-out-top');
    var pointsThreshold = 90;
    var msg = value;
    if (value >= pointsThreshold && value !== maxPointsPerShot) {
        msg = value + '!';
    }
    else if (value == maxPointsPerShot) {
        msg = 'Perfect Shot!';
    }
    element.innerHTML = "".concat(msg);
    element.style.left = "".concat(value == maxPointsPerShot ? click.x - 50 : click.x - 10, "px");
    element.style.top = "".concat(click.y - 40, "px");
    gameWindowEl.appendChild(element);
    // pop up dispaears after 0.4 secounds
    var popupTime = 400;
    setTimeout(function () {
        gameWindowEl.hasChildNodes() && gameWindowEl.removeChild(element);
    }, popupTime);
};
// real time score update
var scoreUpdate = function (score) {
    totalScore += score;
    scoreEl.innerHTML = "Score: ".concat(totalScore);
    stats(totalScore);
};
// end screen stats
var stats = function (totalScore) {
    shots += 1;
    var shotsPS = shots / gameDuration;
    var avg = totalScore / shots;
    statsSCoreEL.innerHTML = "Score: ".concat(totalScore);
    targetsShotEL.innerHTML = "Targets shot: ".concat(shots);
    shotsPerSecondEL.innerHTML =
        "Shots per second ".concat(shotsPS.toFixed(2));
    avgScorePerTargetEl.innerHTML =
        "Avg score per target: ".concat(avg.toFixed(2));
};
// Click to restart
endScreenEL.addEventListener('click', function () {
    if (canRestart) {
        start();
        scoreEl.innerHTML = 'Score';
        endScreenEL.classList.add('hide');
        canRestartTimer();
    }
});
// 1 sec restart delayer to prevent unwanted early restart
function canRestartTimer() {
    var resetTime = 1000; // milliseconds
    setTimeout(function () {
        canRestart = !canRestart;
    }, resetTime);
}
