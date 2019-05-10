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
    console.log('hit post route');
    try {
      console.log(req.body, ' this is req.body in create route');
      const createdWorkout = await Workout.create(req.body);
      console.log('response happening?')
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