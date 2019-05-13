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
        //console.log(this.state.zipCode);
        return(
            <div className="flex-container">
            <div className="weather-div">
                <p>{this.props.weatherData.city}, {this.props.weatherData.currentSummary}</p>
                <h1>{this.props.weatherData.temp}°</h1>
                
            
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


// weather: {
//     city: 'Denver',
//     temp: null, // currently.temperature
//     currentSummary: '', // currently.summary
//     dailyOutlook: '' // daily.summary