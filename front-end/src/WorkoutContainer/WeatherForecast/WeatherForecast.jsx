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
            <div>
                <h1>{this.props.weatherData.city}</h1>
                <h2>{this.props.weatherData.temp}°</h2>
                <p>{this.props.weatherData.currentSummary}</p>
                <form onSubmit={(e) => {
                    this.props.weatherSearch(e, this.state.zipCode)
                }}>
                    <input onChange={this.updateState} type="text" name="zipCode" placeholder="zip code"/>
                    <button type="submit">Submit</button>
                </form>
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