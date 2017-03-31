cc.Class({
    extends: cc.Component,

    properties: {
       _symbolID: "",
        symbolID: {
            get: function () {
                return this._symbolID;
            },
            set: function (value) {
                this._symbolID = value;
                this._symbolIndex = this.symbolLabel.indexOf(this._symbolID);
                this._updateSymbol();
            }
        },

         _symbolIndex: 0,
        symbolIndex: {
            get: function () {
                return this._symbolIndex;
            },
            set: function (value) {
                this._symbolIndex = value;
                this._symbolID = this.symbolLabel[this._symbolIndex];
                this._updateSymbol();
            }
        },

        // blur: {
        //     default: false,
        //     notify: function () {
        //         this._updateSymbol();
        //     }
        // },
        _symbolSpriteNode:cc.Node,
        // _symbolBorderNode:cc.Node,
        symbolLabel: [cc.String],
        symbolSpin: [cc.SpriteFrame],
        // symbolBlur: [cc.SpriteFrame],
        // symbolAnimation: [cc.AnimationClip]


    },

    // use this for initialization
    onLoad: function () {
        this._symbolSpriteNode = this.node.getChildByName('Sprint');
        // this._symbolBorderNode = this.node.getChildByName('BORDER');

        // let animation = this._symbolSpriteNode.getComponent(cc.Animation);

        // this.symbolAnimation.forEach(function(animationClip){
        //     animation.addClip(animationClip);
        // });

        this.randomSymbol();
    },

    randomSymbol: function(){
        this.symbolIndex = this._getRandomInt(0, this.symbolLabel.length);
    },

    // playAnimation:function(){
    //     let animation = this._symbolSpriteNode.getComponent(cc.Animation);
    //     animation.currentClip = this.symbolAnimation[this.symbolIndex];
    //     //cc.log('動畫名 : ',animation.currentClip);
    //     animation.play(animation.currentClip.name,0);

    //     let borderAnimation = this._symbolBorderNode.getComponent(cc.Animation);
    //     borderAnimation.play();
    // },

    // stopAnimation:function(){
    //     let animation = this._symbolSpriteNode.getComponent(cc.Animation);
    //     animation.stop();
    //     this._updateSymbol();

    //     let borderAnimation = this._symbolBorderNode.getComponent(cc.Animation);
    //     borderAnimation.stop();
    //     let borderSprite = this._symbolBorderNode.getComponent(cc.Sprite);
    //     borderSprite.spriteFrame = null;
    // },

    _getRandomInt: function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    },

    _updateSymbol: function () {
        let sprite = this._symbolSpriteNode.getComponent(cc.Sprite);
        // if (this.blur) {
        //     sprite.spriteFrame = this.symbolBlur[this.symbolIndex];
        // } else {
            sprite.spriteFrame = this.symbolSpin[this.symbolIndex];
        // }
    }

   
});
