const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

require('./db/db');



app.use(cors({
    origin: ["http://localhost:3000", "https://api.darksky.net"],
    credentials: true,
    optionsSuccessStatus: 200
}))



app.use(morgan('short'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


const workoutController = require('./controllers/WorkoutController');


app.use('/workouts', workoutController);





app.listen(process.env.PORT || 9000, ()=>{
    console.log("Server is running on port 9000")
})