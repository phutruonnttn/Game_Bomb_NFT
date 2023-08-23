var gv = gv||{};
gv.CONSTANT = gv.CONSTANT || {};
gv.CONSTANT.USERID = null;

let networkManager = networkManager||{};

networkManager.Connector = cc.Class.extend({
    _gameClient : null,

    ctor: function (gameClient){
        this._gameClient = gameClient;
        gameClient.packetFactory.addPacketMap(networkManager.packetMap);
        gameClient.receivePacketSignal.add(this.onReceivedPacket, this);
    },

    onReceivedPacket:function(cmd, packet)
    {
        if (cmd !== gv.CMD.LOOP_MAX)
            cc.log("onReceivedPacket: " + cmd);
        if (cmd in networkManager.handle)
            networkManager.handle[cmd](packet);
        else {
            cc.log("UNEXPECTED Packet: " + cmd);
        }
    },
});

networkManager.handle = {};

networkManager.handle[gv.CMD.HAND_SHAKE] = function (packet) {
    getLoginController().sendLoginReq();
};

networkManager.handle[gv.CMD.USER_LOGIN] = function (packet) {
    getUserController().sendGetUserInfo();
};

// USER
networkManager.handle[gv.CMD.USER_INFO] = function (packet) {
    if (packet.getError() === gv.ERROR.SUCCESS) {
        if (gv.gameScene) {
            gv.gameScene.sendEnd = false;
            clearInterval(gv.gameScene.interval)
        }
        fr.view(LobbyGUI, 0.5);
        gv.user.loadStat(packet);
    } else {
        cc.log("ERROR: " + packet.getError());
    }
};

networkManager.handle[gv.CMD.CHANGE_SKIN] = function (packet) {
    if (packet.getError() !== gv.ERROR.SUCCESS) {
        cc.log("ERROR: " + packet.getError());
        getUserController().sendGetUserInfo();
    }
};

networkManager.handle[gv.CMD.BUY_SKIN] = function (packet) {
    if (packet.getError() !== gv.ERROR.SUCCESS) {
        cc.log("ERROR: "+packet.getError());
        getUserController().sendGetUserInfo();
    } else {
        gv.lobby.setVisiblePLoading(false)
    }
};

// MATCHING
networkManager.handle[gv.CMD.FIND_MATCH] = function (packet) {
    if (packet.getError() === gv.ERROR.SUCCESS) {
        gv.battle = {};

        let scene = new cc.Scene();
        scene.addChild(new GameScene(
            packet.userIds,
            packet.userNames,
            packet.userFames,
            packet.userSkins,
            packet.mapSize,
            packet.mapMatrix,
            packet.randomSeed
        ));
        cc.director.runScene(new cc.TransitionFade(0.8, scene));
    }
};

networkManager.handle[gv.CMD.CANCLE_MATCH] = function (packet) {
    if (packet.getError() === gv.ERROR.SUCCESS) {
        gv.lobby.cancelMatch()
    }
};

// BATTLE
networkManager.handle[gv.CMD.LOOP_MAX] = function (packet) {
    if (packet.getError() === gv.ERROR.SUCCESS) {
        for (let i = 0; i < packet.listAction.length; i++) {
            gv.gameGUI.listActions.push(packet.listAction[i])
        }
        gv.loopMax = packet.loopMax
    }
};

networkManager.handle[gv.CMD.END_BATTLE] = function (packet) {
    if (packet.getError() === gv.ERROR.SUCCESS) {
        gv.battle.frameEnd = packet.frameEnd;
        gv.battle.amountFame = packet.amountFame;
    }
};