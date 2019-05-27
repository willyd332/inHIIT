import React, { useEffect, useState } from 'react';
import NewWorkout from './NewWorkout/NewWorkout';
import EditWorkout from './EditWorkout/EditWorkout';
import TimerApp from './TimerApp/TimerApp';



const WorkoutList = (props) => {

    const toggleClass = (index) => {
        document.getElementById(index).classList.toggle('hidden');
        document.getElementById(index).classList.toggle('start');
        document.getElementById(`timer${index}`).classList.toggle('drop-animation');
    }

    const [workouts,setWorkouts] = useState([]);

    useEffect(()=>{

      const mappedWorkouts = props.workouts.map((workout, index)=> {

        console.log(workout);

          return(
              <div className="workout-div flex-container" key={workout.id}>
                <div>
                  <h2>{workout.name}</h2>
                </div>
                <div>
                  <p>Interval One: {workout.intervalone}</p>
                  <p>Interval Two: {workout.intervaltwo}</p>
                  <p>Cycles: {workout.cycles}</p>
                </div>
                <div>
                  <button onClick={toggleClass.bind(null, index)}>Let's Go!</button>
                  <div id={index} className="hidden">
                    <TimerApp index={index} timerID={`timer${index}`} workout={workout}/>
                  </div>

                </div>

                {props.isLogged ? <EditWorkout workout={workout} modalShows={props.modalShows} editWorkout={props.editWorkout} handleFormChange={props.handleFormChange}></EditWorkout> : null}
                {props.isLogged ? <button className="delete" onClick={() =>{
                  props.deleteWorkout(workout.id)
                }}>Delete</button> : null}
              </div>
          )
      });

      console.log(mappedWorkouts);

      setWorkouts(mappedWorkouts);

    },[props.workouts]);

    return(
        <div>
          {props.isLogged ? <NewWorkout buttonLabel={"New Workout"} createWorkout={props.createWorkout}/> : null}
          <div className="flex-container">
            {workouts}
            </div>
        </div>

    )
}




export default WorkoutList;
