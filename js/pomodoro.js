var setBreak = 5;
var setTimer = 25;
var min = setTimer - 1;
//console.log(min);
var timer = setTimer * 60;
var sec = timer % 60;
//console.log(sec);
var brkMin = setBreak - 1;
//console.log(brkMin);
var breakTimer = setBreak * 60;
var brkSec = breakTimer % 60;
//console.log(brkSec);
var myClock;
var myBreak;
var paused = false;
var started = false;
var pauseSec = null;
var pauseMin = null;
var onBreak = false;
var splash = document.getElementById('splash');
var breakMinus = document.getElementById('breakMinus');
var breakPlus = document.getElementById('breakPlus');
var timerMinus = document.getElementById('timerMinus');
var timerPlus = document.getElementById('timerPlus');
var clockDisplay = document.getElementById('clockDisplay');
var breakBox = document.getElementById('breakBox');
var timeBox = document.getElementById('timeBox');
var infoBox = document.getElementById('infoBox');
var clockFace = document.getElementById('clockFace');
var startReset = document.getElementById('startReset');
var pauseResume = document.getElementById('pauseResume');
var tabDisplay = document.getElementById('tab-display');
clockDisplay.innerHTML = setTimer + ":00";


breakMinus.addEventListener('click', function() {
    if (setBreak === 1) {} else {
        setBreak--;
        brkMin = setBreak - 1;
        breakTimer = setBreak * 60;
        //console.log(setBreak);
        breakBox.value = setBreak;
    }
});
breakPlus.addEventListener('click', function() {
    if (setBreak === 30) {} else {
        setBreak++;
        brkMin = setBreak - 1;
        breakTimer = setBreak * 60;
        //console.log(setBreak);
        breakBox.value = setBreak;
    }
});
timerMinus.addEventListener('click', function() {
    if (setTimer === 1) {
        min = setTimer - 1;
        timer = setTimer * 60;
        //console.log(setTimer);
        timeBox.value = setTimer;
        clockDisplay.innerHTML = setTimer + ":00";
    } else if (setTimer == 0) {} else {
        setTimer--;
        min = setTimer - 1;
        timer = setTimer * 60;
        //console.log(setTimer);
        timeBox.value = setTimer;
        clockDisplay.innerHTML = setTimer + ":00";
    }
});
timerPlus.addEventListener('click', function() {
    if (setTimer === 59) {} else {
        setTimer++;
        min = setTimer - 1;
        timer = setTimer * 60;
        //console.log(setTimer);
        timeBox.value = setTimer;
        clockDisplay.innerHTML = setTimer + ":00";
    }
});

startReset.addEventListener('click', function() {
    if (started == false) {
        started = true;
        clearInterval(myClock);
        startTimer();
    } else if (started == true) {
        started = false;
        paused = false;
        onBreak = false;
        clearInterval(myClock);
        clearInterval(myBreak);
        min = setTimer - 1;
        timer = setTimer * 60;
        sec = timer % 60;
        infoBox.innerHTML = "";
        clockDisplay.innerHTML = setTimer + ":00";
    }
});

pauseResume.addEventListener('click', function() {
    if (started == true && paused == false && onBreak == false) {
        clearInterval(myClock);
        paused = true;
        pauseMe(min, sec);
    } else if (started == true && paused == false && onBreak == true) {
        clearInterval(myBreak);
        paused = true;
        pauseMe(brkMin, brkSec);
    } else if (paused == true && onBreak == false) {
        console.log("1 is true");
        min = pauseMin;
        sec = pauseSec;
        paused = false;
        startTimer();
    } else if (paused == true && onBreak == true) {
        console.log("2 is true");
        brkMin = pauseMin;
        brkSec = pauseSec;
        paused = false;
        startBreak();
    }
});

function startTimer() {
    onBreak = false;
    clearInterval(myBreak);
    infoBox.innerHTML = "Countdown";
    myClock = setInterval(function() {
        countDown();
    }, 1000);
}

function startBreak() {
    onBreak = true;
    clearInterval(myClock);
    infoBox.innerHTML = "Break!";
    myBreak = setInterval(function() {
        countBreak();
    }, 1000);
}

function countDown() {
    timer--;
    sec = timer % 60;
    if (min === 0 && sec === 0) {
        min = setTimer -1;
        timer = setTimer * 60;
        splash.className = " alert";
        clockDisplay.innerHTML = setTimer + ":00";
        tabDisplay.innerHTML = "Break! " + setBreak + ":00";
        startBreak();
    } else if (min === 0) {
        splash.className = "";
        clockDisplay.innerHTML = sec.toString();
        tabDisplay.innerHTML = "Countdown " + sec.toString();
    } else if (sec < 10) {
        if (min == 0) {
            clockDisplay.innerHTML = "0" + sec.toString();
            tabDisplay.innerHTML = "Countdown " + "0" + sec.toString();
        } else if (sec === 0) {
            clockDisplay.innerHTML = min.toString() + ":0" + sec.toString();
            tabDisplay.innerHTML = "Countdown " +  min.toString() + ":0" + sec.toString();
            min--;
        } else {
            clockDisplay.innerHTML = min.toString() + ":0" + sec.toString();
            tabDisplay.innerHTML = "Countdown " +  min.toString() + ":0" + sec.toString();
        }
    } else {
        clockDisplay.innerHTML = min.toString() + ":" + sec.toString();
        tabDisplay.innerHTML = "Countdown " +  min.toString() + ":" + sec.toString();
    }
}

function countBreak() {
    breakTimer--;
    brkSec = breakTimer % 60;
    if (brkMin === 0 && brkSec === 0) {
        brkMin = setBreak -1;
        breakTimer = setBreak * 60;
        splash.className = " alert";
        clockDisplay.innerHTML = setBreak + ":00";
        tabDisplay.innerHTML = "Countdown! " + setTimer + ":00";
        startTimer();
    } else if (brkMin === 0) {
        splash.className = "";
        clockDisplay.innerHTML = brkSec.toString();
        tabDisplay.innerHTML = "Break! " + brkSec.toString();
    } else if (brkSec < 10) {
        if (brkMin == 0) {
            clockDisplay.innerHTML = "0" + brkSec.toString();
            tabDisplay.innerHTML = "Break! " +  "0" + brkSec.toString();
        } else if (brkSec === 0) {
            clockDisplay.innerHTML = brkMin.toString() + ":0" + brkSec.toString();
            tabDisplay.innerHTML = "Break! " + brkMin.toString() + ":0" + brkSec.toString();
            brkMin--;
        } else {
            clockDisplay.innerHTML = brkMin.toString() + ":0" + brkSec.toString();
            tabDisplay.innerHTML = "Break! " + brkMin.toString() + ":0" + brkSec.toString();
        }
    } else {
        clockDisplay.innerHTML = brkMin.toString() + ":" + brkSec.toString();
        tabDisplay.innerHTML = "Break! " + brkMin.toString() + ":" + brkSec.toString();
      }
}

function pauseMe(min, sec) {
    pauseSec = sec;
    console.log(sec);
    pauseMin = min;
    console.log(min);
    clockDisplay.innerHTML = pauseMin + ":" + pauseSec;
}
