

const express = require('express')

const router = express.Router();

// const {imageUpload,videoaUpload,imageReducerUpload,localFileUpload} = require('../controllers/fileUpload')
const {localFileupload,imageUpload,vedioUpload,uploadReduceImage} = require('../controllers/FileUpload')

// api route

console.log("at router")
router.post('/localfileupload',localFileupload)
router.post('/imagefileupload',imageUpload)
router.post('/vediofileupload',vedioUpload)
router.post('/reduceImagefileupload',uploadReduceImage)
// router.post('/imageupload',imageUpload)

module.exports = router