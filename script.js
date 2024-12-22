document.addEventListener("DOMContentLoaded", () => {
    const clickButton = document.getElementById("clickButton");
    const startGameButton = document.getElementById("startGame");
    const scoreElement = document.getElementById("score");
    const timerElement = document.getElementById("timer");
    const modal = document.getElementById("modal");
    const modalMessage = document.getElementById("modalMessage");
    const restartGameButton = document.getElementById("restartGame");
  
    let score = 0;
    let timeLeft = 10;
    let gameActive = false;
    let timerStarted = false; 
    let timerInterval = null; 
  
    const clickSound = new Audio("./click-sound.mp3");
    const winnerSound = new Audio("./winner-sound.mp3");
  
    function startGame() {
        score = 0;
        timeLeft = 10;
        gameActive = true;
        timerStarted = false; 
  
        scoreElement.textContent = `Score: ${score}`;
        timerElement.textContent = `Time: ${timeLeft} seconds`;
  
        clickButton.style.display = "inline-block";
        startGameButton.style.display = "none";
  
        if (timerInterval) {
            clearInterval(timerInterval);
        }
    }
  
    function startTimer() {
        if (!timerStarted && gameActive) {
            timerStarted = true; 
            timerInterval = setInterval(() => {
                if (timeLeft > 0 && gameActive) {
                    timeLeft--;
                    timerElement.textContent = `Time: ${timeLeft} seconds`;
                } else {
                    clearInterval(timerInterval);
                    endGame();
                }
            }, 1000);
        }
    }
  
    function updateScore() {
        if (gameActive) { 
            if (!timerStarted) {
                startTimer(); 
            }
            score++;
            scoreElement.textContent = `Score: ${score}`;
            clickSound.play(); 
        }
    }
  
    function endGame() {
        gameActive = false;
        clickButton.style.display = "none";
        startGameButton.style.display = "inline-block";
  
        winnerSound.play();
  
        modalMessage.textContent = `Game over! Your score: ${score} points.`;
        modal.style.display = "flex";
    }
  
    function restartGame() {
        modal.style.display = "none";
        startGame();
    }
  
    startGameButton.addEventListener("click", startGame);
    clickButton.addEventListener("click", updateScore);
    restartGameButton.addEventListener("click", restartGame);
  });
