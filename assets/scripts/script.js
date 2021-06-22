//Set Variables

//getElement variables
var welcomeScreen = document.getElementById("welcomeScreen");
var beginButton = document.getElementById("beginButton");
var quizScreen = document.getElementById("quiz");
var questionEl = document.getElementById("question");
var answer1 = document.getElementById("answer1");
var answer2 = document.getElementById("answer2");
var answer3 = document.getElementById("answer3");
var answer4 = document.getElementById("answer4");
var timerEl = document.getElementById("timer");
var timeLeft = document.getElementById("timeLeft");
var highscoresEl = document.getElementById("highscoresEl");
var highscores = document.getElementById("highscores");
var hsButton = document.getElementById("HSButton");
var hsMessage = document.getElementById("HSMessage");
var topPlayer = document.getElementById("topPlayer");
var topScore = document.getElementById("topScore");
var results = document.getElementById("results");
var score = document.getElementById("playerScore");
var playAgainButton = document.getElementById("playAgain");
var highscoreForm = document.getElementById("highScoreForm");
var closeBtn = document.getElementById("closeBtn");
var HSList = document.getElementsByClassName("HSList");

//quiz variables
const quizQuestions = [
    //1
    {
        question: "Which syntax is used to write javascript comments?",
        answers: {
            a: "<!-- -->",
            b: "//",
            c: "/* */",
            d: "// and /* */"
        },
        correctAnswer: "d"
    },

    //2
    {
        question: "What keyword(s) can be used to declare a javascript variable?",
        answers: {
            a: "var",
            b: "var, let, and const",
            c: "var and let",
            d: "var and const"
        },
        correctAnswer: "b"
    },

    //3
    {
        question: "What is the correct operator for 'not equal value or type'?",
        answers: {
            a: "===",
            b: "!=",
            c: "!==",
            d: "||"
        },
        correctAnswer: "c"
    },

    //4
    {
        question: "What two values are Boolean?",
        answers: {
            a: "Yes/No",
            b: "True/False",
            c: "On/Off",
            d: "1/0"
        },
        correctAnswer: "b"
    },

    //5
    {
        question: "What does JSON stand for?",
        answers: {
            a: "Java Single Object Notation",
            b: "Java Source Over Notes",
            c: "Jason",
            d: "Java Script Object Notation"
        },
        correctAnswer: "d"
    },

    //6
    {
        question: "Which of the following type of variable takes precedence over other if names are same?",
        answers: {
            a: "Global Variable",
            b: "Local Variable",
            c: "Both of the above.",
            d: "None of the above."
        },
        correctAnswer: "b"
    },

    //7
    {
        question: "Which of the following function of Array object adds one or more elements to the end of an array and returns the new length of the array?",
        answers: {
            a: "pop()",
            b: "push()",
            c: "join()",
            d: "map()"
        },
        correctAnswer: "b"
    },

    //8
    {
        question: "Inside which HTML element do we put the JavaScript?",
        answers: {
            a: "<script>",
            b: "<scripting>",
            c: "js",
            d: "javascript"
        },
        correctAnswer: "a"
    },

    //9
    {
        question: "How do you create a function in javascript?",
        answers: {
            a: "function:myFunction()",
            b: "function myFunction()",
            c: "function = myFunction()",
            d: "var myFunction()"
        },
        correctAnswer: "b"
    },

    //10
    {
        question: "How do you write an IF statement in javascript?",
        answers: {
            a: "if i = 5",
            b: "if i = 5 then",
            c: "if i == 5 then",
            d: "if (i == 5)"
        },
        correctAnswer: "d"
    },

    //11
    {
        question: "How to write an IF statement for executing some code if i is NOT equal to 5?",
        answers: {
            a: "if (i <> 5)",
            b: "if i =! 5 then",
            c: "if i <> 5",
            d: "if (i != 5)"
        },
        correctAnswer: "d"
    },

    //12
    {
        question: "How does a WHILE loop start?",
        answers: {
            a: "while (i <= 10)",
            b: "while i = 1 to 10",
            c: "while (i <= 10: i++)",
            d: "while i < 10 then"
        },
        correctAnswer: "a"
    },

    //13
    {
        question: "How does a FOR loop start?",
        answers: {
            a: "for (i <= 5; i++)",
            b: "for (i = 0; i <= 5; i++)",
            c: "for i = 1 to 5",
            d: "for (i = 0; i <= 5)"
        },
        correctAnswer: "b"
    },

    //14
    {
        question: "How do you round the number 7.25, to the nearest integer?",
        answers: {
            a: "Math.round(7.25)",
            b: "rnd(7.25)",
            c: "round(7.25)",
            d: "Math.rnd(7.25)"
        },
        correctAnswer: "a"
    },

    //15
    {
        question: "How do you find the number with the highest value of x and y?",
        answers: {
            a: "Math.ceil(x, y)",
            b: "ceil(x, y)",
            c: "top(x, y)",
            d: "Math.max(x, y)"
        },
        correctAnswer: "d"
    },

]

var playerScore;
var questionNumber;
var timeleft;
var points;
var setTimeInterval;
var scoreTimerInterval;

var highScoreString = localStorage.getItem("highscoresLS");
var highScores = JSON.parse(highScoreString) ?? [];
var lowestScore = highScores[9]?.playerScore ?? 0;

//quiz functions
beginButton.addEventListener("click", function () {buildQuiz()});
playAgainButton.addEventListener("click", function() {buildQuiz()});


answer1.addEventListener("click", function () {answerChecker("a")});
answer2.addEventListener("click", function () {answerChecker("b")});
answer3.addEventListener("click", function () {answerChecker("c")});
answer4.addEventListener("click", function () {answerChecker("d")});

hsButton.addEventListener("click", function() {showHighscores()});
closeBtn.addEventListener("click", function () {hideHighscores()});

//Render quiz
function buildQuiz() {
    questionNumber = -1;
    timeleft = 60;
    points = 1000;
    playerScore = 0;

    welcomeScreen.style.display = "none";
    results.style.display = "none";
    quizScreen.style.display = "flex";

    timeLeft.textContent = timeleft;

    setTimeInterval = setInterval(setTime, 1000);

    scoreTimerInterval = setInterval(scoreTimer, 10);

    nextQuestion();
}


//10 second timer to award points based on how quickly you answer.
function scoreTimer () {
    if (points > 0) {
        points -= 1;
    };
};

//60 second timer to complete entire quiz.
function setTime() {
    if (timeleft > 0) {
        timeleft--;
        timeLeft.textContent = timeleft;
    } else {
        showResults();
    };
};

//Renders next question/answers if any available or ends quiz
function nextQuestion () {
    questionNumber++;

    if (questionNumber < quizQuestions.length) {
        questionEl.textContent = quizQuestions[questionNumber].question;
        answer1.textContent = quizQuestions[questionNumber].answers.a;
        answer2.textContent = quizQuestions[questionNumber].answers.b;
        answer3.textContent = quizQuestions[questionNumber].answers.c;
        answer4.textContent = quizQuestions[questionNumber].answers.d;
    } else {
        showResults();
    };
};

//Checks correct answer against variable given with click. Deducts 5 seconds for incorrect answers
function answerChecker (x) {
    if (x == quizQuestions[questionNumber].correctAnswer) {
        playerScore += points;
        points = 1000
        nextQuestion();
    } else {
        timeleft -= 5;
    };
};

//Renders results and prompts for highscore input if necessary (Need to add high score functionality)
function showResults() {
    quizScreen.style.display = "none";
    results.style.display = "flex";

    clearInterval(setTimeInterval);
    clearInterval(scoreTimerInterval);

    score.textContent = playerScore;
    
    scoreChecker();
};    

//Check if score is in top 10
function scoreChecker() {
    if (playerScore > lowestScore) {
        submitHighscore();
    };
}

//Prompt for initials and submit highscore
function submitHighscore() {
    var initials = prompt("You got a highscore! Enter your intials:");
    var newScore = {playerScore, initials};

    highScores.push(newScore);
    highScores.sort((a, b) => b.playerScore - a.playerScore);
    highScores.splice(10);
    localStorage.setItem("highscoresLS", JSON.stringify(highScores));
} 

function showHighscores() {
    highscoresEl.style.display = "flex";

    while (highscores.firstChild) {
        highscores.removeChild(highscores.firstChild);
      }

    highScores.sort((a, b) => b.playerScore - a.playerScore);

    for (i = 0; i < highScores.length; i++) {
        var createHS = document.createElement("li");
        createHS.className = "HSList";
        createHS.textContent = highScores[i].playerScore + "    " + highScores[i].initials;
        highscores.appendChild(createHS);
    }
}

function hideHighscores() {    
    highscoresEl.style.display = "none";
}