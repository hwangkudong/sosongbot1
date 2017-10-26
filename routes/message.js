var fs = require('fs');
var qnaMode = 0; //0일떄는 질문, 1일때는 답변 모드

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
          fs.readFile( __dirname + "/../message/message.json", 'utf8',  function(err, data){
          
            if ( err) { 
            
            } else {
            
              var messages = JSON.parse(data);
              //var m_button  = sosongbotUHD[0].button;
              messages["message"] = {"text" : sosongbotUHD[0].content };
              //var marr = sosongbotUHD[0].button.split(",");
              //messages["keyboard"] = {"type" : "buttons", "buttons" :  marr  }; 
            
              res.json(messages);
            }
          });
          
        } else { //직접 입력하여 소송UHD NLC 타는 부분
          fs.readFile( __dirname + "/../message/msgkeyboard.json", 'utf8',  function(err, data){
          
            if ( err) { 
            
            } else {
              
              if(qnaMode === 0){
              //WATSON API 접속 셋팅
              var watson = require('watson-developer-cloud');
              var natural_language_classifier = watson.natural_language_classifier({
                  username: '3119f86c-0463-4fc1-81fa-4778e3e0a696',
			      password: 'w2GnpGlIHd2H',
			      version: 'v1'
			  });
                
              var inputText =  req.body["content"]; //입력된 문자
			  console.log( '입력된 질문 : ' + inputText);
                
               natural_language_classifier.classify({
				  text: inputText,
				  classifier_id: 'bbb1c7x227-nlc-12402' },
				  function(err, response) {
				    if (err)
				      console.log('error:', err);
				    else{
					      
				      var result1 = JSON.stringify(response, null, 2);
				      var result2 = JSON.parse(result1);
	         	      var result3 = result2.classes;
                      var messages = JSON.parse(data);
                      console.log("messages : " + messages);
                      messages["message"] = {"text" : result2.text + "에 대하여 질문하셨네요. 아래 항목중 가장 유사한 질문을 고르시고 답변을 확인해 보세요."};
                      messages["keyboard"] = {"type" : "buttons", "buttons" : [result3[0].class_name, result3[1].class_name, result3[2].class_name] };
                      res.json(messages);
                      qnaMode = 1; //답변 모드로 전환
				      }
			         });
              }
              else if(qnaMode === 1){
                  qnaMode = 0;
              }
            }
          });          
        }
      }
    });
};
