import React from 'react';
import NewWorkout from './NewWorkout/NewWorkout';
import EditWorkout from './EditWorkout/EditWorkout';

//THE MAP LOADS THE FIRST WORKOUT AND AUTO SETS THE FIRST WORKOUT MAPPED AS THE ONE TO 
//EDIT BECAUSE IM USING THE COMPONENT DID MOUNT FUNCTION TO SET THE ONE TO EDIT. 

//MODALS ARE WEIRD IN THAT ITS CONSIDERED MOUNTED EVEN BEFORE YOU CLICK TO EXPAND THEM, SO IT SETS
//THE FIRST ONE ONLY. THE REST OF THE UPDATE FUNCTIONALITY ACTUALLY WORKS... BUT I NEED TO FIGURE OUT
// HOW TO MAKE THE MODAL SHOWS CALL ONLY HAPPEN WHEN THE CLICK TO OPEN THE MODAL HAPPENS, NOT WHEN 
//ITS MOUNTED!

const WorkoutList = (props) => {
    
    const workouts = props.workouts.map((workout)=> {
        // console.log(workout);
        return(
            <div className="workout-div flex-container" key={workout._id}>
                <div>
                    <h2>{workout.name}</h2>
                    <p>Interval One: {workout.intervalOne}</p>
                    <p>Interval Two: {workout.intervalTwo}</p>
                    <p>Cycles: {workout.cycles}</p>
                    <EditWorkout workout={workout} modalShows={props.modalShows} editWorkout={props.editWorkout} handleFormChange={props.handleFormChange}></EditWorkout>
                    <button onClick={() =>{
                        props.deleteWorkout(workout._id)
                    }}>Delete</button>
                </div>
            </div>
        )
    });

    return(
        <div>
            <NewWorkout buttonLabel={"New Workout"} createWorkout={props.createWorkout}/>
            <div className="workout-div flex-container">
                {workouts}
            </div>
        </div>
        
    )
}




export default WorkoutList;