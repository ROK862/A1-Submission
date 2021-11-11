import React from "react";
import AnchorButton from "../buttons/AnchorButton";
import { AppContext } from "../../globals/AppProvider";
import { useContext } from "react/cjs/react.development";

function PauseDisplay () {
  // Simplify the code in parent component by getting getters and setters straigt from context
  // At this level, i think it is still manage-able. However, you'll be the judge of it :).
  const { formattedTime:displayTime, setTimerStatus:onResumeTimer, onStopTimer:onCloseTimer } = useContext(AppContext);
  return (
    <div className="Content-Wraper">
      <div className="StopWatch">{displayTime}</div>
      <AnchorButton name="Resume Timer" onClick={() => onResumeTimer("timing")} />
      <AnchorButton name="Reset Timer" onClick={onCloseTimer} />
    </div>
  );
}

export default PauseDisplay;
