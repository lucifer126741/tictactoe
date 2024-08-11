import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgFor, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'tictactoe';
  isPlayerA: boolean = true;
  isGameOver: boolean = false;
  box: string[][] = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];

  fillBox(i: number, j: number) {
    if (!this.isGameOver) {
      this.box[i][j] = this.box[i][j] == '' && this.isPlayerA ? 'X' : 'O';
      if (this.checkWinner(i, j) == 'won') {
        this.isGameOver = true;
        console.log(`Player ${this.isPlayerA ? 'X' : '0'} won`);
      } else if (this.checkWinner(i, j) == 'tie') this.isGameOver = true;
      this.isPlayerA = !this.isPlayerA;
    }
  }
  checkWinner(row: number, col: number): string {
    const playerChar: string = this.isPlayerA ? 'X' : 'O';
    let rowChecker: boolean = true,
      columnChecker: boolean = true;
    for (let i = 0; i < 3; i++) {
      if (playerChar != this.box[row][i]) {
        rowChecker = false;
        break;
      }
    }
    for (let i = 0; i < 3; i++) {
      if (playerChar != this.box[i][col]) {
        columnChecker = false;
        break;
      }
    }
    let diag1Win =
      row === col && this.box[0][0] === playerChar && this.box[1][1] === playerChar && this.box[2][2] === playerChar;
    let diag2Win =
      row + col === 2 &&
      this.box[0][2] === playerChar &&
      this.box[1][1] === playerChar &&
      this.box[2][0] === playerChar;
    if (rowChecker || columnChecker || diag1Win || diag2Win) return 'won';
    let isTie = true;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.box[i][j] === '') {
          isTie = false;
          break;
        }
      }
      if (!isTie) break;
    }

    return isTie ? 'tie' : 'ongoing';
  }
}
