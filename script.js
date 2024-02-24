"use strict";

const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElements = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElements.classList.remove("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}
function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}
function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStausClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStausClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
  }
}

function setStausClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}
function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}
const questions = [
  {
    question: "What is 2 * 2?",
    answers: [
      { text: "4", correct: true },
      { text: "6", correct: false },
    ],
  },

  {
    question: "Which country is the highest salary in the world?",
    answers: [
      { text: "Luxembourg", correct: true },
      { text: "Switzerland", correct: false },
      { text: "Norway", correct: false },
      { text: "United States", correct: false },
    ],
  },
  {
    question: "Which country has healthiest food in the world?",
    answers: [
      { text: "Indian", correct: false },
      { text: "Japanese", correct: true },
      { text: "Korean", correct: false },
      { text: "Nordic Scandinavian", correct: false },
    ],
  },
  {
    question: "When is the next world cup?",
    answers: [
      { text: "2026", correct: true },
      { text: "2027", correct: false },
      { text: "2028", correct: false },
      { text: "2029", correct: false },
    ],
  },
];
