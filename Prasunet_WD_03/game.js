document.addEventListener("DOMContentLoaded", () => {
   const cells = document.querySelectorAll(".cell");

   let status = document.getElementById("status");

   let currentPlayer = "X";
   let gameState = Array(9).fill(null);
   let gameOver = false;
status.textContent=`its ${currentPlayer} turn`;
   function handleClick(e) {
       if (gameOver) return; // Game is already over, ignore clicks

       const cell = e.target;
       const i = cell.getAttribute("data");

       if (gameState[i] !== null) {
           return; // Cell already filled
       }

       gameState[i] = currentPlayer;
       console.log(gameState);
       
       cell.textContent = currentPlayer;

       if (currentPlayer === "X") {
           cell.style.color = "red";
       } else {
           cell.style.color = "blue"; // Example of color for O
       }

       // Check for winner after UI updates
       setTimeout(() => {
           if (checkWinner(currentPlayer)) {
               alert(`${currentPlayer} wins!`);
               gameOver = true;
               resetGame();
           } else if (gameState.every(cell => cell !== null)) {
               alert("It's a draw!");
               gameOver = true;
           } else {
            
               currentPlayer = currentPlayer === "X" ? "O" : "X";
               status.textContent=`its ${currentPlayer} turn`;
           }
       }, 100); // Adjust delay as needed
   }

   function checkWinner(player) {
       const winnings = [
           [0, 1, 2],
           [0, 4, 8],
           [0, 3, 6],
           [1, 4, 7],
           [2, 5, 8],
           [2, 4, 6],
           [3, 4, 5],
           [6, 7, 8]
       ];

       for (let win of winnings) {
           const [a, b, c] = win;
           if (gameState[a] === player && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
               return true; // Found a winning combination
           }
       }
       return false; // No winning combination found
   }

   function resetGame() {
       gameState.fill(null);
       cells.forEach(cell => {
           cell.textContent = "";
           cell.style.color = "";
       });
       currentPlayer = 'X'; // Start with X after reset
       gameOver = false;
       status.textContent=`its X turn`;
   }

   
   
   
   
   cells.forEach(cell => cell.addEventListener("click", handleClick));
   resetBtn.addEventListener("click", resetGame);
});
