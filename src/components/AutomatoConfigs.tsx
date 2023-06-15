import { Dispatch, SetStateAction } from "react";
import { AutomatoRules } from "../utils/automatoCelularTypes";

import "./AutomatoConfigs.scss";

interface AutomatoConfigsProps {
  rule: AutomatoRules;
  setRule: Dispatch<SetStateAction<AutomatoRules>>;
}

const AutomatoConfigs = ({ rule, setRule }: AutomatoConfigsProps) => {
  return (
    <div className="automato-configs">
      <div className="alive-cell__container">
        <h4>Celulas Vivas</h4>
        <div className="dies-if">
          <h5>Morre Se:</h5>
          <div className="dies-if-x-alive">
            {rule.isLive.dies.alive.map((alive) => {
              return (
                <div className="draggable-item" draggable>
                  {alive}
                </div>
              );
            })}
          </div>
          <h5>Vivas</h5>
        </div>
        <div className="lives-if">
          <h5>Vive Se:</h5>
          <div className="lives-if-x-alive">
            {rule.isLive.lives.alive.map((alive) => {
              return (
                <div className="draggable-item" draggable>
                  {alive}
                </div>
              );
            })}
          </div>
          <h5>Vivas</h5>
        </div>
      </div>
      <div className="dead-cell__container">
        <h4>Celulas Mortas</h4>
      </div>
    </div>
  );
};

export default AutomatoConfigs;
