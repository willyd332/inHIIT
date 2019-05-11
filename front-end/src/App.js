import React from 'react';
import './App.css';
import WorkoutContainer from './WorkoutContainer/WorkoutContainer';


function App() {
  return (
    <div className="App">
      <img className="logo" src={require('./images/inHIIT_logo.png')} ></img>
      <h3>"inHIIT to win it"</h3>
      <WorkoutContainer/>

    </div>
  );
}

export default App;
