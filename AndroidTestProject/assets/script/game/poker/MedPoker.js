const PokerView = require("PokerView")
cc.Class({
    extends: cc.Component,

    properties: {
       
        _pokerLabel:[cc.String],
        
        _washLabel:[cc.String],

        _pokerView:cc.Node,

        isDeal:false
    },

   
    onLoad: function () {
        
        this._pokerView =this.node.getComponentInChildren("PokerView");
        
        this._pokerLabel = this._pokerView.pokerLabel;
        
        this.washPoker();

        this._pokerView.pokerID = '112';
        // this.showPoker();
    },

    
    update: function (dt) {

        this._pokerView.pokerID = 112;
        if(this.isDeal){


        }

    },

    shuffle:function(a){
        
        for(var i=0; i<a.length;i++){
            var j = parseInt(Math.random()*a.length-1);
            var tmp = a[i];
            a[i]=a[j];
            a[j]=tmp;
        }
        return a.slice(0,a.length);
    },

    //洗牌
    washPoker:function(){
        this._washLabel = this.shuffle(this._pokerLabel.slice(1,this._pokerLabel.length));
        this._washLabel.unshift('600');
    },

    showPoker:function(){

        for(var i =0; i<this._washLabel.length;i++){
            this._pokerView.runAction(
                cc.sequence(
                    cc.delayTime(i),

                    this._pokerView.pokerID=this._washLabel[i]
                )
            )

        }
        

    }


});
