var BattleController = cc.Class.extend({

    ctor: function (gameClient) {
        this.gameClient = gameClient;
    },

    sendFindMatch: function () {
        cc.log("sendFindMatch");
        let pk = this.gameClient.getOutPacket(CmdFindMatch);
        pk.pack();
        this.gameClient.sendPacket(pk);
    },

    sendCancelMatch: function () {
        cc.log("sendCancelMatch");
        let pk = this.gameClient.getOutPacket(CmdCancleMatch);
        pk.pack();
        this.gameClient.sendPacket(pk);
    },

    sendAttack: function () {
        let pk = this.gameClient.getOutPacket(CmdSendAttack);
        pk.pack();
        this.gameClient.sendPacket(pk);
    },

    sendMove: function (isUp, isDown, isLeft, isRight) {
        let pk = this.gameClient.getOutPacket(CmdSendMove);
        pk.pack(isUp, isDown, isLeft, isRight);
        this.gameClient.sendPacket(pk);
    }
});

var battleController = null;

var getBattleController = function (){
    if(battleController){
        return battleController;
    }
    battleController = new BattleController(gv.gameClient);
    return battleController;
}