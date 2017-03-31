cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

    // use this for initialization
    onLoad: function () {

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

                break;
            case "HideBannerButton":

                break;
            case "ChangeGameButton":
                cc.game.mainModel.changeGameSences =true;

                cc.log(cc.game.mainModel.changeGameSences);
                break;
        }
        

    },
});
