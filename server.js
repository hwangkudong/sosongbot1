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

var db = mongoose.connection;
db.on('error', console.error.bind(console,'connection error:'));
db.once('open', function() {
	console.log("mongo db connection OK.");
});

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
