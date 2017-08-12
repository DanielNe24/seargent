var express = require('express');        
var app = express();         
var bodyParser = require('body-parser');
var cors = require('cors');
var session = require('express-session')
var cookieParser = require('cookie-parser');
var port = process.env.PORT || 8443;       
var users = [];
var loggedIn = [];
var router = express.Router();  
var items = {};
items.array = [];  
var id = 0;         
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/private'));
app.use(cookieParser());

// Add headers
app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.get('/',function(req,res, next){

	console.log("User trying to access")
	var uid;
	try {
		var uid = req.cookies.login;
	} catch( ex ) {
	
	}
	var found = false;

	if ( uid ) {
		for (var i = 0; i < loggedIn.length ; i++) {

			if ( uid == loggedIn[i][2] ) {
				found = true;
				res.sendFile('private/api.html' , { root : __dirname });
			}
		}
	}

       	if (!found)
     		res.sendFile('public/hello.html' , { root : __dirname });	

});



app.get('/',function(req,res){
       
     res.sendFile('public/hello.html' , { root : __dirname });

});


app.post('/register/:username/:password', function(req, res) {

	username = req.params.username;
	password = req.params.password;

	var exist = false;
		
	for (var i = 0; i < users.length ; i++) {
		if ( users[i][0] == username ) {
			res.status("500");
			res.send("User Name already exist!");
			exist = true;
		}
	}

	if (!exist) {
    	users.push([username,password]);
    	res.status("200");
    	res.send("User has successfully been registered!");
	}

});

app.post('/login/:username/:password', function(req, res) {

	username = req.params.username;
	password = req.params.password;

	var exist = false;

	for (var i = 0; i < users.length ; i++) {
		if ( (users[i][0] == username) && (users[i][1] == password) ) {
    		let uid = guid();
    		res.cookie('login',uid, { maxAge: 3600000, httpOnly: true });
    		res.status("200");
    		res.send("User has successfully logged in!");	
    		exist = true;
    		loggedIn.push([username,password,uid]);
    		break;
		}
	}

	if (!exist) {
		res.status("500");
		res.send("User / password does not exist!");
	}

});

app.post('/item/', function(req, res) {

	var newItem = JSON.parse(JSON.stringify(req.body));
	items.array.push({ 'id': id, 'data': newItem['item'] });
	id++;
	res.status("200");
	res.send("Item was successfully added!");	

});

app.get('/items', function(req, res) {
    res.send( items ); });

app.get('/item/:id', function(req, res) {
    
    var id = req.params.id;
   	console.log(id);
    var found = false;

    for (var i = 0; i < items.array.length ; i++) {

    	if ( items.array[i]['id'] == id ) {
			res.status("200");
    		res.send(items.array[i]);	
    		found = true;
		}
	}

	if (!found) {
		res.status("404");
		res.send("Item was not found!");
	}

});


app.delete('/item/:id', function (req, res) {


	var id = req.params.id;
    var found = false;

    for (var i = 0; i < items.array.length ; i++) {

    	if ( items.array[i]['id'] == id ) {
			
    		items.array.splice(i, 1);
			res.status("200");
    		res.send("Item was deleted!");	
    		found = true;
		}
	}

	if (!found) {
		res.status("404");
		res.send("Item was not found!");
	}

});

app.put('/item/', function (req, res) {

	var updateJson = JSON.parse(JSON.stringify(req.body));
	var id = updateJson['id'];
	var newData = updateJson['newData'];
	var found = false;


	for (var i = 0; i < items.array.length ; i++) {

    	if ( items.array[i]['id'] == id ) {
    		items.array[i]['data'] = newData;
    		res.status("200");
    		res.send("Item was updated!");	
    		found = true;
    	}

    }

    if (!found) {
		res.status("404");
		res.send("Item was not found!");
	}


});

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

app.listen(port);