require('dotenv').config()
require('./config/db')
const express = require('express');
const path = require('path');

const bodyParser = require('body-parser');

const http = require('http');

const app = express();
//parse the request body
app.use(bodyParser.json());

//Creates the different headers for the response
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    if (req.method === 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});
//All routes with retricted content pass trough the isAuth middleware to verify authentication
app.all('/api/*', require('./middlewares/isAuth'));
//routes accessible without being authenticated are redirected in routes
app.use('/', require('./routes')());
//Create the server
const server = http.createServer(app);

app.get("*", (req, res) => {
    res.sendFile(path.join(_dirname, "memomental", "build", "index.html"));
});


//Open the server
server.listen(process.env.PORT || 8080, function(){
    console.log("Listening on 8080");
});
console.log(process.env.DB_HOST);
app.use('*',(req,res) => res.sendStatus(404));
