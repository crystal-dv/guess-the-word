const guessed = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordProgress = document.querySelector(".word-in-progress");
const guessRemaining = document.querySelector(".remaining span");
const guessCount = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgain = document.querySelector(".play-again");

let word = "magnolia";
const guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function () {
    const res = await fetch ("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const data = await res.text();
    const wordArray = data.split("\n");
    let randomIndex = Math.floor(Math.random() * wordArray.length);
    let randomWord = wordArray[randomIndex];
    word = randomWord.trim();
    // console.log(word);

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
        message.innerText = `You've already guessed ${goodGuess.toUpperCase()}. Try something else, silly.`;
    } else {
        guessedLetters.push(goodGuess);
        displayGuesses(guessedLetters);
        guessCounter(goodGuess);
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

const guessCounter = function(goodGuess) {
    word.toUpperCase();

    if (!word.includes(goodGuess)) {
        message.innerText = `The word does not contain ${goodGuess.toUpperCase()}.`;
        remainingGuesses = remainingGuesses - 1;         
    } else {
        message.innerText = `Yes! ${goodGuess.toUpperCase()} is a correct guess!`;
    };


    if (remainingGuesses === 0) {
        message.innerText = `Game Over... The word is ${word}.`;
        guessRemaining.innerText = `${remainingGuesses} guesses `;
    } else if (remainingGuesses === 1) {
        guessRemaining.innerText = `${remainingGuesses} guess `;
    } else {
        guessRemaining.innerText = `${remainingGuesses} guesses `;
    };
    return remainingGuesses;
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