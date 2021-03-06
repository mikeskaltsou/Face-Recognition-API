const clarifai = require('clarifai');
const { response } = require('express');

const app = new Clarifai.App({
    apiKey: '**************************' 
  });

const handleAPICall = (req,res) => {
    app.models.predict( "a403429f2ddf4b49b307e318f00e528b",req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json('Unable to work with API.'))
}

const handleEntries = (db) => (req,res) => {
    const {id} = req.body;
    db('users').where('id','=',id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0].entries);
    })
    .catch(err => res.status(400).json('Unable to get entries.'))
}

module.exports={
    handleEntries:handleEntries,
    handleAPICall:handleAPICall
}
