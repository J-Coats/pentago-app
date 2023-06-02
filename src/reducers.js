import { NUM_ROWS, NUM_COLUMNS } from './constants'
import doWeHaveAWinner from "./doWeHaveAWinner";

function advanceColor(color) {
    if( color === 'white' )
        return 'blue';
    if( color === 'blue' )
        return 'red';
    return 'blue';
}

function createInitialState() {
    // Creates initial 6x6 board.

    let board = Array(NUM_ROWS).fill(Array(NUM_COLUMNS).fill({color: 'white', isOccupied: false}));
    board.map((row, rowIdx) => row.map( (here, colIdx) => {
        return {...board[rowIdx][colIdx], row: rowIdx, column: colIdx }
    }));

    return {
        board,
        targetQuadrant: 99,
        haveAWinner: false,
        nextColor: 'blue',
        needsToRotate: false,

    };
}

function integrateClick(state, colIdx, rows) {

    let board = state.board;
    let affectedRow = board[rows].slice();
    affectedRow[colIdx] = {
        ...affectedRow[colIdx],
        color: state.nextColor,
        isOccupied: true
    };
    let newBoard = board.slice();
    newBoard[rows] = affectedRow;
    const activeColor = state.nextColor;

    let newState = {
        ...state,
        board: newBoard,
        needsToRotate: true,
    };

    if( doWeHaveAWinner(rows, colIdx, activeColor, board) ) {
        newState = {
            ...newState,
            haveAWinner: true,
            winnerColor: activeColor
        };
    }

    return newState;
}


function rotateCounterClockwise(boardQuadrant){
    let arraySize = boardQuadrant.length;
    let half = arraySize / 2;

    for (let i = 0; i < half; i += 1) {
        for (let j = i; j < arraySize - i - 1; j++) {
            let x = arraySize - i - 1;
            let y = arraySize - j - 1;

            let placeholder = boardQuadrant[i][j];
            boardQuadrant[i][j] = boardQuadrant[j][x];
            boardQuadrant[j][x] = boardQuadrant[x][y];
            boardQuadrant[x][y] = boardQuadrant[y][i];
            boardQuadrant[y][i] = placeholder;
        }
    }

    return boardQuadrant;
}

function rotateClockwise(boardQuadrant) {
    let arraySize = boardQuadrant.length;
    let half = arraySize / 2;

    for (let i=0; i < half; i += 1) {
        for (let j = i; j < arraySize - i - 1; j += 1) {
            let x = arraySize - i - 1;
            let y = arraySize - j - 1;

            let placeholder = boardQuadrant[i][j];
            boardQuadrant[i][j] = boardQuadrant[y][i];
            boardQuadrant[y][i] = boardQuadrant[x][y];
            boardQuadrant[x][y] = boardQuadrant[j][x];
            boardQuadrant[j][x] = placeholder;

        }
    }
    return boardQuadrant;
}

function adjustQuadrant(rows, rowIdxColIdx, values) {
    // handles the actual adjustments of colors in the specified quadrant

    let count = 0;

    for (let i = rowIdxColIdx[2]; i < rowIdxColIdx[3]; i += 1){
        rows[0][i] = {
            color: values[0][count].color,
            isOccupied: values[0][count].isOccupied
        };
        rows[1][i] = {
            color: values[1][count].color,
            isOccupied: values[0][count].isOccupied
        };

        rows[2][i] = {
            color: values[2][count].color,
            isOccupied: values[0][count].isOccupied
        };
        count += 1;
    }

    return rows;
}




function HandleRotation(state, rotation_direction) {


    const grabTargetRows = () => {
        // returns the rows we're going to be working with
        return [board[outerRow[0]].slice(), board[outerRow[1]].slice(), board[outerRow[2]].slice()]
    }

    const grabValuesInQuadrant = () => {
        // grabs from the specified quadrant. outerRow and rowIndexAndColumnIdx will act as the
        // parameters for the 6x6, so we know which 3x3 to grab values from

        let first_row = board[outerRow[0]].slice(rowIndexAndColumnIdx[2], rowIndexAndColumnIdx[3]);
        let second_row = board[outerRow[1]].slice(rowIndexAndColumnIdx[2], rowIndexAndColumnIdx[3]);
        let third_row = board[outerRow[2]].slice(rowIndexAndColumnIdx[2], rowIndexAndColumnIdx[3]);

        return [first_row, second_row, third_row];

    }

    const callForRotation = () => {
        // depending on which direction we're going to rotate, calls one or the other
        switch(rotation_direction) {
            case 'counter_clockwise':
                return rotateCounterClockwise(values)

            case 'clockwise':
                return rotateClockwise(values)

            default:
                console.log("Should never be here!")
        }
    }


    let rowIndexAndColumnIdx = [];
    let outerRow = [];

    // outRow represents either the top half of the 6x6 or the bottom half
    if (state.targetQuadrant === 'top_left') {
        rowIndexAndColumnIdx = [0, 3, 0, 3];
        outerRow = [0, 1, 2];
    }
    else if (state.targetQuadrant === 'top_right') {
        rowIndexAndColumnIdx = [0, 3, 3, 6];
        outerRow = [0, 1, 2];
    }
    else if (state.targetQuadrant === 'bottom_left') {
        rowIndexAndColumnIdx = [3, 6, 0, 3];
        outerRow = [3, 4, 5];
    }
    else if (state.targetQuadrant === 'bottom_right') {
        rowIndexAndColumnIdx = [3, 6, 3, 6];
        outerRow = [3, 4, 5];
    }


    let board = state.board;

    // grab all the values in the quadrant that is determined by the value held
    // in targetQuadrant above.
    let valuesArray = []
    let values = grabValuesInQuadrant(board);
    valuesArray.push(values[0], values[1], values[2]);


    let valuesAfterRotation = callForRotation(rotation_direction, valuesArray);
    let affectedRows = grabTargetRows();
    let adjustedRows = adjustQuadrant(affectedRows, rowIndexAndColumnIdx, valuesAfterRotation);

    // stores our updated board into newBoard
    let newBoard = board.slice();
    newBoard[outerRow[0]] = adjustedRows[0];
    newBoard[outerRow[1]] = adjustedRows[1];
    newBoard[outerRow[2]] = adjustedRows[2];

    // changes activeColor to next players color
    const activeColor = state.nextColor;

    // creates a newState in which we pass our newBoard to and updates all necessary attributes
    let newState = {
        ...state,
        board: newBoard,
        needsToRotate: false,
        targetQuadrant: 99,
        nextColor: advanceColor(activeColor),
    };

    // goes through and checks if we have a winner and updates newState if so

    for (let i = rowIndexAndColumnIdx[0]; i < rowIndexAndColumnIdx[1]; i += 1){
        for (let j = rowIndexAndColumnIdx[2]; j < rowIndexAndColumnIdx[3]; j += 1){
            if (newState.board[i][j].color !== 'white'){
                if( doWeHaveAWinner(i, j, newState.board[i][j].color, newState.board) ) {
                    newState = {
                        ...newState,
                        haveAWinner: true,
                        winnerColor: newState.board[i][j].color
                    };
                }
            }
        }
    }

    return newState;
}


function reducers(state, action) {
    // Mostly the same as connect 4 but added an integration for BUTTON_CLICKED

    if( state === undefined )
        return state;

    if( action.type === 'RESET' ) {
        // start with fresh board again
        return createInitialState();

    } else if( action.type === 'CELL_CLICKED') {
        // do nothing if we already have a winner
        if( state.haveAWinner )
            return state;

        // this makes sure that if a marble has already been placed, another can't be placed because it's time to rotate
        if(state.needsToRotate === true){
            return state;
        }

        // also do nothing if marble is already placed in clicked cell
        if(state.board[action.activeRows][action.colIdx].color !== 'white')
            return state;

        // update cell with new color and attributes
        return integrateClick(state, action.colIdx, action.activeRows);
    }

    // if rotation needs to happen and one of the 8 buttons was clicked, update targetQuadrent and handle the rotation
    else if(action.type === 'BUTTON_CLICKED' && state.needsToRotate){
        state.targetQuadrant = action.quadrant;
        if (state.targetQuadrant !== 99)

            return HandleRotation(state, action.direction);
    }

    return state;

}

export {
    reducers,
    createInitialState
};