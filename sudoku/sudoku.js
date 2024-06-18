import { generateSudoku, findEmptyCell } from "./sudokuGenerator.js";
import { BOX_SIZE, GRID_SIZE } from "./utilities.js";

export class Sudoku {
    constructor() {
        this.grid = generateSudoku();
    }

    getDuplicatePosition(row, column, value) {
        const duplicatesInColumn = this.getDuplicatePositionInColumn(row, column, value);
        const duplicatesInRow = this.getDuplicatePositionInRow(row, column, value);
        const duplicatesInBox = this.getDuplicatePositionInBox(row, column, value);

        const duplicates = [...duplicatesInColumn, ... duplicatesInRow];
        duplicatesInBox.forEach(duplicatesInBox => {
            if (duplicatesInBox.row !== row && duplicatesInBox.column !== column) duplicates.push(duplicatesInBox);
        });

        return duplicates;
    }

    getDuplicatePositionInColumn(row, column, value) {
        const duplicates = [];
        for (let iRow = 0; iRow < GRID_SIZE; iRow++) {
            if (this.grid[iRow][column] === value && iRow !== row) {
                duplicates.push({row: iRow, column})
            } 
        }
        return duplicates;
    }

    getDuplicatePositionInRow(row, column, value) {
        const duplicates = [];
        for (let iColumn = 0; iColumn < GRID_SIZE; iColumn++) {
            if (this.grid[row][iColumn] === value && iColumn !== column) {
                duplicates.push({ row, column: iColumn });
            }
        }
        return duplicates;
    }

    getDuplicatePositionInBox(row, column, value) {
        const duplicates = [];
        const firstRowInBox = row - row % BOX_SIZE;
        const firstColumnInBox = column - column % BOX_SIZE;

        for (let iRow = firstRowInBox; iRow < firstRowInBox + BOX_SIZE; iRow++) {
            for (let iColumn = firstColumnInBox; iColumn < firstColumnInBox + BOX_SIZE; iColumn++) {
                if (this.grid[iRow][iColumn] === value && iRow !== row && iColumn !== column) {
                    duplicates.push({ row: iRow, column: iColumn });
                }
            }
        }
        return duplicates;
    }

    hasEmptyCells() {
        return Boolean(findEmptyCell(this.grid));
    }
}