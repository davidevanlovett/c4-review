var aButton = document.querySelector('#A');
var bButton = document.querySelector('#B');
var cButton = document.querySelector('#C');
var dButton = document.querySelector('#D');
var hsButton = document.querySelector('#hs-button');
var questionTextEl = document.querySelector('#question-text');
var scoreEl = document.querySelector('#score');
var highScoresEl = document.querySelector('#high-scores');
var timeLeftEl = document.querySelector('#time-left');
var timeLeft = 60;
var secondsTimer;
var questions = [
	{
		text: "What of the following is not a data type?",
		answers: ["Number", "String", "Boolean", "Function"],
		correctAnswer: 3
	},
	{
		text: "B is correct",
		answers: ["A", "B", "C", "D"],
		correctAnswer: 1
	},
	{
		text: "C is correct",
		answers: ["A", "B", "C", "D"],
		correctAnswer: 2
	},
	{
		text: "D is correct",
		answers: ["A", "B", "C", "D"],
		correctAnswer: 3
	}
];
var questionsIndex = 0;

/**
 * Begins the game, starts timer off.
 */
function startGame() {
	timeLeftEl.textContent = timeLeft;

	secondTimer = setInterval(function() {
		console.log(timeLeft)
		timeLeft--;
		console.log(timeLeftEl)
		timeLeftEl.textContent = timeLeft;
		if(timeLeft <= 0){
			timeLeft = 0;
			clearInterval(secondTimer);
			endGame();
		}
	}, 1000);

	presentCurrentQuestion();
}

/**
 * Writes the current question based on questionsIndex to the DOM
 */
function presentCurrentQuestion() {
	var currentQuestion = questions[questionsIndex];
	questionTextEl.textContent = currentQuestion.text;
	aButton.textContent = currentQuestion.answers[0];
	bButton.textContent = currentQuestion.answers[1];
	cButton.textContent = currentQuestion.answers[2];
	dButton.textContent = currentQuestion.answers[3];
}


/**
 * handler applied to all buttons clicked by the user?
 */
function handleQuestionAnswer(userAnswer) {
	var currentQuestion = questions[questionsIndex];
	if (userAnswer === currentQuestion.correctAnswer) {
		nextQuestion();
	}
	else {
		timeLeft -= 10;
		timeLeftEl.textContent = timeLeft;
		nextQuestion();
	}
}



/**
 * Advances to nextQuestion or ends the game if no questions left
 */
function nextQuestion() {
	questionsIndex++;
	if (questions.length > questionsIndex ) {
		presentCurrentQuestion();
	}
	else {
		endGame();
	}
}

/**
 * Handles cleanup
 */
function endGame() {
	console.log(timeLeft);
	clearInterval(secondTimer);
	scoreEl.textContent = timeLeft;
	highScoresEl.style = "";
}

// TODO
function handleScore(){

}

hsButton.addEventListener('click', function(){
	handleScore();
})
aButton.addEventListener('click', function(){
	handleQuestionAnswer(0);
})
bButton.addEventListener('click', function(){
	handleQuestionAnswer(1);
})
cButton.addEventListener('click', function(){
	handleQuestionAnswer(2);
})
dButton.addEventListener('click', function(){
	handleQuestionAnswer(3);
})

startGame();