import React from 'react';
import './App.css';
import WorkoutContainer from './WorkoutContainer/WorkoutContainer';


function App() {
  return (
    <div className="App">
      <img className="logo" src={require('./images/inHIIT_logo.png')} alt="logo"></img>
      <WorkoutContainer/>
    </div>
  );
}

export default App;
