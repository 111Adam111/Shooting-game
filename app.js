// HTML elements
const gameWindow = document.getElementsByClassName('game-window')[0]
const startScreen = document.getElementsByClassName('start-screen')[0]
const endScreen = document.getElementsByClassName('end-screen')[0]
const menu = document.getElementsByClassName('menu')[0]


// game settings
let targetAmount = 5;
let totalScore = 0;
const gameDuration = 30;
let countDown = gameDuration;
let shots = 0;
let isRunning = false;
let canRestart = false;
const maxPointsPerShot = 100;


// Click to start
startScreen.addEventListener('click', () => {
    start()
    startScreen.classList.add('hide')   
})


// starts game and spawns entry targets
function start() {
    if (!isRunning) {
        isRunning = true;
        for (let i = 0; i < targetAmount; i++){
            spawnTarget()
        }
        countDown = gameDuration;
    }
}


// Counts time left and ends the game
const gameEnder = setInterval(() => {
    if (isRunning && countDown > 0) {
        countDown -= 0.1; // 100 milliseconds or 0.1 second
        document.getElementById('timer').innerHTML 
            = `Time: ${Math.abs(Math.round(countDown * 10) / 10).toFixed(1)}`;    
    }
    if (countDown <= 0) {
        isRunning = false
        gameWindow.innerHTML = ''
        endScreen.classList.remove('hide')
        totalScore = 0
        shots = 0
        canRestartTimer()
    }
}, 100); // 100 milliseconds or 0.1 second


// spawns target at random location within game window
function spawnTarget() {
    const element = document.createElement('div')
    element.classList.add('target')
    element.innerHTML = `<img src="target.png" alt="">`
    const randomPosition = (max) => Math.random() * max
    const windowWidth = gameWindow.clientWidth
    const windowHeight = gameWindow.clientHeight
    const elementSize = windowHeight / 5 // 19vh
    const navbarHeight = windowHeight / 19 // 5vh
    const targetX = randomPosition(windowWidth - elementSize)
    const targetY = randomPosition(windowHeight - elementSize) + navbarHeight
    element.style.left = `${targetX}px`
    element.style.top = `${targetY}px`
    element.addEventListener('mousedown', (click) => {
        shot(click, element, targetX, targetY, elementSize)   
    })   
    gameWindow.appendChild(element) 
}


//  target click and score per shot calculation
function shot(click, element, targetX, targetY, elementSize) {
    // calculation
    const radius = elementSize / 2
    const targetCenterX = targetX + radius;
    const targetCenterY = targetY + radius;
    const distance = Math.sqrt((click.x - targetCenterX)**2 
                            + (click.y - targetCenterY)**2);
    let score = maxPointsPerShot - Math.floor(distance * maxPointsPerShot / radius)
    // action - updates score, removes target, spawns new target
    // and shows score for shot
    if (score > 0) {
        scoreUpdate(score)
        gameWindow.removeChild(element)
        isRunning && spawnTarget()
        hitValuePop(score, click)

    }
}


// pop up containing score for every shot
let hitValuePop = (value, click) => {
    const element = document.createElement('p')
    element.classList.add('slide-out-top')
    const pointsThreshold = 90;
    let msg = value  
    if (value >= pointsThreshold && value !== maxPointsPerShot) {
        msg = value + '!'
    }
    else if (value == maxPointsPerShot) {
        msg = 'Perfect Shot!'
    }
    element.innerHTML = `${msg}`
    element.style.left = `${value == maxPointsPerShot ? click.x - 50 : click.x -10}px`
    element.style.top = `${click.y -40}px`
    gameWindow.appendChild(element)

    // pop up dispaears after 0.4 secounds
    const popupTime = 400;
    setTimeout(() => {
        gameWindow.hasChildNodes() && gameWindow.removeChild(element)
    }, popupTime)
}


// real time score update
let scoreUpdate = (score) => {
    totalScore += score
    document.getElementById('score').innerHTML = `Score: ${totalScore}`
    stats(totalScore)
}   


// end screen stats
let stats = (totalScore) => {
    shots += 1
    let shotsPS = shots / gameDuration
    let avg = totalScore / shots
    document.getElementById('stats-score').innerHTML = `Score: ${totalScore}`
    document.getElementById('targets-shot').innerHTML = `Targets shot: ${shots}`
    document.getElementById('shots-per-second').innerHTML = 
        `Shots per second ${shotsPS.toFixed(2)}`
    document.getElementById('avg-score-per-target').innerHTML = 
        `Avg score per target: ${avg.toFixed(2)}`
}  


// Click to restart
endScreen.addEventListener('click', () => {
    if (canRestart) {
        start()
        document.getElementById('score').innerHTML = 'Score'
        endScreen.classList.add('hide')
        canRestartTimer()      
    }
})


// 1 sec restart delayer to prevent unwanted early restart
function canRestartTimer() {
    const resetTime = 1000; // milliseconds
    setTimeout(() => {
        canRestart = !canRestart;
      }, resetTime);
}
