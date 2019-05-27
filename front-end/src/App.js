import React, {Component} from 'react';
import './App.css';
import WorkoutList from './WorkoutList/WorkoutList';
import WeatherAside from './WeatherAside/WeatherAside';
import WeatherForecast from './WeatherForecast/WeatherForecast';
import UserLogin from './UserLogin/UserLogin';

// Admin Username is 'Adam' and password is '123'


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
        loggedUser: '',
        loggedUserId: '',
        logFailMsg: '',

        workouts: [],
        workoutToEdit: {
          id: null,
          name: '',
          intervalone: 0,
          intervaltwo: 0,
          cycles: 0
      },
      }

    }

    componentDidMount(){
      this.getWeather();
      this.getWorkouts();
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
          document.getElementsByTagName('body')[0].setAttribute('class', icon);
        }
      })
    }

    createUser = async (formData, e) => {
      e.preventDefault();

      console.log(formData);

      try {
          const createdUser = await fetch('http://localhost:8080/users/register', {
              method: 'POST',
              credentials: 'include',
              body: JSON.stringify(formData),
              headers: {
                  'Content-Type': 'application/json'
              }
          });

          const parsedResponse = await createdUser.json();

          console.log(parsedResponse);

            if(parsedResponse){
              this.setState({
                isLogged: true,
                loggedUser: parsedResponse.username,
                loggedUserId: parsedResponse.id,
            });
            this.getWorkouts();
          } else {
            this.setState({
              logFailMsg: 'User name not available'
            })
          }

      } catch(err) {
          console.log(err)
      }
  }

  loginUser = async (formData, e) => {
      e.preventDefault();
      try {
        const loginUser = await fetch('http://localhost:8080/users/login', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(formData),
        headers: {
            'Content-Type': 'application/json',
        }
        })
        const parsedResponse = await loginUser.json();

        if(parsedResponse){
          this.setState({
            isLogged: true,
            loggedUser: parsedResponse.username,
            loggedUserId: parsedResponse.id,
        });
          this.getWorkouts();
        } else {
          this.setState({
            logFailMsg: 'Username or Password Incorrect'
          })
        }
      } catch(err) {
        console.log(err);
      }

  }

  logoutUser = async () => {
    try {
      const logoutUser = await fetch('http://localhost:8080/users/logout', {
        method: 'GET',
        credentials: 'include'
      })

      const parsedResponse = await logoutUser.json();
      console.log(parsedResponse, 'this is parsed response')

      this.setState({
        isLogged: false,
        loggedUser: '',
        loggedUserId: ''
      })
    } catch(err) {
        console.log(err);
    }
    this.getWorkouts();
  }

  getWorkouts = async () => {

    try {
        const response = await fetch('http://localhost:8080/workouts');

        if(response.status !== 200){
            throw(Error(response.statusText));
        }

        const parsedWorkouts = await response.json();

        console.log(parsedWorkouts);

        if(this.state.isLogged){
            const workoutArr = parsedWorkouts;
            const userWorkouts = workoutArr.filter((workout) => workout.user.id === this.state.loggedUserId);
            this.setState({
                workouts: userWorkouts
            });

        } else {
          const adminUserId = 1;
          const workoutArr = parsedWorkouts;
          const userWorkouts = workoutArr.filter((workout) => workout.user.id === adminUserId);

            this.setState({
                workouts: userWorkouts
            })

        }

    } catch(err) {
        console.log(err);
    }

}

  createWorkout = async (formData, e) => {
    e.preventDefault();
    try {
        const createdWorkout = await fetch('http://localhost:8080/workouts', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const parsedResponse = await createdWorkout.json();
        this.setState({workouts: [...this.state.workouts, parsedResponse]})

    } catch(err) {
        console.log(err)
    }
  }

  deleteWorkout = async (deletedWorkoutID) => {
    try{
        const deleteWorkout = await fetch(`http://localhost:8080/workouts/${deletedWorkoutID}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const parsedResponse = await deleteWorkout.json();

        if(parsedResponse){
            this.setState({
                workouts: this.state.workouts.filter(workout => workout.id !== deletedWorkoutID)
            });
        }


    } catch(err) {
        console.log(err);
    }

  };

  editWorkout = async (e) => {
    e.preventDefault();
    try {
        const updateWorkout = await fetch('http://localhost:8080/workouts/' + this.state.workoutToEdit.id, {
            method: 'PUT',
            credentials: 'include',
            body: JSON.stringify(this.state.workoutToEdit),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const parsedResponse = await updateWorkout.json();
        const editedWorkoutArr = this.state.workouts.map((workout) => {
            if(workout.id === this.state.workoutToEdit.id){
                workout = parsedResponse
            }
            return workout
        });

        this.setState({
            workouts: editedWorkoutArr,
        });

    } catch(err) {
        console.log(err)
    }
  };

  handleFormChange = (e) => {
    this.setState({
        workoutToEdit: {
            ...this.state.workoutToEdit,
            [e.target.name]: e.target.value
        }
    })
  }

  modalShows = (thisOne) => {
    this.setState({
        workoutToEdit: thisOne
    })
  }



  render(){
      return (
        <div id='app' className='App flex-container'>
          <div className='logo-div'>
          <div>
            <img className='logo' src={require('./images/inHIIT_logo.png')} alt='logo'></img>
          </div>
            <WeatherForecast weatherData={this.state.weather} weatherSearch={this.weatherSearch}/>
          </div>



          <div className='main-flex-container'>
            <div className='workout-container'>
            <WorkoutList isLogged={this.state.isLogged} modalShows={this.modalShows} editWorkout={this.editWorkout} workouts={this.state.workouts} createWorkout={this.createWorkout} deleteWorkout={this.deleteWorkout} handleFormChange={this.handleFormChange}/>
            </div>
            <div className='aside-container'>
            <div>
              <p className='failure'>{this.state.logFailMsg}</p>
              {this.state.isLogged ? <p className='login'>Welcome, {this.state.loggedUser}! </p> : null}
              {this.state.isLogged ? <button onClick={this.logoutUser} className='newButton loginModalButton'>Logout</button>
              :
              <UserLogin createUser={this.createUser} loginUser={this.loginUser} buttonLabel={'Login/Register'}/>}
            </div>

              {this.state.forecast ? <WeatherAside  forecast={this.state.forecast}/> : null}
            </div>
          </div>
        </div>
      )
  }
}

export default App;
