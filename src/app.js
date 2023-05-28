var express = require("express");
//var dbConnect = require('./database/mongoDB')
var router = require('./web/router')
const mongoDB = require('./database/mongoDB')

mongoDB.dbConnect()

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cors());

//Route Prefixes
app.use("/", router);
app.listen(8080)

module.exports = app;