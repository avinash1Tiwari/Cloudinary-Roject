

const { message } = require('telegraf/filters');
const File = require('../models/File')

const cloudinary = require('cloudinary').v2

const fs = require('fs');



// localfileupload->handler : it upload file somewhere at local-server 

exports.localFileupload = async (req,res) =>{
    // fetch file
   try{
    console.log("req.files")
    console.log(req.files.undefined.name)
    const file = req.files.file || req.files.undefined;

    console.log("file1 => ", file);



    // set server path where you want to store
    let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
    console.log("path => ", path);

    // move file to server path
    file.mv(path,(err) =>{
        console.log(err)
    });

    res.status(200).json({
        success:true,
        message : "File uploaded successfully on the server"
    })
   }
   catch(error){

    res.status(400).json({
        success:false,
        message : "Something went wrong"
    })
   }

}


const isFileSupported = async (fileType,supportedFiles)=>{
    return supportedFiles.includes(fileType)
}


// const fileUploadToCloudinary = async (file,folder)=>{
//     const options = {folder};



//     try {
//         // console.log("file.tempFilePath,options")
//         // console.log(file.tempFilePath,options)
//         options.resource_type = "auto"
//         const result = await cloudinary.uploader.upload(file.tempFilePath, options);
//         return result;
//       } catch (error) {
//         console.error("Error uploading file to Cloudinary:", error);
//         throw error;
//       }
// }


const fileUploadToCloudinary = async (file,folder,quality)=>{
    const options = {folder};

    if(quality){
        options.quality = quality
    }


    try {


        options.resource_type = "auto"
        const result = await cloudinary.uploader.upload(file.tempFilePath, options);
        return result;
      } catch (error) {
        console.error("Error uploading file to Cloudinary:", error);
        throw error;
      }
}



exports.imageUpload = async (req,res) =>{

   try{
    console.log("controller")
    const {name,tags,email} = req.body;

    console.log("name,tags,email")
    console.log(name,tags,email)
    const file = req.files.imageFile;
   
    const supportedFiles = ["jpg","jpeg","png"];
   
   
    const fileType = file.name.split('.')[1].toLowerCase();
    
  
    // If file format is not supported
    if(!isFileSupported(fileType,supportedFiles))
        {
            res.status(400).json({
                success : false,
                message : "file-format not supported"
            })
        }

     

        //If file format is supported

        const response = await fileUploadToCloudinary(file,"FileUploadProject")


        const fileData = await File.create({
            name:name,
            fileUrl:response.secure_url,
            tags,
            email,
          
        })

        console.log(fileData)
        console.log("response")
        console.log(response)
        console.log( fileType)
        res.status(200).json({
            success:true,
            imageUrl : response.secure_url,
            message : "Successfully uplodaed the file on cloudinary"
        })

        
   }
   catch(error){
    
    res.status(400).json({
        success:false,
        message : "Something went wrong"
    })
   }

}



exports.vedioUpload = async (req,res) =>{
    try{

        const {name,tags,email} = req.body;
        console.log(name,email,email)

        const vedioFile = req.files.vedioFile;

        console.log(vedioFile)
        const vedioType = vedioFile.name.split('.')[1].toLowerCase();

        console.log(vedioType)
        const supportedFiles = ["mp4","mov","mkv"];

        if(!isFileSupported(vedioType,supportedFiles)){
            res.status(400).json({
                success:false,
                message:"file-type is not supported"
            })
        }

        console.log("fileformat is ok")
       const response = await fileUploadToCloudinary(vedioFile,"FileUploadProject");

       console.log("response => ")
       console.log(response)

       const fileData = await File.create({

            name : name,
            email:email,
            fileUrl : response.secure_url,
            tags:tags
       })

       res.status(200).json({
        success:true,
        vedioUrl : response.secure_url,
        message:"Vedio uploaded to cloudinary successfully"
       })

    }
    catch(error){

        res.status(400).json({
            success : false,
            message: "error occured",
            data : error
        })

    }
}

exports.uploadReduceImage = async (req,res)=>{

    try{
        console.log("controller")
        const {name,tags,email} = req.body;
    
        console.log("name,tags,email")
        console.log(name,tags,email)
        const file = req.files.imageFile;
       
        const supportedFiles = ["jpg","jpeg","png"];
       
       
        const fileType = file.name.split('.')[1].toLowerCase();
        
      
        // If file format is not supported
        if(!isFileSupported(fileType,supportedFiles))
            {
                res.status(400).json({
                    success : false,
                    message : "file-format not supported"
                })
            }
    
         
    
            //If file format is supported
    
            const response = await fileUploadToCloudinary(file,"FileUploadProject",50)
    
    
            const fileData = await File.create({
                name:name,
                fileUrl:response.secure_url,
                tags,
                email,
              
            })

            res.status(200).json({
                success:true,
                imageUrl : response.secure_url,
                message : "Successfully uplodaed the file on cloudinary"
            })
    
            
       }
       catch(error){
        
        res.status(400).json({
            success:false,
            message : "Something went wrong"
        })
       }

}


