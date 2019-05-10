var express = require('express');

var bodyParser = require('body-parser');

var http = require('http');

var app = express();
//parse the request body
app.use(bodyParser.json());

//Creates the different headers for the response
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});
//routes accessible without being authenticated are redirected in routes
app.use('/', require('./routes')());
//Create the server
var server = http.createServer(app);

//Open the server
server.listen(8080, function(){
    console.log("Listening on 8080");
});

