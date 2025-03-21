let gameData = [];
let userData = [];
let level = 0;
let started = false;
let p = document.querySelector("p");

document.addEventListener("keydown", function () {
    if (!started) {
        started = true;
        levelUp();
    }
});

function levelUp() {
    userData = [];
    level++;
    p.textContent = `Level: ${level}`;
    gameFlush();
}

function gameFlush() {
    let allBtns = ["box-1", "box-2", "box-3", "box-4"];
    let randomBtns = allBtns[Math.floor(Math.random() * 4)];
    let selectRanBtns = document.getElementById(randomBtns);

    selectRanBtns.classList.add("flash");
    setTimeout(() => {
        selectRanBtns.classList.remove("flash");
    }, 300);

    gameData.push(randomBtns);
}

let allBtns = document.querySelectorAll(".box");
for (let btn of allBtns) {
    btn.addEventListener("click", function () {
        let userFlashData = this;
        let userId = userFlashData.getAttribute("id");
        userData.push(userId);
        
        userFlash(userFlashData);
        checkAns();
    });
}

function userFlash(userFlashData) {
    userFlashData.classList.add("userFlash");
    setTimeout(() => {
        userFlashData.classList.remove("userFlash");
    }, 300);
}

function checkAns() {
    let p = document.querySelector("p");

    let currentIndex = userData.length - 1;
    if (userData[currentIndex] !== gameData[currentIndex]) {
        p.textContent = `Game Over! Your Score: ${level - 1}. Press any key to restart.`;

        gameData = [];
        userData = [];
        level = 0;
        started = false;
    } else if (userData.length === gameData.length) {
        setTimeout(() => {
            levelUp();
        }, 1000);
    }
}
