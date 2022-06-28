const guessed = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordProgress = document.querySelector(".word-in-progress");
const guessRemaining = document.querySelector(".remaining");
const guessCount = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgain = document.querySelector(".play-again");
const guessForm = document.querySelector(".guess-form");

let word = "magnolia";
let guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function () {
    const res = await fetch ("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const data = await res.text();
    const wordArray = data.split("\n");
    let randomIndex = Math.floor(Math.random() * wordArray.length);
    let randomWord = wordArray[randomIndex];
    word = randomWord.trim();

    placeCircles(word);    
};

const placeCircles = function (word) {
    const letterArray = [];
    for (let letter of word) {
        letterArray.push("●");
    }
    wordProgress.innerText = letterArray.join("");
};

getWord();

guessButton.addEventListener("click", function (e) {
    e.preventDefault();

    message.innerText = "";  
    const guess = letterInput.value;
    const goodGuess = checkInput(guess);

    if (goodGuess) {
        makeGuess(guess);
    };

    letterInput.value = "";
});

const checkInput = function (guess) {
    const acceptedLetter = /[a-zA-Z]/;

    if (guess === "") {
        message.innerText = "Please enter a guess.";
    } else if (guess.length > 1) {
        message.innerText = "Please guess one letter.";
    } else if (!guess.match(acceptedLetter)) {
        message.innerText = "Please enter a letter.";
    } else {
        message.innerText = `${guess.toUpperCase()}`;
        return guess;
    };
};

const makeGuess = function(guess) {
    guess = guess.toUpperCase();

    if (guessedLetters.includes(guess)) {
        message.innerText = `You've already guessed ${guess.toUpperCase()}. Try something else, silly.`;
    } else {
        guessedLetters.push(guess);
        displayGuesses(guessedLetters);
        guessCounter(guess);
        progressUpdate(guessedLetters);
    };
};

const displayGuesses = function (guessedLetters) {
    guessed.innerHTML = "";
    guessedLetters.forEach(function (letter) {
        let listItem = document.createElement("li");
        listItem.innerHTML = letter.toUpperCase();
        guessed.append(listItem);
    });
};

const progressUpdate = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const progressArray = [];
    
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            progressArray.push(letter.toUpperCase());
        } else {
        progressArray.push("●");
        };
    };
    wordProgress.innerText = progressArray.join("");
    playerWin();
};

const guessCounter = function(guess) {
    word.toUpperCase();

    if (!word.includes(guess)) {
        message.innerText = `The word does not contain ${guess.toUpperCase()}.`;
        remainingGuesses = remainingGuesses - 1;         
    } else {
        message.innerText = `Yes! ${guess.toUpperCase()} is a correct guess!`;
    };


    if (remainingGuesses === 0) {
        message.innerText = `Game Over... The word is ${word.toUpperCase()}.`;
        startOver();
    } else if (remainingGuesses === 1) {
        guessCount.innerText = `${remainingGuesses} guess `;
    } else {
        guessCount.innerText = `${remainingGuesses} guesses `;
    };
    return remainingGuesses;
};

const playerWin = function () {
    if (!wordProgress.innerText.includes("●")) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
        startOver();
    };
};  

const startOver = function () {
    guessButton.classList.add("hide");
    guessRemaining.classList.add("hide");
    guessed.classList.add("hide");
    playAgain.classList.remove("hide");
};

playAgain.addEventListener("click", function () {
    message.classList.remove("win");
    message.innerText = "";
    guessed.innerText = "";
    remainingGuesses = 8;
    guessedLetters = [];
    guessCount.innerText = `${remainingGuesses} guesses `;
    guessButton.classList.remove("hide");
    guessRemaining.classList.remove("hide");
    guessed.classList.remove("hide");
    playAgain.classList.add("hide");
    getWord();
});