document.addEventListener('DOMContentLoaded', () => {


    let visited = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];

    let cells = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];

    const maxRow = 11;
    const maxCol = 11;


    let currentRowSquareCell = 0;
    let currentColumnSquareCell = 0;
    visited[0][0] = 1;
    let randCell = getRandomCell();

    let currentRowCircleRandomCell = randCell.row;
    let currentColumnCircleRandomCell = randCell.col;

    let score = 0;
    const board = document.getElementById('board');

    function createBoard() {
        for (let i = 0; i < maxRow; i++) {
            for (let j = 0; j < maxCol; j++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                if ((i + j) % 2 === 0) {
                    cell.classList.add('dark');
                } else {
                    cell.classList.add('light');
                }
                cells[i][j] = (cell);
                board.appendChild(cell);
            }
        }

        cells[0][0].classList.add('square');

        cells[currentRowCircleRandomCell][currentColumnCircleRandomCell].classList.add('circle');
    }

    function visitedCount() {
        let visitCount = 0;
        for (let i = 0; i < maxRow; i++) {
            for (let j = 0; j < maxCol; j++) {
                if (visited[i][j] === 1) {
                    visitCount++;
                }
            }
        }
        return visitCount;
    }

    function getRandomCell() {
        if (visitedCount() === maxRow * maxCol) {
            score++;
            alert(`Game Over! Your score is ${score}`);

            return;
        }

        let randRow, randCol;
        do {
            randRow = Math.floor(Math.random() * maxRow);
            randCol = Math.floor(Math.random() * maxCol);
        } while (visited[randRow][randCol]){
            // console.log("row ",randRow);
            // console.log("col ",randCol);
            // console.log("visited[row][col] ",visited[randRow][randCol]);
        };


        return { row: randRow, col: randCol };
    }


    function moveSquare(event) {
        const key = event.key;
        let newRowSquareCell = currentRowSquareCell, newColumnSquareCell = currentColumnSquareCell;

        if (key === 'ArrowUp' && currentRowSquareCell > 0) {
            newRowSquareCell = currentRowSquareCell - 1;
        } else if (key === 'ArrowDown' && currentRowSquareCell < 10) {
            newRowSquareCell = currentRowSquareCell + 1;
        } else if (key === 'ArrowLeft' && currentColumnSquareCell > 0) {
            newColumnSquareCell = currentColumnSquareCell - 1;
        } else if (key === 'ArrowRight' && currentColumnSquareCell < 10) {
            newColumnSquareCell = currentColumnSquareCell + 1;
        } else {
            return;
        }

        visited[newRowSquareCell][newColumnSquareCell] = 1;

        if (newRowSquareCell === currentRowCircleRandomCell && newColumnSquareCell === currentColumnCircleRandomCell) {

            cells[currentRowCircleRandomCell][currentColumnCircleRandomCell].classList.remove('circle');

            let cell = getRandomCell();
            console.log("cell",cell);
            currentRowCircleRandomCell = cell.row;
            currentColumnCircleRandomCell = cell.col;


            cells[currentRowCircleRandomCell][currentColumnCircleRandomCell].classList.add('circle');
            score++

        }

        cells[currentRowSquareCell][currentColumnSquareCell].classList.remove('square');
        cells[newRowSquareCell][newColumnSquareCell].classList.add('square');


        cells[currentRowSquareCell][currentColumnSquareCell].classList.remove('cell');
        cells[currentRowSquareCell][currentColumnSquareCell].classList.add('blockedCell');


       cells[newRowSquareCell][newColumnSquareCell].classList.remove('blockedCell');
        cells[newRowSquareCell][newColumnSquareCell].classList.add('cell');

        currentRowSquareCell = newRowSquareCell;
        currentColumnSquareCell = newColumnSquareCell;


        visitedCount();
    }


    createBoard();
    document.addEventListener('keydown', moveSquare);
});
