const mongoose = require('mongoose');
const config = require('config');
const debug = require('debug')('app:dbconnection');

const connectDb = async() => {

    try{
        if(config.has('mongoURI')){
            const db = config.get('mongoURI');
            await mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
            debug('connected to database successfully...');
        }
    }catch(e) {
        debug('unable to connect to database')
        //exiting the application on failure
        process.exit(1)
    }

}

module.exports = connectDb;