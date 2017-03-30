cc.Class({
    extends: cc.Component,

    properties: {
       
    },

    
    onLoad: function () {

    },

    onButtonClick:function(e){
        
        switch(e.target.name){
            case "ChangeMainButton":
                cc.game.gameModel.changeMainSences = true;
                break;
            case "StartAndStopButton":

                break;
            case "Player1Button":

                break;
            case "Player2Button":

                break;
            case "Player3Button":

                break;
            case "Player4Button":

                break;
            
        }
        

    },

   
});
