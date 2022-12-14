//Global variables
const question = document.getElementById("question-content");
const answer1 = document.getElementById("option1");
const answer2 = document.getElementById("option2");
const answer3 = document.getElementById("option3");
const answer4 = document.getElementById("option4");
const quizAnswers = document.getElementsByClassName("answers");
const next_button = document.getElementById("next-button");
let curr_track = document.createElement('audio');
let turn = 0;
let isButtonClicked = true;

// List of words
const words = ["violin", "trombone", "guitar", "ukulele"]

//Select a random word from from list
let selectedWord = words[Math.floor(Math.random() * words.length)];

// Tracks user answers 
let wrongAnswersCounter = 0
let answersCounter = -1

let questions = [{
        question: 'Who sings this song',
        incorrect: ["Shakira", "Beyonce", "Adele"],
        correct: ["Lady Gaga"],
        path: "badRomance.mp4",

    },
    {

        question: 'In which FIFA world cup was "Waka Waka" played?',
        incorrect: ["2002", "2006", "2014"],
        correct: ["2010"],
        
    },
    {
        question: "Who sings the song 'La camisa negra'? ",
        incorrect: ["Ricky Martin", "Louis Fonsi", "Eminem"],
        correct: ["Juanes"],
    },
    {
        question: "Where was the artist 'Sia'? born",
        incorrect: ["US", "Canada", "New Zealand"],
        correct: ["Australia"],
       
    },
    {
        question: "What artist has released the most albums?",
        incorrect: ["Buckethead", "Frank Zappa", "Elvis Presley"],
        correct: ["Masami Akita"],
    },
    {
        question: "Where has the highest-attended concert been held?",
        incorrect: ["Moscow", "Paris", "Philadelphia"],
        correct: ["Rio de Janeiro"],
    },
    {
        question: "The average time listening to music per week is:",
        incorrect: ["2 hours", "6 hours", "12 hours"],
        correct: ["18 hours"],
    },
    {
        question: "The Mozart effect is related to:",
        incorrect: ["Hip hop", "Vocal music", "Reggae"],
        correct: ["Classical music"]
    },
    {
        question: "The oldest musical instrument found to date is:",
        incorrect: ["lithophone", "bullroarer", "trumpet"],
        correct: ["flute"]
    },

]
// start the quiz
let startQuiz = () => {
    availableQuestions = [...questions];

    getNewQuestion()
    curr_track.src = availableQuestions[turn].path;
    curr_track.play();
    setTimeout(() => {
        
        curr_track.pause();
    }, 3000);

    loadKeyboard();
    getNewQuestion();

}

next_button.addEventListener("click", () => {
    turn++;
    getNewQuestion()
    isButtonClicked = true
    if (turn === 8){
        $("#gameOver-Modal").modal('show');

    }
})



// display questions & answers
let getNewQuestion = () => {

    const currentQuestion = availableQuestions[turn];
    question.innerText = currentQuestion.question;
    let all_answers = currentQuestion.incorrect.concat(currentQuestion.correct);
    answer1.innerHTML = all_answers[0];
    answer2.innerHTML = all_answers[1];
    answer3.innerHTML = all_answers[2];
    answer4.innerHTML = all_answers[3];
    console.log(currentQuestion)
}

window.onload = startQuiz();

// get question's answers and apply a Click event to each of them
[...quizAnswers].forEach(answer => answer.addEventListener("click", selectAnswer))

// Change selected answer background when is correct or incorrect
function selectAnswer(e) {
    if (!isButtonClicked) {
        return;
    }
    isButtonClicked = false;
    const userChoice = e.target.innerHTML;
    const correctChoice = availableQuestions[turn].correct[0];
    if (userChoice === correctChoice) {
        e.target.style.backgroundColor = "rgb(179, 206, 56)";
        displayLetter();
    } else {
        e.target.style.backgroundColor = "red";
        dontDisplayLetter();
    }
    setTimeout(() => {
        e.target.style.backgroundColor = "#F6F3E8ff";
        e.target.style.color = "black";
    }, 1000);

}
if (turn.length === 8) {
    console.log(turn)
    $("#gameOver-Modal").modal('show');
}

// display keyboard
function loadKeyboard() {
    //Create keys
    for (let i = 0; i < selectedWord.length; i++) {
        if (i % 2 == 0) {
            let newKey = document.createElement('div');
            newKey.setAttribute('id', 'keyboard' + i);
            let keyboardArea = document.getElementById('keyboard-area');
            newKey.classList.add('col', 'border', 'border-dark', 'text-center', 'key-style');
            keyboardArea.appendChild(newKey);
        } else {
            let newKey = document.createElement('div');
            newKey.setAttribute('id', 'keyboard' + i);
            let keyboardArea = document.getElementById('keyboard-area');
            newKey.classList.add('col', 'border', 'border-dark', 'text-center', 'key-style');
            newKey.style.backgroundColor = "black";
            keyboardArea.appendChild(newKey);
        }
            

    }
}

// Display letter
function displayLetter() {
    answersCounter++;
    for (let i = answersCounter; i == answersCounter && i < selectedWord.length; i++) {
        let keyDiv = document.getElementById('keyboard' + i);
        keyDiv.innerHTML = selectedWord.charAt(i);
        keyDiv.style.backgroundColor = "rgb(179, 206, 56)";
}
}

//Don't display letter
function dontDisplayLetter() {
    answersCounter++;
    for (let i = answersCounter; i == answersCounter && i < selectedWord.length; i++) {
        let keyDiv = document.getElementById('keyboard' + i);
        keyDiv.style.backgroundColor = "red";
}
}

// check final answer
function checkAnswer() {
    let answerValue = document.getElementById('finalAnswer').value;

    if (answerValue == selectedWord) {
        $("#gameWin-Modal").modal('show');
    }
      else if (wrongAnswersCounter == 2){
        $("#noGuesses-Modal").modal('show');
        
    } else if (answerValue !== selectedWord){
        $("#wrongAnswer-Modal").modal('show');
        wrongAnswersCounter++;
        console.log(wrongAnswersCounter)
    } else {
        alert("ok")
    }
    
    
 
}
