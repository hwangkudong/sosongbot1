var fs = require('fs');
var file_name = 'keyboard.js';
exports.keyboard = function(req, res, sosongbot) {

  console.log('/keyboard logic is starting..');

  sosongbot.find({menu_nm:'HOME'}, function(err, sosongbotData) {
    if(err) {
      return res.status(500).send({error:'no data'});
    } else {
      try{
        var rtnMsg = require('../message/rtnMsg.js');
        var btn_arr = sosongbotData[0].button.split(",");
        rtnMsg.keyboard.buttons = btn_arr;
        console.log('[D][' + file_name + '] return data -' + JSON.stringify(rtnMsg.keyboard));

        res.json(rtnMsg.keyboard);
      }catch(ex){
        console.log('[E][' + file_name + '] error occurs(' + ex + ')' );
        res.json(rtnMsg.keyboard);
      }
    }
  });
};

exports.keyboardFromMessage = function(req, res, sosongbot) {

    var v_menu = '';

    if ( req.body['content'] === "" ) {
        v_menu = 'HOME';
    } else {
        v_menu = req.body['content'];

    }

    //console.log('선택한 메뉴 값:' + v_menu);

    sosongbot.find({menu_nm:v_menu}, function(err, sosongbotData) {

      if(err) {
        return res.status(500).send({error:'no data'});
      } else {

        //console.log('버튼:' + sosongbotData[0].button);
        //console.log('내용:' + sosongbotData[0].content);

        fs.readFile( __dirname + "/../message/msgkeyboard.json", 'utf8',  function(err, data){

          if ( err) {

          } else {

            var messages = JSON.parse(data);

            var m_button  = sosongbotData[0].button;
            messages["message"] = {"text" : sosongbotData[0].content };
            var marr = sosongbotData[0].button.split(",");
            messages["keyboard"] = {"type" : "buttons", "buttons" :  marr  };

            res.json(messages);
          }
        });
      }
    });
}
