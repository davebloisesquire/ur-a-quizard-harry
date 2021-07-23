const starter = document.getElementById("start-btn");
const timeDisplay = document.getElementById("timer-display");
const currentScoreDisplay = document.getElementById("score-display");
const submitScoreButton = document.getElementById("submit-score");
const highScorerName = document.getElementById("high-scorer");

var highScores = {};
var secondsLeft = 10;
var questionNumber;
var currentScore;

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
    question: "What is the answer to life the universe and everything?",
    answer1: "love",
    answer2: "happieness",
    answer3: "null",
    answer4: "42",
    correct: "4"
  },
  {
    question: "Which of these is the biggest number?",
    answer1: "8",
    answer2: "Q",
    answer3: "5",
    answer4: "3",
    correct: "1"
  }
];

function startGame() {
  console.log("It has begun!");
  secondsLeft = 45;
  currentScore = 0;
  startTimer();
  questionDealer(questions);
};

var startTime;
function startTimer() {
  startTime = setInterval(function() {
    secondsLeft--;
    if (secondsLeft === 0) {
      endGame();
    }
    timeDisplay.textContent = String(secondsLeft);
  }, 1000)

};

function stopTimer() {
  clearInterval(startTime);
};

function submitScore() {

};

function timeDemerit() {
  if (secondsLeft > 10) {
    secondsLeft -= 10;
  } else {
    secondsLeft = 1;
  }
};

function addToScore(points) {
  currentScore += points;
  currentScoreDisplay.textContent = currentScore;
};

function questionDealer(questionsList) {
  var questionNumber = 0;

  questionGenerator(questionsList[questionNumber]);
  var questionArea = document.getElementById('question-area');
  questionArea.addEventListener('click', function(e) {
    var element = e.target;

    if (element.matches(".answer")) {

      if (questionsList.length - 1 > questionNumber) {
        var isCorrect = element.getAttribute('data-correct');
        if (isCorrect === "true") {
          //When they answer correct
          addToScore(10);
          questionNumber++;
          questionGenerator(questionsList[questionNumber]);
        } else {
          //when they answer false
          timeDemerit();
        }
      } else if (questionsList.length - 1 == questionNumber) {
        var isCorrect = element.getAttribute('data-correct');
        if (isCorrect === "true") {
          //When they answer correct
          addToScore(10);
          endGame();
        } else {
          //when they answer false
          timeDemerit();
        }
      }

    }
  })



}

// Generating the questions and handling question logic
function questionGenerator(question) {
  console.log(question);
  //grabbing the question and answer data from the questions object
  var answerCorrect = ".ans" + question.correct;
  answerCorrect = document.querySelector(answerCorrect);
  var questionDisplay = document.querySelector(".question");
  var answerOne = document.querySelector(".ans1");
  var answerTwo = document.querySelector(".ans2");
  var answerThree = document.querySelector(".ans3");
  var answerFour = document.querySelector(".ans4");

  //Display Questions and possible answers in the question area
  questionDisplay.textContent = question.question;
  answerOne.textContent = question.answer1;
  answerTwo.textContent = question.answer2;
  answerThree.textContent = question.answer3;
  answerFour.textContent = question.answer4;

  //Setting all correct attributes to false
  answerOne.setAttribute("data-correct", false);
  answerTwo.setAttribute("data-correct", false);
  answerThree.setAttribute("data-correct", false);
  answerFour.setAttribute("data-correct", false);
  //Making only the correct answer true
  answerCorrect.setAttribute("data-correct", true);
};

function endGame() {
  stopTimer();
  submitScore();
  console.log("Game Done!");
};

var savedHighScores = JSON.parse(localStorage.getItem("savedHighScores"))
if (savedHighScores !== null) {
  highScores = savedHighScores;
}

starter.addEventListener('click', function(e) {
  startGame();
});


submitScoreButton.addEventListener('click', function(e) {
  highScores[highScorerName.value] = currentScore;
  console.log(highScorerName.value);
  localStorage.setItem("savedHighScores", JSON.stringify(highScores));
});
