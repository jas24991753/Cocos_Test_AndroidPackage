cc.Class({
    extends: cc.Component,

    properties: {
        
        countLabel:cc.Label,
        
        adMobLabel:{
            default:null,
            type:cc.Label,
        }

    },

    // use this for initialization
    onLoad: function () {
        
        
        this.admobInit();
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        // 
        
        this.countLabel.string = cc.game.gameModel.contentNumber;
    },

    check_plugin:function(){
        if('undefined' == typeof(sdkbox)){
            cc.log('sdkbox is undefined');
            return false;
        }
        if('undefined' == typeof(sdkbox.PluginAdMob)){
            cc.log('sdkbox.PluginAdMob is undefined');
            return false;
        }

        return true;

    },

    showInfo:function(text){
        console.log(text);
        if(this.adMobLabel){
            var lines = this.adMobLabel.string.split('\n');
            var t = '';
            if(lines.length >0){
                t = lines[lines.length-1]+'\n';
            }
            t +=text;
            this.adMobLabel.string = t;

        }


    },

    admobInit:function(){

        if(!this.check_plugin()){
            return
        }

        // cc.log('sdkbox ', sdkbox);

        let self = this
        sdkbox.PluginAdMob.setListener({
            adViewDidReceiveAd: function(name){
                self.showInfo('adViewDidReceiveAd name=' +name);
            },
            adViewDidFailToReceiveAdWithError: function(name,msg){
                self.showInfo('adViewDidFailToReceiveAdWithError name=' + name +' msg='+msg);
            },
            adViewWillPresentScreen: function(name){
                self.showInfo('adViewWillPresentScreen name=' + name);                
            },
            adViewDidDismissScreen: function(name){
                self.showInfo('adViewDidDismissScreen name=' + name);                
            },
            adViewWillDismissScreen: function(name){
                self.showInfo('adViewWillDismissScreen=' +name);                
            },
            adViewWillLeaveApplication: function(name){
                self.showInfo('adViewWillLeaveApplication=' +name);
            }

        });
        sdkbox.PluginAdMob.init();

        // just for test
        let plugin = sdkbox.PluginAdMob
        if ("undefined" != typeof(plugin.deviceid) && plugin.deviceid.length > 0) {
            this.showInfo('deviceid=' + plugin.deviceid);
            // plugin.setTestDevices(plugin.deviceid);
        }

    },

    showBanner: function(){
        if(!this.check_plugin()){
            return
        }

        sdkbox.PluginAdMob.show('home');
    },

    hideBanner: function(){
        if(!this.check_plugin()){
            return
        }

        sdkbox.PluginAdMob.hide('home');


    },

    





});
