// HTML elements
const gameWindowEl = <HTMLElement>document.getElementsByClassName('game-window')[0]
const startScreenEl = <HTMLElement>document.getElementsByClassName('start-screen')[0]
const endScreenEL = <HTMLElement>document.getElementsByClassName('end-screen')[0]
const menuEl = <HTMLElement>document.getElementsByClassName('menu')[0]
const timerEl = <HTMLElement>document.getElementById('timer')
const scoreEl = <HTMLElement>document.getElementById('score')
const statsSCoreEL = <HTMLElement>document.getElementById('stats-score')
const targetsShotEL = <HTMLElement>document.getElementById('targets-shot')
const shotsPerSecondEL = <HTMLElement>document.getElementById('shots-per-second')
const avgScorePerTargetEl = <HTMLElement>document.getElementById('avg-score-per-target')


// game settings
let targetAmount: number = 5;
let totalScore: number = 0;
const gameDuration: number = 30;
let countDown: number = gameDuration;
let shots: number = 0;
let isRunning: boolean = false;
let canRestart: boolean = false;
const maxPointsPerShot: number = 100;



// Click to start
startScreenEl.addEventListener('click', () => {
    start()
    startScreenEl.classList.add('hide')   
})


// starts game and spawns entry targets
function start(): void {
    if (!isRunning) {
        isRunning = true;
        for (let i = 0; i < targetAmount; i++){
            spawnTarget()
        }
        countDown = gameDuration;
    }
}


// Counts time left and ends the game
const gameEnder = setInterval((): void => {
    if (isRunning && countDown > 0) {
        countDown -= 0.1; // 100 milliseconds
        timerEl.innerHTML 
        = `Time: ${Math.abs(Math.round(countDown * 10) / 10).toFixed(1)}`;    
    }
    if (countDown <= 0) {
        isRunning = false
        gameWindowEl.innerHTML = ''
        endScreenEL.classList.remove('hide')
        totalScore = 0
        shots = 0
        canRestartTimer()
    }
}, 100); // 100 milliseconds


// spawns target at random location within game window
function spawnTarget(): void {
    const element: HTMLElement = document.createElement('div')
    element.classList.add('target')
    element.innerHTML = `<img src="public/target.png" alt="">`
    const randomPosition = (max: number): number => Math.random() * max
    const windowWidth = gameWindowEl.clientWidth
    const windowHeight = gameWindowEl.clientHeight
    const elementSize = (windowHeight + windowWidth) / 10
    const navbarHeight = windowHeight / 19 // 5vh
    const targetX = randomPosition(windowWidth - elementSize)
    const targetY = randomPosition(windowHeight - elementSize) + navbarHeight
    element.style.width = `${elementSize}px`
    element.style.height = `${elementSize}px`
    element.style.left = `${targetX}px`
    element.style.top = `${targetY}px`
    element.addEventListener('mousedown', (click: MouseEvent) => {
        shot({click, element, targetX, targetY, elementSize})
    })   
    gameWindowEl.appendChild(element) 
}

interface Shot {
    click: MouseEvent,
    element: HTMLElement,
    targetX: number,
    targetY: number,
    elementSize: number
}

//  target click and score per shot calculation
function shot({click, element, targetX, targetY, elementSize}: Shot): void {
    // calculation
    const radius = elementSize / 2
    const targetCenterX = targetX + radius;
    const targetCenterY = targetY + radius;
    const distance = Math.sqrt((click.x - targetCenterX)**2 
                            + (click.y - targetCenterY)**2);
    let score: number = maxPointsPerShot - Math.floor(distance * maxPointsPerShot / radius)
    // action - updates score, removes target, spawns new target
    // and shows score for shot
    if (score > 0) {
        scoreUpdate(score)
        gameWindowEl.removeChild(element)
        isRunning && spawnTarget()
        hitValuePop(score, click)

    }
}


// pop up containing score for every shot
let hitValuePop = (value: number, click: MouseEvent): void => {
    const element: HTMLElement = document.createElement('p')
    element.classList.add('slide-out-top')
    const pointsThreshold: number = 90;
    let msg: string | number = value  
    if (value >= pointsThreshold && value !== maxPointsPerShot) {
        msg = value + '!'
    }
    else if (value == maxPointsPerShot) {
        msg = 'Perfect Shot!'
    }
    element.innerHTML = `${msg}`
    element.style.left = `${value == maxPointsPerShot ? click.x - 50 : click.x -10}px`
    element.style.top = `${click.y -40}px`
    gameWindowEl.appendChild(element)

    // pop up dispaears after 0.4 secounds
    const popupTime = 400;
    setTimeout(() => {
        gameWindowEl.hasChildNodes() && gameWindowEl.removeChild(element)
    }, popupTime)
}


// real time score update
let scoreUpdate = (score: number): void => {
    totalScore += score
        scoreEl.innerHTML = `Score: ${totalScore}`
    
    stats(totalScore)
}   





// end screen stats
let stats = (totalScore: number): void => {
    shots += 1
    let shotsPS: number = shots / gameDuration
    let avg: number = totalScore / shots
    statsSCoreEL.innerHTML = `Score: ${totalScore}`
    targetsShotEL.innerHTML = `Targets shot: ${shots}`
    shotsPerSecondEL.innerHTML = 
        `Shots per second ${shotsPS.toFixed(2)}`
        avgScorePerTargetEl.innerHTML = 
        `Avg score per target: ${avg.toFixed(2)}`
}  


// Click to restart
endScreenEL.addEventListener('click', () => {
    if (canRestart) {
        start()
        scoreEl.innerHTML = 'Score'
        endScreenEL.classList.add('hide')
        canRestartTimer()      
    }
})


// 1 sec restart delayer to prevent unwanted early restart
function canRestartTimer(): void {
    const resetTime: number = 1000; // milliseconds
    setTimeout(() => {
        canRestart = !canRestart;
      }, resetTime);
}
