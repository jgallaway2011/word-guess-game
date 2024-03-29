
//====================================================================================================================
// Word Guess Game
//====================================================================================================================

// IMPORTS
import {hangmanCanvas} from "./canvas.js"

// VARIABLES
var hipsterWordDisplay = document.getElementById("current-word-span");

//====================================================================================================================

// OBJECT
var wordGuessGame = {

    // Array of hipsterWords to be used for the game
    hipsterWords: [
        "SKATEBOARD",
        "MIXTAPE",
        "UNICORN",
        "VENMO",
        "TYPEWRITER",
        "CLICHE",
        "FORAGE",
        "OCCUPY",
        "SELFIES",
        "TOFU",
        "FLANNEL",
        "FAM",
        "VINYL",
        "ETSY",
        "YOGA",
        "BREWERY",
        "BEER",
        "MEDITATION",
        "PABST",
        "BICYCLE",
        "ARTISAN",
        "ORGANIC",
        "DISTILLERY",
        "PINTEREST",
        "AESTHETIC",
        "CORNHOLE"
    ],

    // Array to restrict keyboard choices to Enlgish letters
    englishLetters: [
        "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
    ],

    // Start the game with zero wins
    wins: 0,

    // Start the game with zero losses
    losses: 0,

    // To hold hipster word for each round of game
    hipsterWord: "",

    // To hold guesses remaining for selected word in each round of game
    guessesRemaining: 8,

    // Empty array that will hold " _ " for letters of randomly selected hipsterWord
    hipsterWordHidden: [],

    // Empty array that will be collect letters guessed by player
    lettersGuessed: [],

    // Method to select a random hipsterWord from the hipsterWords array
    selectHipsterWord: function() {
        var hipsterWordIndex = Math.floor(Math.random() * this.hipsterWords.length);
        this.hipsterWord = this.hipsterWords.splice(hipsterWordIndex, 1)[0];
    },

    // Method to insert random word into game display with "_" instead of the letters
    insertHipsterWord: function() {
        this.hipsterWordHidden = []
        for (var i = 0; i < this.hipsterWord.length; i++) {
            this.hipsterWordHidden.push("_");
        }
        hipsterWordDisplay.innerHTML = this.hipsterWordHidden.join("    ");
    },

    // Method to display game wins, losses, and guessesRemaining for current word
    gameTracker: function () {
        // Displays win total
        document.querySelector("#wins").innerHTML = "Wins: " + this.wins;
        // Displays loss total
        document.querySelector("#losses").innerHTML = "Losses: " + this.losses;
        // Displays guessesRemaining for current word
        // document.querySelector("#guesses-remaining").innerHTML = "Guesses Remaining: " + this.guessesRemaining;
    },

    // Checks if user input is in the Enlgish letters
    isLetter: function (letter) {
        return this.englishLetters.indexOf(letter) !== -1;
    },

    // Method to initialize new round of game
    initializeRound: function () {
        // Clear English letters from previous round
        document.querySelector("#english-letters").innerHTML = ""
        // Display English Letters
        this.englishLetters.forEach(function(letter) {
            document.querySelector("#english-letters").innerHTML += "<button type=\"button\" class=\"btn btn-letter\" id=\"" + letter + "\" value=\"" + letter + "\">" + letter + "</button>";
        });
        // Add Click Event Listner to each letter to call wordGuessGameLogic function with respective letter
        this.englishLetters.forEach(function(letter) {
            document.getElementById(letter).addEventListener("click", function() {
                wordGuessGameLogic(letter);
            });
        });
        // Selects hipsterWord to start new round of game
        this.selectHipsterWord();
        // Reset remaining guesses to 8
        this.guessesRemaining = 8;
        // Displays updated wins, losses, and guesses remaining
        this.gameTracker();
        // Displays word hidden on the document for the start of the game
        this.insertHipsterWord();
        // Clear letters guessed for each new round
        this.lettersGuessed = [];
        // Display empty letters guessed for new round
        // document.getElementById("letters-guessed").innerHTML = "Letters Guessed: " + wordGuessGame.lettersGuessed.join("  ");
        // Reset Canvas
        hangmanCanvas.resetCanvas();
    },
    // Method to reset entire game
    resetGame: function() {
        // Reset wins to 0
        this.wins = 0;
        // Reset losses to 0
        this.losses = 0;
        // Reset hipsterWords array to contain all words
        this.hipsterWords = ["SKATEBOARD", "MIXTAPE", "UNICORN", "VENMO", "TYPEWRITER", "CLICHE", "FORAGE", "OCCUPY", "SELFIES", "TOFU", "FLANNEL", 
        "FAM", "VINYL", "ETSY", "YOGA", "BREWERY", "BEER", "MEDITATION", "PABST", "BICYCLE", "ARTISAN", "ORGANIC", "DISTILLERY", "PINTEREST", "AESTHETIC", "CORNHOLE"];
        // Display Next Round button
        document.getElementById("start-next-round").style.display = "inline-block";
        // Display Quit Game button
        document.getElementById("quit-game").style.display = "inline-block";
        // Hide Final Score button
        document.getElementById("final-score").style.display = "none";
        // Intialize round of game
        this.initializeRound();
    }
}

// MAIN PROCESS
//====================================================================================================================

// Initialize round of game
wordGuessGame.initializeRound()

// Listen for key down events on keyboard
document.onkeydown = function(event) {
    // Only call main game logic if none of the modals are open
    if (document.getElementById("win-lose-modal").style.display !== "block" && document.getElementById("letter-already-guessed-modal").style.display !== "block" && document.getElementById("quit-game-modal").style.display !== "block")  {
        // Call main game logic with event.key
        wordGuessGameLogic(event.key.toUpperCase());
    // Only use space bar to close letter Already Guessed Modal if it is open
    } else if (document.getElementById("letter-already-guessed-modal").style.display === "block" && event.key === " ") {
        document.getElementById("letter-already-guessed-modal").style.display = "none";
    }
}

// When the user clicks anywhere outside of the Letter Already Guessed modal, close it
window.onclick = function(event) {
    if (event.target == document.getElementById("letter-already-guessed-modal")) {
        document.getElementById("letter-already-guessed-modal").style.display = "none";
    }
  }

// When the user clicks the x in the Letter Already Guessed modal, close it
document.getElementsByClassName("close")[0].onclick = function() {
    // Close Letter Already Guessed modal
    document.getElementById("letter-already-guessed-modal").style.display = "none";
}

// When the user clicks on Next Round button, close the win-lose-modal and initalize next round
document.getElementById("start-next-round").onclick = function() {
    // Close win-lose-modal
    document.getElementById("win-lose-modal").style.display = "none";
    // Start new round
    wordGuessGame.initializeRound();
  }

// When the user clicks on Quit Game button, close the win-lose-modal and open the quit-game-modal
document.getElementById("quit-game").onclick = function() {
    // Close win-lose-modal
    document.getElementById("win-lose-modal").style.display = "none";
    // Add wins to the quit-game-modal
    document.getElementById("wins-header").innerHTML = "Wins: " + wordGuessGame.wins;
    // Add losses to the quit-game-modal
    document.getElementById("losses-header").innerHTML = "Losses: " + wordGuessGame.losses;
    // Display quit-game-modal
    document.getElementById("quit-game-modal").style.display = "block";
  }

// When the user clicks on Final Score button, close the win-lose-modal and open the quit-game-modal
document.getElementById("final-score").onclick = function() {
    // Close win-lose-modal
    document.getElementById("win-lose-modal").style.display = "none";
    // Add wins to the quit-game-modal
    document.getElementById("wins-header").innerHTML = "Wins: " + wordGuessGame.wins;
    // Add losses to the quit-game-modal
    document.getElementById("losses-header").innerHTML = "Losses: " + wordGuessGame.losses;
    // Display quit-game-modal
    document.getElementById("quit-game-modal").style.display = "block";
  }

// When the user clicks on Play Again? button, close the quit-game-modal and reset game.
document.getElementById("play-again").onclick = function() {
    // Close the quit-game-modal
    document.getElementById("quit-game-modal").style.display = "none";
    // Reset Game
    wordGuessGame.resetGame();
  }

// Function holding main game logic
// Placed into a function to allow logic to be called by both key down and click events
function wordGuessGameLogic(letter) {
    // Check if user selection is in Enlgish letters
    if (wordGuessGame.isLetter(letter)) {
        // If user selection was not previously selected this round, then:
        if (wordGuessGame.lettersGuessed.indexOf(letter) === -1) {
            // Add user selection to lettersGuessed array
            wordGuessGame.lettersGuessed.push(letter);
            // Reflect user most recent selection in DOM
            // document.getElementById("letters-guessed").innerHTML = "Letters Guessed: " + wordGuessGame.lettersGuessed.join("  ");
            // Remove visibility of button
            document.getElementById(letter.toString()).style.visibility = "hidden";
            // Loop through hipsterWord characters
            if (wordGuessGame.hipsterWord.includes(letter)) {
                for (var i = 0; i < wordGuessGame.hipsterWord.length; i++) {
                    // If character at index i is same as user selection then:
                    if (wordGuessGame.hipsterWord.charAt(i) === letter) {
                        // Set array value at index i equal to user selection
                        wordGuessGame.hipsterWordHidden[i] = letter;
                        // Update DOM to reflect user correctly guessed a letter
                        document.getElementById("current-word-span").innerHTML = wordGuessGame.hipsterWordHidden.join("    ");
                    }
                }
            } else {
                // Reduce guessesReamining by 1
                wordGuessGame.guessesRemaining--;
                // If guessessRemaining equals seven, then draw face
                if (wordGuessGame.guessesRemaining === 7) {
                    hangmanCanvas.drawFace();
                    hangmanCanvas.drawSeven();
                // Else if guessessRemaining equals six, then draw body line
                } else if (wordGuessGame.guessesRemaining === 6) {
                    hangmanCanvas.drawBody();
                    hangmanCanvas.drawSix();
                // Else if guessessRemaining equals five, then draw right arm
                } else if (wordGuessGame.guessesRemaining === 5) {
                    hangmanCanvas.drawRightArm();
                    hangmanCanvas.drawFive();
                // Else if guessessRemaining equals four, then draw left arm
                } else if (wordGuessGame.guessesRemaining === 4) {
                    hangmanCanvas.drawLeftArm();
                    hangmanCanvas.drawStraightLineMouth();
                    hangmanCanvas.drawFour();
                // Else if guessessRemaining equals five, then draw right leg
                } else if (wordGuessGame.guessesRemaining === 3) {
                    hangmanCanvas.drawRightLeg();
                    hangmanCanvas.drawThree();
                // Else if guessessRemaining equals six, then draw left leg
                } else if (wordGuessGame.guessesRemaining === 2) {
                    hangmanCanvas.drawLeftLeg();
                    hangmanCanvas.drawTwo();
                // Else if guessessRemaining equals 7, then draw noose
                } else if (wordGuessGame.guessesRemaining === 1) {
                    hangmanCanvas.drawNoose();
                    hangmanCanvas.drawFrownyFace();
                    hangmanCanvas.drawOne();
                // Else if guessessRemaining equals 0, then draw dead face and lower body.
                } else if (wordGuessGame.guessesRemaining === 0) {
                    hangmanCanvas.drawDeadFace();
                    hangmanCanvas.drawBodyLower();
                    hangmanCanvas.resetNumber();
                }
            }
            
            // If zero or more guesses remaining and all letters of hidden word guessed, then:
            if (wordGuessGame.guessesRemaining >= 0 && wordGuessGame.hipsterWordHidden.indexOf("_") === -1) {
                // Increase wins by 1
                wordGuessGame.wins++;
                // Displays updated wins, losses, and guesses remaining
                wordGuessGame.gameTracker();
                // Header to say "You won!" in modal  
                document.getElementById("win-lose-header").innerHTML = "You won!"
                // Add current word to win-lose-modal
                document.getElementById("modal-word-div").innerHTML = wordGuessGame.hipsterWord;
                // Add gif that assocciated with word
                document.getElementById("modal-gif-div").innerHTML = "<img src=\"assets/media/" + wordGuessGame.hipsterWord.toLowerCase() + ".gif\" alt=\"" + wordGuessGame.hipsterWord.toLowerCase() + "\" width=\"100%\" height=\"auto\"></img>";
                // If no words remaining in the hipsterWords array, then display a button for showing final score
                if (wordGuessGame.hipsterWords.length === 0) {
                    // Hide Next Round button
                    document.getElementById("start-next-round").style.display = "none";
                    // Hide Quit Game button
                    document.getElementById("quit-game").style.display = "none";
                    // Show Final Score button
                    document.getElementById("final-score").style.display = "inline-block";
                }
                // Display Modal to nofity user won round
                document.getElementById("win-lose-modal").style.display = "block";
            // If zero guesses remaining and not all letters of hidden word guessed, then:
            } else if (wordGuessGame.guessesRemaining === 0 && wordGuessGame.hipsterWordHidden.indexOf("_") !== -1) {
                // Increase losses by 1
                wordGuessGame.losses++;
                // Displays updated wins, losses, and guesses remaining
                wordGuessGame.gameTracker();
                // Header to say "You lost!" in modal  
                document.getElementById("win-lose-header").innerHTML = "You lost!"
                // Add current word to win-lose-modal
                document.getElementById("modal-word-div").innerHTML = wordGuessGame.hipsterWord;
                // Add gif that assocciated with word
                document.getElementById("modal-gif-div").innerHTML = "<img src=\"assets/media/" + wordGuessGame.hipsterWord.toLowerCase() + ".gif\" alt=\"" + wordGuessGame.hipsterWord.toLowerCase() + "\" width=\"100%\" height=\"auto\"></img>";
                // If no words remaining in the hipsterWords array, then display a button for showing final score
                if (wordGuessGame.hipsterWords.length === 0) {
                    // Hide Next Round button
                    document.getElementById("start-next-round").style.display = "none";
                    // Hide Quit Game button
                    document.getElementById("quit-game").style.display = "none";
                    // Show Final Score button
                    document.getElementById("final-score").style.display = "inline-block";
                }
                // Display Modal to nofity user won round
                document.getElementById("win-lose-modal").style.display = "block";
            }
        } else {
            // Modal to notify user that this letter was already guessed
            document.getElementById("letter-already-guessed-modal").style.display = "block";
        }
    }
}