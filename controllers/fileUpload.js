 const FILE = require('../models/file')
 const cloudinary = require('cloudinary').v2;

exports.localFileUpload = async (req, res) => {
// fetch media from clients given path and upload it on some server's path
    try{

        const file = req.files.file;
        console.log("file is : " , file)

        //on which path you want to store the file on your server
        //adding extension to it : ${file.name.split('.')[1]}
        const path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;

        console.log("path for your file is : ", path )

        file.mv(path, (err) => {
            console.log(err);
        })

        res.status(200).json({
            success : true,
            message : "file uploaded succesfully"
        })


    } catch(err){

        res.status(500).json({
            success : false,
            message : "error uploading file locally on server"
        })

    }
}

function fileTypeSupported(fileType, supportedTypes){
    return supportedTypes.includes(fileType);
}

async function uploadToCloudinary(file, folder, quality){
    const options = {folder};
    if(quality){
        options.quality = quality
    }
    options.resource_type = "auto";  
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.imageUpload = async (req, res) => {
    try{
        const {name, email, tags} = req.body;

        const file = req.files.imageFile;


        //perform validation
        const supportedTypes = ['jpeg', 'jpg', 'png'];
        const fileType = file.name.split('.')[1].toLowerCase();

        if(!fileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success : false,
                message : "file format not supported"
            });
        }

        //if file type supported upload to cloudinary
        const response = await uploadToCloudinary(file, "simranCloud");

        const fileData = await FILE.create({
            name,
            tags,
            email,
            fileUrl : response.secure_url
        })

        res.status(200).json({
            success : true,
            message : "file uploaded successfully",
            url : response.secure_url
        })

    }catch(err){
        res.status(500).json({
            success : false,
            message : "error uploading to cloudinary"
        })
    }
}

exports.imageReducerUpload = async(req, res) => {
 try{
        const {name, email, tags} = req.body;

        const file = req.files.imageFile;


        //perform validation
        const supportedTypes = ['jpeg', 'jpg', 'png'];
        const fileType = file.name.split('.')[1].toLowerCase();

        if(!fileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success : false,
                message : "file format not supported"
            });
        }

        //if file type supported upload to cloudinary
        const response = await uploadToCloudinary(file, "simranCloud", 90)

        const fileData = await FILE.create({
            name,
            tags,
            email,
            fileUrl : response.secure_url
        })

        res.status(200).json({
            success : true,
            message : "file uploaded successfully",
            url : response.secure_url
        })

    }catch(err){
        res.status(500).json({
            success : false,
            message : "error uploading to cloudinary"
        })
    }
}

exports.videoUpload = async (req, res) => {
    try{
        const {name, email, tags} = req.body;

        const file = req.files.videoFile;


        //perform validation
        const supportedTypes = ['mov', 'mp4'];
        const fileType = file.name.split('.')[1].toLowerCase();

        if(!fileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success : false,
                message : "file format not supported"
            });
        }

        //if file type supported upload to cloudinary
        const response = await uploadToCloudinary(file, "simranCloud")

        const fileData = await FILE.create({
            name,
            tags,
            email,
            fileUrl : response.secure_url
        })

        res.status(200).json({
            success : true,
            message : "file uploaded successfully",
            url : response.secure_url
        })

    }catch(err){
        res.status(500).json({
            success : false,
            message : "error uploading to cloudinary"
        })
    }
}