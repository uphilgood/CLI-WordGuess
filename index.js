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

function initiate() {
    pastWords = [];
  console.log("Hello, and welcome to Programming word guess!");
  console.log("------------------------------------------");
  playGame();
}

function playGame() {
    currentWord = "";
    numOfGuesses = 15;
    if(pastWords.length < wordChoices.length) {
      currentWord = getWord();
    } else {
      // WIN CONDITION
      console.log("You sure do know your programming languages!");
      continuePrompt();
    }
  
      word = new Words(currentWord);
      console.log(word)
      word.makeLetters();
      makeGuess();
    
  }

  function getWord() {
    let random = Math.floor(Math.random() * wordChoices.length);
    let randomWord = wordChoices[random];
    if(pastWords.indexOf(randomWord) === -1) {
      pastWords.push(randomWord);
      return randomWord;
    } else {
      return getWord();
    }
  }

  function makeGuess() {
    let checker = [];
    inquirer.prompt([
      {
        name: "guessedLetter",
        message: "\nGuess a letter!" +
                "\nGuesses Left: " + numOfGuesses
      }
    ])
    .then(data => {
      word.letters.forEach(letter => {
        letter.checkLetter(data.guessedLetter);
        checker.push(letter.getCharacter());
      });
      console.log(checker.toString())
      if(numOfGuesses > 0 && checker.indexOf("_") !== -1) {
        numOfGuesses--;
        if(numOfGuesses === 0) {
          console.log("YOU RAN OUT OF GUESSES! GAME OVER.");
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
  
  function continuePrompt() {
    let checker = [];
    inquirer.prompt([
      {
        name: "continue",
        message: "Do you want to play again?",
        type: 'confirm'
      }
    ])
    .then(data => {
     if (data.continue) {
      playGame()
     } else console.log("Thanks for playing! See you next time!")
      });
    }


    
  

  initiate()
 
