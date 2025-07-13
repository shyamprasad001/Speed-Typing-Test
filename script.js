let timerEl = document.getElementById("timer");
let speedTypingTestEl = document.getElementById("speedTypingTest");
let quoteDisplayEl = document.getElementById("quoteDisplay");
let quoteInputEl = document.getElementById("quoteInput");
let resultEl = document.getElementById("result");
let submitBtnEl = document.getElementById("submitBtn");
let resetBtnEl = document.getElementById("resetBtn");
let spinnerEl = document.getElementById("spinner");
let quoteDisplayContainer = document.getElementById("quoteDisplayContainer");

let timer = 0;
let timerInterval = null;
let currentQuote = "";

function displayQuote(quote) {
  currentQuote = quote.quote;
  quoteDisplayEl.textContent = currentQuote;
  spinnerEl.classList.add("d-none");
  quoteDisplayContainer.classList.remove("d-none");
}

function startTimer() {
  timer = 0;
  timerEl.textContent = "0";
  timerInterval = setInterval(() => {
    timer++;
    timerEl.textContent = timer;
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function fetchQuoteAndStartTest() {
  quoteDisplayEl.textContent = "";
  quoteInputEl.value = "";
  resultEl.textContent = "";
  spinnerEl.classList.remove("d-none");

  const quoteUrl = "https://api.api-ninjas.com/v1/quotes";
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-Api-Key": "QiNqBnpBRNowKa56L6PMgw==XrwYy0WfYhJwaOpz",
    },
  };

  fetch(quoteUrl, options)
    .then((response) => response.json())
    .then((data) => {
      displayQuote(data[0]);
      startTimer();
    });
}

function submitTest() {
  let userInput = quoteInputEl.value.trim();
  if (userInput === currentQuote) {
    stopTimer();
    resultEl.textContent = `you taken ${timer} seconds`;
  } else {
    resultEl.textContent = "you typed incorrect sentence";
  }
}

function resetTest() {
  stopTimer();
  timerEl.textContent = "0";
  fetchQuoteAndStartTest();
}

window.addEventListener("load", fetchQuoteAndStartTest);
submitBtnEl.addEventListener("click", submitTest);
resetBtnEl.addEventListener("click", resetTest);
