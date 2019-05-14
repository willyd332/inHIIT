import React from 'react';

const Forecast = (props) => {
    
    const makePercent = (probability) => {
        return probability * 100;
    }

    const makeDate = (unixTime) => {       
            var a = new Date(unixTime * 1000);
            var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
            var year = a.getFullYear();
            var month = months[a.getMonth()];
            var date = a.getDate();
            var date = `${month} ${date}, ${year}`
            
            return date;          
    }
    
    

    const dailyForecast = props.forecast.map((day, i) => {
        //console.log(day)
        return(
            <div key={i + 'forecast'} className='forecast'>
                <h4>{makeDate(day.unixTime)}</h4>
                <p>{day.summary}</p>
                <p>High {day.tempHigh}° / Low {day.tempLow}°</p>
                
                <p>{makePercent(day.precipProb)}% chance of {day.precipType}</p>
            </div>
        )
    });

    return dailyForecast;
}

export default Forecast;