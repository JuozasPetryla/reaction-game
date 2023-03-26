"use strict";

const buttonStart = document.querySelector(".btn-start");
const buttonGame = document.querySelector(".btn-game");
const time = document.querySelector(".time");
const highscores = document.querySelector(".highscores");
buttonGame.disabled = true;
buttonStart.disabled = false;

class Game {
  _int;
  seconds = 0;
  miliseconds = 0;
  _scores = [];
  constructor() {
    buttonStart.addEventListener("click", this.startGame.bind(this));
    buttonGame.addEventListener("click", this.stopGame.bind(this));
  }

  startGame() {
    // Enable buttons
    buttonStart.disabled = true;
    const randomTime = Math.random() * 5;
    time.textContent = "???";
    time.style.color = "#37b24d";

    // Start game
    setTimeout(() => {
      time.textContent = "!!!";
      time.style.color = "#c92a2a";
      buttonGame.classList.add("active");
      buttonGame.disabled = false;
      // Start reaction timer
      this.int = setInterval(() => {
        this.miliseconds += 10;
        if (this.miliseconds === 1000) {
          this.miliseconds = 0;
          this.seconds++;
        }
      }, 10);
    }, randomTime * 1000);
  }

  stopGame() {
    // Enable buttons
    buttonStart.disabled = false;
    buttonGame.disabled = true;

    // Set time text
    time.textContent = `${this.seconds} : ${this.miliseconds}`;
    time.style.color = "#e9ecef";

    // Generate highscores and add to list
    this._scores.push(this.miliseconds + this.seconds * 1000);
    this._scores.sort((a, b) => a - b);
    highscores.innerHTML = "";
    this._generateHighscore();

    // End game, reset times
    buttonGame.classList.remove("active");
    highscores.classList.remove("hidden");
    clearInterval(this.int);
    this.miliseconds = 0;
    this.seconds = 0;
  }

  _generateHighscore() {
    let markup = this._scores
      .map((score) => {
        return `<li class="highscore">${
          score.toString().length < 4 ? "0" : score.toString().slice(0, 1)
        } : ${
          score.toString().length < 4 ? score : score.toString().slice(1, -1)
        }</li>`;
      })
      .join("");
    highscores.insertAdjacentHTML("beforeend", markup);
  }
}

const game = new Game();
