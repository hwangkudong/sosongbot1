var multer = require('multer');
var upload = multer({ dest: 'uploads/' });

var path = process.cwd();
var sosongbot    = require(path + '/models/sosongbot');
var sosongbotUHD = require(path + '/models/sosongbotUHD');
var top_menu = '';
var sub_menu = [];


module.exports = function(app) {
  
  var util = require(path + '/util/util.js');
  var message = require(path + '/routes/message.js');
  var keyboard = require(path + '/routes/keyboard.js');

  app.get('/keyboard', function(req, res) {

    keyboard.keyboard(req, res, sosongbotUHD);
    return;

  });

  app.post('/message', function(req, res) {
    
    console.log("==>" + req.body['content']);

    if ( req.body['content'] === '사이버 소송 도우미' || req.body['content'] === '지능형 UHD' ) {
      top_menu = req.body['content'];
      
      sub_menu.clear;
      
      sub_menu[0] = 'HOME';
      sub_menu[sub_menu.length] = req.body['content'];
      
    } else {

      if ( req.body['content'] === '이전 메뉴' ) {
       
        sub_menu.splice(sub_menu.length-1, 1);

      } else {
        sub_menu[sub_menu.length] = req.body['content'];
      }
    }

    req.body['content'] = sub_menu[sub_menu.length-1];    

    console.log('메뉴0==================>' + top_menu );
    console.log('메뉴1==================>' + req.body['type'] );
    console.log('메뉴2==================>' + req.body['content'] );
    
    if ( top_menu === '지능형 UHD' && req.body['content'] === '홈' ) {
      top_menu = '사이버 소송 도우미';
      req.body['content'] = 'HOME';
    }
    
    console.log('메뉴01==================>' + top_menu );
    console.log('메뉴11==================>' + req.body['type'] );
    console.log('메뉴21==================>' + req.body['content'] );
    
    if ( top_menu === '사이버 소송 도우미' ) {
      keyboard.keyboardFromMessage(req, res, sosongbotUHD);
      
    } else {
      message.message(req, res, sosongbot, sosongbotUHD);
      
    }
    
    return;
    
  });






















  app.get('/admin', function(req, res) {
    res.render('index',  { title: '관리자'} );
  });
  
  
  app.post('/admin', function(req, res) {
    
    if ( req.body.admin_menu === 'insert_data' ) {

      util.create_sosongbot_data();
      util.create_sosongbotuhd_data();

      res.render('index',  { title: '데이더등록성공'} );
    
      
    } else if ( req.body.admin_menu === 'del_uhd' ) {
      console.log('소송도우미 데이터 지우기');
      res.render('index',  { title: '소송도우미 데이터 지우기 성공'} );
      
    } else if ( req.body.admin_menu === 'del_intel' ) {
      util.delete_sosongbot_data();
      res.render('index',  { title: '지능형 uhd 데이터 지우기'} );
    
    } else if ( req.body.admin_menu === 'upload_data_file' ) {
      console.log('upload_data_file');
      res.render('upload');
    }
  });
  
  
  app.post('/upload', upload.single('userfile'), function(req, res){
    
    console.log('file upload!!!!');
    console.log(req);
    res.send('Uploaded! : '+ req.file); // object를 리턴함
    console.log('debug:' + req.file);   // 콘솔(터미널)을 통해서 req.file Object 내용 확인 가능.

  });
  

  //메뉴로 조회했을때
  app.get('/home', function(req, res) {
    res.send('Welcome home');
  });  


  //메뉴로 조회했을때
  app.get('/', function(req, res) {
    
    console.log('start');
    res.send('Welcome');

  });
}