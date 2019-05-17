const express = require('express');
const router = express.Router();
const Workout = require('../models/WorkoutModel');




// GET ALL ROUTE
router.get('/', async (req, res, next) => {
    console.log(req.body, 'this is get all')
    try {
        const allWorkouts = await Workout.find();

        res.json({
            status: 200,
            data: allWorkouts
        });

    } catch(err){
        console.log(err)
        res.send(err)
    }
});

//CREATE NEW ROUTE
router.post('/', async (req, res) => {
    try {
      console.log(req.body, ' this is req.body in create route');
      const createdWorkout = await Workout.create(req.body);
      const updatedUserWorkout = await Workout.findByIdAndUpdate(createdWorkout._id, {user : req.session.usersDbId}, {new: true});
      console.log(updatedUserWorkout, '<-- this is workout with user id added');
      res.json({
        status: 200,
        data: createdWorkout
      });
  
    } catch(err){
      console.log(err);
    }
  });
  
//DELETE ROUTE

router.delete('/:id', async (req, res) => {
    console.log('hit delete route');
    
    try {
        const deletedWorkout = await Workout.findByIdAndDelete(req.params.id);
        console.log(deletedWorkout);
        res.json({
            status: 200,
            data: deletedWorkout
        });

    } catch(err) {
        console.log(err);
    }
})


//EDIT ROUTE

router.put('/:id', async (req, res) => {

    try {
        const updatedWorkout = await Workout.findByIdAndUpdate(req.params.id, req.body, {new: true});

        res.json({
            status: 200,
            data: updatedWorkout
        })

    } catch(err) {
        console.log(err);
    }
})


//SHOW ROUTE

router.get('/:id', async (req, res, next) => {
    try{
        const foundWorkout = await Workout.findById(req.params.id);

        res.json({
            status: 200,
            data: foundWorkout
        })
    } catch(err) {
        console.log(err)
    }

});






module.exports = router;