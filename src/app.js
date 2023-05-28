const express = require("express");
const mongoDB = require('./database/mongoDB')
const router = require('./web/router')

mongoDB.dbConnect()

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", router);
app.listen(8080)

module.exports = app;