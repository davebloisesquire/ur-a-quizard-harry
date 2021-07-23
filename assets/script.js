//Constants, mostly just for DOM manipulation and traversal
const starter = document.getElementById("start-btn");
const timeDisplay = document.getElementById("timer-display");
const currentScoreDisplay = document.getElementById("score-display");
const submitScoreButton = document.getElementById("submit-score");
const highScorerName = document.getElementById("high-scorer");
const highScoreDisplayBoard = document.getElementById('high-scores');
const wereYouCorrect = document.getElementById('wereYouCorrect');
//Variables
var highScores = {};
var secondsLeft = 10;
var questionNumber;
var currentScore;

//This object holds the questions and answers
const questions = [{
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

//Starts the game
function startGame() {
  secondsLeft = 45;
  currentScore = 0;
  currentScoreDisplay.textContent = currentScore;
  wereYouCorrect.textContent = ""
  startTimer();
  questionDealer(questions);
  document.getElementById('question-area').classList.remove('hide');
  starter.classList.add('hide');
};

//These are just some utilities
//Starting the timer
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
//Stopping the timer
function stopTimer() {
  clearInterval(startTime);
};
//This just hides the submit score input to avoid confusion
function submitScore() {
  document.getElementById('highScoreInput').classList.remove('hide');
};
//This controls the time demerits and penalizes you if you get a question wrong
function timeDemerit() {
  if (secondsLeft > 10) {
    secondsLeft -= 10;
  } else {
    secondsLeft = 1;
  }
};
//Adds points to your score
function addToScore(points) {
  currentScore += points;
  currentScoreDisplay.textContent = currentScore;
};

//This function dolls out the questions by pulling them from the questions object and running httem through the question generator
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
          wereYouCorrect.textContent = "Correct! Nice one"
          questionGenerator(questionsList[questionNumber]);
        } else {
          questionNumber++;
          timeDemerit();
          wereYouCorrect.textContent = "Ooh, you were Wrong."
          questionGenerator(questionsList[questionNumber]);
        }
      } else if (questionsList.length - 1 == questionNumber) {
        var isCorrect = element.getAttribute('data-correct');
        if (isCorrect === "true") {
          //When they answer correct
          addToScore(10);
          wereYouCorrect.textContent = "Correct! Nice one"
          endGame();
        } else {
          wereYouCorrect.textContent = "Ooh, you were Wrong."
          timeDemerit();
          endGame();
        }
      }

    }
  })



}

// Generating the questions
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

//This ends the game
function endGame() {
  stopTimer();
  document.getElementById('question-area').classList.add('hide');
  submitScore();
  starter.classList.remove('hide');
  console.log("Game Done!");
};

//This refreshes the highscores table when it changes and at the begining of a session
function refreshHighScores() {
  highScoreDisplayBoard.innerHTML = '';
  var savedHighScores = JSON.parse(localStorage.getItem("savedHighScores"))
  if (savedHighScores !== null) {
    highScores = savedHighScores;
  }

  for (var i = 0; i < Object.keys(highScores).length; i++) {
    var scoreDisplayName = Object.keys(highScores)[i];
    var scoreDisplayScore = highScores[scoreDisplayName];
    var newScore = scoreDisplayName + " : " + scoreDisplayScore;
    var li = document.createElement("li");
    li.textContent = newScore;
    highScoreDisplayBoard.appendChild(li);
  }
}
refreshHighScores();

//Listening for someone to press start
starter.addEventListener('click', function(e) {
  startGame();
});

//Listening for submitting your score
submitScoreButton.addEventListener('click', function(e) {
  highScores[highScorerName.value] = currentScore;
  console.log(highScorerName.value);
  localStorage.setItem("savedHighScores", JSON.stringify(highScores));
  document.getElementById('highScoreInput').classList.add('hide');
  refreshHighScores();
});
