var UserController = cc.Class.extend({

    ctor: function (gameClient) {
        this.gameClient = gameClient;
    },

    sendGetUserInfo: function() {
        cc.log("sendGetUserInfo");
        let pk = this.gameClient.getOutPacket(CmdSendUserInfo);
        pk.pack();
        this.gameClient.sendPacket(pk);
    },

    sendChangeSkin: function(skinIndex) {
        cc.log("sendChangeSkin: " + skinIndex);
        let pk = this.gameClient.getOutPacket(CmdSendChangeSkin);
        pk.pack(skinIndex);
        this.gameClient.sendPacket(pk);
    },

    sendBuySkin: function(skinIndex) {
        cc.log("sendChangeSkin: " + skinIndex);
        let pk = this.gameClient.getOutPacket(CmdSendBuySkin);
        pk.pack(skinIndex);
        this.gameClient.sendPacket(pk);
    },
});

var userController = null;

var getUserController = function (){
    if(userController){
        return userController;
    }
    userController = new UserController(gv.gameClient);
    return userController;
}