import React, { useContext } from "react";
import Options from "../Inputs/Options";
import AnchorButton from "../buttons/AnchorButton";
import { AppContext } from "../../context/AppProvider";
import { APP_RENDER_STATES } from "../../context/Consts"

function DigitalRounds () {
  // Simplify the code in parent component by getting getters and setters straigt from context
  // At this level, i think it is still manage-able. However, you'll be the judge of it :).
  const { currentTimer, setRounds, formattedTime:displayTime, onStartTiming, onStopTimer:onCloseTimer, setSeconds:onSetSeconds, setMinutes:onSetMinutes, setHours:onSetHours } = useContext(AppContext);
  const { rounds, hours, minutes, seconds } = useContext(AppContext);
  const { setBreakHours:onSetBreakHours, setBreakMinutes:onSetBreakMinutes, setBreakSeconds:onSetBreakSeconds } = useContext(AppContext);
  const { breakHours, breakMinutes, breakSeconds } = useContext(AppContext);
  const renderState = () => {

    switch (currentTimer) {
      case APP_RENDER_STATES.XY:
        return (
        <div className="Content-Wraper">
            <pre className="Title-Wraper">Workout Duration</pre>
            <div className="StopWatch">
              <Options
                options={[...Array(24).keys()]}
                onChange={onSetHours}
                current={hours || 0}
                name="Hours"
              />
              <Options
                options={[...Array(60).keys()]}
                onChange={onSetMinutes}
                current={minutes || 0}
                name="Minutes"
              />
              <Options
                options={[...Array(60).keys()]}
                onChange={onSetSeconds}
                current={seconds || 0}
                name="Seconds"
              />
            </div>
            <pre className="Title-Wraper">Break Duration</pre>
            <div className="StopWatch">
              <Options
                options={[...Array(24).keys()]}
                onChange={onSetBreakHours}
                current={breakHours || 0}
                name="Hours"
              />
              <Options
                options={[...Array(60).keys()]}
                onChange={onSetBreakMinutes}
                current={breakMinutes || 0}
                name="Minutes"
              />
              <Options
                options={[...Array(60).keys()]}
                onChange={onSetBreakSeconds}
                current={breakSeconds || 0}
                name="Seconds"
              />
            </div>

            <div className="Preview">
              <br />
              <Options
                options={[...Array(30).keys()]}
                onChange={setRounds}
                current={rounds || 0}
                name="Rounds"
              />
            </div>
            <AnchorButton name="Start timing" onClick={onStartTiming} />
            <AnchorButton name="Close Timer" onClick={onCloseTimer} />
        </div>
        );
      default:
        return (
        <div className="Content-Wraper">
            <div className="StopWatch">
              <Options
                options={[...Array(24).keys()]}
                onChange={onSetHours}
                current={hours || 0}
                name="Hours"
              />
              <Options
                options={[...Array(60).keys()]}
                onChange={onSetMinutes}
                current={minutes || 0}
                name="Minutes"
              />
              <Options
                options={[...Array(60).keys()]}
                onChange={onSetSeconds}
                current={seconds || 0}
                name="Seconds"
              />
            </div>
            <div className="Preview">
              {displayTime || "00:00:00:00"}
              <Options
                options={[...Array(30).keys()]}
                onChange={setRounds}
                current={rounds || 0}
                name="Rounds"
              />
            </div>
            <AnchorButton name="Start timing" onClick={onStartTiming} />
            <AnchorButton name="Close Timer" onClick={onCloseTimer} />
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

export default DigitalRounds