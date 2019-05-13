import React, {Component} from 'react';

class TimerApp extends Component {
    constructor(){
        super();
        this.state = {
            seconds: 0,
            intervalOne: 0,
            intervalTwo: 0,
            cycles: 0
        }
    
    }

    componentDidMount = () => {
        this.setState({
            seconds: 0,
            intervalOne: this.props.workout.intervalOne,
            intervalTwo: this.props.workout.intervalTwo,
            cycles: this.props.workout.cycles
        })
    }



    render(){
        console.log(this.state, "state in timer component")
        return(
            <div>

                <div>
                    <div className='timer'></div>
                    <button className='start-button'>Start</button>
                    <button className='stop-button'>Stop</button>
                </div>
            </div>
        )
    }
}



export default TimerApp;