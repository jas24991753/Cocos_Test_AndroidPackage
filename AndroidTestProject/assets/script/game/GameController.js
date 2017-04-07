const MedPoker = require('MedPoker');
cc.Class({
    extends: cc.Component,

    properties: {
        medPokerNode:cc.Node,

    },

    
    onLoad: function () {

    },

    onButtonClick:function(e){
        
        switch(e.target.name){
            case "ChangeMainButton":
                cc.game.gameModel.changeMainSences = true;
                break;
            case "StartAndStopButton":
                              
                let medPoker = this.medPokerNode.getComponent(MedPoker) 
                medPoker.toggleStart();

                break;
            case "Player1Button":
                cc.game.gameModel.clickPoint(1);
                break;
            case "Player2Button":
                cc.game.gameModel.clickPoint(2);
                break;
            case "Player3Button":
                cc.game.gameModel.clickPoint(3);
                break;
            case "Player4Button":
                cc.game.gameModel.clickPoint(4);
                break;
            
        }
        

    },

   
});
