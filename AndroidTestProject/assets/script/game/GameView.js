cc.Class({
    extends: cc.Component,

    properties: {
        
    },
    
    onLoad: function () {

    },

    
    update: function (dt) {
         if(cc.game.gameModel.changeMainSences){
            cc.game.gameModel.changeMainSences=false;
            cc.director.loadScene('main');
        }
    },
});
