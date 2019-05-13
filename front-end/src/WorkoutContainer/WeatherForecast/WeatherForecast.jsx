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
        console.log(this.state.zipCode);
        return(
            <div>
                <h1>Current Temp: {this.props.weatherData.temp}</h1>
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
//     temp: null, // currently.temperature
//     currentSummary: '', // currently.summary
//     dailyOutlook: '' // daily.summary