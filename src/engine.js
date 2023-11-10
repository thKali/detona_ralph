const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#timeLeft"),
        score: document.querySelector("#score"),
    },
    values: {
        hitPosition: 0,
        hitCounter: 0,
        currentTime: 15,
    },
    actions: {
        timerId: setInterval(randomSquare, 650),
        countDownId: setInterval(countDown, 1000),
    }
}

function playHitSound() {
    let audio = new Audio("./assets/audios/hit.m4a")
    audio.volume = 0.12
    audio.play()
}

function randomSquare() {
    if (state.values.currentTime <= 0) {
        return;
    }

    state.view.squares.forEach(square => {

        square.classList.remove("enemyClicked")
        square.classList.remove("enemy")
    }
    )

    let randomNumber = Math.floor(Math.random() * 9)

    console.log(Math.floor(Math.random() * 9))

    let randomSquare = state.view.squares[randomNumber]

    randomSquare.classList.add("enemy")

    state.values.hitPosition = randomSquare.id
}

async function countDown() {

    if (state.values.currentTime <= 0) {
        clearInterval(state.actions.timerId)
        clearInterval(state.actions.countDownId)
        alert(`Game Over! Você fez ${state.values.hitCounter} pontos`)
        removeHitBoxListener()
        return;
    }

    state.values.currentTime--
    state.view.timeLeft.textContent = state.values.currentTime
}

function addHitBoxListener() {
    state.view.squares.forEach(square => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition) {
                state.values.hitCounter++
                state.view.score.textContent = state.values.hitCounter
                state.values.hitPosition = null

                square.classList.add("enemyClicked")

                playHitSound()
            }
        })
    });
}

function removeHitBoxListener() {
    state.view.squares.forEach(square => {
        square.removeEventListener("mousedown")
    });
}

function initialize() {
    addHitBoxListener();
}

initialize();