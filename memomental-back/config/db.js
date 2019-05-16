const mongoose = require('mongoose');
mongoose.Promise = Promise;


// Connect to Mongoose
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true
})

mongoose.connection.once('open', function() {
    console.log('Connected to mongoDB')
}).on('error', function(error){
    console.log('Connection error:', error)
})

require('../api/models');
