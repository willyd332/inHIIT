import React, {Component} from 'react';

class TimerApp extends Component {
    constructor(){
        super();
        this.state = {
            seconds: 0,
            intervalOne: 0,
            intervalTwo: 0,
            cycles: 0,
            interval: null
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

    secondsGoUp = () => {
            this.setState({
                seconds: this.state.seconds += 1
            })
        
    }

    timer = () => {
        this.setState({
            interval: setInterval(this.secondsGoUp, 1000)
        })
    }
    
    

    clear = () => {
        console.log('clear function hit');
        clearInterval(this.state.interval);
    }

    render(){
        console.log(this.state, "state in timer component")
        return(
            <div>

                <div>
                    <div className='timer'><h1>{this.state.seconds}</h1></div>
                    <button onClick={this.timer} className='start-button'>Start</button>
                    <button onClick={this.clear} className='stop-button'>Stop</button>
                </div>
            </div>
        )
    }
}



export default TimerApp;