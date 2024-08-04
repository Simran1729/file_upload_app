const mongoose = require('mongoose');
const nodemailer = require('../config/nodemailer')

const fileSchema = new mongoose.Schema( {
    name : {
        type : String, 
        required : true
    },
    fileUrl : {
        type : String
    },
    tags : {
        type : String
    },
    email : {
        type : String
    }
})


fileSchema.post("save", async (doc) => {
    try{


        //connect to nodemailer
        let transporter = nodemailer.nodemailerConnect();

        //send email
        let info = await transporter.sendMail({
            from : 'simran-express-server',
            to : doc.email,
            subject : "New file has been uploaded",
            html : `<h2>Hello ${doc.name}</h2>
                    <p>File has been uploaded successfully</p>
                    Your can view your uploaded file here : <a href = "${doc.fileUrl}">View uploaded file</a>`
        })


    } catch (err){
        console.log("error occured : ", err)
    }
}

)

  module.exports = mongoose.model("FILE", fileSchema);