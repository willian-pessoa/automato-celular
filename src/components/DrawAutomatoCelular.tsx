import AutomatoCelular from "../utils/automatoCelular";
import { AutomatoMatriz, AutomatoRules } from "../utils/automatoCelularTypes";
import {
  Dispatch,
  SetStateAction,
  ComponentPropsWithoutRef,
  useState,
} from "react";
import "./DrawAutomatoCelular.scss";

interface DrawAutomatoProps {
  matriz: AutomatoMatriz;
  automato: AutomatoCelular;
  isRunning: boolean;
  height: number;
  width: number;
  setAutomato: Dispatch<SetStateAction<AutomatoCelular>>;
  rule: AutomatoRules;
}

interface CellProps extends ComponentPropsWithoutRef<"input"> {
  isRunning: boolean;
  state: number;
}

const Cell = ({ isRunning, state, ...props }: CellProps) => {
  return (
    <div
      {...props}
      className="cell"
      style={{
        height: "1.5rem",
        width: "1.5rem",
        border: "0.5px solid #051428",
        backgroundColor: state === 0 ? "antiquewhite" : "#f0c284",
        cursor: !isRunning ? "pointer" : "default",
      }}
    ></div>
  );
};

const DrawAutomatoCelular = ({
  matriz,
  automato,
  isRunning,
  width,
  height,
  setAutomato,
  rule,
}: DrawAutomatoProps) => {
  const [tracking, setTracking] = useState(false);

  const handleCellState = (i: number, j: number) => {
    if (isRunning) return;
    if (matriz[i][j]) {
      const newAutomato = automato.stateToDie(i, j);
      setAutomato(new AutomatoCelular(width, height, rule, newAutomato));
    } else {
      const newAutomato = automato.stateToLive(i, j);
      setAutomato(new AutomatoCelular(width, height, rule, newAutomato));
    }
  };

  const handleClickCell = (i: number, j: number) => {
    if (!tracking) handleCellState(i, j);
    setTracking((prev) => !prev);
  };

  return (
    <div className="canvas">
      {matriz.map((row, i) => {
        return (
          <div className="row" key={i}>
            {row.map((cell, j) => {
              return (
                <Cell
                  state={cell}
                  key={`(${i},${j})`}
                  onClick={() => handleClickCell(i, j)}
                  onMouseEnter={
                    tracking ? () => handleCellState(i, j) : () => null
                  }
                  isRunning={isRunning}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default DrawAutomatoCelular;
