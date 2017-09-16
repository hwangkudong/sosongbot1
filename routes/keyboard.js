var fs = require('fs');

exports.keyboard = function(req, res, sosongbotUHD) {

    console.log('keyboard.js..............................');

    sosongbotUHD.find({menu_nm:'HOME'}, function(err, sosongbotUHD) {
     
      if(err) {
        return res.status(500).send({error:'no data'});
      } else {

        fs.readFile( __dirname + "/../message/keyboard.json", 'utf8',  function(err, data){
          
          if ( err) { 
            
          } else {

            var messages = JSON.parse(data);
            var m_button  = sosongbotUHD[0].button;
            var marr = sosongbotUHD[0].button.split(",");
            messages = {"type" : "buttons", "buttons" :  marr  };
            res.json(messages);

          }
        });       
      }
    }); 
};

exports.keyboardFromMessage = function(req, res, sosongbotUHD) {

    var v_menu = '';
    
    if ( req.body['content'] === "" ) {
        v_menu = 'HOME';
    } else {
        v_menu = req.body['content'];
        
    }
    
    //console.log('선택한 메뉴 값:' + v_menu);
    
    sosongbotUHD.find({menu_nm:v_menu}, function(err, sosongbotUHD) {
     
      if(err) {
        return res.status(500).send({error:'no data'});
      } else {

        //console.log('버튼:' + sosongbotUHD[0].button);
        //console.log('내용:' + sosongbotUHD[0].content);

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
      }
    });
}
  

