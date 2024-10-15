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





  });
})();
