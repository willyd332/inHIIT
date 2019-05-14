import React, {Component} from 'react';
import Forecast from './Forecast/Forecast'

class WeatherAside extends Component {
    

    render(){
        return(
            <div className='flex-container'>
                <h1 className="weather-title">8 Day Forecast</h1>
                {this.props.forecast? <Forecast forecast={this.props.forecast}/> : null}
            </div>
        )
    }
}



export default WeatherAside;