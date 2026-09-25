const startButton = document.getElementById("start-button");
const startScreen = document.getElementById("start-screen");
const questionScreen = document.getElementById("question-screen");
const resultsScreen = document.getElementById("results-screen");
const answerButton0 = document.getElementById("answer-button-1");
const answerButton1 = document.getElementById("answer-button-2");
const answerButton2 = document.getElementById("answer-button-3");
const answerButton3 = document.getElementById("answer-button-4");
const answerButtons = [
  answerButton0,
  answerButton1,
  answerButton2,
  answerButton3,
];
const restartButton = document.getElementById("restart-button");
const questionTitle = document.getElementById("question-title");
const questionText = document.getElementById("question-text");
let questionIndex = 0;
let score = 0;

const questions = [
  {
    question: "What does CPU stand for?",
    options: [
      "Computer Processing Unit",
      "Central Processing Unit",
      "Central Program Utility",
      "Computer Program Unit",
    ],
    answer: "Central Processing Unit",
  },
  {
    question: "Which of these is volatile memory?",
    options: ["Hard Drive", "SSD", "RAM", "ROM"],
    answer: "RAM",
  },
  {
    question: "What is the binary representation of the decimal number 8?",
    options: ["1000", "0100", "1100", "0010"],
    answer: "1000",
  },
  {
    question: "What is the purpose of an operating system?",
    options: [
      "To create documents",
      "To manage hardware and software resources",
      "To browse the internet",
      "To play games",
    ],
    answer: "To manage hardware and software resources",
  },
  {
    question: "Which component is considered the 'brain' of the computer?",
    options: ["Hard Drive", "RAM", "CPU", "GPU"],
    answer: "CPU",
  },
];

startButton.addEventListener("click", function () {
  startScreen.classList.add("hidden");
  questionScreen.classList.remove("hidden");
  displayQuestion(questionIndex);
});

restartButton.addEventListener("click", function () {
  questionIndex = 0;
  score = 0;
  resultsScreen.classList.add("hidden");
  startScreen.classList.remove("hidden");
});

function displayQuestion(questionIndex) {
  const question = questions[questionIndex];
  questionTitle.textContent = `Question ${questionIndex + 1}`;
  questionText.textContent = question.question;
  for (let i = 0; i < question.options.length; i++) {
    answerButtons[i].textContent = question.options[i];
  }
}

for (let i = 0; i < answerButtons.length; i++) {
  answerButtons[i].addEventListener("click", function () {
    const currentQuestion = questions[questionIndex];
    const selectedAnswer = this.textContent;

    if (selectedAnswer === currentQuestion.answer) {
      alert("Correct!");
      score++;
    } else {
      alert("Incorrect!");
    }
    questionIndex++;
    if (questionIndex < questions.length) {
      displayQuestion(questionIndex);
    } else {
      alert("Quiz completed!");
      questionScreen.classList.add("hidden");
      resultsScreen.classList.remove("hidden");
      document.getElementById("score").textContent =
        `${score}/${questions.length}`;
    }
  });
}
