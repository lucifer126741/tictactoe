import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('TicTacToeComponent', () => {
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    });
    component = TestBed.createComponent(AppComponent).componentInstance;
  });

  it('should fill box with X or O', () => {
    component.fillBox(0, 0);
    expect(component.box[0][0]).toBe('X');
    component.fillBox(0, 1);
    expect(component.box[0][1]).toBe('O');
  });

  it('should detect row win', () => {
    component.box = [
      ['X', 'X', 'X'],
      ['', '', ''],
      ['', '', ''],
    ];
    expect(component.checkWinner(0, 0)).toBe('won');
  });

  it('should detect column win', () => {
    component.box = [
      ['X', '', ''],
      ['X', '', ''],
      ['X', '', ''],
    ];
    expect(component.checkWinner(0, 0)).toBe('won');
  });

  it('should detect main diagonal win', () => {
    component.box = [
      ['X', '', ''],
      ['', 'X', ''],
      ['', '', 'X'],
    ];
    expect(component.checkWinner(0, 0)).toBe('won');
  });

  it('should detect anti-diagonal win', () => {
    component.box = [
      ['', '', 'X'],
      ['', 'X', ''],
      ['X', '', ''],
    ];
    expect(component.checkWinner(0, 2)).toBe('won');
  });

  it('should detect tie', () => {
    component.box = [
      ['X', 'O', 'X'],
      ['O', 'X', 'O'],
      ['O', 'X', 'O'],
    ];
    expect(component.checkWinner(0, 0)).toBe('tie');
  });

  it('should return ongoing for empty board', () => {
    component.box = [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ];
    expect(component.checkWinner(0, 0)).toBe('ongoing');
  });
});
