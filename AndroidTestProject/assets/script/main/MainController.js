const MainView = require('MainView');

cc.Class({
    extends: cc.Component,

    properties: {
       _mainView:MainView,
    },

    // use this for initialization
    onLoad: function () {
        this._mainView = this.node.getComponent(MainView);
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },

    onButtonClick:function(e){
         cc.log(e.target.name);
        switch(e.target.name){
            case "PushButton":
                cc.game.mainModel.contentNumber++ ;
                cc.game.mainModel.slotIsSpin = true;
                break;
            case "ShowBannerButton":
                this._mainView.showBanner();
                break;
            case "HideBannerButton":
                this._mainView.hideBanner();
                break;
            case "ChangeGameButton":
                cc.game.mainModel.changeGameSences =true;

                cc.log(cc.game.mainModel.changeGameSences);
                break;
        }
        

    },
});
