import React, {Component} from 'react';

class TimerApp extends Component {
    constructor(){
        super();
        this.state = {
            seconds: 0,
            intervalEnd: 0,
            cycles: 0,
            interval: null,
            victoryMessage: ""
        }
        
    
    }

    componentDidMount = () => {
        this.setState({
            seconds: 0,
            intervalEnd: this.props.workout.intervalOne,
            cycles: 0
        })
    }

    

    secondsGoUp = () => {
            if(this.state.cycles === (this.props.workout.cycles * 2)){
                clearInterval(this.state.interval);
                this.setState({
                    seconds: null,
                    victoryMessage: "You did it!"
                })
                

            }else if(this.state.seconds < this.state.intervalEnd){
                this.setState({
                    seconds: this.state.seconds += 1
                })
            } else if(this.state.cycles % 2 === 0 && this.state.seconds === this.state.intervalEnd){
                //clearInterval(this.state.interval)
                this.setState({
                    seconds: 0,
                    intervalEnd: this.props.workout.intervalTwo,
                    cycles: this.state.cycles += 1
                    
                })            
            } else if(this.state.cycles % 2 !== 0 && this.state.seconds === this.state.intervalEnd){
                this.setState({
                    seconds: 0,
                    intervalEnd: this.props.workout.intervalOne,
                    cycles: this.state.cycles += 1
                })
            }        
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
            <div className="flex-container">
                <div>
                    <div id="timer-div" className='timer'>
                        <h1>{this.state.seconds}</h1>
                        <h2 className="victoryMessage">{this.state.victoryMessage}</h2>
                    </div>
                    <div className="flex-container">
                        <button onClick={this.timer} className='start-button'>Start</button>
                        <button onClick={this.clear} className='stop-button'>Pause</button>
                    </div>
                </div>
            </div>
        )
    }
}



export default TimerApp;