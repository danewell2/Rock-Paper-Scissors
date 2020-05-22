// Rock paper scissors game in console and prompt
"use strict";

const choices = ["rock", "paper", "scissors"];
let computerScore = 0, personScore = 0;

const personChoice_elem = document.querySelector('.move__icon_player_person');
const computerChoice_elem = document.querySelector('.move__icon_player_computer');
const playResultContent_elem = document.querySelector('.play-result__content');
const scoreNumbers_elem = document.querySelector('.score__numbers');

const btn_rock = document.querySelector('.button_move_rock');
const btn_paper = document.querySelector('.button_move_paper');
const btn_scissors = document.querySelector('.button_move_scissors');
const btn_reset = document.querySelector('.reset_button');

const modal_elem = document.querySelector('.modal');
const modal_header_elem = document.querySelector('.modal-content_header');
const modal_content_elem = document.querySelector('.modal-content_score');
const modal_button_elem = document.querySelector('.modal-content_button');

btn_rock.addEventListener('click', (e) => {
    playRound("rock");
});
btn_paper.addEventListener('click', (e) => {
    playRound("paper");
});
btn_scissors.addEventListener('click', (e) => {
    playRound("scissors");
});
btn_reset.addEventListener('click', (e) => {
    reset();
});

function playRound(personChoice) {

    let computerChoice = chooseComputer();

    if (
        personChoice == "rock" && computerChoice == "scissors" ||
        personChoice == "paper" && computerChoice == "rock" ||
        personChoice == "scissors" && computerChoice == "paper") {
        personScore++;
        showResult("player", personChoice, computerChoice);
    } else if (
        computerChoice == "rock" && personChoice == "scissors" ||
        computerChoice == "paper" && personChoice == "rock" ||
        computerChoice == "scissors" && personChoice == "paper") {
        computerScore++;
        showResult("computer", personChoice, computerChoice);
    } else {
        showResult("draw", personChoice, computerChoice);
    }

    if (computerScore >= 5 || personScore >= 5) {
        getWinner();
    }
}

function chooseComputer() {
    return choices[Math.floor(Math.random() * choices.length)];
}


function showResult(roundWinner, personChoice, computerChoice) {


    let prefix = "fa-hand";
    let classes = personChoice_elem.className.split(" ").filter(c => !c.startsWith(prefix));
    personChoice_elem.className = classes.join(" ").trim();

    let classString = `fa-hand-` + personChoice;
    personChoice_elem.classList.add(classString);

    if (personChoice == "scissors") {
        personChoice_elem.classList.add('icon_transform_mirror');
    } else {
        personChoice_elem.classList.remove('icon_transform_mirror');
        personChoice_elem.classList.add('icon_rotate_90deg');
    }

    classes = computerChoice_elem.className.split(" ").filter(c => !c.startsWith(prefix));
    computerChoice_elem.className = classes.join(" ").trim();

    classString = `fa-hand-` + computerChoice;
    computerChoice_elem.classList.add(classString);

    if (computerChoice == "scissors") {
        computerChoice_elem.classList.add('icon_transform_none');
    } else {
        computerChoice_elem.classList.remove('icon_transform_none');
        computerChoice_elem.classList.add('icon_mirrorRotate_90deg');
        personChoice_elem.classList.add('icon_opacity_0');
        personChoice_elem.classList.add('icon_opacity_1');
    }

    if (roundWinner == "player") {
        playResultContent_elem.textContent = "Player Won!";
        personChoice_elem.style.color = "green";
        computerChoice_elem.style.color = "red";

    } else if (roundWinner == "computer") {
        playResultContent_elem.textContent = "Computer Won!";
        personChoice_elem.style.color = "red";
        computerChoice_elem.style.color = "green";
    } else if (roundWinner == "draw") {
        playResultContent_elem.textContent = "Draw";
        personChoice_elem.style.color = "#383B3E";
        computerChoice_elem.style.color = "#383B3E";

    }

    scoreNumbers_elem.textContent = `${personScore} : ${computerScore}`;
}

function getWinner() {
    modal_elem.style.display = "flex";

    if (computerScore > personScore) {
        modal_header_elem.textContent = 'Computer Won!';
    } else if (personScore > computerScore) {
        modal_header_elem.textContent = 'Player Won!';
    }

    modal_content_elem.textContent = `Player: ${personScore} - Computer: ${computerScore}`;
    reset();

    modal_button_elem.addEventListener('click', (e) => {
        modal_elem.style.display = "none";
    });

}

function reset() {
    personScore = 0;
    computerScore = 0;

    let prefix = "fa-hand";
    scoreNumbers_elem.textContent = `${personScore} : ${computerScore}`;
    let classes = personChoice_elem.className.split(" ").filter(c => !c.startsWith(prefix));
    personChoice_elem.className = classes.join(" ").trim();
    classes = computerChoice_elem.className.split(" ").filter(c => !c.startsWith(prefix));
    computerChoice_elem.className = classes.join(" ").trim();
    playResultContent_elem.textContent = "";
}

