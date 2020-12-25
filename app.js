const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
app.use(cookieParser());
app.use(express.json());

//Connecting to database
mongoose.connect('mongodb+srv://yogi:21032103@cluster0.nmyxz.mongodb.net/mernauth?retryWrites=true&w=majority',{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
.then(() => console.log("Database Connected Successfully"))
.catch(err => console.log(err));

if (process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
}

const userRouter = require('./routes/User');
app.use('/user',userRouter);

//To check if the server is running successfully or not
app.listen(port,function(err){
    if(err){
        console.log(`error in Server!: ${err}`);
    }
    console.log(`Server is Running on port: ${port}`);
})
