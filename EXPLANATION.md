**1. Game Initialization and Board Rendering**

The game starts by initializing a board of size rows x cols (in this case, 6x7). The board is represented as a 2D array, board, with null values indicating empty cells. Additionally, a table in the DOM is created to visually represent the board. Each cell in the table corresponds to a cell in the 2D array, and they have click event listeners attached to them. When a cell is clicked, the cellClicked function is invoked.

```js
function initBoard() {
    // ...
    for(let i = 0; i < rows; i++) {
        for(let j = 0; j < cols; j++) {
            const cellElem = rowElem.insertCell();
            cellElem.addEventListener('click', () => cellClicked(i, j));
            // ...
        }
    }
}
```

**2. Handling Player Moves and Game Logic**

The core gameplay revolves around the cellClicked function. When a cell is clicked, several checks and actions are performed in sequence:

- Validate the move using isValidMove.
- Place the player's disc in the chosen column using placeDisc.
- Update the visual board with renderBoard.
- Check for a winning move using checkWin.
- Check for a draw using checkDraw.
- If neither player has won nor is it a draw, switch players or handle special features like double drop.

```js
function cellClicked(row, col) {
    // ...
    let newRow = placeDisc(col);
    board[newRow][col] = currentPlayer;

    // ...
    if (checkWin(newRow, col)) {
        // ...
        return;
    }

    if (checkDraw()) {
        // ...
        return;
    }
    // ...
}
```

**3. Win Condition Checks**

To determine if a player has won, the checkWin function is invoked, which checks in four directions: horizontal, vertical, and two diagonals. The checking mechanism works by starting from the cell where the disc was just placed and counting consecutive discs of the same player in the specified direction. If four or more discs in a row belong to the current player, it's a win.

```js
function checkWin(row, col) {
    return checkDirection(row, col, 1, 0) || // Horizontal
           checkDirection(row, col, 0, 1) || // Vertical
           checkDirection(row, col, 1, 1) || // Diagonal (from left)
           checkDirection(row, col, 1, -1);  // Diagonal (from right)
}
```

The checkDirection function achieves this by counting discs in the specified direction and its opposite. If the combined count is 4 or more, it indicates a winning move.

```js
function checkDirection(row, col, deltaRow, deltaCol) {
    let count = 1;
    count += countInDirection(row, col, deltaRow, deltaCol);
    count += countInDirection(row, col, -deltaRow, -deltaCol);
    return count >= 4;
}
```
