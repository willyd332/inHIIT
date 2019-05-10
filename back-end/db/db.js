const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/inHIIT", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});

mongoose.connection.on('connected', ()=>{
    console.log("Mongoose is connected")
})

mongoose.connection.on('error', (err)=>{
    console.log(err, "Mongoose failed to connect")
})

mongoose.connection.on('disconnected', ()=>{
    console.log("Mongoose is not connected")
})

