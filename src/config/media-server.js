
const {ServerConfig} = require('./index')
const cloudinary = require('cloudinary').v2

exports.cloudanaryConnect = ()=>{
    try{

        console.log("Configuring Cloudinary with:", {
            cloud_name: ServerConfig.CLOUD_NAME,
            api_key: ServerConfig.API_KEY,
            api_secret: ServerConfig.API_SECRETE
        });



        cloudinary.config({
            cloud_name: ServerConfig.CLOUD_NAME,
            api_key: ServerConfig.API_KEY,
            api_secret: ServerConfig.API_SECRETE

        })

        console.log("Cloudinary configuration successful");
       
    }
    catch(error){
        console.log("error in connecting cloudanary " + error)
    }
}