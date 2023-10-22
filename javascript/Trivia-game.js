$.fn.trivia = function() {
  var _t = this;
  _t.userPick = null;
  _t.answers = {
      correct: 0,
      incorrect: 0
  };
  _t.images = null;
  _t.count = 30;
  _t.current = 0;
  _t.questions = [{
question: "What was the name of Simba's father?",
choices: ["Mufasa", "Scar", "Timon", "Pumbaa" ],
correct: 0


}, {
question:"What was the name of Simba's childhood friend?",
choices: ["Hadassah", "Zazu", "Nala", "Sirabi"],
correct: 2

}, {
question:"In the Lion King, who does Scar enlist to help him betray Mufasa?",
choices: ["The elephants", "The giraffes", "The zebras", "The hyenas"],
correct: 3

}, {
question:"Who discovered in a vision sequence that Simba was still alive?",
choices: ["Nala", "Sirabi", "Zazu", "Rafiki"],
correct: 3

}, {
  question:"What did Timon and Pumbaa's diet primarily consist of?",
  choices: ["Insects", "Plants", "Meat", "Dairy"],
  correct: 0
}
];

_t.ask = function() {
      if (_t.questions[_t.current]) {
          $("#timer").html("Time remaining: " + "00:" + _t.count + " secs");
          $("#question_div").html(_t.questions[_t.current].question);
          var choicesArr = _t.questions[_t.current].choices;
          var buttonsArr = [];

          for (var i = 0; i < choicesArr.length; i++) {
              var button = $('<button>');
              button.text(choicesArr[i]);
              button.attr('data-id', i);
              $('#choices_div').append(button);
          }
          window.triviaCounter = setInterval(_t.timer, 1000);
      } else {
          $('body').append($('<div />', {
              text: 'Unanswered: ' + (
                  _t.questions.length - (_t.answers.correct + _t.answers.incorrect)),
              class: 'result'
          }));
          $('#start_button').text('Restart').appendTo('body').show();
      }
  };
  _t.timer = function() {
      _t.count--;
      if (_t.count <= 0) {
          setTimeout(function() {
              _t.nextQ();
          });

      } else {
          $("#timer").html("Time remaining: " + "00:" + _t.count + " secs");
      }
  };
  _t.nextQ = function() {
    
      _t.current++;
      clearInterval(window.triviaCounter);
      _t.count = 30;
      $('#timer').html("");
      setTimeout(function() {
          _t.cleanUp();
          _t.ask(); $('#choices_div').css("background-color","white");   
      }, 3000)
  };
  _t.cleanUp = function() {
      $('div[id]').each(function(item) {
          $(this).html('');
      });
      $('.correct').html('Correct answers: ' + _t.answers.correct);
      $('.incorrect').html('Incorrect answers: ' + _t.answers.incorrect);
  };
  _t.answer = function(correct) {
      var string = correct ? 'correct' : 'incorrect';
      _t.answers[string]++;
      $('.' + string).html(string + ' answers: ' + _t.answers[string]);
  };
  return _t;
};
var Trivia;

$("#start_button").click(function() {
  $(this).hide();
  $('.result').remove();
  $('div').html('');
  Trivia = new $(window).trivia();
  Trivia.ask();
});

$('#choices_div').on('click', 'button', function(e) {
  var userPick = $(this).data("id"),
      _t = Trivia || $(window).trivia(),
      index = _t.questions[_t.current].correct,
      correct = _t.questions[_t.current].choices[index];

  if (userPick !== index) {
      $('#choices_div').text("Wrong Answer! The correct answer was: " + correct);
    $('#choices_div').css("background-color","red");
      _t.answer(false);
  } else {
      $('#choices_div').text("Correct!!! The correct answer was: " + correct);
    $('#choices_div').css("background-color","green");
      _t.answer(true);
  }
  _t.nextQ();
});