const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const open = require('open');
const path = require('path');
const generator = require('./generator');

function startAPI(){
    console.log('starting API...');
    console.log(__dirname)
    app.use(express.static(path.resolve(__dirname,"../ui")));
    open("http://localhost:3000/index.html");

    app.use(express.json({
        type: ['application/json', 'text/plain']
    }))

    app.use(bodyParser.json());

    app.post('/', function(req, res){
        generator.generateLeto(req.body, res); 
    })

    app.post('/exit', function(req, res){
        console.log('API closed!');
        res.status(200).end();
        process.exit();
    })

    app.listen(3000, function(){
        console.log('UI started in localhost:3000');
    });
}

exports.startAPI = startAPI;

