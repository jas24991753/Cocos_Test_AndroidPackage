var GameModel = cc.Class({
    // extends: cc.Component,

    properties: {
        contentNumber:0,

        slotIsSpin:false,
        // config:{
        //     MAXLINE:20,
        //     MAXBET:20,
        // },

        // system:{
        //     musicVolume:1,
        //     musiEnable:true,
        //     soundVolume:1,
        //     soundEnable:true
        // },

        // jackpot:{
        //     grand:0,
        //     major:0,
        //     minor:0,
        //     mini:0  
        // },

        // account:{
        //     username:'guest',
        //     balance:99999
        // },

        // info:{
        //     bets:1,
        //     lines:1,
        //     rate:1,
        //     rateIndex:0,
        //     rateValue:[0.01,0.02,0.05,0.1,0.25,0.5,1,2,4,10,20,50,100],
        //     totalBet:function(){
        //         return this.info.lines * this.info.bets *this.info.rate
        //     },
        //     auto:false
        // },

        // slot:[
        //     ['S1','S2','S3'],
        //     ['S1','S2','S3'],
        //     ['S1','S2','S3'],
        //     ['S1','S2','S3'],
        //     ['S1','S2','S3']
        // ],

        // award:{
        //     win:0
        // },

    },

   
});

cc.game.gameModel = cc.game.gameModel||new GameModel();

// const TweenMax = require('TweenMax');

// cc.game.TweenMax = cc.game.TweenMax || new TweenMax();
