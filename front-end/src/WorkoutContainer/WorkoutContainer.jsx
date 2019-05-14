import React, {Component} from 'react';
import WorkoutList from './WorkoutList/WorkoutList';


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
            modalShowing: false, 
            
        }
    }

    componentDidMount(){
        this.getWorkouts();
        
    }

    getWorkouts = async () => {

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



    createWorkout = async (formData, e) => {
        e.preventDefault();
        try {
            const createdWorkout = await fetch('http://localhost:9000/workouts', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const parsedResponse = await createdWorkout.json();
            this.setState({workouts: [...this.state.workouts, parsedResponse.data]})

        } catch(err) {
            console.log(err)
        }
    }

    deleteWorkout = async (deletedWorkoutID) => {
        console.log(deletedWorkoutID, 'hit delete function');
        try{
            const deleteWorkout = await fetch(`http://localhost:9000/workouts/${deletedWorkoutID}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const parsedResponse = await deleteWorkout.json();
            console.log(parsedResponse, 'parsed response');
            console.log(deletedWorkoutID, "deletedWorkoutID from before")
            if(parsedResponse.status === 200){
                this.setState({
                    workouts: this.state.workouts.filter(workout => workout._id !== deletedWorkoutID)
                })
            }


        } catch(err) {
            console.log(err);
        }

    };

    handleFormChange = (e) => {
        this.setState({
            workoutToEdit: {
                ...this.state.workoutToEdit, 
                [e.target.name]: e.target.value
            }
        })
    }

    modalShows = (thisOne) => {
        this.setState({
            workoutToEdit: thisOne
        })
    }

    editWorkout = async (e) => {
        e.preventDefault();
        console.log(this.state.workoutToEdit._id)
        try {
            const updateWorkout = await fetch('http://localhost:9000/workouts/' + this.state.workoutToEdit._id, {
                method: 'PUT',
                body: JSON.stringify(this.state.workoutToEdit),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const parsedResponse = await updateWorkout.json();
            const editedWorkoutArr = this.state.workouts.map((workout) => {
                if(workout._id === this.state.workoutToEdit._id){
                    workout = parsedResponse.data
                }
                return workout
            });

            this.setState({
                workouts: editedWorkoutArr,
            });

        } catch(err) {
            console.log(err)
        }        
    }

    render(){

        return(
            <div className="flex-container">
                
                <WorkoutList modalShows={this.modalShows} editWorkout={this.editWorkout} workouts={this.state.workouts} createWorkout={this.createWorkout} deleteWorkout={this.deleteWorkout} handleFormChange={this.handleFormChange}/> 
            </div>
            
        )
        
    }
}


export default WorkoutContainer;