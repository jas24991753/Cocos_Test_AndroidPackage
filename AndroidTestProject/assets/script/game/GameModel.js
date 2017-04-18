var GameModel =cc.Class({
  
    properties: {
       
        changeMainSences:false,

        _pokerID:0,
        pokerID:{
            get:function(){
                return this._pokerID;
            },
            set:function(value){
                let id = value %100;
                switch(id){
                    case 14:
                        id=1
                        break;
                    case 15:
                        id=2
                        break;
                }
                this._pokerID = id;
                this.checkAllowClick();
            }
            

        },

        nowID:0,
        isAllowClick:false,

        point1:0,
        point2:0,
        point3:0,
        point4:0,


    },

    checkAllowClick:function(){

        if(this._pokerID == this.nowID && this._pokerID!=0){
            this.isAllowClick = true;
        }else{
            this.isAllowClick = false;
        }
    },

    resetAllPoint:function(){

        this.point1 = 0;
        this.point2 = 0;
        this.point3 = 0;
        this.point4 = 0;
    },

    clickPoint:function(num){
        cc.log("check")
        if(this.isAllowClick){
            this.isAllowClick = false;
            
            switch(num){
                case 1:
                    this.point1 ++
                    break;
                case 2:
                    this.point2 ++
                    break;
                case 3:
                    this.point3 ++
                    break;
                case 4:
                    this.point4 ++
                    break;
            }

        }else{
             switch(num){
                case 1:
                    this.point1 --
                    break;
                case 2:
                    this.point2 --
                    break;
                case 3:
                    this.point3 --
                    break;
                case 4:
                    this.point4 --
                    break;
             }
        }

    }

       
});





cc.game.gameModel = cc.game.gameModel||new GameModel();