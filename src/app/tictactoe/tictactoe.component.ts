import { Component, OnInit } from '@angular/core';
import { faPaw } from '@fortawesome/free-solid-svg-icons';
import { faCat } from '@fortawesome/free-solid-svg-icons';
import { faDog } from '@fortawesome/free-solid-svg-icons';
import { faAddressCard } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-tictactoe',
  templateUrl: './tictactoe.component.html',
  styleUrls: ['./tictactoe.component.css']
})
export class TictactoeComponent implements OnInit {
  faPaw = faPaw;
  faCat = faCat;
  faDog = faDog;
  faAddressCard = faAddressCard;
  gatoGana = false;
  perroGana = false;
  nadieGana = false;
  tablero = [['', '', ''],['', '', ''],['', '', '']];
  mejorMovimiento: number[] = [];
  turnoNuestro = true;
  boton =  [[false, false, false],[false, false, false],[false, false, false]];

  constructor() {
  }

  ngOnInit(): void {
  }

  revisarLinea (a: any, b: any, c: any) {
  return a == b && b == c && a != '';
  }

  verificarGanador(){
    let ganador = null;
    for (let i = 0; i < 3; i++) {
      if (this.revisarLinea(this.tablero[i][0], this.tablero[i][1], this.tablero[i][2])) {
        ganador = this.tablero[i][0];
        console.log("Hubo un Ganador");
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            this.boton[i][j] = true;
          }
        }
        if(!this.turnoNuestro){
          console.log("Perdimos");
          this.gatoGana = true;
        }else{
          this.perroGana = true;
        }
      }
    }

    for (let i = 0; i < 3; i++) {
      if (this.revisarLinea(this.tablero[0][i], this.tablero[1][i], this.tablero[2][i])) {
        ganador = this.tablero[0][i];
        console.log("Hubo un Ganador");
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            this.boton[i][j] = true;
          }
        }
        if(!this.turnoNuestro){
          console.log("Perdimos");
          this.gatoGana = true;
        }else{
          this.perroGana = true;
        }
      }
    }

    if (this.revisarLinea(this.tablero[0][0], this.tablero[1][1], this.tablero[2][2])) {
      ganador = this.tablero[0][0];
      console.log("Hubo un Ganador");
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          this.boton[i][j] = true;
        }
      }
      if(!this.turnoNuestro){
        console.log("Perdimos");
        this.gatoGana = true;
      }else{
        this.perroGana = true;
      }
    }
    if (this.revisarLinea(this.tablero[2][0], this.tablero[1][1], this.tablero[0][2])) {
      ganador = this.tablero[2][0];
      console.log("Hubo un Ganador");
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          this.boton[i][j] = true;
        }
      }
      if(!this.turnoNuestro){
        console.log("Perdimos");
        this.gatoGana = true;
      }else{
        this.perroGana = true;
      }
    }

    let openSpots = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.tablero[i][j] == '') {
          openSpots++;
        }
      }
    }
    if (ganador == null && openSpots == 0) {
      this.nadieGana = true;
      return 'tie';
    } else {
      return ganador;
    }
  }
  checkWinner() {
    let ganador = null;
    for (let i = 0; i < 3; i++) {
      if (this.revisarLinea(this.tablero[i][0], this.tablero[i][1], this.tablero[i][2])) {
        ganador = this.tablero[i][0];
      }
    }

    for (let i = 0; i < 3; i++) {
      if (this.revisarLinea(this.tablero[0][i], this.tablero[1][i], this.tablero[2][i])) {
        ganador = this.tablero[0][i];
      }
    }

    if (this.revisarLinea(this.tablero[0][0], this.tablero[1][1], this.tablero[2][2])) {
      ganador = this.tablero[0][0];
    }
    if (this.revisarLinea(this.tablero[2][0], this.tablero[1][1], this.tablero[0][2])) {
      ganador = this.tablero[2][0];
    }

    let openSpots = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.tablero[i][j] == '') {
          openSpots++;
        }
      }
    }

    if (ganador == null && openSpots == 0) {
      return 'tie';
    } else {
      return ganador;
    }
  }
realizarMovimiento(i : number, j: number){
  if(this.turnoNuestro){
    this.verificarGanador();
   this.boton[i][j] = true;
   this.tablero[i][j] = 'O';
   const strBtn = "boton" + String(i) + String(j);
   document.getElementById(strBtn)!.innerText  = "O";
   this.turnoNuestro = false;
   this.bestMove();
  }
}

bestMove() {
  let bestScore = -Infinity;
  let move: (number)[] = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      // Is the spot available?
      if (this.tablero[i][j] == '') {
        this.tablero[i][j] = 'X';
        let score = this.minimax(this.tablero, 0, false);
        this.tablero[i][j] = '';
        if (score > bestScore) {
          bestScore = score;
          move = [i, j];
        }
      }
    }
  }
  let i : number = move[0];
  let j : number = move[1];
  console.log(i);
  console.log(j);
  let a = this.verificarGanador();
  if(a != 'tie'){
    this.tablero[i][j] = 'X';
    const strBtn = "boton" + String(i) + String(j);
    document.getElementById(strBtn)!.innerText  = "X";
    this.boton[i][j] = true;
    console.log(this.tablero);
    this.verificarGanador();
    this.turnoNuestro = true;
  }
}


minimax(this: any, tablero: any, depth: number , isMaximizing: boolean) {
  let result = this.checkWinner();
  if (result !== null) {
    if(result == 'X'){
      return 5;
    }else if(result == 'O'){
      return -5;
    }else if(result == 'tie'){
      return 0;
    }
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (tablero[i][j] == '') {
          tablero[i][j] = 'X';
          let score = this.minimax(tablero, depth + 1, false);
          tablero[i][j] = '';
          bestScore = Math.max(score, bestScore);
        }
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (tablero[i][j] == '') {
          tablero[i][j] = 'O';
          let score = this.minimax(tablero, depth + 1, true);
          tablero[i][j] = '';
          bestScore = Math.min(score, bestScore);
        }
      }
    }
    return bestScore;
  }
}

restaurar(){
  this.gatoGana = false;
  this.perroGana = false;
  this.nadieGana = false;
  this.tablero = [['', '', ''],['', '', ''],['', '', '']];
  this.mejorMovimiento = [];
  this.turnoNuestro = true;
  this.boton =  [[false, false, false],[false, false, false],[false, false, false]];
  this.gatoGana = false;
  this.gatoGana = false;
  this.nadieGana = false;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const strBtn = "boton" + String(i) + String(j);
      document.getElementById(strBtn)!.innerText  = "";
    }
  }
}
}
