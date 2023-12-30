const quizs = [
  {
    quiz: "2 + 2 ?",
    answers: [
      { text: "4", correct: true },
      { text: "6", correct: false },
    ],
  },
  {
    quiz: "3 + 3 ?",
    answers: [
      { text: "9", correct: false },
      { text: "6", correct: true },
    ],
  },
  {
    quiz: "4 * 5 ?",
    answers: [
      { text: "20", correct: true },
      { text: "25", correct: false },
    ],
  },
];

const startBtn = document.getElementById("start");
const nextBtn = document.getElementById("next");
const quizConEl = document.getElementById("quiz-con");
const quizEl = document.getElementById("quiz");
const answerEl = document.getElementById("ans-btns");
// 피드백 생성
const feedback = document.createElement("div");

let shuffledQuiz, currentQuizIndex;

function startGame() {
  startBtn.classList.add("hide");
  // quiz 랜덤으로 배열
  shuffledQuiz = quizs.sort(() => Math.random() - 0.5);
  // 인덱스 0부터 퀴즈 시작
  currentQuizIndex = 0;
  // 퀴즈 보이게 변경
  quizConEl.classList.remove("hide");
  setNextQuiz();

  if (startBtn.innerText === "Restart") {
    quizConEl.removeChild(feedback);
  }
}
startBtn.addEventListener("click", startGame);

function setNextQuiz() {
  resetState();  
  showQuiz(shuffledQuiz[currentQuizIndex]);
}

nextBtn.addEventListener("click", () => {
  quizConEl.removeChild(feedback);
  currentQuizIndex++;
  setNextQuiz();
});

function resetState() {
  // Next 버튼 숨기기
  nextBtn.classList.add("hide");
}

function showQuiz(quiz) {
  quizEl.innerText = quiz.quiz;

  answerEl.innerHTML = "";
  // answer 버튼 생성
  quiz.answers.forEach((answer) => {
    const btn = document.createElement("button");
    btn.innerText = answer.text;
    btn.classList.add("btn");

    if (answer.correct) {
      btn.dataset.correct = answer.correct;
    }

    btn.addEventListener("click", selectAnswer);
    answerEl.appendChild(btn);
  });
}

function selectAnswer(e) {
  const selectBtn = e.target;
  const correct = selectBtn.dataset.correct;

  // 선택한 버튼이 정답이라면 correct, 아니라면 wrong
  setStatusClass(selectBtn, correct);

  // 텍스트로 정답 또는 오답 표시
  feedback.classList.add("feedback");
  feedback.innerText = correct ? "정답입니다!" : "틀렸습니다.";
  quizConEl.appendChild(feedback);

  Array.from(answerEl.children).forEach((btn) => {
    setStatusClass(btn, btn.dataset.correct);
  });
  // 모든 퀴즈를 다 풀었으면 Restart 버튼, 아니라면 Next 버튼
  if (shuffledQuiz.length > currentQuizIndex + 1) {
    nextBtn.classList.remove("hide");
    nextBtn.classList.remove("feedback");
  } else {
    startBtn.innerText = "Restart";
    startBtn.classList.remove("hide");
  }
}

function setStatusClass(element, correct) {
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
