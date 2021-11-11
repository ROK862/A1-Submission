import React, { useContext } from "react";
import AnchorButton from "../buttons/AnchorButton";
import { AppContext } from "../../globals/AppProvider";

function TimerGoal () {
  const { setTimerStatus } = useContext(AppContext);

  return (
    <>
      <div className="Timer-Goal-Wraper">
        <img alt="timer-goal" src="https://raw.githubusercontent.com/prof-tejera/assignment-2-ROK862/main/src/images/goal-reached-animation.gif" />
      </div>
      <AnchorButton name="Reset Timer" onClick={()=>setTimerStatus("active")} />
    </>
  );
}

export default TimerGoal