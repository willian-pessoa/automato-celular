export type AutomatoMatriz = Array<Array<number>>;

export interface AutomatoRules {
  isLive: {
    dies: { alive: Array<number> };
    lives: { alive: Array<number> };
  };
  isDead: {
    dies: { dead: Array<number> };
    lives: { dead: Array<number> };
  };
}