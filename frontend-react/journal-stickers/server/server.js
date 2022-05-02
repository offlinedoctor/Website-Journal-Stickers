var express = require('express');
var app = express();
var bodyParser = require('body-parser');

const path = require('path');
const cors = require('cors');
const bcrypt = require('bcrypt');
const mongoose = require("mongoose");
const db = mongoose.connection;
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const Schema = mongoose.Schema;

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, "..", "public")));
//app.use(express.static("public"));

app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    resave: false
}));

//** MONGOOSE LOGIN DETAILS SCHEMA ** //
mongoose.connect("mongodb://localhost/my_database");

const LoginDetailsSchema = new Schema({
    Username: String,
    Password: String
});

LoginDetailsSchema.pre('save', function(next)
{                                              
	const user = this;	
	bcrypt.hash(user.Password, 10, (error, hash_output) =>  
	{                                                    
		user.Password = hash_output;                   
		next()                      
	})
})

const LoginDetails = mongoose.model('LoginDetails', LoginDetailsSchema);

//** MONGOOSE BLOGPOST DETAILS SCHEMA ** //
mongoose.connect("mongodb://localhost/my_database");

const BlogPostSchema = new Schema({
    blogpost: String,
    userid: String
});

const BlogPostDetails = mongoose.model('BlogPostDetails', BlogPostSchema);



//Start server on LocalHost 3001

var server = app.listen(3001, onServerStart);

function onServerStart()
{
    console.log("Server Started at LocalHost 3001");
}

//Make Login Details
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


//Check Login Details
app.post("/ConfirmLoginDetails", CheckLoginDetails);

async function CheckLoginDetails(req, res)
{
	console.log(req.session.userId);
	
	let result = await LoginDetails.findOne({Username: req.body.username});
	if (result)
	{
		console.log("Username was found.");
		bcrypt.compare(req.body.password, result.Password, (error, same) =>
		{
			if (same)
			{
				console.log('correct password');
				req.session.userId = result._id;
				res.send({Status: "Success"});
			}
			else
			{
				console.log('incorrect password');
				res.send({Status: "Not Success"});
			}
		})
	}
	else
	{
		//Use if Username did exist
		console.log("Username does not exist.");
		res.send({Status: "Success"});
	}
};

//Make Login Details
app.post("/SubmitBlogPost", functionSubmitBlogPost);

async function functionSubmitBlogPost(req, res)
{
	console.log(req.session);
	
	if (req.body.blogpost)
	{
		BlogPostDetails.create({blogpost: req.body.blogpost, userid: req.session.userId});
	}
	
	var BlogPostList = await BlogPostDetails.find({userid: req.session.userId});
	
	console.log(BlogPostList);
	
	res.send(JSON.stringify((BlogPostList)));
}
