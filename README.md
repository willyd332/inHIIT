# inHIIT
React_Express_app

const BestProjectEver = ( ) => {

React and Express App - Adam Wolfman

Potential Names: 
inHIIT _ “in it you don’t quit”  (HIIT = “high intensity interval training”, inHIIT => init) 
TICKR _ “fire up your ticker with TICKR” 
2NDS  _ “who doesn’t want seconds?”


MVP Application:
1. Index, add, edit, and delete “workouts” that are each a basic timer that times their workouts. 

2. Make call to weather API that displays the current weather data for the input zip code.

Weather API - Dark Skies - https://darksky.net/dev/docs
1000 requests per day

Use react-strap to style forms
Use flex-box and reg css to style the rest

*** Actual Goal for Application ***

User Story: 
App is a workout interval timer with Weather API search call. User inputs the time in seconds for each of 2 intervals and how many intervals they would like to circuit. Weather API call returns data about current location weather. Based on current weather, background image displays as that type of weather. 


Site loads to a workout index page that includes a create new workout button

Index Page:     
Has list of tiles showing the currently added interval workouts - strap tiles? 
Has button to create new workout that brings up modal to create new

Each Tile:
Has button to edit the workout on the tile
Has button to delete the workout on the tile

New Workout Modal:
Has form that includes inputs for 
1) Name of workout
2) First interval in seconds
3) Second Interval in seconds
4) Number of rounds to run the interval
Redirects on submit to either the workout show page or index * 

Edit Workout Modal:
Has form that includes inputs filled with the current workout value
1) Name of workout
2) First interval in seconds
3) Second Interval in seconds
4) Number of rounds to run the interval

Workout Show Page:

Components: 
1) Large central timer element that counts up from zero to interval
2) Start/Stop toggle button
3) Small weather data section
4) Background image responsive to current weather


Timer (set interval) will count to the first number of seconds, alert 
and then count to the second number of seconds, and repeat the process the desired number of times

When each interval reaches its end in seconds, an animation of some kind will run to indicate the start of the second interval. When the second interval ends, an animation will run before the function calls itself again until the number of cycles is reached. When the final cycle is reached, an animation will display a “you finished the workout” message and animation. 


Weather API 

User inserts zip code on the form and the page renders with a background image associated with the current weather of the area code

Potentially self-design background images/gifs with Illustrator/PS

Basic weather data displayed on the app page [temp, precipitation, maybe a small 5 day forecast]


*** Interval function basic idea ***
Need to refactor to do it using state to hold variable values
Need to nail down the syntax for set interval timers

const Interval Function = (intOne, intTwo, cycles) => {

let circuit = 0;

if(circuit < cycles) {

const runIntervals = (intOne, intTwo){
let seconds = 0;

set interval at 1000 milliseconds 

when seconds === intOne {clear interval}
reset seconds to 0
call animation function that does some color flash/motivational message/cartoon animation

set interval at 1000 milliseconds
when seconds === intTwo {clear interval}
reset seconds to 0
call animation function that does some color flash or motivational message

cycles ++        
runIntervals();
}    
}
}


SEE WIREFRAME IMAGE IN REPO FOR WHAT THE WORKOUT SHOW PAGE WILL LOOK LIKE
It should be mobile first, so the design will likely change, but the idea is the timer is front and center, weather secondary, back/edit/delete controls tertiary, maybe a footer
￼
￼￼


<%= SUPER EXTREME NICE TO HAVE %> 

Oath with Spotify login and embedded Spotify premium player as optional part of the app UI - all in one workout app! 



}



export default BestProjectEver;
