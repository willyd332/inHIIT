const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    name: String,
    intervalOne: {
        type: Number,
        
    },
    intervalTwo: {
        type: Number,
        
    },
    cycles: Number
})

const workout = mongoose.model('WorkoutModel', workoutSchema);

module.exports = workout;