const Audio =require('Audio');
const PokerView = require("PokerView")
var MedPoker = cc.Class({
    extends: cc.Component,

    properties: {
       
        _pokerLabel:[cc.String],
        
        _washLabel:[cc.String],

        _pokerView:cc.Node,

        _twoPokerArray:[cc.String],

        _finalArray:[cc.String],

        isDeal:false,

        index:0,

        nowIndex:0,
    },

   
    onLoad: function () {
        
        this._pokerView =this.node.getComponentInChildren("PokerView");
        
        this._twoPokerArray=this._pokerView.pokerLabel.slice(1,this._pokerView.pokerLabel.length);        

        this._pokerLabel = this._pokerView.pokerLabel;         

        this._finalArray = this._pokerLabel.concat(this._twoPokerArray);

        // cc.log(this._finalArray);
        

        this.washPoker();

       
    },

    
    update: function (dt) {
        
        
        
    },

    shuffle:function(card){
        
        for(var i=0; i<card.length;i++){
            var j = parseInt(Math.random()*card.length-1);
            var tmp = card[i];
            card[i]=card[j];
            card[j]=tmp;
        }
        return card.slice(0,card.length);
    },

    //洗牌
    washPoker:function(){
        this._washLabel = this.shuffle(this._finalArray.slice(1,this._finalArray.length));
        this._washLabel.unshift('600');
    },

    startShowPoker:function(){

        this.index = 0;
        this.nowIndex = 0;
        let n = 0;
        for(var i =0; i<this._washLabel.length;i++){
            this.node.runAction(
                cc.sequence(
                    cc.delayTime(i*1.5+(n+=Math.random())),
                    cc.callFunc(function () {                    
                        
                        if(this.index>0 &&this.nowIndex%14 == 0) this.nowIndex = 1;
                        cc.game.gameModel.nowID = this.nowIndex++;
                        this._pokerView.pokerID=this._washLabel[this.index++];
                        cc.game.gameModel.pokerID = this._pokerView.pokerID;
                        this.audioPlay(cc.game.gameModel.nowID);
                    }, this)
                    
                )
            )

        }
        

    },

    audioPlay:function(num){
        let name ='poker'+num.toString();

        Audio.playSound(name);


    },

    toggleStart:function(){

        if(this.isDeal){
            this.isDeal = false;
            this.node.stopAllActions();
        }else{
            this.isDeal = true
            cc.game.gameModel.resetAllPoint();
            this.washPoker();
            this.startShowPoker();
        }

    }


});
