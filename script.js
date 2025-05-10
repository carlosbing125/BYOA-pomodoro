let timeLeft;
let timerId = null;
let isWorkMode = true;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const toggleModeInput = document.getElementById('toggleMode');
const currentModeDisplay = document.getElementById('currentMode');
const addTimeButton = document.getElementById('addTime');
const subtractTimeButton = document.getElementById('subtractTime');
const timeInput = document.getElementById('timeInput');

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
    // Update page title
    document.title = `${timeString} ${isWorkMode ? '(W)' : '(R)'} - Pomodoro Timer`;
}

function updateModeDisplay() {
    currentModeDisplay.textContent = isWorkMode ? 'Work Mode' : 'Rest Mode';
}

function adjustTime(minutes) {
    // Get the input value and ensure it's a valid number
    const inputValue = parseInt(timeInput.value);
    if (isNaN(inputValue) || inputValue < 1 || inputValue > 60) {
        alert('Please enter a valid number between 1 and 60');
        return;
    }
    
    // Convert current time to seconds
    const currentSeconds = timeLeft;
    // Add or subtract minutes (converted to seconds)
    const newSeconds = currentSeconds + (inputValue * 60 * minutes);
    // Ensure time doesn't go below 0
    timeLeft = Math.max(0, newSeconds);
    updateDisplay();
}

function startTimer() {
    if (timerId === null) {
        timerId = setInterval(() => {
            timeLeft--;
            updateDisplay();
            if (timeLeft === 0) {
                clearInterval(timerId);
                timerId = null;
                alert(isWorkMode ? 'Work session completed!' : 'Rest session completed!');
            }
        }, 1000);
    }
}

function pauseTimer() {
    clearInterval(timerId);
    timerId = null;
}

function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    timeLeft = isWorkMode ? 25 * 60 : 5 * 60;
    updateDisplay();
}

function toggleMode() {
    isWorkMode = !isWorkMode;
    timeLeft = isWorkMode ? 25 * 60 : 5 * 60;
    updateDisplay();
    updateModeDisplay();
    if (timerId !== null) {
        pauseTimer();
    }
}

// Initialize timer
timeLeft = 25 * 60;
updateDisplay();
updateModeDisplay();

// Event listeners
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
toggleModeInput.addEventListener('change', toggleMode);
addTimeButton.addEventListener('click', () => adjustTime(1));
subtractTimeButton.addEventListener('click', () => adjustTime(-1)); 