var fs = require('fs');
var file_name = 'keyboard.js';
exports.keyboard = function(req, res, sosongbotUHD) {

  console.log('/keyboard logic is starting..');

  sosongbotUHD.find({menu_nm:'HOME'}, function(err, sosongbotUHD) {
    if(err) {
      return res.status(500).send({error:'no data'});
    } else {
      try{
        var rtnMsg = require('../message/rtnMsg.js');
        var btn_arr = sosongbotUHD[0].button.split(",");
        rtnMsg.keyboard.buttons = btn_arr;
        console.log('[D][' + file_name + '] return data -' + JSON.stringify(rtnMsg.keyboard));
        res.json(rtnMsg.keyboard);
      }catch(ex){
        console.log('[E][' + file_name + '] error occurs(' + ex + ')' );
        res.json(rtnMsg.keyboard);
      }
      // fs.readFile( __dirname + "/../message/keyboard.json", 'utf8',  function(err, data){
      //   if ( err) {
      //     console.log('error is ' + err);
      //   } else {
      //     try{
      //       console.log(data);
      //       // var messages = JSON.parse(data);
      //       // var m_button  = sosongbotUHD[0].button;
      //       // var marr = sosongbotUHD[0].button.split(",");
      //       // messages = {"type" : "buttons", "buttons" :  marr  };
      //       var messages =
      //       res.json(messages);
      //     }catch(except){
      //       console.log('exception is ' + except);
      //       var messages = {"type" : "text" };//todo: 에러 메시지로 수정
      //       res.json(messages);
      //     }
      //   }
      // });

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
