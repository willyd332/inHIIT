import React, {Component} from 'react';

class WeatherForecast extends Component {
    constructor(){
        super();
        this.state = {
            zipCode: null
        }
    }

    updateState = (e) =>{
        e.preventDefault();
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value
        })
    }

    render(){
        
        return(
            <div className='flex-container'>
                <div className='weather-div'>                
                    <h1 id="temp" >{this.props.weatherData.temp}°</h1>
                    <p>{this.props.weatherData.city}, {this.props.weatherData.currentSummary}</p>           
                    <form onSubmit={(e) => {
                        this.props.weatherSearch(e, this.state.zipCode)
                    }}>
                    <input onChange={this.updateState} type="text" name="zipCode" placeholder="zip code"/>
                    <button type="submit">Submit</button> 
                    </form>
                </div>                    
            </div>
        )
    }
};

export default WeatherForecast;


