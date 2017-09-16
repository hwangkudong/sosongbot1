var fs = require('fs');

exports.message = function(req, res, sosongbot, sosongbotUHD) {
    var v_menu = '';
    
    if ( req.body['content'] === "" ) {
        v_menu = 'HOME';
    } else {
        v_menu = req.body['content'];
        
    }
    
    console.log('선택한 메뉴 값:' + v_menu);
    sosongbotUHD.find({menu_nm:v_menu}, function(err, sosongbotUHD) {

      if(err) {
        return res.status(500).send({error:'no data'});

      } else {
        
        console.log('조회결과 : ' + sosongbotUHD.length);
        if ( sosongbotUHD.length > 0 ) {
          fs.readFile( __dirname + "/../message/msgkeyboard.json", 'utf8',  function(err, data){
          
            if ( err) { 
            
            } else {
            
              var messages = JSON.parse(data);
              var m_button  = sosongbotUHD[0].button;
              messages["message"] = {"text" : sosongbotUHD[0].content };
              var marr = sosongbotUHD[0].button.split(",");
              messages["keyboard"] = {"type" : "buttons", "buttons" :  marr  }; 
            
              res.json(messages);
            }
          });
          
        } else {
          fs.readFile( __dirname + "/../message/message.json", 'utf8',  function(err, data){
          
            if ( err) { 
            
            } else {
            
              var messages = JSON.parse(data);
              messages["message"] = {"text" : '키워드로 조회한 결과 처리하기.....' };
              res.json(messages);
            }
          });          
        }
      }
    });
};
