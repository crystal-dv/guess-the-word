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
    for (const letter of word) {
        // console.log(letter);
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
        message.innerText = `You've already guessed ${goodGuess}. Please try again.`;
    } else {
        guessedLetters.push(goodGuess);
    }
    console.log(guessedLetters);
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