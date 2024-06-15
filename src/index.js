// app create
const express = require('express')
const app = express();


// port finding
const {ServerConfig} = require('./config')



// middleware add krna hai 
app.use(express.json())

// express knows how to upload a json, but don't know how to upload file , for this I have a third party package "express-fileupload"
const fileUpload = require('express-fileupload')
// app.use(fileupload())
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));



// db connect
const db = require('./config/database')
db.connect()


// mountiong api-rout
const Upload = require('./routes/FileIploadRoutes')
console.log("index.js")
app.use('/api/v1',Upload)


// connect to cloudanary
const cloudanary = require('./config/media-server')
cloudanary.cloudanaryConnect();


// activating the server
app.listen(ServerConfig.PORT,(req,res) =>{
    console.log(`successfully started the server at port    : ${ServerConfig.PORT}`)
})


const router = express.Router()

router.get("api",(req,res)=>{
    res.send({
        message:"kya hua"
    })
})


