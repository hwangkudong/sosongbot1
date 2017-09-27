/**
 *'/keyboard' 경로 접근에 대한 처리
 */
module.exports = function(mongoose){
	var app = require('express');
	var router = app.Router();
	var fs = require('fs');
	var rtn_msg = '';

	router.route('/').get(function(req,res,next){
		console.log('Time:' , Date.now(), ' user_key:', req.body["user_key"]);

		try{
			fs.readFile(__dirname + '/../data/unavailable_msg.json', 'utf-8', function(err,data){
				rtn_msg = JSON.parse(data);
			});
			//1.파일에서 스키마 읽기
			var BtnModel = require("../model/button_menu")(mongoose);
			var test = new BtnModel({"menu_id":"welcome", "type":"button", "answer":["ans1","ans2"]});
			test.save(function(err,data){
				if(err)
					console.error("save error");
				if (data)
					console.log(data);
			});

			//2.DB조회
			BtnModel.find({"menu_id":"welcome"},function(err,results){
				if(err)
					console.error("welcome 조회 중 에러발생");
				else{
					if (results.length > 0)
						console.log(results);
					else
						console.log('no data');
				}
			});

			//3.결과 만들기
		}catch(exception){
			console.error(exception);
		}finally{
			res.end();
		}
	});
}
