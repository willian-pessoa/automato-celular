import { useMemo, useEffect, useState } from "react";
import "./App.scss";
import AutomatoCelular from "./utils/automatoCelular";

import DrawAutomatoCelular from "./components/DrawAutomatoCelular";

const RULE = {
  isLive: {
    dies: { alive: [0, 1, 2, 3, 4] },
    lives: { alive: [5, 6, 7, 8] },
  },
  isDead: {
    dies: { dead: [0, 1, 2, 3, 4] },
    lives: { dead: [5, 6, 7, 8] },
  },
};

function App() {
  const [width, setWidth] = useState(25);
  const [height, setHeight] = useState(20);
  const [automato, setAutomato] = useState(
    new AutomatoCelular(width, height, RULE)
  );
  const [countGenerations, setCountGenerations] = useState(0);
  const [automatoLoop, setAutomatoLoop] = useState(false);

  useEffect(() => {
    const automatoDelay = 60;

    const automatoInterval: NodeJS.Timer = setInterval(() => {
      const newAutomato = automato.nextGen();
      const curGeneration = countGenerations + 1;
      setAutomato(new AutomatoCelular(width, height, RULE, newAutomato));
      setCountGenerations(curGeneration);
    }, automatoDelay);

    if (!automatoLoop) clearInterval(automatoInterval);
    return () => clearInterval(automatoInterval);
  }, [automato, countGenerations, height, width, automatoLoop]);

  const handleGenerateRandomGen = () => {
    setCountGenerations(0);
    const newAutomato = automato.getRandomGen();
    setAutomato(new AutomatoCelular(width, height, RULE, newAutomato));
  };

  return (
    <div className="App">
      <div className="automato-container">
        <DrawAutomatoCelular
          matriz={automato.getGen()}
          automato={automato}
          isRunning={automatoLoop}
          width={width}
          height={height}
          setAutomato={setAutomato}
          rule={RULE}
        />
        <div className="input-container">
          <div className="dimensions-container">
            <h2>Grade</h2>
            <input
              type="number"
              min="3"
              max="25"
              onKeyDown={(event) => {
                event.preventDefault();
              }}
              onChange={(e) => setWidth(Number(e.target.value))}
              value={width}
            />
            x
            <input
              type="number"
              min="3"
              max="20"
              onKeyDown={(event) => {
                event.preventDefault();
              }}
              onChange={(e) => setHeight(Number(e.target.value))}
              value={height}
            />
            <button
              onClick={() =>
                setAutomato(new AutomatoCelular(width, height, RULE))
              }
            >
              Gerar
            </button>
          </div>
          <div className="info-containter">
            <p>Clique nas celulas para alterar seu estado</p>
          </div>
          <div className="buttons-container">
            <button
              onClick={() => handleGenerateRandomGen()}
              disabled={automatoLoop}
            >
              Estado Aleatorio
            </button>
            <button
              onClick={() => setAutomatoLoop(true)}
              disabled={automatoLoop}
            >
              Começar Simulação
            </button>
            <button
              onClick={() => setAutomatoLoop(false)}
              disabled={!automatoLoop}
            >
              Parar Simulação
            </button>
          </div>
          <h3>Generation: {countGenerations}</h3>
        </div>
      </div>
    </div>
  );
}

export default App;
