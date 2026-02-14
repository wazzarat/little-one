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
const title = document.getElementById("loveTitle");
const secret = document.getElementById("secretMessage");

const message = "You are the best thing that ever happened to me. I choose you. Always. 💙";

let typing = false;

title.addEventListener("click", function () {

    if (typing) return;

    secret.textContent = "";
    typing = true;

    let i = 0;

    function typeWriter() {
        if (i < message.length) {
            secret.textContent += message.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        } else {
            typing = false;
        }
    }

    typeWriter();
});


// DOM Elements
const puzzle = document.getElementById("puzzle");
const messageBox = document.getElementById("puzzleMessage");
const moveDisplay = document.getElementById("moveCount");
const timerDisplay = document.getElementById("timer");
const restartBtn = document.getElementById("restartBtn");
const photoSelect = document.getElementById("photoSelect");
const thumbs = document.querySelectorAll(".thumb");

const size = 3;
let images = ["ph1.jpg", "ph2.jpg", "ph3.jpg", "photo1.jpg"];
let image = images[Math.floor(Math.random() * 2)]; // random start from first 2

let tiles = [];
let emptyIndex = size * size - 1;
let moves = 0;
let timer = 0;
let interval;
let gameStarted = false;

// ------------------- Puzzle Creation -------------------
function createPuzzle() {
    puzzle.innerHTML = "";
    tiles = [];
    emptyIndex = size * size - 1;

    for (let i = 0; i < size * size; i++) {
        const tile = document.createElement("div");
        tile.classList.add("puzzle-tile");

        if (i === emptyIndex) {
            tile.classList.add("empty");
        } else {
            const x = (i % size) * 100;
            const y = Math.floor(i / size) * 100;
            tile.style.backgroundImage = `url(${image})`;
            tile.style.backgroundPosition = `-${x}px -${y}px`;
        }

        tile.addEventListener("click", () => moveTile(i));
        tiles.push(tile);
        puzzle.appendChild(tile);
    }
}

// ------------------- Tile Movement -------------------
function moveTile(index) {
    const validMoves = [
        emptyIndex - 1,
        emptyIndex + 1,
        emptyIndex - size,
        emptyIndex + size
    ];

    if (validMoves.includes(index)) {
        if (!gameStarted) {
            startTimer();
            gameStarted = true;
        }

        swapTiles(index, emptyIndex);
        emptyIndex = index;

        moves++;
        moveDisplay.textContent = moves;

        checkWin();
    }
}

function swapTiles(i1, i2) {
    const tempBg = tiles[i1].style.backgroundPosition;
    const tempImg = tiles[i1].style.backgroundImage;

    tiles[i1].style.backgroundPosition = tiles[i2].style.backgroundPosition;
    tiles[i1].style.backgroundImage = tiles[i2].style.backgroundImage;
    tiles[i1].classList.toggle("empty");

    tiles[i2].style.backgroundPosition = tempBg;
    tiles[i2].style.backgroundImage = tempImg;
    tiles[i2].classList.toggle("empty");
}

// ------------------- Shuffle -------------------
function shuffle() {
    for (let i = 0; i < 150; i++) {
        const neighbors = [
            emptyIndex - 1,
            emptyIndex + 1,
            emptyIndex - size,
            emptyIndex + size
        ].filter(i => i >= 0 && i < size * size);

        const randomMove = neighbors[Math.floor(Math.random() * neighbors.length)];
        swapTiles(randomMove, emptyIndex);
        emptyIndex = randomMove;
    }
}

// ------------------- Timer -------------------
function startTimer() {
    interval = setInterval(() => {
        timer++;
        timerDisplay.textContent = timer;
    }, 1000);
}

function stopTimer() {
    clearInterval(interval);
}

// ------------------- Win Check -------------------
function checkWin() {
    let correct = true;

    for (let i = 0; i < tiles.length - 1; i++) {
        const x = (i % size) * 100;
        const y = Math.floor(i / size) * 100;

        if (!tiles[i].classList.contains("empty")) {
            if (tiles[i].style.backgroundPosition !== `-${x}px -${y}px`) {
                correct = false;
                break;
            }
        }
    }

    if (correct) {
        stopTimer();
        messageBox.textContent = `🎉 You solved it in ${moves} moves and ${timer} seconds! 💙`;
        document.body.classList.add("glow");

        // Unlock next photos
        photoSelect.options[2].disabled = false;
        photoSelect.options[3].disabled = false;
        thumbs[2].classList.remove("locked");
        thumbs[3].classList.remove("locked");
    }
}

// ------------------- Reset Game -------------------
function resetGame() {
    moves = 0;
    timer = 0;
    gameStarted = false;
    moveDisplay.textContent = 0;
    timerDisplay.textContent = 0;
    messageBox.textContent = "";
    document.body.classList.remove("glow");
    stopTimer();
    createPuzzle();
    shuffle();
}

// ------------------- Photo Selector -------------------
photoSelect.addEventListener("change", function () {
    image = this.value;
    resetGame();
});

// ------------------- Thumbnail Click -------------------
thumbs.forEach(thumb => {
    thumb.addEventListener("click", function () {
        if (this.classList.contains("locked")) return;

        image = this.dataset.img;
        photoSelect.value = image;
        resetGame();
    });
});

// ------------------- Restart Button -------------------
restartBtn.addEventListener("click", resetGame);

// ------------------- Initialize -------------------
createPuzzle();
shuffle();


