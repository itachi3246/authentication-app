const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');

const database = require('./config/database');
//connect to database
mongoose.connect(database.database, { useNewUrlParser: true, useUnifiedTopology: true });
//on connection 
mongoose.connection.on('connected', () => {
    console.log('connected to database' + database.database);
})
//on Error
mongoose.connection.on('error', (err) => {
    console.log('Error : ' + err);
})

const app = express();

const users = require('./routes/users');

//port number
const port = 4500;

// cors middleware
app.use(cors());

//set static folder
app.use(express.static(path.join(__dirname, 'client')));

//bodyParser middleware
app.use(bodyParser.json());

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

//index route
app.get('/', (req, res) => {
    res.send('qwertyuiop');
});

// users route
app.use('/users', users);

app.listen(port, () => {
    console.log('server started on port : ' + port);

});