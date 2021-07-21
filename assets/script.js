const starter = document.getElementById("start-btn")
const timeDisplay = document.getElementById("timer-display")
var secondsLeft = 10;
const questions = [
  {
    question: "What is the answer to life the universe and everything?",
    answer1: "love",
    answer2: "happieness",
    answer3: "null",
    answer4: "42",
    correct: "4"
  },
  {
    question: "What is love?",
    answer1: "null",
    answer2: "evol",
    answer3: "baby, don't hurt me, no more",
    answer4: "42",
    correct: "3"
  },
  {
    question: "Which of these is the biggest number?",
    answer1: "8",
    answer2: "Q",
    answer3: "5",
    answer4: "3",
    correct: "1"
  }
]

function startGame() {
console.log("It has begun!");
startTimer()
}

function startTimer() {
  var startTime = setInterval(function() {
    secondsLeft--;
    if (secondsLeft === 0 || ) {
      clearInterval(startTime);
      // TODO: Add ending stuff here
    }
    timeDisplay.textContent = String(secondsLeft);
  }, 1000)

}

function stopTimer() {
  clearInterval(startTime);
}

function sumbitScore() {

}

function questionGenerator(question) {

}

starter.addEventListener('click', function(e) {
  startGame();
})
