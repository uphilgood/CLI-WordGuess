const Words = require("./word.js");
const inquirer = require('inquirer');
const prompt = require('prompt');
const wordChoices = [
  "javascript", "angular", "react",
  "node", "java", "html",
  "css", "express", "vue",
  "swift", "sql"
];

let numOfGuesses;
let pastWords;
let word;
let currentWord;

prompt.start();

//
// Get two properties from the user: username and email
//
prompt.get(['username', 'email'], function (err, result) {
  console.log('Hello, ' + result.username + '! welcome to Programming word guess!');
  initiate()
});

// initiate the game
function initiate() {
  pastWords = [];
  console.log("------------------------------------------");
  playGame();
}

// sets start conditions and create new Word
function playGame() {
  currentWord = "";
  numOfGuesses = 15;
  if (pastWords.length < wordChoices.length) {
    currentWord = getWord();
  } else {
    // WIN CONDITION
    console.log("You sure do know your programming languages!");
    continuePrompt();
  }

  word = new Words(currentWord);
  word.makeLetters();
  makeGuess();

}

// gets randomm word and pushes chosen word to pastWords array
function getWord() {
  let random = Math.floor(Math.random() * wordChoices.length);
  let randomWord = wordChoices[random];
  if (pastWords.indexOf(randomWord) === -1) {
    pastWords.push(randomWord);
    return randomWord;
  } else {
    return getWord();
  }
}

// handles user guesses
function makeGuess() {
  let checker = [];
  inquirer.prompt([{
      name: "guessedLetter",
      message: "\nGuess a letter!" +
        "\nGuesses Left: " + numOfGuesses
    }])
    .then(data => {
      word.letters.forEach(letter => {
        letter.checkLetter(data.guessedLetter);
        checker.push(letter.getCharacter());
      });

      console.log(checker.toString())

      if (numOfGuesses > 0 && checker.indexOf("_") !== -1) {
        numOfGuesses--;
        if (numOfGuesses === 0) {
          console.log("SORRY!  GAME OVER!");
          continuePrompt();
        } else {
          makeGuess();
        }
      } else {
        console.log("CONGRATULATIONS! YOU GOT THE WORD!");
        console.log(word.update());
        playGame();
      }
    });
}

// asks user to continue
function continuePrompt() {
  let checker = [];
  inquirer.prompt([{
      name: "continue",
      message: "Do you want to play again?",
      type: 'confirm'
    }])
    .then(data => {
      if (data.continue) {
        playGame()
      } else console.log("Thanks for playing! See you next time!")
    });
}