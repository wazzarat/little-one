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


// PUZZLE (Stable + Smooth)
// ===============================

const puzzleBoard = document.getElementById("puzzleBoard");
const shuffleBtn = document.getElementById("shuffleBtn");
const winMessage = document.getElementById("winMessage");

let puzzle = [];
const size = 3;

function initPuzzle(imageSrc) {
    if (!puzzleBoard) return;

    puzzleBoard.innerHTML = "";
    puzzle = [];

    for (let i = 0; i < size * size; i++) {
        const tile = document.createElement("div");
        tile.classList.add("tile");

        if (i === size * size - 1) {
            tile.classList.add("empty");
            tile.dataset.value = "empty";
        } else {
            const x = (i % size) * -120;
            const y = Math.floor(i / size) * -120;

            tile.style.backgroundImage = `url(${imageSrc})`;
            tile.style.backgroundPosition = `${x}px ${y}px`;
            tile.dataset.value = i;
        }

        tile.addEventListener("click", () => moveTile(i));
        puzzle.push(tile);
        puzzleBoard.appendChild(tile);
    }

    if (winMessage) winMessage.textContent = "";
}

function moveTile(index) {
    const emptyIndex = puzzle.findIndex(t => t.dataset.value === "empty");
    if (isAdjacent(index, emptyIndex)) {
        [puzzle[index], puzzle[emptyIndex]] =
            [puzzle[emptyIndex], puzzle[index]];

        renderPuzzle();

        if (checkWin()) {
            if (winMessage) {
                winMessage.textContent =
                    "You solved it 💙 Our memories always fit together.";
            }
        }
    }
}

function renderPuzzle() {
    puzzleBoard.innerHTML = "";
    puzzle.forEach(tile => puzzleBoard.appendChild(tile));
}

function isAdjacent(i1, i2) {
    const r1 = Math.floor(i1 / size);
    const c1 = i1 % size;
    const r2 = Math.floor(i2 / size);
    const c2 = i2 % size;
    return Math.abs(r1 - r2) + Math.abs(c1 - c2) === 1;
}

function shufflePuzzle() {
    for (let i = 0; i < 200; i++) {
        const emptyIndex = puzzle.findIndex(t => t.dataset.value === "empty");
        const neighbors = puzzle
            .map((_, i) => i)
            .filter(i => isAdjacent(i, emptyIndex));

        const random =
            neighbors[Math.floor(Math.random() * neighbors.length)];

        [puzzle[random], puzzle[emptyIndex]] =
            [puzzle[emptyIndex], puzzle[random]];
    }

    renderPuzzle();
    if (winMessage) winMessage.textContent = "";
}

function checkWin() {
    for (let i = 0; i < puzzle.length - 1; i++) {
        if (parseInt(puzzle[i].dataset.value) !== i) return false;
    }
    return true;
}

if (shuffleBtn) {
    shuffleBtn.addEventListener("click", shufflePuzzle);
}

// Initialize puzzle with your image
initPuzzle("ph1.jpg"); // change to you