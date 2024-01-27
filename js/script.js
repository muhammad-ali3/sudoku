async function dispalyGrids() {
    var cells = document.getElementsByClassName("sudoku-cell");

    for (var i = 0; i <= 8; i++) {
        for (var j = 0; j <= 8; j++) {
            var style = "";

            // Add left border for each cell (except the first one in each row)
            if (j !== 0) {
                style += "border-left: 1px solid #000000;";
            }

            // Add top border for each cell (except the first one in each column)
            if (i !== 0) {
                style += "border-top: 1px solid #000000;";
            }

            // Add bold borders for the 3x3 squares
            if (j % 3 === 2 && j !== 8) {
                style += "border-right: 3px solid #000000;";
            }

            if ((i + 1) % 3 === 0 && i !== 8) {
                style += "border-bottom: 3px solid #000000;";
            }

            // Apply the styles to the current cell
            if (style !== "") {
                cells[i * 9 + j].setAttribute("style", style);
            }
        }
    }
}
function handleHelpClose() {
    var gameHelp = document.getElementById("game-help");
    gameHelp.style.display = "none";
}

function handleHelpOpen() {
    var gameHelp = document.getElementById("game-help");
    gameHelp.style.display = "flex";
}

var closeButton = document.querySelector(".close-button");
var helpButton = document.querySelector("#help-icon");
closeButton.addEventListener("click", handleHelpClose);
helpButton.addEventListener("click", handleHelpOpen);

function handleValueEdit() {
    var cells = document.getElementsByClassName('sudoku-cell');
    [...cells].forEach(element => {
        element.addEventListener('click', function(e) {
            if (e.target.classList.contains('sudoku-cell--initial')) {
                return;
            }
            else{
                e.target.textContent = (e.target.textContent % 9) + 1;
            }

            });
        });
}
handleValueEdit();
window.onbeforeunload = function() {
    return "Data will be lost if you leave the page, are you sure?";
};
// generate a sudoku
function generateSudoku(difficulty) {
    var sudokustring = sudoku.generate(difficulty);

    var cells = document.getElementsByClassName("sudoku-cell");
    var sudokuArray = sudokustring.split("");
    for (var i = 0; i < sudokuArray.length; i++) {
        if (sudokuArray[i] !== ".") {
            cells[i].textContent = sudokuArray[i];
            cells[i].classList.add("sudoku-cell--initial");
        }
    }
    return sudokustring;
}

function solveSudoku(string){
    var solvedsudokustring = sudoku.solve(string)
    return solvedsudokustring
}



function checkSudoku() {
    var cells = document.getElementsByClassName("sudoku-cell");
    console.log(cells[10].textContent)
    let currentString = "";
    // create current list
    [...cells].forEach(element => {
        if (element.textContent == "") {
            currentString += ".";
        } else {
            currentString += element.textContent;
        }
    });
    console.log(currentString)
    // solve current list
    for (let i = 0; i < currentString.length; i++) {
        if (currentString[i] !== ".") {
            if (!cells[i].classList.contains("sudoku-cell--initial")) {
                if (currentString[i] === solvedSudokuString[i]) {
                    cells[i].style.backgroundColor = "#00ff3729";
                    // wait for 5 seconds
                    setTimeout(function() {
                        cells[i].style.backgroundColor = "transparent";
                    }, 5000);
                }else {
                    cells[i].style.backgroundColor = "#ff000026";
                    setTimeout(function() {
                        cells[i].style.backgroundColor = "transparent";
                    }, 5000);
                } 
            }
        }
    }
}

var checkButton = document.querySelector("#check");
checkButton.addEventListener("click", checkSudoku);
var resetButton = document.getElementById("reset");
resetButton.addEventListener("click", function(){
    // Reload the page without triggering beforeunload
    window.location.href = window.location.href;
});

var sudokuString;
var solvedSudokuString;

var solveButton = document.querySelector("#solve");
solveButton.addEventListener("click", function(){
    var cells = document.getElementsByClassName("sudoku-cell");
    [...cells].forEach((element, i) => {
        if (!element.classList.contains("sudoku-cell--initial")) {
            element.textContent = solvedSudokuString[i];
        }
    });
});

var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];
var difficulty;
async function getDifficulty() {
    modal.style.display = "block";
    var difficulty;
    var easy = document.querySelector("#easy");
    var medium = document.querySelector("#medium");
    var hard = document.querySelector("#hard");
    var veryhard = document.querySelector("#very-hard");
    var insane = document.querySelector("#insane");
    var inhuman = document.querySelector("#inhuman");
    easy.addEventListener("click", async function () {
        difficulty = "easy";
        modal.style.display = "none";
    });
    medium.addEventListener("click", async function () {
        difficulty = "medium";
        modal.style.display = "none";
    });
    hard.addEventListener("click", async function () {
        difficulty = "hard";
        modal.style.display = "none";
    });
    veryhard.addEventListener("click", async function () {
        difficulty = "very-hard";
        modal.style.display = "none";
    });
    insane.addEventListener("click", async function () {
        difficulty = "insane";
        modal.style.display = "none";
    });
    inhuman.addEventListener("click", async function () {
        difficulty = "inhuman";
        modal.style.display = "none";
    });
    return difficulty;

}


window.addEventListener('load', async function () {
    await dispalyGrids().then(async function() {
        var difficulty = await getDifficulty();
        console.log(difficulty);
        var difficultyIndicator = document.querySelector("#difficulty-indicator");
        difficultyIndicator.textContent = `Difficulty: ${difficulty}`;
        sudokuString = await generateSudoku(difficulty);
        solvedSudokuString = await solveSudoku(sudokuString)
    });
});



