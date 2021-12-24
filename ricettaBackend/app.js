require('dotenv').config();

const express = require("express");

const path = require("path");


const parseUrl = express.urlencoded({
    extended: false
});

const parseJson = express.json({
    extended: false
});


const fileUpload = require("express-fileupload");

const cors = require("cors");

const bodyParser = require("body-parser");

require("./database/dbconnect");

const app = express();

app.use(cors());

app.use(fileUpload());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json())

app.use(express.json());


const router = require("./router.js");

const userrouter = require("./userrouter.js");

app.use(router);

app.use(userrouter);

console.log(path.join(__dirname, 'public', 'images'));

app.use(express.static(path.join(__dirname, 'public', 'images')));

const port = process.env.PORT || 8000;

app.listen(port, (error) => {
    if (error !== null) {
        console.log("server started ...");
    } else {
        console.log("error occured while starting the server");
    }
});