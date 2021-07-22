const starter = document.getElementById("start-btn");
const timeDisplay = document.getElementById("timer-display");
var secondsLeft = 10;
var questionNumber;

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
  startTimer();
  questionDealer(questions);
};


var startTime;

function startTimer() {
  startTime = setInterval(function() {
    secondsLeft--;
    if (secondsLeft === 0) {
      clearInterval(startTime);
      // TODO: Add ending stuff here
    }
    timeDisplay.textContent = String(secondsLeft);
  }, 1000)

};

function stopTimer() {
  clearInterval(startTime);
};

function sumbitScore() {

};

function timeDemerit() {
  if (secondsLeft > 10) {
    secondsLeft -= 10;
  } else {
    secondsLeft = 1;
  }
};

function questionDealer(questionsList) {
  for (var i = 0; i < questionsList.length; i++) {
      var answerCheck = questionGenerator(questionsList[i]);
      if (answerCheck) {
        console.log("Correct!");
      } else {
        console.log("Wrong!");
      }
  }
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
  var questionArea = document.getElementById('question-area');

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

  questionArea.addEventListener('click', function(e) {
    var element = e.target;
    console.log("Click!");
    if (element.matches(".answer")) {
      var isCorrect = element.getAttribute('data-correct');
      if (isCorrect === "true") {
        //When they answer correct
        return true;
      } else {
        //when they answer false
        timeDemerit();
        return false;

      }
    }
  })

};

starter.addEventListener('click', function(e) {
  startGame();
});
