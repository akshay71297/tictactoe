import { Component } from '@angular/core';

enum Player {
  X = 'X',
  O = 'O',
  EMPTY = ''
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  MIN_GRID_SIZE = 4;

  title = 'tictactoe';
  public size;
  currentPlayer;
  winner = '';
  matrix = [];

  playerEnum = Player;

  constructor() {
    this.initializeGame();
  }

  initializeGame = (gridSize?) => {

    if (gridSize && gridSize >= 4) {
      this.size = gridSize;
    } else {
      if (!this.size) { this.size = this.MIN_GRID_SIZE; }
    }

    for (let i = 0; i < this.size; i++) {
      this.matrix[i] = [];
      for (let j = 0; j < this.size ; j++) {
        this.matrix[i][j] = Player.EMPTY;
      }
    }

    this.currentPlayer = Player.X;
    this.winner = Player.EMPTY;
  }

  markCell = (x, y) => {
    if (this.winner === Player.EMPTY && this.matrix[x][y] === Player.EMPTY) {
      this.matrix[x][y] = this.currentPlayer;
      this.checkWinning();
      if (this.winner === Player.EMPTY) { this.changePlayer(); }
    }
  }

  changePlayer = () => {
    this.currentPlayer = this.currentPlayer === Player.X ? Player.O : Player.X;
  }

  checkWinning = () => {

    // horizontal + vertical
    let countH = 0;
    let countV = 0;
    for (let i = 0; i < this.matrix.length; i++) {
      if (this.winner !== Player.EMPTY) {
        break;
      }
      for (let j = 0; j < this.matrix[i].length; j++) {

        // horizontal
        if (this.matrix[i][j] === this.currentPlayer) {
          countH++;
          if (countH === 4) {
            countH = 0;
            this.winner = this.currentPlayer;
            continue;
          }
        } else {
          countH = 0;
        }

        // vertical
        if (this.matrix[j][i] === this.currentPlayer) {
          countV ++;
          if (countV === 4) {
            countV = 0;
            this.winner = this.currentPlayer;
          }
        } else {
          countV = 0;
        }
      }
    }

    if (this.winner !== Player.EMPTY) { return; }

    // diagonal 1 (ltr)
    for (let k = 0; k <= this.matrix.length - 4; k++) {
      let countD12 = 0;
      let countD13 = 0;
      for (let i = k; i < this.matrix.length; i++) {
        if (this.matrix[i][i - k] === this.currentPlayer) {
          countD12 ++;
          if (countD12 === 4) {
            countD12 = 0;
            this.winner = this.currentPlayer;
            continue;
          }
        } else {
          countD12 = 0;
        }
        if (this.matrix[i - k][i] === this.currentPlayer) {
          countD13 ++;
          if (countD13 === 4) {
            countD13 = 0;
            this.winner = this.currentPlayer;
          }
        } else {
          countD13 = 0;
        }
      }
    }

    if (this.winner !== Player.EMPTY) { return; }

    // diagonal 2 (rtl)
    for (let k = 3; k < this.matrix.length; k++) {
      let countD12 = 0;
      let countD13 = 0;
      for (let i = 0; i < this.matrix.length; i++) {
        if (this.matrix[i][Math.abs(i - k)] === this.currentPlayer) {
          countD12++;
          if (countD12 === 4) {
            countD12 = 0;
            this.winner = this.currentPlayer;
            // continue;
          }
        } else {
          countD12 = 0;
        }
        if (this.matrix[this.matrix.length - 1 - Math.abs(i - k)][this.matrix.length - 1 - i] === this.currentPlayer) {
          countD13++;
          if (countD13 === 4) {
            countD13 = 0;
            this.winner = this.currentPlayer;
          }
        } else {
          countD13 = 0;
        }
      }
    }
  }

}
