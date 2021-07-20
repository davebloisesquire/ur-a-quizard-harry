const questions = [
  {
    question: "What is the answer to life the universe and everything?",
    answer1: "love",
    answer2: "happieness",
    answer3: "null",
    answer4: "42",
    correct: "4"
  }
]

function questionGenerator(question) {
  $('.question-area .answer').data("correct", false);

  let correctAnswerData = ".question-area .answer." + questions.correct;
  $('.question-area .question').text(question.question);
  $('.question-area .answer.1').text(question.answer1);
  $('.question-area .answer.2').text(question.answer2);
  $('.question-area .answer.3').text(question.answer3);
  $('.question-area .answer.4').text(question.answer4);
  $(correctAnswerData).data("correct", true)
}



//questionGenerator(questions[0]);
