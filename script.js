// ===============================
// Simple Password Protection
// ===============================
(function() {
    const password = "25122025";
    const userInput = prompt("Enter password to access our page 💙:");

    if (userInput !== password) {
        alert("Incorrect password! Goodbye 💔");
        document.body.innerHTML =
            "<h1 style='text-align:center; margin-top:50px; color:red;'>Access Denied 💔</h1>";
    }
})();


// ===============================
// Engagement Counter
// ===============================
function updateEngagementCounter() {
    const engagementDate = new Date("2025-12-25T19:00:00");
    const now = new Date();
    const diff = now - engagementDate;

    const counter = document.getElementById("engagementCounter");

    if (!counter) return;

    if (diff < 0) {
        counter.textContent = "Counting down to our forever 💙";
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    counter.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

setInterval(updateEngagementCounter, 1000);
updateEngagementCounter();


// ===============================
// Open When Letters
// ===============================
function openLetter(type) {
    const letterText = document.getElementById("letterText");
    if (!letterText) return;

    if (type === "sad") {
        letterText.textContent = "Don't be sad, my love 💙 I'm always with you!";
    } else if (type === "miss") {
        letterText.textContent = "I miss you too 💙 Counting every moment until we meet!";
    } else if (type === "happy") {
        letterText.textContent = "Yay! Keep smiling 💙 You make me happiest!";
    }
}


// ===============================
// Music Toggle
// ===============================
function toggleMusic() {
    const music = document.getElementById("bgMusic");
    if (!music) return;

    if (music.paused) {
        music.play();
    } else {
        music.pause();
    }
}


// ===============================
// Song Selector
// ===============================
const songSelector = document.getElementById("songSelector");
const audioPlayer = document.getElementById("audioPlayer");

if (songSelector && audioPlayer) {
    songSelector.addEventListener("change", () => {
        audioPlayer.src = songSelector.value;
        audioPlayer.play();
    });
}


// ===============================
// Scroll Fade Effect
// ===============================
function scrollFade() {
    const elements = document.querySelectorAll(".scroll-fade");
    const windowHeight = window.innerHeight;

    elements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - 100) {
            el.classList.add("show");
        }
    });
}

window.addEventListener("scroll", scrollFade);
window.addEventListener("load", scrollFade);


// ===============================
// Puzzle
// ===============================
const board = document.getElementById("puzzleBoard");
const imageSelector = document.getElementById("imageSelector");
const shuffleBtn = document.getElementById("shuffleBtn");
const winMessage = document.getElementById("winMessage");

let tiles = [];
let emptyIndex = 8;
let currentImage = imageSelector ? imageSelector.value : "";

function createBoard() {
    if (!board) return;

    board.innerHTML = "";
    tiles = [];

    for (let i = 0; i < 9; i++) {
        const tile = document.createElement("div");
        tile.classList.add("tile");

        if (i === 8) {
            tile.classList.add("empty");
            tile.dataset.correct = "8";
        } else {
            const x = (i % 3) * -120;
            const y = Math.floor(i / 3) * -120;

            tile.style.backgroundImage = `url(${currentImage})`;
            tile.style.backgroundPosition = `${x}px ${y}px`;
            tile.dataset.correct = i.toString();
        }

        tile.dataset.index = i.toString();
        tile.addEventListener("click", moveTile);

        tiles.push(tile);
        board.appendChild(tile);
    }

    emptyIndex = 8;
    if (winMessage) winMessage.textContent = "";
}

function moveTile(e) {
    const index = parseInt(e.target.dataset.index);

    if (isAdjacent(index, emptyIndex)) {
        swapTiles(index, emptyIndex);
        emptyIndex = index;

        if (checkWin()) {
            if (winMessage) {
                winMessage.textContent =
                    "You solved it 💙 Our memories always fit together.";
            }
        }
    }
}

function isAdjacent(i1, i2) {
    const row1 = Math.floor(i1 / 3);
    const col1 = i1 % 3;
    const row2 = Math.floor(i2 / 3);
    const col2 = i2 % 3;

    return (Math.abs(row1 - row2) + Math.abs(col1 - col2)) === 1;
}

function swapTiles(i1, i2) {
    const temp = tiles[i1];
    tiles[i1] = tiles[i2];
    tiles[i2] = temp;

    board.innerHTML = "";
    tiles.forEach((tile, index) => {
        tile.dataset.index = index.toString();
        board.appendChild(tile);
    });
}

function shuffle() {
    for (let i = 0; i < 100; i++) {
        const neighbors = getMovableTiles();
        const randomIndex =
            neighbors[Math.floor(Math.random() * neighbors.length)];
        swapTiles(randomIndex, emptyIndex);
        emptyIndex = randomIndex;
    }

    if (winMessage) winMessage.textContent = "";
}

function getMovableTiles() {
    return tiles
        .map((_, index) => index)
        .filter(index => isAdjacent(index, emptyIndex));
}

function checkWin() {
    for (let i = 0; i < tiles.length; i++) {
        if (tiles[i].dataset.correct !== i.toString()) {
            return false;
        }
    }
    return true;
}

if (imageSelector) {
    imageSelector.addEventListener("change", () => {
        currentImage = imageSelector.value;
        createBoard();
    });
}

if (shuffleBtn) {
    shuffleBtn.addEventListener("click", shuffle);
}

createBoard();