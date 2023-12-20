const appendSec = document.getElementById("sec");
const appendTens = document.getElementById("tens");
const btnStart = document.getElementById("btn-start");
const btnStop = document.getElementById("btn-stop");
const btnReset = document.getElementById("btn-reset");

let sec = 0;
let tens = 0;
let interval;

btnStart.onclick = function () {
  // start 버튼을 다시 누르면, 다시 시작
  clearInterval(interval);
  interval = setInterval(startTime, 10);
};

btnStop.onclick = function () {
  clearInterval(interval);
};

btnReset.onclick = function () {
  clearInterval(interval);
  sec = 0;
  tens = 0;
  appendSec.innerHTML = sec;
  appendTens.innerHTML = tens;
};

function startTime() {
  tens++;

  if (tens > 99) {
    // sec 1 올리기, appendSec에도 반영
    sec++;
    appendSec.innerHTML = sec;

    // tens, appendTens = 0
    tens = 0;
    appendTens.innerHTML = 0;
  } else {
    appendTens.innerHTML = tens;
  }
}


