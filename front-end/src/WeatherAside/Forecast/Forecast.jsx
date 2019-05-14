import React from 'react';

const Forecast = (props) => {
    
    const makePercent = (probability) => {
        return probability * 100;
    }
    
    const dailyForecast = props.forecast.map((day, i) => {
        return(
            <div key={i + "forecast"} className="forecast">
                <p>{day.summary}</p>
                <p>High of {day.tempHigh}°</p>
                <p>Low of {day.tempLow}°</p>
                <p>{makePercent(day.precipProb)}% chance of {day.precipType}</p>
            </div>
        )
    });

    return dailyForecast;
}



export default Forecast;