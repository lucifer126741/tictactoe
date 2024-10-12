import { DIALOG_DATA } from '@angular/cdk/dialog';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, inject, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgFor, NgIf, CommonModule, MatButtonModule, MatDialogModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'tictactoe';
  isPlayerA = true;
  isGameOver = false;
  winnerDescription = '';
  box: string[][] = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];
  private readonly dialog = inject(MatDialog);
  showDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      height: '200px',
      width: '500px',
      data: this.winnerDescription,
    });
    dialogRef.afterClosed().subscribe({
      next: (res: any) => {
        this.resetGame();
      },
      error: (err: any) => {},
    });
  }
  fillBox(i: number, j: number): void {
    if (!this.isGameOver && this.box[i][j] == '') {
      this.box[i][j] = this.isPlayerA ? 'X' : 'O';
      if (this.checkWinner(i, j) == 'won') {
        this.isGameOver = true;
        this.winnerDescription = `Player ${this.isPlayerA ? 'X' : 'O'} won`;
        this.showDialog();
      } else if (this.checkWinner(i, j) == 'tie') {
        this.isGameOver = true;
        this.winnerDescription = 'Tie';
        this.showDialog();
      }

      this.isPlayerA = !this.isPlayerA;
    }
  }
  checkWinner(row: number, col: number): string {
    const playerChar: string = this.isPlayerA ? 'X' : 'O';
    let rowChecker = true,
      columnChecker = true;
    //rowChecker
    for (let i = 0; i < 3; i++) {
      if (playerChar != this.box[row][i]) {
        rowChecker = false;
        break;
      }
    }
    //columnChecker
    for (let i = 0; i < 3; i++) {
      if (playerChar != this.box[i][col]) {
        columnChecker = false;
        break;
      }
    }
    //main diag
    const diag1Win =
      row === col && this.box[0][0] === playerChar && this.box[1][1] === playerChar && this.box[2][2] === playerChar;
    //anti-diag
    const diag2Win =
      row + col === 2 &&
      this.box[0][2] === playerChar &&
      this.box[1][1] === playerChar &&
      this.box[2][0] === playerChar;
    //tie
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
  resetGame() {
    this.box = this.box.map((row: string[]) => {
      return ['', '', ''];
    });
    this.isGameOver = false;
    this.isPlayerA = true;
    this.winnerDescription = '';
  }
}

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogContent],
  templateUrl: './dialog.html',
  styleUrl: './dialog.scss',
  encapsulation: ViewEncapsulation.None,
})
export class DialogComponent {
  readonly dialogRef = inject(MatDialogRef<DialogComponent>);
  readonly data = inject(MAT_DIALOG_DATA);
  closeDialog() {
    this.dialogRef.close();
  }
}
