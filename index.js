let buttons = [$("#green"), $("#red"), $("#yellow"), $("#blue"), $(".btn")];
let audioPaths = [
    "sounds/green.mp3",
    "sounds/red.mp3",
    "sounds/yellow.mp3",
    "sounds/blue.mp3",
];
let gameTitle = $("#level-title");
let getGameLevel = $(".gamelevel");
let getGameScore = $(".gamescore");
let aiArray = [Math.floor(Math.random() * 4)];
let playerArray = [];
let gameLevel = 1;
let gameScore = 0;

function buttonClick(button) {
    button.addClass("pressed");
    setTimeout(function () {
        button.removeClass("pressed");
    }, 100);
}

function checkScore(callback) {
    let multiplyer = 1000 * gameLevel;
    if (playerArray.length < aiArray.length) {
        for (let i = 0; i < playerArray.length; i++) {
            if (!(playerArray[i] == aiArray[i])) {
                gameTitle.addClass("game-over");
                gameTitle.text("Game Over, Refresh to Try Again.");
                playerArray = [];
                aiArray = [];
                gameLevel = 0;
                gameScore = 0;
            }
        }
    } else {
        if (playerArray.toString() == aiArray.toString()) {
            playerArray = [];
            aiArray.push(Math.floor(Math.random() * 4));
            gameScore += multiplyer;
            gameLevel += 1;
            getGameScore.text("Game Score: " + gameScore);
            getGameLevel.text("Game Level: " + gameLevel);
            setTimeout(() => {
                callback();
            }, 1000);
        } else {
            gameTitle.addClass("game-over");
            gameTitle.text("Game Over, Refresh to Try Again.");
            playerArray = [];
            aiArray = [];
            gameLevel = 0;
            gameScore = 0;
        }
    }
}

function simonSays(buttonControl) {
    let simon_audio = new Audio(audioPaths[aiArray[aiArray.length - 1]]);
    simon_audio.play();
    buttonClick(buttons[aiArray[aiArray.length - 1]]);
    buttonControl();
}

function addButtonContol() {
    buttons[0].click(function (event) {
        let audio = new Audio("sounds/green.mp3");
        audio.play();
        playerArray.push(0);
        buttonClick(buttons[0]);
        checkScore(simonSays);
    });

    buttons[1].click(function (event) {
        let audio = new Audio("sounds/red.mp3");
        audio.play();
        playerArray.push(1);
        buttonClick(buttons[1]);
        checkScore(simonSays);
    });

    buttons[2].click(function (event) {
        let audio = new Audio("sounds/yellow.mp3");
        audio.play();
        playerArray.push(2);
        buttonClick(buttons[2]);
        checkScore(simonSays);
    });

    buttons[3].click(function (event) {
        let audio = new Audio("sounds/blue.mp3");
        audio.play();
        playerArray.push(3);
        buttonClick(buttons[3]);
        checkScore(simonSays);
    });
}

simonSays(addButtonContol);
