//Packages imports
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

//Getting routes
const register = require('./controllers/register.js');
const signin = require('./controllers/signin.js');
const entries = require('./controllers/entries.js');

//Connecting with the PostgresSQL database
const db = knex({
    client: 'pg',
    connection:{
    host: '127.0.0.1',
    user: 'postgres',
    password: 'admin',
    database: 'faceapp'
    }
});

//Enabling express , body-parser and cors.
const app = express();
app.use(bodyParser.json());
app.use(cors());




//ROUTES
// starting page route , responding with 'OK" if the app starts
app.get('/',(req,res) =>{
    res.send('Everything is working!')
})

//signin --> POST = success/fail
app.post('/signin', signin.handleSignin(db,bcrypt));

//register --> POST = user
app.post('/register', register.handleRegister(db,bcrypt));

//image --> PUT --> user
app.put('/image', entries.handleEntries(db));
app.post('/imageurl',(req,res) => {entries.handleAPICall(req,res)});

// Route profile! Will be added in later update!
// //profile/:userId --> GET = user
// app.get('/profile/:id',(req,res)=>{
//     const {id} = req.params;
//     db.select('*').from('users').where({id})
//     .then(user => {
//         if (user.length){
//             res.json(user[0]);
//         }else{
//             res.status(400).json('Unable to find the user. The user does not exit!')
//         }
//     })
//     .catch(err => res.status(400).json('Error getting user.'))
// })

//Checking if the server is working.
app.listen(3000, ()=>{
    console.log("The server is running.");
})



