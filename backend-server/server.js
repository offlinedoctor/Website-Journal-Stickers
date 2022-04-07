var express = require('express');
const path = require('path');
var bodyParser = require('body-parser')
var app = express();
const cors = require('cors');
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(cors());
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/my_database");
const db = mongoose.connection;

const Schema = mongoose.Schema;

const LoginDetailsSchema = new Schema({
            Username: String,
            Password: String
});

const LoginDetails = mongoose.model('LoginDetails', LoginDetailsSchema);

var server = app.listen(4000, onServerStart);

function onServerStart()
{
    console.log("Server Started at LocalHost 4000");
}

app.post("/ConfirmLoginDetails", CheckLoginDetails);

function CheckLoginDetails(req, res)
{
	LoginDetails.find({Username: req.body.username}, function (err, result)
	{
		if (!result.length)
		{
			console.log("Username does not exist.");
		}
		else
		{
			//Use if Username did exist
			console.log("Username does exist.");
		}
	})
	
	res.sendStatus(200);
};

app.post("/CreateLoginDetails", CreateLoginDetails);

function CreateLoginDetails(req, res)
{
	LoginDetails.find({Username: req.body.username}, function (err, result)
	{
		if (!result.length)
		{
			console.log("Username does not exist. Creating account.");
			LoginDetails.create({Username: req.body.username, Password: req.body.password});
		}
		else
		{
			//Use if Username did exist
			console.log("Username does exist. Cannot create account");
		}
	})
	
	res.sendStatus(200);
}