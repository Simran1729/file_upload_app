const express = require("express");
const app = express();
require('dotenv').config();
const {dbConnection} = require('./config/db')

app.use(express.json());

const port = process.env.PORT;

dbConnection();

app.listen(port, (req, res) => {
    console.log("server started")
})

app.get('/', (req, res) => {
    res.send(`<h3>server is working</h3>`)
})