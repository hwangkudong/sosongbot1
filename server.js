var express  = require('express');
var mongoose = require('mongoose');

var path = require('path');

var app = express();

var bodyParser = require("body-parser");

app.set('view engine', 'jade');
app.set('views', path.join(__dirname, '/views'));
app.use(bodyParser.urlencoded( { extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var server = app.listen(port, function() {
	console.log('server start....port=' + port);
});

var MongoClient = require("mongodb").MongoClient;
var cfenv = require('cfenv');
var appenv = cfenv.getAppEnv();
var services = appenv.services;
var mongoDbUrl, mongoDbOptions = {};
var mongodb_services = services["compose-for-mongodb"];
var mongoDbCredentials = mongodb_services[0].credentials;
console.log("mongoDbCredentials" + mongoDbCredentials);
if (mongoDbCredentials) {
    var ca = [new Buffer(mongoDbCredentials.ca_certificate_base64, 'base64')];
    mongoDbUrl = mongoDbCredentials.uri;
    mongoDbOptions = {
        mongos: {
            ssl: true,
            sslValidate: true,
            sslCA: ca,
            poolSize: 1,
            reconnectTries: 1
        }
    };
} else if (process.env.MONGODB_URL) {
    mongoDbUrl = process.env.MONGODB_URL;
} else {
    console.error("No MongoDB connection configured!");
}

console.log("Connecting to", mongoDbUrl);

var db = mongoose.connect(mongoDbUrl, mongoDbOptions);
//db.on('error', console.error.bind(console, 'connection error:'));
//db.on('open', function callback () {
//	console.log("mongo db connection OK.");
//
//});


//var mongoDbCredentials = appenv.getServiceCreds("sosongDB") || appenv.services["compose-for-mongodb"][0].credentials;

//db 생성
//mongoose.connect('mongodb://localhost:27017/test'); // 기본 설정에 따라 포트가 상이 할 수 있습니다.
//mongoose.connect('mongodb://admin:XWTVXDJYPYWKZVHR@sl-us-south-1-portal.8.dblayer.com:23338,sl-us-south-1-portal.7.dblayer.com:23338/admin?ssl=true'); // 기본 설정에 따라 포트가 상이 할 수 있습니다.

//윤과장님이 생성한 DB
//mongoose.connect('mongodb://sosong:sosong@aws-us-east-1-portal.24.dblayer.com:20793/admin?ssl=true');   //성공
//bluemix
//mongodb://admin:XWTVXDJYPYWKZVHR@sl-us-south-1-portal.8.dblayer.com:23338,sl-us-south-1-portal.7.dblayer.com:23338/admin?ssl=true


//var db = mongoose.connection;

//db.on('error', console.error.bind(console, 'connection error:'));
//db.on('open', function callback () {
//	console.log("mongo db connection OK.");
//
//});

var router = require('./routes')(app);

/*
var sosongbot    = require('./models/sosongbot');
var sosongbotUHD = require('./models/sosongbotUHD');

var router = require('./routes')(app, sosongbot, sosongbotUHD);
//파일에 있는 데이터 정보를 읽어서 기본 데이터 등록하기
fs.exists('./models/data.json', function(exists) {
	if (!exists) {
		console.log('데이터 파일이 존재하지 않습니다.');
	}
	jsonFile.readFile('./models/data.json', function(err, jsonData) {
		if (err) {
			console.log('데이터 파일 읽는 중 오류 발생');
			throw err;

		} else {

			for ( var i = 0 ; i < jsonData.length; i++ ) {
				if ( jsonData[i].isnew === true ) {
					var sosongbotdata = new sosongbot({keyword:jsonData[i].keyword, answer:jsonData[i].answer});

    				sosongbotdata.save(function(err){
    					if(err){
        					console.error(err);
            				return;
        				} else {
        					console.log('data insert success');
    					}
    				});
				}
			}
		}
	});
});
var router = require('./routes')(app, sosongbot);
*/
