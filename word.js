const Letter = require("./letter.js");

function Word(word) {
  this.word = word;
  this.letters = [];

  this.makeLetters = function() {
    let wordArr = this.word.split("");
    wordArr.forEach(letter => {
        let newLetter = new Letter(letter);
      this.letters.push(newLetter);
    }) 
  }

  this.update = function() {
    let printedWord = ''
    this.letters.forEach(letter => {
      printedWord += letter.getCharacter() + " ";
    });
 
    return printedWord;
  }
}

module.exports = Word;

