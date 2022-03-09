const guessed = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordProgress = document.querySelector(".word-in-progress");
const guessRemaining = document.querySelector(".remaining");
const guessCount = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgain = document.querySelector(".play-again");

const word = "magnolia";
const guessedLetters = [];

const placeCircles = function (word) {
    const letterArray = [];
    for (let letter of word) {
        letterArray.push("●");
    }
    wordProgress.innerText = letterArray.join("");
};

placeCircles(word);


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

const makeGuess = function(goodGuess) {
    goodGuess.toUpperCase();

    if (guessedLetters.includes(goodGuess)) {
        message.innerText = `You've already guessed ${goodGuess.toUpperCase()}. Please try again.`;
    } else {
        guessedLetters.push(goodGuess);
        displayGuesses(guessedLetters);
        progressUpdate(guessedLetters);
    }
    console.log(guessedLetters);
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
    // const wordUpper = word.toUpperCase();
    // const wordArray = wordUpper.split("");
    const progressArray = [];
    
    for (const letter of word) {
        if (guessedLetters.includes(letter)) {
            progressArray.push(letter.toUpperCase());
        } else {
        progressArray.push("●");
        };
    };
    wordProgress.innerText = progressArray.join("");
    playerWin();
};

const playerWin = function () {
    if (!wordProgress.innerText.includes("●")) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
    };
};
            
guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    const guess = letterInput.value;

    message.innerText = "";

    const goodGuess = checkInput(guess);

    if (goodGuess) {
        makeGuess(goodGuess);
    };

    letterInput.value = "";
});