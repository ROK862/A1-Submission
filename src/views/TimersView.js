import React, { useContext } from "react";
import styled from "styled-components";
import { sys } from "../utils/helpers";
import AnchorButton from "../components/buttons/AnchorButton";
import { APP_RENDER_STATES, APP_TIMERS } from "../context/Consts";
import { AppContext } from "../context/AppProvider";

const Timers = styled.div`
  align-items: center;
  width: 100%;
  height: 100%;
  display: inline-block;
`;

const Timer = styled.div`
  font-size: 2rem;
  padding: 2%;
  background: #fff8fc;
  margin: 5% auto 5% auto;
  width: 35%;
  min-height: 250px;
  border-radius: 5px;
  display: block;
  box-shadow: 10px 30px 40px 5px #0000001a;
  color: #000000;
  text-align: center;
  font-weight: bold;
  border-bottom: 2px solid #f408a6;
`;

const TimerTitle = styled.div`
  font-size: 1.5rem;
`;
const TimerSubtitle = styled.div`
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  font-size: 15px;
  padding: 50px;
  font-weight: 400;
  padding-top: 15px;
`;

function App() {
  const timers = APP_TIMERS;
  const { setCurrentTimer, shouldRender, status } = useContext(AppContext);

  // Mmm. Seem's as though react doesnt like it when i map through an array and generate components without a {key}.
  // React needs a point of reference to track changes when it does updates.
  // Hence, i added keys to mapped comps wich basically gives them a unique index.
  // Code cab be found in helper.js

  const accessToggle = (status === "timing") ? "inactive" : "active";
  return (
    <div className={`Workflow-Wraper`}>
      <div className={`Timer-List ${accessToggle}`}>
        <AnchorButton
          name={APP_RENDER_STATES.COUNTDOWN}
          onClick={() => setCurrentTimer(APP_RENDER_STATES.COUNTDOWN)}
        />
        <AnchorButton
          name={APP_RENDER_STATES.TABATA}
          onClick={() => setCurrentTimer(APP_RENDER_STATES.TABATA)}
        />
        <AnchorButton
          name={APP_RENDER_STATES.STOPWATCH}
          onClick={() => setCurrentTimer(APP_RENDER_STATES.STOPWATCH)}
        />
        <AnchorButton
          name={APP_RENDER_STATES.XY}
          onClick={() => setCurrentTimer(APP_RENDER_STATES.XY)}
        />
      </div>
      <Timers>
        {timers.map((timer, i) =>
          shouldRender({ state: timer.S }) ? (
            <Timer key={sys.getKey()}>
              <TimerTitle key={sys.getKey()}>{timer.title}</TimerTitle>
              <TimerSubtitle key={sys.getKey()}>{timer.subTitle}</TimerSubtitle>
              {timer.C}
            </Timer>
          ) : (
            <div key={sys.getKey()}></div>
          )
        )}
      </Timers>
      <br />
      <br />
      <br />
    </div>
  );
}

export default App;
