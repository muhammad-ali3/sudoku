function dispalyGrids() {
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


dispalyGrids();
