import React, { useContext } from "react";
import AnchorButton from "../buttons/AnchorButton";
import { AppContext } from "../../context/AppProvider";
import { APP_RENDER_STATES } from "../../context/Consts"

function TimerDisplay () {
  const { currentTimer, workflowState, rounds, formattedTime:displayTime, setTimerStatus:onPauseTimer, onSkipRound } = useContext(AppContext);


  const renderState = () => {

    switch (currentTimer) {
      case APP_RENDER_STATES.XY:
        return (
          <div className="Content-Wraper">
            <div className='Timer-Tittle'>
              {workflowState}
            </div>
            <div className='StopWatch'>
              {displayTime}
            </div>
            <pre className='Rounds-Preview'>
              Rounds: {rounds}
            </pre>
            <AnchorButton name='Pause' onClick={() => onPauseTimer("paused")} />
            <AnchorButton name='Next Round' onClick={() => onSkipRound()} />
          </div>
        );
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
          <AnchorButton name='Next Round' onClick={() => onSkipRound()} />
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