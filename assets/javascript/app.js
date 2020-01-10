$(document).ready(function(){
    // Start button
    $("#start-button").on("click", gameState.startTimer);
});

//GameState
var gameState = {
    
    timeRemaining: 60,

    startTimer: function(){
        $("#timer").text("Time remaining: " + gameState.timeRemaining);
        setInterval(gameState.countdown, 1000);
        $("#start-page").hide();
        pokeTrivia.displayQuestions();
    },

    //Timer; stop at 0.
    countdown: function(){
        gameState.timeRemaining--;
        $("#timer").text("Time remaining: " + gameState.timeRemaining);
        if (gameState.timeRemaining === 0){
            gameState.stopTimer();
            $("#timer").empty();
        }
    },

    //Answers checks.
    stopTimer: function(){
        clearInterval();
        pokeTrivia.checkAnswers();
    },

    //Show results.
    showResults: function(totalCorrect, totalIncorrect, totalUnanswered) {
        $("#end-page").show();
        $("#questions-box").empty();
        $("#timer").empty();
        $("#timer").hide();
        $("#correct-answers").text("Correct answers : " + totalCorrect);
        $("#incorrect-answers").text("Incorrect answers : " + totalIncorrect);
        $("#unanswered").text("Skipped questions : " + totalUnanswered);
    }

}

//Questions and Scoring handler.
var pokeTrivia = {

    //Display questions.
    displayQuestions: function() {
        var questionBox = $("#questions-box");
        var answer = $(".form-check");
        questionBox.append('<h2>Answer the following questions:</h2>');

        for (var j = 0; j < questionBank.length; j++){
            questionBox.append('<div id="question">' + questionBank[j].question + '</div>');

            var answer1 = questionBank[j].answers[0];
            var answer2 = questionBank[j].answers[1];
            var answer3 = questionBank[j].answers[2];

            questionBox.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group'+j+'" id="radio'+j+'"><label class="form-check-label" id="radio'+j+'label" for="radio'+j+'">' + answer1 + '</label></div>');
            questionBox.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group'+j+'" id="radio'+j+'"><label class="form-check-label" id="radio'+j+'label" for="radio'+j+'">' + answer2 + '</label></div>');
            questionBox.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group'+j+'" id="radio'+j+'"><label class="form-check-label" id="radio'+j+'label" for="radio'+j+'">' + answer3 + '</label></div>');
        }
        var doneButton = '<button class="btn btn-primary" id="done-button" type="submit">Done</button>';
        questionBox.append(doneButton);
        $("#done-button").on("click", gameState.stopTimer);

    },

    checkAnswers: function(){
        var rightAnswer;
        var userAnswer;
        var totalCorrect = 0;
        var totalIncorrect = 0;
        var totalUnanswered = 0;

        for (var i = 0; i < questionBank.length; i++) {
            rightAnswer = questionBank[i].correct;
            userAnswer = $('input[id=radio'+i+']:checked + label').text();

            if (userAnswer === rightAnswer){
                totalCorrect++;
            } else if (userAnswer === "") {
                totalUnanswered++;
            } else if (userAnswer !== rightAnswer) {
                {
                    totalIncorrect++;
                }
            }
        }
        gameState.showResults(totalCorrect, totalIncorrect, totalUnanswered);

    },
}

var questionBank =
[
  {
    question: "Who's Ash first Pokémon?",
    answers: ["Squirtle", "Torchic", "Pikachu"],
    correct: "Pikachu"
  },

  {
    question: "How many Pokémons are in the national PokéDex?",
    answers: ["807", "151", "500"],
    correct: "807"
  },
  {
    question: "Which Pokémon is a Fire-Type?",
    answers: ["Mdukip", "Torchic", "Laddie"],
    correct: "Torchic"
  },
  {
    question: "Which of the following is not an Eevee evolution?",
    answers: ["Umbreon", "Jolteon", "Raichu"],
    correct: "Raichu"
  },
  {
    question: "What's the name of Charmelon's evolution?",
    answers: ["Charizard", "Blaziken", "Infernape"],
    correct: "Charizard"
  },
  {
    question: "Who's a legendary Pokémon?",
    answers: ["Pidgeot", "Mew", "Slaking"],
    correct: "Mew"
  },
  
]