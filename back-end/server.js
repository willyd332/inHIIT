const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
require('./db/db');

const store = new MongoDBStore({
    uri: 'mongodb://localhost:27017/inHIIT',
    collection: 'mySessions'
  });

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
    optionsSuccessStatus: 200
}))

app.use(session({
    saveUninitialized: true,
    secret: "a man without the sauce is lost",
    resave: false,
    store: store,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 
      },
}))

app.use(morgan('short'));
app.use(bodyParser.json());
app.use((req, res, next)=>{
    //console.log(`Incoming request from user ${req.session.userId}`)
    next();
})

const workoutController = require('./controllers/WorkoutController');


app.use('/workouts', workoutController);





app.listen(process.env.PORT || 9001, ()=>{
    console.log("Server is running on port 9001")
})