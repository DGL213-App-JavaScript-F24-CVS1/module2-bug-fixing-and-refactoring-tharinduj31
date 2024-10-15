"use strict";

(() => {
  window.addEventListener("load", (event) => {
    // Canvas references
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");

     // UI references
     const restartButton = document.querySelector("#restart");
     const playerTurnText = document.querySelector("#turn-text");
 
     // Constants
     const CELLS_PER_AXIS = 3; // Tic-Tac-Toe is a 3x3 grid
     const CELL_WIDTH = canvas.width / CELLS_PER_AXIS;
     const CELL_HEIGHT = canvas.height / CELLS_PER_AXIS;
     const EMPTY_CELL = "";
     const PLAYER_X = "X";
     const PLAYER_O = "O";

     // Game state
    let grid = [];
    let currentPlayer = PLAYER_X;
    let gameOver = false;

    function startGame() {
        initializeGrid();
        render();
        updateTurnDisplay();
      }
      
      function initializeGrid() {
        // Create a 3x3 grid with empty cells
        grid = Array(CELLS_PER_AXIS).fill().map(() => Array(CELLS_PER_AXIS).fill(EMPTY_CELL));
      }

      function updateTurnDisplay() {
        playerTurnText.textContent = `Player ${currentPlayer}'s Turn`;
      }

      function render() {
        // Clear the canvas for re-rendering
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let row = 0; row < CELLS_PER_AXIS; row++) {
          for (let col = 0; col < CELLS_PER_AXIS; col++) {
            // Draw grid lines
            ctx.strokeRect(col * CELL_WIDTH, row * CELL_HEIGHT, CELL_WIDTH, CELL_HEIGHT);
  
            // Draw X or O in the grid cell if it exists
            const cellValue = grid[row][col];
            if (cellValue) {
              ctx.font = "48px Arial";
              ctx.textAlign = "center";
              ctx.textBaseline = "middle";
              ctx.fillText(cellValue, col * CELL_WIDTH + CELL_WIDTH / 2, row * CELL_HEIGHT + CELL_HEIGHT / 2);
            }
          }
        }
      }

      function handleGridClick(event) {
        if (gameOver) return; // Don't allow actions after the game is over
  
        const { column, row } = convertCartesiansToGrid(event.offsetX, event.offsetY);
  
        // Only allow a move if the cell is empty
        if (grid[row][column] === EMPTY_CELL) {
          grid[row][column] = currentPlayer; // Mark the cell with the current player's symbol
          render(); // Update the visual representation of the grid
  
          if (checkWin()) {
            playerTurnText.textContent = `Player ${currentPlayer} Wins!`;
            gameOver = true;
          } else if (checkDraw()) {
            playerTurnText.textContent = "It's a Draw!";
            gameOver = true;
          } else {
            switchPlayer();
            updateTurnDisplay();
          }
        }
      }


      function switchPlayer() {
        // Swap the current player between X and O
        currentPlayer = currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;
      }
  
      function checkWin() {
        // Check rows, columns, and diagonals for a winning condition
        for (let i = 0; i < CELLS_PER_AXIS; i++) {
          // Check each row
          if (grid[i][0] !== EMPTY_CELL && grid[i][0] === grid[i][1] && grid[i][1] === grid[i][2]) {
            return true;
          }
          // Check each column
          if (grid[0][i] !== EMPTY_CELL && grid[0][i] === grid[1][i] && grid[1][i] === grid[2][i]) {
            return true;
          }
        }
  
        // Check the two diagonals
        if (grid[0][0] !== EMPTY_CELL && grid[0][0] === grid[1][1] && grid[1][1] === grid[2][2]) {
          return true;
        }
        if (grid[0][2] !== EMPTY_CELL && grid[0][2] === grid[1][1] && grid[1][1] === grid[2][0]) {
          return true;
        }
  
        return false;
      }

      function checkDraw() {
        // Check if every cell is filled and no winner has been declared
        return grid.flat().every(cell => cell !== EMPTY_CELL);
      }

      function restartGame() {
        gameOver = false;
        currentPlayer = PLAYER_X;
        startGame();
      }
  
    
  

 // #region Event Listeners

    canvas.addEventListener("mousedown", handleGridClick);
    restartButton.addEventListener("mousedown", restartGame);


    function convertCartesiansToGrid(xPos, yPos) {
        // Convert the canvas click position into grid coordinates
        return {
          column: Math.floor(xPos / CELL_WIDTH),
          row: Math.floor(yPos / CELL_HEIGHT),
        };
      }

       // Start the game
    startGame();




  });
})();
