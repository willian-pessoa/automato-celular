import { AutomatoMatriz, AutomatoRules } from "./automatoCelularTypes";

export default class AutomatoCelular {
  _GEN: AutomatoMatriz;
  _PREV_GEN: AutomatoMatriz;
  _RULES: AutomatoRules;
  _width: number;
  _height: number;

  constructor(
    width: number,
    height: number,
    rules: AutomatoRules,
    matriz?: AutomatoMatriz
  ) {
    this._GEN = this._createMatriz(width, height, matriz);
    this._PREV_GEN = this._createMatriz(width, height, matriz);
    this._RULES = rules;
    this._height = height;
    this._width = width;
  }

  stateToDie(i: number, j: number) {
    this._GEN[i][j] = 0;
  }

  stateToLive(i: number, j: number) {
    this._GEN[i][j] = 1;
  }

  getGen(): AutomatoMatriz {
    return this._GEN;
  }

  nextGen(): AutomatoMatriz {
    this._createNextGen();
    return this._GEN;
  }

  _automato(i: number, j: number, state: number) {
    let alive = 0;
    let dead = 0;
    for (let l = -1; l < 2; l++) {
      for (let k = -1; k < 2; k++) {
        if (
          i + l < 0 ||
          i + l >= this._height ||
          j + k < 0 ||
          j + k >= this._width ||
          (l === 0 && k === 0)
        ) {
          continue;
        } else {
          const curState = this._PREV_GEN[i + l][j + k];
          if (curState) {
            alive++;
          } else {
            dead++;
          }
        }
      }
    }

    if (state) {
      if (this._RULES.isLive.lives.alive.includes(alive)) {
        this.stateToLive(i, j);
      } else {
        this.stateToDie(i, j);
      }
    } else {
      if (this._RULES.isDead.lives.dead.includes(dead)) {
        this.stateToLive(i, j);
      } else {
        this.stateToDie(i, j);
      }
    }
  }

  _createMatriz(
    width: number,
    height: number,
    matriz?: AutomatoMatriz
  ): AutomatoMatriz {
    if (matriz) {
      if (matriz.length === height && matriz[0].length === width) {
        return JSON.parse(JSON.stringify(matriz));
      } else {
        throw new Error("width and height not match with the matriz ");
      }
    }
    const M = [];
    for (let i = 0; i < height; i++) {
      const l = [];
      for (let j = 0; j < width; j++) {
        l.push(0);
      }
      M.push(l);
    }
    return M;
  }

  _createNextGen() {
    this._PREV_GEN = JSON.parse(JSON.stringify(this._GEN));
    for (let i = 0; i < this._height; i++) {
      for (let j = 0; j < this._width; j++) {
        this._automato(i, j, this._PREV_GEN[i][j]);
      }
    }
  }

  createRandomGen() {
    this._PREV_GEN = JSON.parse(JSON.stringify(this._GEN));
    for (let i = 0; i < this._height; i++) {
      for (let j = 0; j < this._width; j++) {
        const turnToLive = 0.35 > Math.random();
        if (turnToLive) this.stateToLive(i, j);
      }
    }
  }
}
