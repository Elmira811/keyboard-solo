const wordContainer = document.querySelector(".word");
const correctCount = document.querySelector(".correct-count");
const wrongCount = document.querySelector(".wrong-count");
const wordMistakes = document.querySelector(".word-mistakes");
const timer = document.querySelector("#timer");

const words = ["banana", "language", "kitten", "garden", "government", "beauty", "childhood", "summer", "candle", "building"];

let randomWord;
let spans;

function getRandomWord() {
  randomWord = words[Math.floor(Math.random() * words.length)];

  wordContainer.textContent = "";

  for (let letter of randomWord) {
    const span = document.createElement("span");
    span.textContent = letter;
    wordContainer.append(span);
  }

  spans = wordContainer.querySelectorAll("span");
}

getRandomWord();

let currentIndex = 0;
let correctWords = 0;
let wrongWords = 0;
let currentWordMistakes = 0;
let seconds = 0;
let minutes = 0;

function format(val) {
  if (val < 10) {
    return `0${val}`;
  }

  return val;
}

const timerID = setInterval(() => {
  seconds++;

  if (seconds === 60) {
    minutes++;
    seconds = 0;
  }

  timer.textContent = `${format(minutes)}:${format(seconds)}`;
}, 1000);

document.addEventListener("keydown", function(event) {
  const currentSpan = spans[currentIndex];

  if (event.key === randomWord[currentIndex]) {
    currentSpan.classList.add("c");
    currentSpan.classList.remove("w");
    currentIndex++;
  } else {
    currentSpan.classList.add("w");
  }

  if (currentSpan.classList.contains("w")) {
    currentWordMistakes++;
    wordMistakes.textContent = currentWordMistakes;
  }

  if (currentIndex === randomWord.length && currentWordMistakes === 0) {
    correctWords++;
    correctCount.textContent = correctWords;
  } else if (currentIndex === randomWord.length && currentWordMistakes > 0) {
    wrongWords++;
    wrongCount.textContent = wrongWords;
  }

  if (correctWords === 5 || wrongWords === 5) {
    clearInterval(timerID);
    const message = correctWords === 5
    ? `Победа! Ваше время ${timer.textContent}`
    : "Увы! Вы проиграли. Попрубуйте ещё раз.";
    alert(message);
  }

  if (currentIndex === randomWord.length) {
    getRandomWord();
    currentIndex = 0;
    currentWordMistakes = 0;
    wordMistakes.textContent = "0";
  }
})
