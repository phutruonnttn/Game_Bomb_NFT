// Handshake
CmdSendHandshake = fr.OutPacket.extend({
    ctor: function() {
        this._super();
        this.initData(100);
        this.setControllerId(gv.CONTROLLER_ID.SPECIAL_CONTROLLER);
        this.setCmdId(gv.CMD.HAND_SHAKE);
    },

    putData: function() {
        //pack
        this.packHeader();
        //update
        this.updateSize();
    }
})

CmdSendLogin = fr.OutPacket.extend({
    ctor: function() {
        this._super();
        this.initData(100);
        this.setCmdId(gv.CMD.USER_LOGIN);
    },

    pack: function(loginId) {
        this.packHeader();

        let length = loginId.length
        this.putInt(length);
        for (let i = 0; i < length; i++) {
            this.putInt(loginId[i].charCodeAt(0))
        }
        this.updateSize();
    }
})

// USER
CmdSendUserInfo = fr.OutPacket.extend({
    ctor: function() {
        this._super();
        this.initData(100);
        this.setCmdId(gv.CMD.USER_INFO);
    },

    pack: function() {
        this.packHeader();
        this.updateSize();
    }
})

CmdSendChangeSkin = fr.OutPacket.extend({
    ctor: function () {
        this._super();
        this.initData(100);
        this.setCmdId(gv.CMD.CHANGE_SKIN);
    },

    pack: function (skinIndex) {
        this.packHeader();
        this.putInt(skinIndex);
        this.updateSize();
    }
})

CmdSendBuySkin = fr.OutPacket.extend({
    ctor: function () {
        this._super();
        this.initData(100);
        this.setCmdId(gv.CMD.BUY_SKIN);
    },

    pack: function (skinIndex) {
        this.packHeader();
        this.putInt(skinIndex);
        this.updateSize();
    }
})

// MATCHING
CmdFindMatch = fr.OutPacket.extend({
    ctor: function () {
        this._super();
        this.initData(100);
        this.setCmdId(gv.CMD.FIND_MATCH);
    },

    pack: function () {
        this.packHeader();
        this.updateSize();
    }
});

CmdCancleMatch = fr.OutPacket.extend({
    ctor: function () {
        this._super();
        this.initData(100);
        this.setCmdId(gv.CMD.CANCLE_MATCH);
    },

    pack: function () {
        this.packHeader();
        this.updateSize();
    }
});

// BATTLE
CmdSendAttack = fr.OutPacket.extend({
    ctor: function() {
        this._super();
        this.initData(100);
        this.setCmdId(gv.CMD.ATTACK);
    },

    pack: function() {
        this.packHeader();
        this.updateSize();
    }
})

CmdSendMove = fr.OutPacket.extend({
    ctor: function() {
        this._super();
        this.initData(100);
        this.setCmdId(gv.CMD.MOVE);
    },

    pack: function(isUp, isDown, isLeft, isRight) {
        this.packHeader();
        this.putInt(isUp ? 1 : 0);
        this.putInt(isDown ? 1 : 0);
        this.putInt(isLeft ? 1 : 0);
        this.putInt(isRight ? 1 : 0);
        this.updateSize();
    }
})
