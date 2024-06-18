const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const restartButton = document.getElementById('restartButton');
const playerChoiceButtons = document.querySelectorAll('.player-choice button');
let currentPlayer = 'X';
let computerPlayer = 'O';
let player = '';
let boardState = Array(9).fill(null);

playerChoiceButtons.forEach(button => {
    button.addEventListener('click', () => {
        player = button.id === 'choose-x' ? 'X' : 'O';
        computerPlayer = player === 'X' ? 'O' : 'X';
        startGame();
    });
});

function startGame() {
    cells.forEach(cell => {
        cell.classList.remove('x');
        cell.classList.remove('o');
        cell.textContent = '';
        cell.addEventListener('click', handleClick, { once: true });
    });
    boardState.fill(null);
    if (player === 'O') {
        computerMove();
    }
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = currentPlayer.toLowerCase();
    placeMark(cell, currentClass);
    if (checkWin(currentPlayer)) {
        setTimeout(() => alert(`${currentPlayer} победил!`), 100);
        endGame();
    } else if (isDraw()) {
        setTimeout(() => alert('Ничья!'), 100);
        endGame();
    } else {
        swapTurns();
        computerMove();
    }
}

function placeMark(cell, currentClass) {
    const cellIndex = Array.from(cells).indexOf(cell);
    boardState[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentClass);
}

function swapTurns() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function computerMove() {
    const availableCells = boardState.map((cell, index) => cell === null ? index : null).filter(val => val !== null);
    const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
    const cell = cells[randomIndex];
    placeMark(cell, computerPlayer.toLowerCase());
    if (checkWin(computerPlayer)) {
        setTimeout(() => alert(`${computerPlayer} победил!`), 100);
        endGame();
    } else if (isDraw()) {
        setTimeout(() => alert('Ничья!'), 100);
        endGame();
    } else {
        swapTurns();
    }
}

function checkWin(player) {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winPatterns.some(pattern => {
        return pattern.every(index => {
            return boardState[index] === player;
        });
    });
}

function isDraw() {
    return boardState.every(cell => cell !== null);
}

function endGame() {
    cells.forEach(cell => {
        cell.removeEventListener('click', handleClick);
    });
}

restartButton.addEventListener('click', startGame);