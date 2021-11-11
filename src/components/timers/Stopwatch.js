import React, { useContext } from "react";
import AnchorButton from "../buttons/AnchorButton";
import DigitalWatch from "../generic/DigitalWatch";
import TimerDisplay from "../generic/TimerDisplay";
import PauseDisplay from "../generic/PauseDisplay";
import { AppContext } from "../../context/AppProvider";
import TimerGoal from "../generic/TimerGoal";

const StopWatch = () => {

  // Import context getters and setters from the Store,
  // This will work similar to useState. However, all objects are passed down
  // by reference, to the timer component.
  const { status, setTimerStatus, currentTimer } = useContext(AppContext);

  // Manage what the user see's at any given state.
  // Useful way to reduce complexity associated with interfaces is to reduce actions
  // into managable steps.

  // Notice, each stage renders an independent component in itself, and passes setters down
  // to allow for easy update of state values.

  // Needed to simplify my approuch by breaking down my code into reusable componets.
  // Default state displays [nothing to tender.]

  // I simplified the render state function to reduce the amound of data that is passed back
  // and forth between children and parent component.
  const renderState = () => {
    switch (status) {
      case "inactive":
        return (
          <AnchorButton
            name="Start Now"
            onClick={() => setTimerStatus("active")}
          />
        );
      case "active":
        return (
          <DigitalWatch />
        );
      case "paused":
        return (
          <PauseDisplay />
        );
      case "timing":
        return (
          <TimerDisplay />
        );
      case "complete":
        return (
          <TimerGoal />
        );
      default:
        return <div>nothing to render</div>;
    }
  };

  // This is the actual render. Lets just return the title, and call on the
  // renderState method to give us an appropriate render based on the current state.
  return (
    <div className={"Default-Pink-Theme"}>
      <div className="Component-Title">{currentTimer}</div>
      {renderState()}
    </div>
  );
};

export default StopWatch;
