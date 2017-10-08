<<<<<<< HEAD
/*eslint-env node, express*/
/**
* Created by http://myeonguni.com on 2016-09-02.
*/

var express = require('express');
var http = require('http');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var path = require('path');
var expressErrorHandler = require('express-error-handler');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
//var cfenv = require('cfenv');

// get the app environment from Cloud Foundry
//var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
	//var server = app.listen(appEnv.port, '0.0.0.0', function() {
	  // print a message when the server starts listening
	  //console.log("server starting on " + appEnv.url);
	//});

//port설정
app.set('port', process.env.Port || 3000);
//local용 서버기동
var httpServer = http.createServer(app);
httpServer.listen(app.get('port'), function() {
	// print a message when the server starts listening
	console.log('server starting on localhost');
});
httpServer.on('error',function(err){
	console.log('error');
});
app.use(bodyParser.json());//body json
app.use(bodyParser.urlencoded({ extended : false }));
app.use(session({
secret: 'zhJ5Ia4X598Y6PEd2hBVeZQC8TA',
resave: false,
saveUninitialized: true
}));
//public 폴더를 정적자원 디렉토리로 지정
app.use(express.static(path.join(__dirname,'public')));

//db설정
//mongoose.connect('mongodb://sosong:sosong@aws-us-east-1-portal.26.dblayer.com:20793/admin?ssl=true');
mongoose.connect('mongodb://127.0.0.1:27017');
=======
var express  = require('express');
var mongoose = require('mongoose');

var path = require('path');

var app = express();

app.set('view engine', 'jade');
app.set('views', path.join(__dirname, '/views'));
app.use(express.bodyParser());

var port = process.env.PORT || 8080;

var server = app.listen(port, function() {
	console.log('server start....port=' + port);
});

//db 생성
mongoose.connect('mongodb://localhost:27017/test'); // 기본 설정에 따라 포트가 상이 할 수 있습니다.

//윤과장님이 생성한 DB
//mongoose.connect('mongodb://sosong:sosong@aws-us-east-1-portal.24.dblayer.com:20793/admin?ssl=true');   //성공

>>>>>>> c8523289a003069bb9605d3dd086f146ca3d4a9a

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
	console.log("mongo db connection OK.");

});

<<<<<<< HEAD
//error handling
//var ErrorHandler = expressErrorHandler({
//	static:{
//		'404': './public/error.html',
//		'500': './public/index.html',
//	}
//});
//app.use(expressErrorHandler.httpError(404));
//app.use(expressErrorHandler.httpError(500));
//app.use(ErrorHandler);

var k_r = require('./router/keyboard');
k_r(app,mongoose);
//keyboard routing
app.use('/keyboard', k_r);
//message routing
// app.use('/message', require('./router/message'));
=======
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
>>>>>>> c8523289a003069bb9605d3dd086f146ca3d4a9a
