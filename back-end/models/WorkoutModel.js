const mongoose = require('mongoose');
const UserModel = require('./UserModel');

const workoutSchema = new mongoose.Schema({
    name: String,
    intervalOne: {
        type: Number,
        
    },
    intervalTwo: {
        type: Number,
        
    },
    cycles: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: UserModel
    }
})

const workout = mongoose.model('WorkoutModel', workoutSchema);

module.exports = workout;