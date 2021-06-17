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

//quiz variables
const quizQuestions = [
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
    
]

var playerScore;
var questionNumber;
var timeleft;
var points;

//quiz functions
beginButton.addEventListener("click", function () {buildQuiz()});
playAgainButton.addEventListener("click", function() {buildQuiz()});

//Render quiz

// !!buildQuiz appears to be running multiple times concurrently when doing repeated play throughs. Must find solution.
function buildQuiz() {
    questionNumber = -1;
    timeleft = 60;
    points = 1000;
    playerScore = 0;

    welcomeScreen.style.display = "none";
    results.style.display = "none";
    quizScreen.style.display = "flex";

    timeLeft.textContent = timeleft;

    var setTimeInterval = setInterval(setTime, 1000);

    var scoreTimerInterval = setInterval(scoreTimer, 10);

    nextQuestion();

    answer1.addEventListener("click", function () {answerChecker("a")});
    answer2.addEventListener("click", function () {answerChecker("b")});
    answer3.addEventListener("click", function () {answerChecker("c")});
    answer4.addEventListener("click", function () {answerChecker("d")});

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
        console.log(questionNumber);
        
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
    };
    
};



function showHighscores() {}
