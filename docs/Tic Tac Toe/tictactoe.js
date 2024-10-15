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




  });
})();
