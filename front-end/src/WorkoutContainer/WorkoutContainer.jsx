import React, {Component} from 'react';
import WorkoutList from './WorkoutList/WorkoutList'

class WorkoutContainer extends Component {
    constructor(){
        super();
        this.state = {
            workouts: [],
            workoutToEdit: {
                _id: null,
                name: '',
                intervalOne: 0,
                intervalTwo: 0,
                cycles: 0
            },
            modalShowing: false
        }
    }

    componentDidMount(){
        this.getWorkouts();
    }

    getWorkouts = async () => {
        console.log("workouts function hit");
        try {
            const response = await fetch('http://localhost:9000/workouts');

            if(response.status !== 200){
                throw(Error(response.statusText));
            }

            const parsedWorkouts = await response.json();
            this.setState({
                workouts: parsedWorkouts.data
            })

        } catch(err) {
            console.log(err);
        }

    }

    createWorkout = (formData, e) => {
        e.preventDefault();
        console.log(formData);
        
    }

    render(){
        return(
            <div>
                <h1>WorkoutContainer</h1>
                <WorkoutList workouts={this.state.workouts} createWorkout={this.createWorkout}/> 
            </div>
            
        )
        
    }
}


export default WorkoutContainer;