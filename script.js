let timerEl = document.getElementById("timer");
let speedTypingTestEl = document.getElementById("speedTypingTest");
let quoteDisplayEl = document.getElementById("quoteDisplay");
let quoteInputEl = document.getElementById("quoteInput");
let resultEl = document.getElementById("result");
let submitBtnEl = document.getElementById("submitBtn");
let resetBtnEl = document.getElementById("resetBtn");
let spinnerEl = document.getElementById("spinner");

let timer = 0;
let timerInterval = null;
let currentQuote = "";


function displayQuote(quote) {
    currentQuote = quote.quote;
    quoteDisplayEl.textContent = currentQuote;
    spinnerEl.classList.add("d-none");

}

function stopTimer() {
    clearInterval(timerInterval);
}

function startTimer() {
    stopTimer();
    timer = 0;
    timerEl.textContent = "0";
    timerInterval = setInterval(() => {
        timer++;
        timerEl.textContent = timer;
    }, 1000);
}

function displayQuote(data) {
    currentQuote = data.content;
    quoteDisplayEl.textContent = currentQuote;
    spinnerEl.classList.add("d-none");
}

function fetchQuoteAndStartTest() {
    quoteInputEl.value = "";
    resultEl.textContent = "";
    spinnerEl.classList.remove("d-none");

    fetch("https://apis.ccbp.in/random-quote")
        .then(response => response.json())
        .then(data => {
            displayQuote(data);
            startTimer();
        });
}

function submitTest() {
    let userInput = quoteInputEl.value.trim();
    if (userInput === currentQuote) {
        stopTimer();
        resultEl.textContent = `You took ${timer} seconds`;
        submitBtnEl.disabled = true;
    } else {
        resultEl.textContent = "You typed an incorrect sentence";
    }
}

function resetTest() {
    stopTimer();
    submitBtnEl.disabled = false;
    timerEl.textContent = "0";
    fetchQuoteAndStartTest();
}



window.addEventListener("load", fetchQuoteAndStartTest);
submitBtnEl.addEventListener("click", submitTest);
resetBtnEl.addEventListener("click", resetTest);
