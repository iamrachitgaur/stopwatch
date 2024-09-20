let startTime;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;
let lapCounter = 1;

const display = document.getElementById('display');
const startPauseButton = document.getElementById('startPause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapList = document.getElementById('lapList');

function startPause() {
    if (isRunning) {
        clearInterval(timerInterval);
        startPauseButton.textContent = 'Resume';
        isRunning = false;
    } else {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTime, 10);
        startPauseButton.textContent = 'Pause';
        isRunning = true;
    }
}

function reset() {
    clearInterval(timerInterval);
    display.textContent = '00:00:00.000';
    elapsedTime = 0;
    isRunning = false;
    startPauseButton.textContent = 'Start';
    lapCounter = 1;
    lapList.innerHTML = '';
}

function updateTime() {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    display.textContent = formatTime(elapsedTime);
}

function formatTime(time) {
    const date = new Date(time);
    return date.toISOString().substr(11, 12);
}

function lap() {
    if (isRunning) {
        const lapTime = formatTime(elapsedTime);
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapCounter}: ${lapTime}`;
        lapList.appendChild(lapItem);
        lapCounter++;
    }
}

startPauseButton.addEventListener('click', startPause);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);