import React, {Component} from 'react';

class TimerApp extends Component {
    constructor(){
        super();
        this.state = {

        }
    }

    render(){
        return(
            <div>
                <h1>{this.props.workout.name}</h1>
            </div>
        )
    }
}



export default TimerApp;