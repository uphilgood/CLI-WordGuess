let Letters = function(letter) {
    this.letter = letter.toString(),
    this.placeholder = "__"
    this.guessed = false,
    this.guessedLetter = function() {
        if (this.guessed === true || this.letter === " ") {
            return this.letter;
        }else {
            return this.placeholder;
        }
    }

}


module.exports = Letters;