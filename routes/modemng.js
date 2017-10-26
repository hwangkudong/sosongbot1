function ModeMng(mode){
    this.mode = mode;
}

ModeMng.prototype.getMode = function(){
    return this.mode;
}

ModeMng.prototype.setMode = function(mode){
    ModeMng.mode = mode;
}

module.exports = new ModeMng(0);