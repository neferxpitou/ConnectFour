**Learning Points**:
- **Board Representation**: Learned that a two-dimensional array is an effective way to represent the game board in Connect Four.
- **Checking for Wins**: Realized that using direction vectors (`deltaRow` and `deltaCol`) provides a more scalable approach to checking for wins in multiple directions without repeating code.
- **Special Features**: Understood the complexities of implementing additional game features, such as double drop and removing the last disc.

**Challenges**:
- **Winning Condition**: One of the main challenges was efficiently determining a win condition without having to check the entire board after every move.
- **Maintaining Game State**: Ensuring that the game state was correctly updated and reflected in the UI, especially after using special moves, was difficult.
- **Balancing Features**: Implementing special moves brought about the challenge of ensuring they didn't upset the balance of the game and still kept gameplay engaging.

**Managing Game's Complexity**:
- **Modularity**: By breaking down functions such as `checkDirection` and `countInDirection`, the code was modularized, making it easier to read and debug.
- **Using Directional Checks**: The use of `deltaRow` and `deltaCol` reduced redundancy and helped simplify the complex task of checking for wins in different directions.
- **State Variables**: Variables like `gameActive` and `currentPlayer` helped manage the game's state without cluttering the core game logic.

**Comparison to Initial Design**:
- The final product was a robust version of Connect Four with additional features, enhancing the basic game mechanics. 
- Using directional checks instead of manually checking each possibility streamlined the win-checking process compared to the initial approach that might involve more repetitive checks.

**AI Usage**:
- Having had experience working with HTML, CSS, and JavaScript, AI was was not used during the coding process.
- However, rather than using StackOverflow when I had questions, I would refer to AI tools to provide feedback and answers, which was particularly helpful when I was stuck.
