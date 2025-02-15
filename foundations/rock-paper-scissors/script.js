
function getComputerChoice() {
    return ["rock", "paper", "scissors"][Math.floor(Math.random() * 3)]
}



function playGame() {
    let humanScore = 0;
    let computerScore = 0;
    const result = document.querySelector('#result');

    function playRound(humanChoice, computerChoice) {
        humanChoice = humanChoice.toLowerCase();
        if (humanChoice == computerChoice) {
            result.textContent = `Human Score: ${humanScore}, Computer Score: ${computerScore}.`
        } else if ((humanChoice == "rock" && computerChoice == "scissors") || (
            humanChoice == "scissors" && computerChoice == "paper"
        ) || (humanChoice == "paper" && computerChoice == "rock")) {
            humanScore++;
            result.textContent = `Human Score: ${humanScore}, Computer Score: ${computerScore}.`
        } else {
            computerScore++;
            result.textContent = `Human Score: ${humanScore}, Computer Score: ${computerScore}.`
        }
        if (humanScore === 5 && humanScore > computerScore) {
            result.textContent = `Final Score: Human ${humanScore}, Computer ${computerScore}. You win!`;
            disableButtons();
        } else if (humanScore < computerScore && computerScore == 5) {
            result.textContent = `Final Score: Human ${humanScore}, Computer ${computerScore}. Computer win!`;
            disableButtons();
        }
    }

    function disableButtons() {
        document.querySelectorAll('button').forEach(button => button.disabled = true);
    };

    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', () => playRound(button.id, getComputerChoice()));
    });

}

playGame();