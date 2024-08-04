const express = require("express");
const app = express();
require('dotenv').config();
const {dbConnection} = require('./config/db')
const {connectCloudinary} = require('./config/cloudinary')
const expressFileUpload = require('express-fileupload')
const fileuploadRoutes = require('./routes/fileUpload')

app.use(express.json());
app.use(expressFileUpload());

const port = process.env.PORT;

dbConnection();
connectCloudinary();

app.use('/api', fileuploadRoutes)


app.listen(port, (req, res) => {
    console.log("server started")
})

app.get('/', (req, res) => {
    res.send(`<h3>server is working</h3>`)
})