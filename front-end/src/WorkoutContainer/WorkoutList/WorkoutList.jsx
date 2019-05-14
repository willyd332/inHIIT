import React from 'react';
import NewWorkout from './NewWorkout/NewWorkout';
import EditWorkout from './EditWorkout/EditWorkout';
import TimerApp from './TimerApp/TimerApp';



const WorkoutList = (props) => {
    
    const toggleClass = (index) => {
        console.log('hit toggle function');
        document.getElementById(index).classList.toggle('hidden');
        document.getElementById(index).classList.toggle('start');
    }


    const workouts = props.workouts.map((workout, index)=> {
        return(
            <div className="workout-div flex-container" key={workout._id}>
                    <div>
                    <h2>{workout.name}</h2>
                    </div>
                    <div>
                    <p>Interval One: {workout.intervalOne}</p>
                    <p>Interval Two: {workout.intervalTwo}</p>
                    <p>Cycles: {workout.cycles}</p>
                    </div>
                    <div>
                    <button onClick={toggleClass.bind(null, index)}>Let's Go!</button>
                    <div id={index} className="hidden">
                        <TimerApp index={index} workout={workout}/>
                    </div>
                    
                    </div>
                    
                    <EditWorkout workout={workout} modalShows={props.modalShows} editWorkout={props.editWorkout} handleFormChange={props.handleFormChange}></EditWorkout>
                    <button className="delete" onClick={() =>{
                        props.deleteWorkout(workout._id)
                    }}>Delete</button>
                
            </div>
        )
    });

    return(
        <div>
            <NewWorkout buttonLabel={"New Workout"} createWorkout={props.createWorkout}/>
            <div className="flex-container">
                {workouts}
            </div>
        </div>
        
    )
}




export default WorkoutList;