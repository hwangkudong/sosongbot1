var fs = require('fs');
var file_name = 'keyboard.js';
exports.keyboard = function(req, res, sosongbotUHD) {
  var Iconv = require('iconv').Iconv;
  var iconv = new Iconv('EUC-KR', 'UTF-8//TRANSLIT//IGNORE');

  console.log('/keyboard logic is starting..');

  sosongbotUHD.find({menu_nm:'HOME'}, function(err, sosongbotUHD) {
    if(err) {
      return res.status(500).send({error:'no data'});
    } else {
      try{
        var rtnMsg = require('../message/rtnMsg.js');
        var btn_arr = sosongbotUHD[0].button.split(",");
        btn_arr[btn_arr.length] = "테스트";
        rtnMsg.keyboard.buttons = btn_arr;
        console.log('[D][' + file_name + '] return data -' + JSON.stringify(rtnMsg.keyboard));
        iconv.convert(rtnMsg.keyboard).toString('UTF-8');
        res.json(rtnMsg.keyboard);
      }catch(ex){
        console.log('[E][' + file_name + '] error occurs(' + ex + ')' );
        res.json(rtnMsg.keyboard);
      }
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
