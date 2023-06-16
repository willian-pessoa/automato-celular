import { useEffect, useState } from "react";
import "./App.scss";
import AutomatoCelular from "./utils/automatoCelular";

import DrawAutomatoCelular from "./components/DrawAutomatoCelular";
import AutomatoConfigs from "./components/AutomatoConfigs";
import { AutomatoRules } from "./utils/automatoCelularTypes";

const RULE: AutomatoRules = {
  isLive: {
    dies: { alive: [0, 1, 7, 8] },
    lives: { alive: [3, 4, 5, 6] },
  },
  isDead: {
    dies: { alive: [8, 7, 6, 0, 1, 2] },
    lives: { alive: [3, 4, 5] },
  },
};

function App() {
  const [width, setWidth] = useState(25);
  const [height, setHeight] = useState(20);
  const [rule, setRule] = useState<AutomatoRules>(RULE);
  const [automato, setAutomato] = useState(
    new AutomatoCelular(width, height, rule)
  );
  const [countGenerations, setCountGenerations] = useState(0);
  const [automatoLoop, setAutomatoLoop] = useState(false);

  useEffect(() => {
    if (!automatoLoop && countGenerations === 0) return;
    const automatoDelay = 60;

    const automatoInterval: NodeJS.Timer = setInterval(() => {
      const newAutomato = automato.nextGen();
      const curGeneration = countGenerations + 1;
      setAutomato(new AutomatoCelular(width, height, rule, newAutomato));
      setCountGenerations(curGeneration);
    }, automatoDelay);

    if (!automatoLoop) clearInterval(automatoInterval);
    return () => clearInterval(automatoInterval);
  }, [automato, countGenerations, height, width, automatoLoop, rule]);

  const handleGenerateGrade = () => {
    setCountGenerations(0);
    setAutomato(new AutomatoCelular(width, height, rule));
  };

  const handleGenerateRandomGen = () => {
    setCountGenerations(0);
    const newAutomato = automato.getRandomGen();
    setAutomato(new AutomatoCelular(width, height, rule, newAutomato));
  };

  return (
    <div className="App">
      <AutomatoConfigs rule={rule} setRule={setRule} />
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
              disabled={automatoLoop}
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
              disabled={automatoLoop}
            />
            <button
              onClick={() => handleGenerateGrade()}
              disabled={automatoLoop}
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
          <h3>Geração: {countGenerations}</h3>
        </div>
      </div>
    </div>
  );
}

export default App;
