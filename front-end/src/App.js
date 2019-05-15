import React, {Component} from 'react';
import './App.css';
import WorkoutContainer from './WorkoutContainer/WorkoutContainer';
import WeatherAside from './WeatherAside/WeatherAside';
import WeatherForecast from './WeatherForecast/WeatherForecast';
import UserLogin from './UserLogin/UserLogin';

class App extends Component {
    constructor(){
      super();
      this.state = {
        weather: {
            temp: null,
            currentSummary: '',
            dailyOutlook: '',            
        },        
        forecast: null,
        lat: 39.7392,
        long: -104.9903,
        city: 'Denver',  
        isLogged: false,
        loggedUser: ''      
      }
    }

    componentDidMount(){      
      this.getWeather();
    }

    weatherSearch = async (e, zipCode) => {
      e.preventDefault();      
      try{
          const response = await fetch(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/geocode/json?address="${zipCode}"&key=AIzaSyDVPLLlJAQ679Frd0gu11khJ9mW02wsvWQ`);
          if(response.status !== 200){
              throw(Error(response.statusText));
          }
          const parsedResponse = await response.json();

          this.setState({
              lat: parsedResponse.results[0].geometry.location.lat,
              long: parsedResponse.results[0].geometry.location.lng,
              city: parsedResponse.results[0].address_components[1].long_name
          })
      } catch(err){
          console.log(err);
      }      
      this.getWeather(); 
  }

    getWeather = async () => {

        try {
            const response = await fetch(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/8a94adc7152ba66046780b53e6b95709/${this.state.lat},${this.state.long}`);

            if(response.status !== 200){
                throw(Error(response.statusText));
            }
            const parsedWeather = await response.json();
            const forecastArray = [];
            parsedWeather.daily.data.forEach((day) => {
                //console.log(parsedWeather.currently.icon);
                forecastArray.push({
                    summary: day.summary,
                    precipProb: day.precipProbability,
                    precipType: day.precipType,
                    tempHigh: day.temperatureHigh,
                    tempLow: day.temperatureLow,
                    unixTime: day.time
                    
                })
            })

            this.setState({
                weather: {
                    temp: parsedWeather.currently.temperature,
                    currentSummary: parsedWeather.currently.summary,
                    dailyOutlook: parsedWeather.daily.summary,
                    city: this.state.city,
                    icon: parsedWeather.currently.icon
                },
                forecast: forecastArray
            })

            this.setBackground();

        } catch(err) {
            console.log(err);
        }
    }

    setBackground = () => {
      const currentIcon = this.state.weather.icon;
      const iconArr = ['clear-day', 'clear-night', 'rain', 'snow', 'sleet', 'wind', 'fog', 'cloudy', 'partly-cloudy-day', 'partly-cloudy-night'];

      iconArr.forEach((icon) => {
        if(icon === currentIcon){
          document.getElementsByTagName("body")[0].setAttribute("class", icon);
        }
      })
    }

    createUser = async (formData, e) => {
      e.preventDefault();


      try {
          const createdUser = await fetch('http://localhost:9000/users/register', {
              method: 'POST',
              credentials: 'include',
              body: JSON.stringify(formData),
              headers: {
                  'Content-Type': 'application/json'
              }
          });

          const parsedResponse = await createdUser.json();
          console.log(parsedResponse, "parsed response");

            if(parsedResponse.data !== 'User name not available'){
              this.setState({
                isLogged: true,
                loggedUser: parsedResponse.data.user
            })
          }

      } catch(err) {
          console.log(err)
      }
  
  }

  loginUser = async (formData, e) => {
      e.preventDefault();
      console.log('loginUser function');

      try {
        const loginUser = await fetch('http://localhost:9000/users/login', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(formData),
        headers: {
            'Content-Type': 'application/json',
        }
        })

        const parsedResponse = await loginUser.json();
        console.log(parsedResponse.data.msg, 'this is parsedResponse'); 

        if(parsedResponse.data.msg === 'login successful'){
          this.setState({
            isLogged: true,
            loggedUser: parsedResponse.data.user
          })
        }

      } catch(err) {
        console.log(err);
      }

  }

  logoutUser = async () => {
    console.log('logout function');
    
    try {
      const logoutUser = await fetch('http://localhost:9000/users/logout', {
        method: 'GET',
        credentials: 'include'
      })

      const parsedResponse = await logoutUser.json();
      console.log(parsedResponse, 'this is parsed response')

      this.setState({
        isLogged: false
      })
    } catch(err) {
        console.log(err);
    }

  }

    render(){
        return (
          <div id="app" className="App flex-container">
            <div className='logo-div'>
            <div>
              <img className='logo' src={require('./images/inHIIT_logo.png')} alt="logo"></img>
            </div>
              <WeatherForecast weatherData={this.state.weather} weatherSearch={this.weatherSearch}/>              
            </div>
            {this.state.isLogged ? <p>Welcome, {this.state.loggedUser}! </p> : null}
            {this.state.isLogged ? <button onClick={this.logoutUser} className="newButton loginModalButton">Logout</button>
            :
            <UserLogin createUser={this.createUser} loginUser={this.loginUser} buttonLabel={'Login/Register'}/>}

            
            
            


            <div className="main-flex-container">             
              <div className="workout-container">
                <WorkoutContainer setForcast={this.setForecast}/>
              </div>            
              <div className="aside-container">
                {this.state.forecast ? <WeatherAside  forecast={this.state.forecast}/> : null}
              </div>           
            </div>
          </div>
        )
    }
}

export default App;
