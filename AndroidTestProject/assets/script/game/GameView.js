const Audio =require('Audio');
cc.Class({
    extends: cc.Component,

    properties: {
        
        pokerIDView:cc.Label,
        nowIDView:cc.Label,
        checkView:cc.Label,
        p1PointView:cc.Label,
        p2PointView:cc.Label,
        p3PointView:cc.Label,
        p4PointView:cc.Label,

    },
    
    onLoad: function () {

    },

   

    
    update: function (dt) {
        
        if(cc.game.gameModel.changeMainSences){
            cc.game.gameModel.changeMainSences=false;
            cc.director.loadScene('main');
        }
        
        if(this.pokerIDView){
            this.pokerIDView.string = cc.game.gameModel.pokerID
        }
       
        if(this.nowIDView){            
            this.nowIDView.string = cc.game.gameModel.nowID   
            
        }
        

         if(this.checkView){
            if(cc.game.gameModel.isAllowClick){
                this.checkView.string = "True";
            }else{
                this.checkView.string = "False";
            }
            
        }

        if(this.p1PointView){
            this.p1PointView.string = cc.game.gameModel.point1
        }
         if(this.p2PointView){
            this.p2PointView.string = cc.game.gameModel.point2
        }
         if(this.p3PointView){
            this.p3PointView.string = cc.game.gameModel.point3
        }
         if(this.p4PointView){
            this.p4PointView.string = cc.game.gameModel.point4
        }



    },

   



});
