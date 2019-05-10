import React from 'react';
import NewWorkout from './NewWorkout/NewWorkout';

const WorkoutList = (props) => {
    
    const workouts = props.workouts.map((workout)=> {
        console.log(workout);
        return(
            <li key={workout._id}>
                <h2>Workout Name {workout.name}</h2>
                <p>Interval One {workout.intervalOne}</p>
                <p>Interval Two {workout.intervalTwo}</p>
                <p>Cycles {workout.cycles}</p>
            </li>
        )
    });

    return(
        <div>
            <NewWorkout createWorkout={props.createWorkout}/>
            <ul>
                {workouts}
            </ul>
        </div>
        
    )
}




export default WorkoutList;