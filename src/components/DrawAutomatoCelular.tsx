import { AutomatoMatriz } from "../utils/automatoCelularTypes";
import "./DrawAutomatoCelular.scss"

interface DrawAutomatoProps {
  matriz: AutomatoMatriz;
}

const Cell = ({ state }: { state: number }) => {
  return (
    <div
      className="cell"
      style={{
        height: "1.5rem",
        width: "1.5rem",
        border: "0.5px solid #051428",
        backgroundColor: state === 0 ? "antiquewhite" : "#f0c284",
      }}
    ></div>
  );
};

const DrawAutomatoCelular = ({ matriz }: DrawAutomatoProps) => {
  return (
    <div className="canvas">
      {matriz.map((row, i) => {
        return (
          <div className="row" key={i}>
            {row.map((cell, j) => {
              return <Cell state={cell} key={`(${i},${j})`} />;
            })}
          </div>
        );
      })}
    </div>
  );
};

export default DrawAutomatoCelular;
