/* Course: SENG 513 */
/* Date: November 6, 2023 */
/* Assignment 3 (Part Two) */
/* Name: Youssef Abdelrhafour */
/* UCID: 30085837 */

// Define initial game settings and states
const rows = 6;
const cols = 7;
let currentPlayer = 1; // Start with Player 1
let board = [];
let player1Score = 0;
let player2Score = 0;
let doubleDropActive = false; // State for the double drop feature
let gameActive = true;
let player1DoubleDropUsed = false;
let player2DoubleDropUsed = false;
let player1RemoveLastDiscUsed = false;
let player2RemoveLastDiscUsed = false;
let player1Moves = []; // Track moves for Player 1
let player2Moves = []; // Track moves for Player 2

/**
 * Initialize the game board.
 */
function initBoard() {
    // Create an empty board of rows x cols
    board = new Array(rows).fill(null).map(() => new Array(cols).fill(null));

    // Grab the board table from the DOM and empty it
    const table = document.getElementById('board');
    table.innerHTML = '';

    // Populate the table with rows and cells, adding click listeners to each cell
    for(let i = 0; i < rows; i++) {
        const rowElem = table.insertRow();

        for(let j = 0; j < cols; j++) {
            const cellElem = rowElem.insertCell();
            cellElem.addEventListener('click', () => cellClicked(i, j));
            cellElem.setAttribute('data-row', i);
            cellElem.setAttribute('data-col', j);
        }
    }
}

/**
 * Handle cell click actions.
 */
function cellClicked(row, col) {
    // If the game is not active or if the move is not valid, exit function
    if (!gameActive || !isValidMove(col)) return;

    // Place the disc and update the board state
    let newRow = placeDisc(col);
    board[newRow][col] = currentPlayer;

    // Store move for the current player
    if (currentPlayer === 1) {
        player1Moves.push([newRow, col]);
    } else {
        player2Moves.push([newRow, col]);
    }

    // Redraw the board
    renderBoard();

    // Check for game-winning move
    if (checkWin(newRow, col)) {
        if (currentPlayer === 1) {
            player1Score++;
        } else {
            player2Score++;
        }
        updateScoreboard();
        document.getElementById('message').textContent = `Player ${currentPlayer} wins!`;
        gameActive = false; // End the game
        return;
    }

    // Check for a draw condition
    if (checkDraw()) {
        document.getElementById('message').textContent = `It's a draw!`;
        gameActive = false; // End the game
        return;
    }

    // Handle double drop feature or switch to next player
    if (!doubleDropActive) {
        switchPlayer();
    } else {
        doubleDropActive = false;
        document.getElementById('doubleDrop').disabled = false;
    }
}

/**
 * Check if the move is valid.
 */
function isValidMove(col) {
    // Check if the top row of the selected column is empty
    return board[0][col] === null;
}

/**
 * Place a disc in the selected column.
 */
function placeDisc(col) {
    let newRow;
    // Loop from the bottom row upwards to find the first empty spot
    for(let i = rows - 1; i >= 0; i--) {
        if(board[i][col] === null) {
            newRow = i;
            break;
        }
    }
    return newRow;
}

/**
 * Redraw the board based on the current state.
 */
function renderBoard() {
    for(let i = 0; i < rows; i++) {
        for(let j = 0; j < cols; j++) {
            const cell = document.querySelector(`[data-row='${i}'][data-col='${j}']`);
            // If the cell is occupied by Player 1, color it red
            if (board[i][j] === 1) {
                cell.style.backgroundColor = 'red';
            // If the cell is occupied by Player 2, color it blue
            } else if (board[i][j] === 2) {
                cell.style.backgroundColor = 'blue';
            // If the cell is empty, color it white
            } else {
                cell.style.backgroundColor = 'white';
            }
        }
    }
}

/**
 * Remove the last disc played by the opponent.
 */
function removeLastDisc() {
    // If the game is not active, exit the function
    if (!gameActive) return;

    // If it's Player 1's turn and they haven't used the remove disc feature
    if (currentPlayer === 1 && !player1RemoveLastDiscUsed && player2Moves.length > 0) {
        let [lastRow, lastCol] = player2Moves.pop();
        board[lastRow][lastCol] = null; // Remove disc from board
        renderBoard(); // Redraw the board
        player1RemoveLastDiscUsed = true;
        document.getElementById('removeLastDisc').disabled = true; // Disable the feature for Player 1
    
    // If it's Player 2's turn and they haven't used the remove disc feature
    } else if (currentPlayer === 2 && !player2RemoveLastDiscUsed && player1Moves.length > 0) {
        let [lastRow, lastCol] = player1Moves.pop();
        board[lastRow][lastCol] = null; // Remove disc from board
        renderBoard(); // Redraw the board
        player2RemoveLastDiscUsed = true;
        document.getElementById('removeLastDisc').disabled = true; // Disable the feature for Player 2
    }

}

/**
 * Activate the double drop feature.
 */
function activateDoubleDrop() {
    // If the game is not active, exit the function
    if (!gameActive) return;

    // If it's Player 1's turn and they haven't used the double drop feature
    if (currentPlayer === 1 && !player1DoubleDropUsed) {
        doubleDropActive = true;
        player1DoubleDropUsed = true;
        document.getElementById('doubleDrop').disabled = true; // Disable the feature for Player 1

    // If it's Player 2's turn and they haven't used the double drop feature
    } else if (currentPlayer === 2 && !player2DoubleDropUsed) {
        doubleDropActive = true;
        player2DoubleDropUsed = true;
        document.getElementById('doubleDrop').disabled = true; // Disable the feature for Player 2
    }
}

/**
 * Switch to the next player.
 */
function switchPlayer() {
    currentPlayer = currentPlayer === 1 ? 2 : 1; // Toggle player
    document.getElementById('message').textContent = `Player ${currentPlayer}'s turn.`;
    
    // Enable/Disable features based on player and their usage
    if (currentPlayer === 1) {
        document.getElementById('removeLastDisc').disabled = player1RemoveLastDiscUsed;
        document.getElementById('doubleDrop').disabled = player1DoubleDropUsed;
    } else {
        document.getElementById('removeLastDisc').disabled = player2RemoveLastDiscUsed;
        document.getElementById('doubleDrop').disabled = player2DoubleDropUsed;
    }
}

/**
 * Resets the game to its initial state.
 */
function resetGame() {
    // Re-initialize the board
    initBoard();
    currentPlayer = 1;
    gameActive = true;
    document.getElementById('message').textContent = `Player 1's turn.`;
    
    // Reset the special moves usage for both players
    player1DoubleDropUsed = false;
    player2DoubleDropUsed = false;
    player1RemoveLastDiscUsed = false;
    player2RemoveLastDiscUsed = false;

    // Clear the moves history for both players
    player1Moves = [];
    player2Moves = [];

    // Enable the double drop and remove last disc buttons
    document.getElementById('doubleDrop').disabled = false;
    document.getElementById('removeLastDisc').disabled = false;
}

/**
 * Check for a winning move.
 */
function checkWin(row, col) {
    return checkDirection(row, col, 1, 0) || // Horizontal
           checkDirection(row, col, 0, 1) || // Vertical
           checkDirection(row, col, 1, 1) || // Diagonal (from left)
           checkDirection(row, col, 1, -1);  // Diagonal (from right)
}

/**
 * Check if there's a winning line starting from the specified cell in a certain direction.
 */
function checkDirection(row, col, deltaRow, deltaCol) {
    let count = 1;
    count += countInDirection(row, col, deltaRow, deltaCol);
    count += countInDirection(row, col, -deltaRow, -deltaCol);
    return count >= 4; // Return true if 4 or more discs in a row
}

/**
 * Count consecutive discs of the current player in a given direction from the specified cell.
 */
function countInDirection(row, col, deltaRow, deltaCol) {
    let r = row + deltaRow;
    let c = col + deltaCol;
    let count = 0;

    // Traverse in the specified direction as long as we stay inside the board bounds 
    // and the cell contains a disc of the current player
    while (r >= 0 && r < rows && c >= 0 && c < cols && board[r][c] === currentPlayer) {
        count++;
        r += deltaRow;
        c += deltaCol;
    }
    return count;
}

/**
 * Check if the game is a draw.
 */
function checkDraw() {
    // Loop through the top row. If any cell is empty, it's not a draw
    for (let i = 0; i < cols; i++) {
        if (board[0][i] === null) {
            return false;
        }
    }
    return true;
}

/**
 * Update the scoreboard with the current scores.
 */
function updateScoreboard() {
    document.getElementById('player1-score').textContent = player1Score;
    document.getElementById('player2-score').textContent = player2Score;
}

// Initialize the board when the script is loaded
initBoard();

// Display the current year in the designated element
document.getElementById('currentYear').textContent = new Date().getFullYear();
