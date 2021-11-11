import React, { useState, useEffect } from "react";
import { sys } from "../utils/helpers";
import { playAudio } from "../audio/SoundEffect";
import { APP_RENDER_STATES, APP_FLOW_STATES, setTimerToDisplay } from "./Consts";


// Presets for the AppContext. 
// This list will grow exponentially as the application grows.

// Still thinking of ways to manage this better.

export const AppContext = React.createContext({
  status: "inactive",
  setTimerStatus: (val) => {},
  hours: 0,
  setHours: (val) => {},
  minutes: 0,
  setMinutes: (val) => {},
  seconds: 0,
  setSeconds: (val) => {},
  breakHours: 0,
  setBreakHours: (val) => {},
  breakMinutes: 0,
  setBreakMinutes: (val) => {},
  breakSeconds: 0,
  setBreakSeconds: (val) => {},
  workoutStatus: "",
  setWorkoutStatus: (val) => {},
  formattedTime: "",
  setformattedTime: (val) => {},
  currentTime: "",
  setCurrentTime: (val) => {},
  setOnReachedGoal: () => {},
  onStartTiming: (val) => {},
  onStopTimer: (val) => {},
  workflowState: "Workout",
  setWorkflowState: (val) => {},
  currentTimer: APP_RENDER_STATES.COUNTDOWN,
  setCurrentTimer: (val) => {},
  shouldRender: (val) => {},
  rounds: 0, 
  setRounds: (val) => {},
  onSkipRound: (val) => {}
});


// I decided to move all the effects up one level to the global context.
// That is, all effects will be handled with context. DRY. [ :) ]
const AppProvider = ({ children }) => {
  const [status, setTimerStatus] = useState("inactive");
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [rounds, setRounds] = useState(0);
  const [breakHours, setBreakHours] = useState(0);
  const [breakMinutes, setBreakMinutes] = useState(0);
  const [breakSeconds, setBreakSeconds] = useState(0);
  const [workoutStatus, setWorkoutStatus] = useState("Workout");
  const [formattedTime, setformattedTime] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [workflowState, setWorkflowState] = useState(APP_FLOW_STATES.WORKOUT);
  const [currentTimer, setCurrentTimer] = useState(APP_RENDER_STATES.COUNTDOWN);

  const shouldRender = ({ state }) => currentTimer === state;

  useEffect(() => {
    const formattedTime = sys.onConvertToTime({
      hours,
      minutes,
      seconds,
    });
    setformattedTime(formattedTime);
  }, [hours, minutes, seconds]);

  // Update constants for timer to render.
  // Perhaps not the best approuch, since i have values for currentTimer to display
  // within the context, and it's shared accross the application.
  
  // Hmm, Will think about this approuch.

  /* CHANGE IMPLEMENTED */
  /*---------------------------------------------------------------------------------------------*/ 
  // TO-WIT: Changed access to currentTimer. This is now handle with context.
  // That is, all components access this value from AppContext Provider, instead of const globals.
  // Notice, the value is still kept in a global const. However, a copy of it is accessable with context.
  useEffect(() => {
    setTimerToDisplay(currentTimer);
  }, [currentTimer]);

  // Handle Stop Timer button onclick here.
  const onStopTimer = () => {
    const tempDisTime = sys.onConvertToTime({
      hours,
      minutes,
      seconds,
    });
    setTimerStatus("inactive");
    setformattedTime(tempDisTime);
    setCurrentTime(0);
    playAudio({ clip: "onClick" });
  };

  // Handle start timing button onclick here.
  const onStartTiming = () => {
    // Time in seconds for main timer
    const tis = sys.onConvertToSeconds({ hours, minutes, seconds });
    // Time in seconds for break timer.
    const btis = sys.onConvertToSeconds({ breakHours, breakMinutes, breakSeconds });

    // Validation of inputs for all components.
    if (tis === 0) {
      alert("Please make sure you set the time limits before continuing.")
      return;
    } else if (currentTimer === APP_RENDER_STATES.XY && btis === 0) {
      alert("Please make sure you specify break duration before continuing.")
      return;
    } else if (currentTimer === APP_RENDER_STATES.XY && rounds === 0) {
      alert("Please make sure you set timer rounds limits before continuing.")
      return;
    }

    let timeInSeconds = 0;
    if (currentTimer === APP_RENDER_STATES.COUNTDOWN) {
      timeInSeconds = tis;
    }

    setTimerStatus("timing");
    setCurrentTime(timeInSeconds);
    playAudio({ clip: "timing" });
  };

  // Any action on reach goal comes here, that is, once the timer reaches
  // it's target value, negative or positive.
  const onReachedGoal = () => {
    setTimerStatus("complete");
    playAudio({ clip: "onClick" });
  };

  // Any action on round complete comes here before next render.
  const onCompleteRound = () => {
    playAudio({ clip: "onClick" });
  }

  const onSkipRound = () => {
    if (currentTimer !== APP_RENDER_STATES.TABATA && currentTimer !== APP_RENDER_STATES.XY) return;
    setRounds(rounds - 1);
    setWorkflowState(APP_FLOW_STATES.WORKOUT);
    onCompleteRound();
    setformattedTime(formattedTime);
    setCurrentTime(0);
  }

  // This hook handles the tick function, and cleanup of interval before next render.
  useEffect(() => {
    // Check if we are allowed to start the tick function.
    // Prevent subscription from executing every time.
    if (status !== "timing") return;

    const timeout = setTimeout(() => {
      let newTime = (currentTimer === APP_RENDER_STATES.COUNTDOWN) ? currentTime - 1.0 : currentTime + 1.0;
      
      // Test and return the right timer based on the APP_RENDER_STATES and APP_FLOW_STATES.
      // Notice, target time changes based on currentTimer and workflowState.
      // Also, it's cleaner to manage everything here.
      const target = 
      (currentTimer === APP_RENDER_STATES.XY) ? 
      (workflowState === APP_FLOW_STATES.REST) ? 
      (sys.onConvertToSeconds({ hours:breakHours, minutes:breakMinutes, seconds:breakSeconds })) : 
      (sys.onConvertToSeconds({ hours, minutes, seconds })) : 
      (sys.onConvertToSeconds({ hours, minutes, seconds }));

      // Test if the timer has reached its goal.
      if (newTime < 0 && currentTimer === APP_RENDER_STATES.COUNTDOWN) {
        onReachedGoal();
        return;
      } else if (newTime >= target && currentTimer === APP_RENDER_STATES.STOPWATCH) {
        onReachedGoal();
        return;
      }  else if (newTime >= target && currentTimer === APP_RENDER_STATES.TABATA) {
        if (workflowState === APP_FLOW_STATES.WORKOUT) {
          setWorkflowState(APP_FLOW_STATES.REST);
          newTime = 0;
        } else if (rounds > 0) {
          setRounds(rounds - 1);
          newTime = 0;
          onCompleteRound();
        } else {
          onReachedGoal();
          return;
        }
        
      } else if (newTime >= target && currentTimer === APP_RENDER_STATES.XY) {
        if (workflowState === APP_FLOW_STATES.WORKOUT) {
          setWorkflowState(APP_FLOW_STATES.REST);
          newTime = 0;
        } else if (rounds > 0) {
          setRounds(rounds - 1);
          newTime = 0;
          setWorkflowState(APP_FLOW_STATES.WORKOUT);
          onCompleteRound();
        } else {
          setWorkflowState(APP_FLOW_STATES.WORKOUT);
          onReachedGoal();
          return;
        }
        
      }

      // Set the display time, which is to be use for display in the digital watch display.
      const formattedTime = sys.onConvertToTime({ input: newTime });

      // Set state values for formated time, and new current time.
      setformattedTime(formattedTime);
      setCurrentTime(newTime);
    }, 1000);

    return () => {
      // Lets clean up the timeout object to avoid memory leaking.
      clearTimeout(timeout);
    };
    // Monitor both the current time and status to alsp
    // allow trigger once the status changes back to timing.

    // At this point, I'm only adding additional dependencies to avoid useEffect dependency hell.
    // Will need to review this part of the code.
    // I do controll executions of this subscription though, on top level. So, this should work.
  }, [currentTime, status, currentTimer, hours, minutes, seconds, workflowState, rounds, breakHours, breakMinutes, breakSeconds]);


  // Pass getters and setters down to child components.
  return (
    <AppContext.Provider
      value={{
        status,
        setTimerStatus,
        hours,
        setHours,
        minutes,
        setMinutes,
        seconds,
        setSeconds,
        breakHours,
        setBreakHours,
        breakMinutes,
        setBreakMinutes,
        breakSeconds,
        setBreakSeconds,
        workoutStatus,
        setWorkoutStatus,
        formattedTime,
        setformattedTime,
        currentTime,
        setCurrentTime,
        onStartTiming,
        onStopTimer,
        workflowState,
        setWorkflowState,
        currentTimer,
        setCurrentTimer,
        shouldRender,
        rounds, 
        setRounds,
        onSkipRound,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
