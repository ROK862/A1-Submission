import React from "react";
import AnchorButton from "../buttons/AnchorButton";
import { AppContext } from "../../globals/AppProvider";
import { useContext } from "react/cjs/react.development";
import { APP_RENDER_STATES } from "../../globals/Consts"

function TimerDisplay () {
  const { currentTimer, rounds, formattedTime:displayTime, setTimerStatus:onPauseTimer } = useContext(AppContext);


  const renderState = () => {

    switch (currentTimer) {
      case APP_RENDER_STATES.XY:
      case APP_RENDER_STATES.TABATA:
        return (
        <div className="Content-Wraper">
          <div className='StopWatch'>
            {displayTime}
          </div>
          <pre className='Rounds-Preview'>
            Rounds: {rounds}
          </pre>
          <AnchorButton name='Pause' onClick={() => onPauseTimer("paused")} />
          <AnchorButton name='Next Round' onClick={() => onPauseTimer("paused")} />
        </div>
        );
      default:
        return (
        <div className="Content-Wraper">
          <div className='StopWatch'>
            {displayTime}
          </div>
          <AnchorButton name='Pause' onClick={() => onPauseTimer("paused")} />
        </div>
        );
    }
  }
  return (
    <>
      {renderState()}
    </>
  );
}

export default TimerDisplay