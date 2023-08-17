const quizData = [
  {
    question: "What is the capital of France?",
    options: ["London", "Paris", "Berlin", "Madrid"],
    correct: "Paris",
  },
  {
    question: "Which planet is known as the 'Red Planet'?",
    options: ["Mars", "Venus", "Jupiter", "Mercury"],
    correct: "Mars",
  },
  // Add more questions here
];

const timerElement = document.getElementById("time");
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const submitButton = document.getElementById("submit-btn");
const resultElement = document.getElementById("result");

let currentQuestion = 0;
let timeLeft = 60;
let score = 0;
let incorrectAnswers = [];
let timer;

function startTimer() {
  timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
  timeLeft--;
  timerElement.textContent = timeLeft + " seconds";

  if (timeLeft <= 0 || currentQuestion >= quizData.length) {
    clearInterval(timer);
    showResult();
  }
}

function showQuestion() {
  if (currentQuestion < quizData.length) {
    const question = quizData[currentQuestion];
    questionElement.textContent = question.question;
    optionsElement.innerHTML = "";

    question.options.forEach((option) => {
      const label = document.createElement("label");
      label.innerHTML = `<input type="radio" name="answer" value="${option}"> ${option}`;
      optionsElement.appendChild(label);
    });
  } else {
    showResult();
  }
}

function showResult() {
  optionsElement.style.display = "none";
  submitButton.style.display = "none";
  timerElement.style.display = "none";

  const accuracy = ((score / quizData.length) * 100).toFixed(2);
  resultElement.innerHTML = `
    <p>You scored ${score} out of ${quizData.length}!</p>
    <p>Your accuracy: ${accuracy}%</p>
  `;

  if (incorrectAnswers.length > 0) {
    resultElement.innerHTML += "<p>Incorrect answers:</p>";
    const incorrectList = document.createElement("ul");
    incorrectAnswers.forEach((questionIndex) => {
      const question = quizData[questionIndex];
      const li = document.createElement("li");
      li.innerHTML = `${question.question} - Correct Answer: ${question.correct}`;
      incorrectList.appendChild(li);
    });
    resultElement.appendChild(incorrectList);
  }
}

function handleAnswerSubmit() {
  const selectedOption = document.querySelector('input[name="answer"]:checked');
  if (selectedOption) {
    const userAnswer = selectedOption.value;
    const correctAnswer = quizData[currentQuestion].correct;
    if (userAnswer === correctAnswer) {
      score++;
    } else {
      incorrectAnswers.push(currentQuestion);
    }
  }
  currentQuestion++;
  showQuestion();
}

submitButton.addEventListener("click", handleAnswerSubmit);

// Initialize the quiz
startTimer();
showQuestion();

