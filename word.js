const Letters = require("./letter.js");

let Words = function (word) {
    this.word = word.split("");
    this.letters = [];
    for (let i = 0; i < word.length; i++) {
        this.letters.push(new Letters(word[i]));
    }
    this.printWord = function () {
        let word = ""
        for (let i = 0; i < this.letters.length; i++) {
            word += this.letters[i].guessedLetter();
        }
        console.log("word: ", word + "\n");
    }
    this.guessLetter = function (letter) {
        for (let i = 0; i < this.letters.length; i++) {
            if (this.letters[i].letter === letter || this.letters[i].letter === " ") {
                this.letters[i].guessed = true;
            }
        }
    }

}

// let newWord = new Words("dog")
// newWord.guessLetter("o")
// newWord.printWord()
// newWord.guessLetter("d")
// newWord.printWord()
// newWord.guessLetter("l")
// newWord.printWord()

module.exports = Words;