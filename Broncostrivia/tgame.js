$(document).ready(function() {
var quizQuestions = [
    {
        question:"What year were the Denver Broncos founded?",
        answers:["1940","1950","1960","1970"],
        correctAnswer:"1960"
    },
    {
        question:"Which head coach led the Denver Broncos to their first playoff appearance?",
        answers:["Wade Phillips","Mike Shanahan","Red Miller","John Ralston"],
        correctAnswer:"Red Miller"
    },
    {   
        question:"What team originally drafted John Elway?",
        answers:["Denver Broncos","Greenbay Packer","Baltimore Colts","Kansas City Chiefs"],
        correctAnswer:"Baltimore Colts"
    },
    {
        question:"Which Denver quarterback set a team record by throwing 499 passing yards in a single game?",
        answers:["Craig Morton","John Elway","Jake Plummer","Brian Griese"],
        correctAnswer:"Jake Plummer"
    },
    {
        question:"What college was John Elway drafted from?",
        answers:["Stanford","Florida State","UCLA","Penn State"],
        correctAnswer:"Stanford"
    },
]
var correct= 0;
var incorrect= 0;
var counter= 30;
var intervalId;

// functions
// --------------------------------------------------------------------

function runTimer() {
    counter = 10;
    clearInterval(intervalId);
    intervalId = setInterval(decrementTimer, 1000)
}

function decrementTimer() {
    counter--;
    $('.timer').text(counter);
    console.log(counter);
    if (counter === 0) {
        stopTimer();
        console.log('time over');
    }
}

function stopTimer() {
    clearInterval(intervalId);
    submitGame();
}



function addQuestions() {
    $('.question-box').html("");
    for (var i=0; i< quizQuestions.length; i++) {
        $('.question-box').append($("<h4>" + quizQuestions[i].question + "</h4>"));
        for (var k=0; k<quizQuestions[i].answers.length; k++) {
            $('.question-box').append($("<input type='radio' value='" + quizQuestions[i].answers[k] + "' name='question-" + i + "'>" + quizQuestions[i].answers[k] + "<br>" ));
        }
        $('.question-box').append('<hr>');
    }
}

function submitGame() {
    for (var i=0; i<quizQuestions.length; i++)  {
        $.each($("input[name='question-" + i + "']:checked"), function() {
            console.log($(this).attr('value'));
            var userGuess = $(this).attr('value');
            if (userGuess === quizQuestions[i].correctAnswer) {
                
                correct++;
                console.log(correct);
            } else {
                
                incorrect++;
                console.log(incorrect);
            }
        });  
    }
    $('#correct').text(correct);
    $('#incorrect').text(incorrect);
    $('#unanswered').text(quizQuestions.length - (correct + incorrect));
    $('.end-screen').show();
}

function newGame() {
    correct = 0;
    incorrect = 0;
    shuffleQuestions();
    shuffleAnswers();
    addQuestions();
    runTimer();
    $(".end-screen").hide();
}

function shuffleQuestions() {
    quizQuestions.sort(function(a, b){return 0.5 - Math.random()});
}

function shuffleAnswers() {
    for (var i=0; i<quizQuestions.length; i++) {
        quizQuestions[i].answers.sort(function(a, b){return 0.5 - Math.random()});
    }   
}



// main process
// --------------------------------------------------------------------



$('#submitGame').on('click', function() {
    // submitGame();
    stopTimer();
});

$('#newGame').on('click', function() {
    newGame();
});

});