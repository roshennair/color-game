// all global variables and DOM variables declared/cached
var squareNum = 6;
var colors = new Array();
var pickedColor;
var squares = document.getElementsByClassName("square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.getElementById("message");
var h1 = document.getElementsByTagName("h1")[0];
var resetButton = document.getElementById("reset")
var modeButtons = document.getElementsByClassName("mode");

// initialize the game
init();

// starts the game
function init() {
    // initial set up for the easy and hard mode buttons
    setUpModes();    
    // initial set up for the squares
    setUpSquares();
    // initial setup for reset button
    resetButton.addEventListener("click", function() {
        // call reset without changing squareNum
        reset();
    });
    // initial reset to load up the game
    reset();
}

// sets up mode buttons (easy and hard)
function setUpModes() {
    for (var i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function() {
            // adding color to selected button
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");
            // find squareNum (alternate way to write conditionals)
            this.textContent === "Easy" ? squareNum = 3: squareNum = 6;
            // call reset function
            reset();
        });
    }
}

// sets up squares' event listeners
function setUpSquares() {
    for (var i = 0; i < squares.length; i++) {
        // Add click listeners to squares
        squares[i].addEventListener("click", function() {
            // Save color of clicked square
            var clickedColor = this.style.backgroundColor;
            // Check if correct color
            if (clickedColor === pickedColor) {
                // message says Correct!
                messageDisplay.textContent = "Correct!";
                changeColors(clickedColor);
                resetButton.textContent = "Play Again?"
            } else {
                // message says try again
                messageDisplay.textContent = "Try again";
                // Removes clicked square from view 
                this.style.backgroundColor = "#232323"
            }
        })
    }
}

// generates one random color
function randomColor() {
    var nums = new Array(3);
    // generate 3 random nums between 0-255
    for (var i = 0; i < nums.length; i++) {
        nums[i] = Math.floor(Math.random() * 256);
    }
    // attach in a string and return
    return color = "rgb(" + nums[0] + ", " + nums[1] + ", " + nums[2] + ")";
}

// generates an array of colors
function generateRandomColors(num) {
    // newer way to make an empty array using new Array(length)
    var arr = new Array(num);
    // add num random colors to array
    for (var i = 0; i < num; i++) {
        arr[i] = randomColor();
    }
    // return array
    return arr
}

// picks one random color from the array
function pickColor() {
    // Math.random() picks random number between 0-1. Ex multiply by 6 to get random number between 0-6 (never reaches 6)
    // Add/subtract a number from Math.random() to change the bottom range from 0
    // Math.floor() rounds a decimal downwards to a whole number e.g. 5.99 to 5, 2.1 to 2, 0.5 to 0;
    var index = Math.floor(Math.random() * colors.length);
    // use picked index to return the corresponding color
    return colors[index];
}

// changes all colors when user wins
function changeColors(color) {
    // Change all squares to the correct color
    for (var i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = color;
    }
    // Change h1's background
    h1.style.backgroundColor = color;
}

// resets the game
function reset() {
    // generate new colors
    colors = generateRandomColors(squareNum);
    // change color of squares
    for (var i = 0; i < squares.length; i++) {
        // check if there is a colors[i] every iteration
        if (colors[i]) {
            // showing hidden squares
            squares[i].style.display = "block";
            // updating square colors
            squares[i].style.backgroundColor = colors[i];
        } else {
            // hiding the 3 remaining squares which have no corresponding colors 
            squares[i].style.display = "none";
        }
    }
    // pick random color
    pickedColor = pickColor();
    // update colorDisplay
    colorDisplay.textContent = pickedColor;
    // update resetButton
    resetButton.textContent = "New Colors";
    // update h1
    h1.style.backgroundColor = "steelblue";
    // update messageDisplay to be intentionally empty using null
    messageDisplay.textContent = null;
}