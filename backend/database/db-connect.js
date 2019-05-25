const mongoose = require('mongoose');
mongoose.connect(process.env.MONGOURI, { useNewUrlParser: true }); //process.env.MONGOURI//add to node env variables
mongoose.Promise = global.Promise;
