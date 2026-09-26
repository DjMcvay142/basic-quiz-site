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
const headerScore = document.getElementById("header-score");
const progressDots = document.getElementById("progress-dots");
const questionCounter = document.getElementById("question-counter");
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

// Progress dots
let dots = [];
for (let i = 0; i < questions.length; i++) {
  const dot = document.createElement("div");
  dot.classList.add("dot");
  dots.push(dot);
  progressDots.appendChild(dot);
}

// Function to display the current question and update the score and question counter

function displayQuestion(questionIndex) {
  const question = questions[questionIndex];
  questionCounter.textContent = `${questionIndex + 1} of ${questions.length}`;
  headerScore.textContent = `Score: ${score}/${questions.length}`;
  for (let i = 0; i < dots.length; i++) {
    dots[i].className = "dot";
    if (i < questionIndex) {
      dots[i].classList.add("filled");
    } else if (i === questionIndex) {
      dots[i].classList.add("current");
    }
  }
  questionText.textContent = question.question;
  for (let i = 0; i < question.options.length; i++) {
    answerButtons[i].querySelector("span").textContent = question.options[i];
    answerButtons[i].disabled = false;
  }
}

for (let i = 0; i < answerButtons.length; i++) {
  answerButtons[i].addEventListener("click", function () {
    const currentQuestion = questions[questionIndex];
    const selectedAnswer = this.querySelector("span").textContent;
    const selectedButton = this;
    let correctButton = answerButtons.find(
      (button) =>
        button.querySelector("span").textContent === currentQuestion.answer,
    );

    const checkmarkSVG = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 12 9 17 20 6"></polyline></svg>`;

    if (selectedAnswer === currentQuestion.answer) {
      selectedButton.classList.add("correct");
      selectedButton
        .querySelector("span")
        .insertAdjacentHTML("afterend", checkmarkSVG);
      score++;
    } else {
      selectedButton.classList.add("incorrect");
      correctButton.classList.add("correct");
      correctButton
        .querySelector("span")
        .insertAdjacentHTML("afterend", checkmarkSVG);
    }

    for (let i = 0; i < answerButtons.length; i++) {
      answerButtons[i].disabled = true;
    }

    setTimeout(() => {
      selectedButton.classList.remove("correct", "incorrect");
      correctButton.classList.remove("correct");
      const existingIcon = questionScreen.querySelector(".answer-button svg");
      if (existingIcon) existingIcon.remove();

      questionIndex++;
      if (questionIndex < questions.length) {
        displayQuestion(questionIndex);
      } else {
        questionScreen.classList.add("hidden");
        resultsScreen.classList.remove("hidden");
        document.getElementById("score").textContent =
          `${score}/${questions.length}`;
      }
    }, 800);
  });
}
