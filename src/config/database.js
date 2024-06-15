

const mongoose = require('mongoose')

const {ServerConfig} = require('./index')

exports.connect = () =>{
    mongoose.connect(ServerConfig.MONGODB_URL, {

    })
    .then(console.log("DB connection successful"))
    .catch( (error) => {
        console.log("DB connection issue")
        console.error(error)
        process.exit(1);
    })
};
