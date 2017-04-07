const Symbol = require('SlotSymbol');


// cc.game.reelState = cc.game.reelState || new ReelState();

var SlotReel = cc.Class({
    extends: cc.Component,

    properties: {
        _spinBegin: false,
        _spinning: false,
        _stopping: false,

        _stopBegin: false,
        _spinStop: false,
        _spinSpeed: 50,

        // _isWildAnimePlay:false,
    },

    // use this for initialization
    onLoad: function () {

        this._fsm();

        let layout = this.getComponentInChildren(cc.Layout);
        this._spinSpeed = 40;
        this._scroller = layout.node;
        this._scroller.y = this.node.height - this._scroller.height;

        this._symbols = this.getComponentsInChildren(Symbol);
        

        // this._allWildNode = this.node.getChildByName("_ALLWILD"); 

        // this._allWildAnime = this._allWildNode.getComponent(cc.Animation);
        // this._wildAnimeClicps = this._allWildAnime.getClips();
        // this._allWildAnime.on('finished' , this._onFinished , this);
    },


    update: function (dt) {

        // if(cc.game.gameModel.slotIsSpin){
        //     this.startSpin();
        //     cc.game.gameModel.slotIsSpin=false;
        //     reelState.spin();
        //     // cc.log('reelState : ',reelState);
        // }

        let doRespin = Math.abs(this._scroller.y - this._spinSpeed) >= this.node.height;
        if (this._spinning && doRespin) {
            this._swapSymbol([6, 7, 8], [3, 4, 5], true);
            // cc.log('SlotReel update doRespin');
        }
        //準備開始
        if (this._spinning) {
            this._scroller.y = (this._scroller.y - this._spinSpeed) % this.node.height;
            // cc.log('SlotReel update _spinning');
        }
    },

    _swapSymbol: function (aIndexs, bIndexs, randomNext = false) {
        for (let i = 0; i < aIndexs.length; i++) {
            let aIndex = aIndexs[i], bIndex = bIndexs[i];
            this._symbols[aIndex].symbolIndex = this._symbols[bIndex].symbolIndex;
            if (randomNext) this._symbols[bIndex].randomSymbol();
        }
    },

    // _switchSymbolBlur:function(flag){
    //     this._symbols.forEach(function(symbol){
    //         symbol.blur = flag;
    //     },this);
    // },

    _getRandomInt: function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    },

    setSpinResult: function (symbolIDs) {
        for (let i = 0; i < symbolIDs.length; i++) {
            this._symbols[i].symbolID = symbolIDs[i];
        }
    },

    // playSymbolAnimation:function(count){        
    //     if(!this._isWildAnimePlay){
    //         for(let i =0 ; i<this._symbols.length;i++){
    //             if(count & 1<<i){
    //                 this._symbols[i].playAnimation();
    //             }
    //         }
    //     }else{
    //         for(let i =0 ; i<this._symbols.length;i++){
    //             this._symbols[i].symbolID="";

    //         }
    //     }

    // },

    // stopSymbolAnimation:function(){
    //     for(let i = 0;i<this._symbols.length;i++){
    //         this._symbols[i].stopAnimation();
    //     }
    // },

    startSpin: function () {
        cc.log('SlotReel startSpin');
        this._spinBegin = true;
        this._scroller.y = 0;
        this._swapSymbol([6, 7, 8], [0, 1, 2], true);

        // this._spinning = true;
        TweenMax.to(this._scroller, 0.5, {
            y: -this.node.height,
            ease: Back.easeIn.config(1.4),
            onComplete: function () {
                this._spinning = true;
                this.node.emit('REEL_SPIN', this);
                // this._switchSymbolBlur(true);
            },
            onCompleteScope: this
        });

        // this.scheduleOnce(function () {
        //     this.stopSpin();
        // }, 1.5);
    },

    stopSpin: function () {
        cc.log('SlotReel stopSpin');
        this._spinning = false;
        // this._switchSymbolBlur(false);
        this._scroller.y = - this.node.height;

        // this._spinBegin = false;

        // Audio.playSound('SpinStop');

        TweenMax.to(this._scroller, 0.45, {
            y: this.node.height - this._scroller.height,
            ease: Back.easeOut.config(1),
            onComplete: function () {
                this._spinBegin = false;
                this._spinning = false;
                this.node.emit('REEL_STOP', this);
            },
            onCompleteScope: this
        });
    },


    startOrStop: function () {
        if (!this._spinBegin) {
            this.startSpin();
        } else {
            this.stopSpin();
        }


    },

    

});

StateMachine.factory(SlotReel, {
    init: 'ready',
    transitions: [
        { name: 'spin', from: 'ready', to: 'spinning' },
        { name: 'stop', form: 'spinning', to: 'roundEnd' },
        { name: 'end', form: 'roundEnd', to: 'ready' },
    ],
    methods: {
        onSpin: function () {
            cc.log('spin');
            cc.log('state', reelState.state);
        }
    }
});
