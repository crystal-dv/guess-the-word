const guessed = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterEntered = document.querySelector(".letter");
const wordProgress = document.querySelector(".word-in-progress");
const guessRemaining = document.querySelector(".remaining");
const guessCount = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgain = document.querySelector(".play-again");

const word = "magnolia";

const placeCircles = function (word) {
    const letterArray = [];
    for (const letter of word) {
        // console.log(letter);
        letterArray.push("●");
    }
    wordProgress.innerText = letterArray.join("");
};

placeCircles(word);

guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    const guess = letterEntered.value;
    // console.log(guess);
    letterEntered.value = "";
});