/**
 *'/keyboard' 경로 접근시 사용할 응답 모델 
 */


module.exports = function(mongoose){
	var MenuSchema = mongoose.Schema({
		menu_id: String,//id
		type: String,//buttons,message 등
		answer: Array//메뉴결과
	});

	var MenuModel = mongoose.model("menus",MenuSchema);
	return MenuModel;
}