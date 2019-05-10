const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    name: String,
    intervalOne: {
        type: Number,
        required: true
    },
    intervalTwo: {
        type: Number,
        required: true
    }
})

const workout = mongoose.model('WorkoutModel', workoutSchema);

module.exports = workout;