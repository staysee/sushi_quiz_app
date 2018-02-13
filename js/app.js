var number;
var scoreCorrect;
var scoreIncorrect;

function newGame(){
  location.reload();
}

function render() {
  displayQuestions()
  displayAnswerChoices()
  updateScore()

}

function startGame(){
  number = 0;
  scoreCorrect = 0;
  scoreIncorrect = 0;
  $('#welcome-container').addClass("hidden");
  $('#quiz-container').removeClass("hidden");
  render();
}

function displayQuestions(){
  var questionArea = $('.question-area');
  var questionNumber = $('.question-number');
  questionArea.html(questions[number].question);
  questionNumber.html("Q: " + (number + 1) + " of " + questions.length);

  console.log(questions[number].question);
}

function displayAnswerChoices(){
  var answerChoices = questions[number].choices;
  console.log(answerChoices)
  $('.choices').html('');
  for (var i = 0; i < answerChoices.length; i++){
    $('.choices').append('<li class="grow"><input type="radio" name="options" value="'+ i +'"><span class="answers">' + answerChoices[i]+'</span></li>')
  }
}

function checkAnswer(){
  var userAnswer = $('input[type="radio"]:checked');
  var correctAnswer = questions[number].correctAnswer
  if (userAnswer.length == 0){
    console.log('none');
    alert('Choose an answer')
  } else if (userAnswer.val() == correctAnswer){
    scoreCorrect++;
    console.log('correct!' + scoreCorrect)
    userAnswer.closest('li').addClass("correct-answer");
  } else {
    scoreIncorrect++;
    console.log('wrong' + scoreIncorrect)
    userAnswer.closest('li').addClass("incorrect-answer");
    //addClass("correct-answer") for the correct answer
  }
}

function updateScore(){
  var scoreBoard = $('.scores');
  scoreBoard.html("Correct: " + scoreCorrect + ", Incorrect: " + scoreIncorrect);
}

function nextQuestion(){
  if (number < 9){
    number++;
  }
  render()
}

// EVENT HANDLERS

$(document).ready(function(){
  $('#welcome-container').on('click', '.js-play-button', startGame);
  $('#quiz-container').on('click', '.submit-button', function(event){
    event.preventDefault()
    if ($('input[type="radio"]:checked').length !== 0){
      checkAnswer()
      $('.submit-button').addClass("hidden");
      $('.next-button').removeClass("hidden");
    }
  })
  $('#quiz-container').on('click', '.next-button', function(){
    nextQuestion()
    $('#game-message').html("");
    $('.next-button').addClass("hidden");
    $('.submit-button').removeClass("hidden");
  })




})

