const express = require('express');
const app = express();
const path = require("path");
const fs = require("fs");

app.get('/', function (req,res) {
    res.header("Content-Type",'application/json');
    res.sendFile(path.join(__dirname, 'db.json'));
})

app.put('/', function (req, res) {
    console.log(req.body);
})

app.listen(3000);