// Engagement Counter

// Simple password protection
(function() {
    const password = "25122025"; // set your password here
    const userInput = prompt("Enter password to access our page 💙:");
    if(userInput !== password) {
        alert("Incorrect password! Goodbye 💔");
        document.body.innerHTML = "<h1 style='text-align:center; margin-top:50px; color:red;'>Access Denied 💔</h1>";
    }
})();



function updateEngagementCounter() {
    const engagementDate = new Date("2025-12-25T19:00:00");
    const now = new Date();
    const diff = now - engagementDate;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById("engagementCounter").textContent =
        `${days}d ${hours}h ${minutes}m ${seconds}s`;
}
setInterval(updateEngagementCounter, 1000);
updateEngagementCounter();

// Open When Letters
function openLetter(type) {
    const letterText = document.getElementById("letterText");
    if(type === 'sad') {
        letterText.textContent = "Don't be sad, my love 💙 I'm always with you!";
    } else if(type === 'miss') {
        letterText.textContent = "I miss you too 💙 Counting every moment until we meet!";
    } else if(type === 'happy') {
        letterText.textContent = "Yay! Keep smiling 💙 You make me happiest!";
    }
}

// Music Toggle
function toggleMusic() {
    const music = document.getElementById("bgMusic");
    if(music.paused) {
        music.play();
    } else {
        music.pause();
    }
}

// Scroll Fade-in Effect
function scrollFade() {
    const elements = document.querySelectorAll('.scroll-fade');
    const windowHeight = window.innerHeight;
    elements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        if(elementTop < windowHeight - 100) {
            el.classList.add('show');
        }
    });
}
window.addEventListener('scroll', scrollFade);
window.addEventListener('load', scrollFade);


function toggleMusic() {
    const music = document.getElementById("bgMusic");
    if (music.paused) {
        music.play();
    } else {
        music.pause();
    }
}


// Song Selector
const selector = document.getElementById('songSelector');
const player = document.getElementById('audioPlayer');

selector.addEventListener('change', () => {
    player.src = selector.value;
    player.play();
});



     
       // ===============================
// ADVANCED PUZZLE GAME
// ===============================

const board = document.getElementById("puzzleBoard");
const shuffleBtn = document.getElementById("shuffleBtn");
const imageSelector = document.getElementById("imageSelector");
const winMessage = document.getElementById("winMessage");
const moveCounterEl = document.getElementById("moveCounter");
const timerEl = document.getElementById("timer");

const size = 3;
let tiles = [];
let state = [];
let moves = 0;
let timer = 0;
let timerInterval = null;

function startTimer() {
    clearInterval(timerInterval);
    timer = 0;
    timerEl.textContent = timer;
    timerInterval = setInterval(() => {
        timer++;
        timerEl.textContent = timer;
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function createSolvedState() {
    state = [];
    for (let i = 0; i < size * size; i++) {
        state.push(i);
    }
}

function createBoard(imageSrc) {
    board.innerHTML = "";
    tiles = [];

    for (let i = 0; i < size * size; i++) {
        const tile = document.createElement("div");
        tile.classList.add("tile");

        if (i === size * size - 1) {
            tile.classList.add("empty");
        } else {
            const x = (i % size) * -120;
            const y = Math.floor(i / size) * -120;
            tile.style.backgroundImage = `url(${imageSrc})`;
            tile.style.backgroundPosition = `${x}px ${y}px`;
        }

        tile.dataset.value = i;
        tile.addEventListener("click", () => moveTile(i));
        tiles.push(tile);
        board.appendChild(tile);
    }

    createSolvedState();
    moves = 0;
    moveCounterEl.textContent = moves;
    winMessage.textContent = "";
    stopTimer();
}

function render() {
    board.innerHTML = "";
    state.forEach(value => {
        board.appendChild(tiles[value]);
    });
}

function getEmptyIndex() {
    return state.indexOf(size * size - 1);
}

function isAdjacent(i1, i2) {
    const r1 = Math.floor(i1 / size);
    const c1 = i1 % size;
    const r2 = Math.floor(i2 / size);
    const c2 = i2 % size;
    return Math.abs(r1 - r2) + Math.abs(c1 - c2) === 1;
}

function moveTile(index) {
    const tilePos = state.indexOf(index);
    const emptyPos = getEmptyIndex();

    if (isAdjacent(tilePos, emptyPos)) {
        [state[tilePos], state[emptyPos]] =
            [state[emptyPos], state[tilePos]];

        render();

        moves++;
        moveCounterEl.textContent = moves;

        if (moves === 1) startTimer();

        if (checkWin()) {
            stopTimer();
            winMessage.textContent = "You solved it 💙 Perfect match!";
            launchConfetti();
        }
    }
}

function shuffle() {
    for (let i = 0; i < 200; i++) {
        const emptyPos = getEmptyIndex();
        const neighbors = state
            .map((_, i) => i)
            .filter(i => isAdjacent(i, emptyPos));

        const rand =
            neighbors[Math.floor(Math.random() * neighbors.length)];

        [state[rand], state[emptyPos]] =
            [state[emptyPos], state[rand]];
    }

    render();
    moves = 0;
    moveCounterEl.textContent = moves;
    winMessage.textContent = "";
    stopTimer();
}

function checkWin() {
    return state.every((val, index) => val === index);
}

// Confetti
function launchConfetti() {
    const duration = 2000;
    const end = Date.now() + duration;

    const interval = setInterval(() => {
        if (Date.now() > end) {
            clearInterval(interval);
            return;
        }

        const confetti = document.createElement("div");
        confetti.style.position = "fixed";
        confetti.style.width = "8px";
        confetti.style.height = "8px";
        confetti.style.background = `hsl(${Math.random()*360},100%,50%)`;
        confetti.style.left = Math.random()*100 + "vw";
        confetti.style.top = "-10px";
        confetti.style.opacity = "1";
        confetti.style.pointerEvents = "none";
        confetti.style.transition = "transform 2s linear, opacity 2s";

        document.body.appendChild(confetti);

        setTimeout(() => {
            confetti.style.transform = "translateY(100vh)";
            confetti.style.opacity = "0";
        }, 10);

        setTimeout(() => confetti.remove(), 2000);

    }, 20);
}

// Events
shuffleBtn.addEventListener("click", shuffle);

imageSelector.addEventListener("change", function () {
    createBoard(this.value);
    render();
});

// Init
createBoard(imageSelector.value);
render();