var aButton = document.querySelector('#A');
var bButton = document.querySelector('#B');
var cButton = document.querySelector('#C');
var dButton = document.querySelector('#D');
var beginButton = document.querySelector('#begin-button');
var hsButton = document.querySelector('#hs-button');
var initialsInputEl = document.querySelector('#initials-input');
var questionTextEl = document.querySelector('#question-text');
var scoreEl = document.querySelector('#score');
var highScoresSectionEl = document.querySelector('#high-scores-section');
var gameSectionEl = document.querySelector('#game-section');
var beginSectionEl = document.querySelector('#begin-game-section');
var timeLeftEl = document.querySelector('#time-left');
var scoresTableBodyEl = document.querySelector('#scores-table-body');

var timeLeft = 60;
var secondsTimer;

var scores = JSON.parse(localStorage.getItem('scores')) || [];
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

function handleBeginGame() {
	hideBeginGameSection();
	startGame();
}

/**
 * Begins the game, starts timer off.
 */
function startGame() {
	showGameSection();
	secondTimer = setInterval(function () {
		timeLeft--;
		timeLeftEl.textContent = timeLeft;
		if (timeLeft <= 0) {
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
	if (questions.length > questionsIndex) {
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
	clearInterval(secondTimer);
	scoreEl.textContent = timeLeft;
	hideGameSection();
	showScores();
	showHighScoreSection();
}

function resetGame() {
	hideHighScoreSection();
	hideGameSection();
	showBeginGameSection();
	scores = JSON.parse(localStorage.getItem('scores')) || [];
	scoreEl.textContent = "TBD";
	questionsIndex = 0;
	timeLeft = 60
	timeLeftEl.textContent = timeLeft;
}


function handleScore() {
	var score = timeLeft;
	var initials = initialsInputEl.value;
	initialsInputEl.value = "";
	
	scores.push({
		score: score,
		initials: initials
	});
	localStorage.setItem('scores', JSON.stringify(scores));
	resetGame();
}

function showScores(){
	scores.sort((a,b) => b.score - a.score);
	scoresTableBodyEl.innerHTML = "";
	for(var i = 0; i < scores.length; i++){
		const score = scores[i];
		const tr = document.createElement('tr');
		const initials = score.initials;
		const initialsCell = document.createElement('td');
		initialsCell.textContent = initials;
		tr.appendChild(initialsCell);
		const thisScore = score.score;
		const thisScoreCell = document.createElement('td');
		thisScoreCell.textContent = thisScore;
		tr.appendChild(thisScoreCell);
		scoresTableBodyEl.appendChild(tr);
	}
}

function hideGameSection() {
	gameSectionEl.style = "display:none;";
}
function showGameSection() {
	gameSectionEl.style = "";
}
function hideBeginGameSection() {
	beginSectionEl.style = "display:none;";
}
function showBeginGameSection() {
	beginSectionEl.style = "";
}
function hideHighScoreSection() {
	highScoresSectionEl.style = "display:none;";
}
function showHighScoreSection() {
	highScoresSectionEl.style = "";
}

hsButton.addEventListener('click', function () {
	handleScore();
})
aButton.addEventListener('click', function () {
	handleQuestionAnswer(0);
})
bButton.addEventListener('click', function () {
	handleQuestionAnswer(1);
})
cButton.addEventListener('click', function () {
	handleQuestionAnswer(2);
})
dButton.addEventListener('click', function () {
	handleQuestionAnswer(3);
})
beginButton.addEventListener('click', function () {
	handleBeginGame();
})
