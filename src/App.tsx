import { useMemo, useEffect, useState } from "react";
import "./App.scss";
import AutomatoCelular from "./utils/automatoCelular";

import DrawAutomatoCelular from "./components/DrawAutomatoCelular";

const RULE = {
  isLive: {
    dies: { alive: [0, 1, 2, 3, 6, 7] },
    lives: { alive: [4, 5, 6, 8] },
  },
  isDead: {
    dies: { dead: [0, 1, 5, 6] },
    lives: { dead: [2, 3, 4, 7, 8] },
  },
};

const MATRIZ = [
  [0, 0, 0, 1, 0],
  [0, 1, 1, 0, 1],
  [1, 0, 0, 0, 0],
  [0, 1, 1, 0, 1],
];

function App() {
  const [width, setWidth] = useState(5);
  const [height, setHeight] = useState(4);
  const [automato, setAutomato] = useState(
    new AutomatoCelular(width, height, RULE, MATRIZ)
  );
  const [countGenerations, setCountGenerations] = useState(0);
  const [automatoLoop, setAutomatoLoop] = useState(false);

  useEffect(() => {
    const automatoDelay = 200;

    const automatoInterval: NodeJS.Timer = setInterval(() => {
      const newAutomato = automato.nextGen();
      const curGeneration = countGenerations + 1;
      setAutomato(new AutomatoCelular(width, height, RULE, newAutomato));
      setCountGenerations(curGeneration);
    }, automatoDelay);

    if (!automatoLoop) clearInterval(automatoInterval);
    return () => clearInterval(automatoInterval);
  }, [automato, countGenerations, height, width, automatoLoop]);

  return (
    <div className="App">
      <DrawAutomatoCelular matriz={automato.getGen()} />
    </div>
  );
}

export default App;
