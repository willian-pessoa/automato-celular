import AutomatoCelular from "./automatoCelular";

const MATRIZ = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];
const MATRIZ2 = [
  [0, 0, 0],
  [0, 1, 0],
  [0, 0, 0],
];
const NEXT_MATRIZ2 = [
  [1, 1, 1],
  [1, 0, 1],
  [1, 1, 1],
];
const RULE = {
  isLive: {
    dies: { alive: [0, 1, 2, 3, 4] },
    lives: { alive: [5, 6, 7, 8] },
  },
  isDead: {
    dies: { dead: [5, 6, 7, 8] },
    lives: { dead: [0, 1, 2, 3, 4] },
  },
};

describe("Creating Automato Celular", () => {
  test("Create matriz 3x3 by dimension", () => {
    const automato = new AutomatoCelular(3, 3, RULE);
    expect(automato.getGen()).toStrictEqual(MATRIZ);
  });

  test("Create matriz 3x3 by matriz", () => {
    const automato = new AutomatoCelular(3, 3, RULE, MATRIZ2);
    expect(automato.getGen()).not.toStrictEqual(MATRIZ);
  });

  test("Create matriz with wrong parameters", () => {
    expect(() => {
      new AutomatoCelular(4, 4, RULE, MATRIZ);
    }).toThrow();
  });
});

describe("Changing the Automato Celular", () => {
  test("Creating the next gen", () => {
    const automato = new AutomatoCelular(3, 3, RULE, MATRIZ2);
    expect(automato.nextGen()).toStrictEqual(NEXT_MATRIZ2);
  });

  test("Creating the second next gen", () => {
    const automato = new AutomatoCelular(3, 3, RULE, MATRIZ2);
    automato.nextGen();
    expect(automato.nextGen()).toStrictEqual(MATRIZ2);
  });
});
