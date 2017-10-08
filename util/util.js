var path = process.cwd();
  
var sosongbot       = require(path + '/models/sosongbot');
var sosongbotuhd    = require(path + '/models/sosongbotUHD');

exports.delete_sosongbotuhd_data = function() {

}

exports.delete_sosongbot_data = function() {

}
  
exports.create_sosongbot_data = function() {

  var fs       = require('fs');    
  var jsonFile = require('jsonfile');


  //파일에 있는 데이터 정보를 읽어서 기본 데이터 등록하기
  fs.exists(path + '/models/data/sosongbot_data.json', function(exists) {
 		if (!exists) {
			console.log('데이터 파일이 존재하지 않습니다.');
		}

		jsonFile.readFile(path + '/models/data/sosongbot_data.json', function(err, jsonData) {
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
					} else {
						console.log('새로운 정보가 없습니다.');
					}
				}
			}
		});
  });  
};


exports.create_sosongbotuhd_data = function() {
    
    
  var fs       = require('fs');    
  var jsonFile = require('jsonfile');
  
  

  //파일에 있는 데이터 정보를 읽어서 기본 데이터 등록하기
  fs.exists(path + '/models/data/sosongbotUHD_data.json', function(exists) {
 		if (!exists) {
			console.log('UHD 데이터 파일이 존재하지 않습니다.');
		}

		jsonFile.readFile(path + '/models/data/sosongbotUHD_data.json', function(err, jsonData) {
			if (err) {
				console.log('UHD 데이터 파일 읽는 중 오류 발생');
				throw err;
			
			} else {
			
				for ( var i = 0 ; i < jsonData.length; i++ ) {

					if ( jsonData[i].isnew === true ) {
						var sosongbotdata = new sosongbotuhd({menu_nm:jsonData[i].menu_nm, content:jsonData[i].content, button:jsonData[i].button });
	
    					sosongbotdata.save(function(err){
    						if(err){
        						console.error(err);
            					return;
        					} else {
        						console.log('uhd help data insert success');
    						}
    					});
					}
				}
			}
		});
  });  
};