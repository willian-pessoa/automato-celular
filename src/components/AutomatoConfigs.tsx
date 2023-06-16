import { Dispatch, SetStateAction, useState } from "react";
import { AutomatoRules } from "../utils/automatoCelularTypes";

import "./AutomatoConfigs.scss";

interface AutomatoConfigsProps {
  rule: AutomatoRules;
  setRule: Dispatch<SetStateAction<AutomatoRules>>;
}

const AutomatoConfigs = ({ rule, setRule }: AutomatoConfigsProps) => {
  const [reRender, setReRender] = useState(false);

  const handleOnDragStart = (
    e: React.DragEvent,
    alive: number,
    curState: string,
    nexState: string,
    idx: number
  ) => {
    e.dataTransfer.setData("alive", String(alive));
    const tempRule = rule;
    tempRule[curState][nexState].alive.splice(idx, 1);
    setRule(tempRule);
  };

  const handleDrop = (
    e: React.DragEvent,
    curState: string,
    nextState: string
  ) => {
    e.preventDefault();
    const alive = e.dataTransfer.getData("alive");
    const tempRule = rule;
    tempRule[curState][nextState].alive.push(Number(alive));
    console.log(
      "🚀 ~ file: AutomatoConfigs.tsx:35 ~ AutomatoConfigs ~ tempRule:",
      tempRule
    );

    setRule(tempRule);
    setReRender((prev) => !prev);
    e.stopPropagation();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="automato-configs">
      <div className="alive-cell__container">
        <h4>Células Vivas</h4>
        <div className="dies-if">
          <h5>Morre Se:</h5>
          <div
            className="dies-if-x-alive"
            onDragOver={(e) => handleDragOver(e)}
            onDrop={(e) => handleDrop(e, "isLive", "dies")}
          >
            {rule.isLive.dies.alive.map((alive, idx) => {
              return (
                <div
                  className="draggable-item"
                  id={`live__${alive}`}
                  key={alive}
                  draggable
                  onDragStart={(e) =>
                    handleOnDragStart(e, alive, "isLive", "dies", idx)
                  }
                >
                  {alive}
                </div>
              );
            })}
          </div>
          <h5>células vivas</h5>
        </div>
        <div className="lives-if">
          <h5>Vive Se:</h5>
          <div
            className="lives-if-x-alive"
            onDragOver={(e) => handleDragOver(e)}
            onDrop={(e) => handleDrop(e, "isLive", "lives")}
          >
            {rule.isLive.lives.alive.map((alive, idx) => {
              return (
                <div
                  className="draggable-item"
                  id={`live__${alive}`}
                  key={alive}
                  draggable
                  onDragStart={(e) =>
                    handleOnDragStart(e, alive, "isLive", "lives", idx)
                  }
                >
                  {alive}
                </div>
              );
            })}
          </div>
          <h5>células vivas</h5>
        </div>
      </div>
      <div className="dead-cell__container">
        <h4>Células Mortas</h4>
      </div>
    </div>
  );
};

export default AutomatoConfigs;
