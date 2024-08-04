 const FILE = require('../models/file')

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

exports.imageUpload = async () => {

}

exports.imageReducerUpload = async() => {

}

exports.videoUpload = async () => {
    
}