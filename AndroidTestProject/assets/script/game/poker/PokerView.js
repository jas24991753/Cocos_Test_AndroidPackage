cc.Class({
    extends: cc.Component,

    properties: {
        _pokerID:"",
        pokerID:{
            get:function(){
                return this._pokerID;
            },
            set:function(value){
                this._pokerID = value;
                this._pokerIndex = this.pokerLabel.indexOf(this._pokerID);
                cc.log("ID _pokerIndex",this._pokerIndex);
                this._updatePoker(); 
            }
        },
        
        _pokerIndex:0,
        pokerIndex:{
            get:function(){
                return this._pokerIndex;
            },
            set:function(value){
                this._pokerIndex = value;
                this._pokerID = this.pokerLabel[this._pokerIndex];
                this._updatePoker();
            }
        },

       _pokerSpriteNode:cc.Node,
        pokerLabel:[cc.String],
        pokerShow:[cc.SpriteFrame],

    },

    
    onLoad: function () {
        // this._pokerSpriteNode = this.node.getChildByName('ShowCard');

        this.pokerIndex = 0;
        // this._updatePoker();
    },

    // update: function (dt) {

    // },

    randomPoker:function(){
        this._pokerIndex = this.getRandomInt(0,this.pokerLabel.length);
    },

    _getRandomInt:function(min,max){
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random()*(max-min)+min);
    },

    _updatePoker:function(){
        this._pokerSpriteNode = this.node.getChildByName('ShowCard');
        let sprite = this._pokerSpriteNode.getComponent(cc.Sprite);

        sprite.spriteFrame = this.pokerShow[this._pokerIndex];
        cc.log("更新 ",sprite);
    }
    
});


/*
		public static int  HEART_3 = 103;
		public static int  HEART_4 = 104;
		public static int  HEART_5 = 105;
		public static int  HEART_6 = 106;
		public static int  HEART_7 = 107;
		public static int  HEART_8	= 108;
		public static int  HEART_9 = 109;
		public static int  HEART_10 = 110;
		public static int  HEART_J = 111;
		public static int  HEART_Q = 112;
		public static int  HEART_K = 113;
		public static int  HEART_A = 114;
		public static int  HEART_2 = 115;
		
		public static int  SPADE_3 = 203;
		public static int  SPADE_4 = 204;
		public static int  SPADE_5 = 205;
		public static int  SPADE_6 = 206;
		public static int  SPADE_7 = 207;
		public static int  SPADE_8	= 208;
		public static int  SPADE_9 = 209;
		public static int  SPADE_10 = 210;
		public static int  SPADE_J = 211;
		public static int  SPADE_Q = 212;
		public static int  SPADE_K = 213;
		public static int  SPADE_A = 214;
		public static int  SPADE_2 = 215;
		
		public static int  CLUB_3 = 303;
		public static int  CLUB_4 = 304;
		public static int  CLUB_5 = 305;
		public static int  CLUB_6 = 306;
		public static int  CLUB_7 = 307;
		public static int  CLUB_8 = 308;
		public static int  CLUB_9 = 309;
		public static int  CLUB_10 = 310;
		public static int  CLUB_J = 311;
		public static int  CLUB_Q = 312;
		public static int  CLUB_K = 313;
		public static int  CLUB_A = 314;
		public static int  CLUB_2 = 315;
		
		public static int  DIAMOND_3 = 403;
		public static int  DIAMOND_4 = 404;
		public static int  DIAMOND_5 = 405;
		public static int  DIAMOND_6 = 406;
		public static int  DIAMOND_7 = 407;
		public static int  DIAMOND_8 = 408;
		public static int  DIAMOND_9 = 409;
		public static int  DIAMOND_10 = 410;
		public static int  DIAMOND_J = 411;
		public static int  DIAMOND_Q = 412;
		public static int  DIAMOND_K = 413;
		public static int  DIAMOND_A = 414;
		public static int  DIAMOND_2 = 415;
		
		
		public static int  JOKER_SMALL = 500;
		public static int  JOKER_BIG = 501;

        public static int  Back = 600
	*/