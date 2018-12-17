var express = require('express');
var app = express();
let client = require('./queue').client; 
var logApiCall = logApiCalls('foo',client);
var bodyParser = require('body-parser')
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var dbo = null;

MongoClient.connect(url)
.then(db=>{
	 dbo = db.db("example");
})

app.listen(3000);
app.use(bodyParser.urlencoded({ extended: true,inflate: true}));
app.use(bodyParser.json());
app.use(logApiCall);

client.subscribe('foo', function(msg) {
	let myobj = JSON.parse(msg);
	dbo.collection("logs").insertOne(myobj)
	.then(()=>{
		console.log('logs inserted successfully');
	})
	.catch((err)=>{
		console.log(err);
	})
});

function logApiCalls(queue, client){
	return function (req, res, next) {
		let body = {
			url: req.originalUrl,
            method: req.method,
            reqBody: req.body,
        	resStatusCode: res.statusCode,
		};
		let bodyStr = JSON.stringify(body)
		client.publish(queue,  bodyStr);
		next()
	  }	
}

app.get('/', function (req, res) {	
	dbo.collection("data").find({}).toArray()
	.then(result=>{
		res.send(result);
	}) 
	.catch((err)=>{
		console.log(err);
	})
})

app.get('/:name', function (req, res) {	
	let name  = req.params.name;
	dbo.collection("data").findOne({'name':name})
	.then(result=>{
		res.send(result);
	}) 
	.catch((err)=>{
		console.log(err);
	})
})

app.post('/',function (req, res) {	
	let body  = req.body;
	dbo.collection("data").insertOne(body)
	.then(result=>{
		res.send('data save successfully');
	}) 
	.catch((err)=>{
		console.log(err);
	})
})




