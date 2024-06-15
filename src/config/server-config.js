const dotenv = require('dotenv')

dotenv.config()


module.exports  = {
    PORT:process.env.PORT,
    MONGODB_URL:process.env.MONGODB_URL,
    CLOUD_NAME : process.env.CLOUD_NAME,
    API_KEY : process.env.API_KEY,
    API_SECRETE : process.env.API_SECRETE
}