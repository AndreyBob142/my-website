document.addEventListener('DOMContentLoaded', () => {
    const boardSize = 4;
    let tiles = [...Array(boardSize * boardSize).keys()].slice(1);
    tiles.push(0);
    shuffleArray(tiles);

    const gameBoard = document.getElementById('game-board');
    renderBoard(tiles);

    function renderBoard(tiles) {
        gameBoard.innerHTML = '';
        tiles.forEach((tile, index) => {
            const tileElement = document.createElement('div');
            tileElement.className = 'tile';
            if (tile === 0) {
                tileElement.classList.add('empty');
            } else {
                tileElement.innerText = tile;
                tileElement.addEventListener('click', () => moveTile(index));
            }
            gameBoard.appendChild(tileElement);
        });
    }

    function moveTile(index) {
        const emptyIndex = tiles.indexOf(0);
        const validMoves = [emptyIndex - 1, emptyIndex + 1, emptyIndex - boardSize, emptyIndex + boardSize];

        if (validMoves.includes(index)) {
            [tiles[index], tiles[emptyIndex]] = [tiles[emptyIndex], tiles[index]];
            renderBoard(tiles);
            if (checkWin()) {
                setTimeout(() => {
                    showWinAnimation();
                    alert('Поздравляем! Вы выиграли!');
                }, 100);
            }
        }
    }

    function checkWin() {
        for (let i = 0; i < tiles.length - 1; i++) {
            if (tiles[i] !== i + 1) {
                return false;
            }
        }
        return tiles[tiles.length - 1] === 0; 
    }

    function showWinAnimation() {
        const tileElements = document.querySelectorAll('.tile');
        tileElements.forEach(tile => tile.classList.add('win'));
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
});