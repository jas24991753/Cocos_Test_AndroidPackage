const PokerView = require("PokerView")
var MedPoker = cc.Class({
    extends: cc.Component,

    properties: {
       
        _pokerLabel:[cc.String],
        
        _washLabel:[cc.String],

        _pokerView:cc.Node,

        isDeal:false,

        index:0,

        nowIndex:0,
    },

   
    onLoad: function () {
        
        this._pokerView =this.node.getComponentInChildren("PokerView");
        
        this._pokerLabel = this._pokerView.pokerLabel;
        
        this.washPoker();

        // this._pokerView.pokerID = '112';
        // this.showPoker();
    },

    
    update: function (dt) {
        
        // this._pokerView.pokerID = '215';
        // if(this.isDeal){


        // }

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
        this._washLabel = this.shuffle(this._pokerLabel.slice(1,this._pokerLabel.length));
        this._washLabel.unshift('600');
    },

    showPoker:function(){

        this.index = 0;
        this.nowIndex = 0;
        for(var i =0; i<this._washLabel.length;i++){
            this.node.runAction(
                cc.sequence(
                    cc.delayTime(i*(2*Math.random())),
                    cc.callFunc(function () {                    
                        
                        if(this.index>0 &&this.nowIndex%14 == 0) this.nowIndex = 1;
                        cc.game.gameModel.nowID = this.nowIndex++;
                        this._pokerView.pokerID=this._washLabel[this.index++];
                        cc.game.gameModel.pokerID = this._pokerView.pokerID;

                    }, this)
                    
                )
            )

        }
        

    },

    toggleStart:function(){

        if(this.isDeal){
            this.isDeal = false;
            this.node.stopAllActions();
        }else{
            this.isDeal = true
            this.showPoker();
        }

    }


});
