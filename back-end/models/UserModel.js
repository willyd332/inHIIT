const mongoose = require('mongoose');
const WorkoutModel = require('./WorkoutModel');

const userSchema = new mongoose.Schema({
    userName: {type: String, required: true, unique: true},
    userPassword: {type: String, required: true},
    zipCode: Number,
    workouts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: WorkoutModel
    }]
})

module.exports = mongoose.model('User', userSchema); 

