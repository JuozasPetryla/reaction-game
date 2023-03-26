"use strict";

const buttonStart = document.querySelector(".btn-start");
const buttonGame = document.querySelector(".btn-game");
const time = document.querySelector(".time");
buttonGame.disabled = true;
buttonStart.disabled = false;

class Game {
  int;
  seconds = 0;
  miliseconds = 0;
  constructor() {
    buttonStart.addEventListener("click", this.startGame.bind(this));
    buttonGame.addEventListener("click", this.stopGame.bind(this));
  }

  startGame() {
    buttonStart.disabled = true;
    const randomTime = Math.random() * 5;
    time.textContent = "???";
    time.style.color = "#37b24d";
    setTimeout(() => {
      time.textContent = "!!!";
      time.style.color = "#c92a2a";
      buttonGame.classList.add("active");
      buttonGame.disabled = false;
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
    buttonStart.disabled = false;
    buttonGame.disabled = true;
    time.textContent = `${this.seconds} : ${this.miliseconds}`;
    time.style.color = "#e9ecef";
    buttonGame.classList.remove("active");
    clearInterval(this.int);
    this.miliseconds = 0;
    this.seconds = 0;
  }
}

const game = new Game();
