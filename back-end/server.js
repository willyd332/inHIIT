const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const morgan = require('morgan');
const cors = require('cors');
require('./db/db');



app.use(cors({
    origin: ['http://localhost:3000', 'https://api.darksky.net'],
    credentials: true,
    optionsSuccessStatus: 200
}));

app.use(morgan('short'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const store = new MongoDBStore({
    uri: 'mongodb://localhost/inHIIT',
    collection: 'mySessions'
});

store.on('error', function(error) {
    console.log(error);
});

app.use(session({
    secret: 'HIIT me baby one more time',
    resave: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    },
    store: store
}));

const workoutController = require('./controllers/WorkoutController');
const userController = require('./controllers/UserController');

app.use('/workouts', workoutController);
app.use('/users', userController);






app.listen(process.env.PORT || 9000, ()=>{
    console.log('Server is running on port 9000')
});