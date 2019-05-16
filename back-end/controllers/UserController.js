const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');
const Workout = require('../models/WorkoutModel');
const bcrypt = require('bcryptjs');

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
router.post('/register', async (req, res) => {
    try {
      const password = req.body.userPassword;
      const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
      const userDbEntry = {};
      userDbEntry.userName = req.body.userName;
      userDbEntry.userPassword = passwordHash;
      
      try{
        const foundUser = await User.findOne({'userName' : userDbEntry.userName});
        console.log(foundUser);
        if(foundUser){
            console.log('USER NOT AVAILABLE');
            res.json({
                status: 200,
                data: 'User name not available'
            })
        } else {
            console.log('Im in here');
            const createdUser = await User.create(userDbEntry);
            req.session.logged = true;
            req.session.usersDbId = createdUser._id;
            req.session.username = createdUser.userName
            
            res.json({
                status: 200,
                data: {
                    msg: `login successful for ${createdUser.userName}`,
                    user: req.session.username,
                    usersDbId: req.session.usersDbId
                }
            });
        }        
      } catch(err) {
          console.log(err);
      }
  
    } catch(err){
      console.log(err);
    }
  });


//LOGOUT USER 
router.get('/logout', async (req, res) => {
    console.log(req.session);
    req.session.destroy((err) => {
        if(err){
            console.log(err)
        }
    })

    try {
        res.json({
            status: 200,
            data: 'logged user out'
        })
    } catch(err) {
        console.log(err);
    }
    console.log('successful logout');
})


//LOGIN USER
router.post('/login', async (req, res) => {
    console.log(req.body, 'req.body on 87');
    try {
        const foundUser = await User.findOne({
            'userName': req.body.userName
        });

        if(foundUser){
            if(bcrypt.compareSync(req.body.userPassword, foundUser.userPassword)){
                req.session.logged = true;
                req.session.usersDbId = foundUser._id;
                req.session.username = foundUser.userName;

                res.json({
                    status: 200,
                    data: {
                        msg: `login successful`,
                        user: req.session.username,
                        usersDbId: req.session.usersDbId
                    }
                });
                
              } else {
                res.json({
                    status: 200,
                    data: 'username or password is incorrect'
                });
              }
            } else {
                res.json({
                    status: 200,
                    data: 'username or password is incorrect'
                });
            }
        
    }catch(err) {
        console.log(err);
    }

})
  


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

//EDIT ROUTE

router.put('/:id', async (req, res) => {

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});

        res.json({
            status: 200,
            data: updatedUser
        })

    } catch(err) {
        console.log(err);
    }
})


//SHOW ROUTE

router.get('/:id', async (req, res, next) => {
try{
    const foundUser = await User.findById(req.params.id);

    res.json({
        status: 200,
        data: foundUser
    })
} catch(err) {
    console.log(err)
}

});


module.exports = router;