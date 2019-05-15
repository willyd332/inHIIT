const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');
const Workout = require('../models/WorkoutModel');

// GET ALL ROUTE
router.get('/', async (req, res, next) => {
    console.log(req.body, 'this is get all users')
    try {
        const allUsers = await User.find({});

        res.json({
            status: 200,
            data: allUsers
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
      const createdUser = await User.create(req.body);
      console.log('response happening?')
      res.json({
        status: 200,
        data: createdUser
      });
  
    } catch(err){
      console.log(err);
    }
  });


//DELETE ROUTE
router.delete('/:id', async (req, res) => {
    console.log('hit delete route');
    
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        console.log(deletedUser);
        res.json({
            status: 200,
            data: deletedUser
        });

    } catch(err) {
        console.log(err);
    }
})


module.exports = router;