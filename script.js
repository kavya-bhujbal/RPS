const p1Hand = document.getElementById('p1-hand');
const p2Hand = document.getElementById('p2-hand');
const p1Label = document.getElementById('p1-label');
const p2Label = document.getElementById('p2-label');
const p1Name = document.getElementById('p1-name');
const p2Name = document.getElementById('p2-name');
const scoreP1El = document.getElementById('score-p1');
const scoreP2El = document.getElementById('score-p2');
const resultText = document.getElementById('result-text');
const buttons = document.querySelectorAll('.choice-btn');
const resetBtn = document.getElementById('reset-btn');
const vsCpuBtn = document.getElementById('vs-cpu');
const vsPlayerBtn = document.getElementById('vs-player');

let gameMode = 'cpu'; // 'cpu' or 'player'
let scoreP1 = 0;
let scoreP2 = 0;
let p1ChoiceTemp = null;
let isPlaying = false;

const icons = {
    rock: '<i class="fa-solid fa-hand-rock"></i>',
    paper: '<i class="fa-solid fa-hand-paper"></i>',
    scissors: '<i class="fa-solid fa-hand-scissors"></i>'
};

// Mode Selection Handlers
vsCpuBtn.addEventListener('click', () => setMode('cpu'));
vsPlayerBtn.addEventListener('click', () => setMode('player'));

function setMode(mode) {
    gameMode = mode;
    vsCpuBtn.classList.toggle('active', mode === 'cpu');
    vsPlayerBtn.classList.toggle('active', mode === 'player');
    p2Name.textContent = mode === 'cpu' ? 'Computer' : 'Player 2';
    p2Label.textContent = mode === 'cpu' ? 'Computer' : 'Player 2';
    resetScores();
}

// Button Clicks
buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        if (isPlaying) return;
        const choice = btn.getAttribute('data-choice');

        if (gameMode === 'cpu') {
            playRound(choice, getComputerChoice());
        } else {
            // 2 Player Local Logic Phase 1 & 2
            if (!p1ChoiceTemp) {
                p1ChoiceTemp = choice;
                p1Label.textContent = "Player 1 (Locked!)";
                resultText.textContent = "Player 2's turn!";
            } else {
                playRound(p1ChoiceTemp, choice);
                p1ChoiceTemp = null;
                p1Label.textContent = "Player 1";
            }
        }
    });
});

function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    return choices[Math.floor(Math.random() * 3)];
}

function playRound(selection1, selection2) {
    isPlaying = true;
    resultText.textContent = "Fightering...";
    
    // Set shaking animations
    p1Hand.innerHTML = icons.rock;
    p2Hand.innerHTML = icons.rock;
    p1Hand.classList.add('shake-l');
    p2Hand.classList.add('shake-r');

    setTimeout(() => {
        p1Hand.classList.remove('shake-l');
        p2Hand.classList.remove('shake-r');

        p1Hand.innerHTML = icons[selection1];
        p2Hand.innerHTML = icons[selection2];

        const winner = checkWinner(selection1, selection2);
        updateScores(winner);
    }, 1000);
}

function checkWinner(p1, p2) {
    if (p1 === p2) return 'tie';
    if (
        (p1 === 'rock' && p2 === 'scissors') ||
        (p1 === 'paper' && p2 === 'rock') ||
        (p1 === 'scissors' && p2 === 'paper')
    ) {
        return 'p1';
    }
    return 'p2';
}

function updateScores(winner) {
    if (winner === 'tie') {
        resultText.textContent = "It's a Tie! 🤝";
        resultText.style.color = 'var(--tie-color)';
    } else if (winner === 'p1') {
        scoreP1++;
        scoreP1El.textContent = scoreP1;
        resultText.textContent = `${p1Name.textContent} Wins! 🏆`;
        resultText.style.color = 'var(--win-color)';
    } else {
        scoreP2++;
        scoreP2El.textContent = scoreP2;
        resultText.textContent = `${p2Name.textContent} Wins! 🏆`;
        resultText.style.color = 'var(--lose-color)';
    }
    isPlaying = false;
}

function resetScores() {
    scoreP1 = 0;
    scoreP2 = 0;
    scoreP1El.textContent = '0';
    scoreP2El.textContent = '0';
    p1ChoiceTemp = null;
    p1Label.textContent = 'Player 1';
    resultText.textContent = 'Choose your weapon!';
    resultText.style.color = 'var(--text-color)';
    p1Hand.innerHTML = icons.rock;
    p2Hand.innerHTML = icons.rock;
}

resetBtn.addEventListener('click', resetScores);
