gv.CMD = gv.CMD ||{};

networkManager = networkManager||{};

networkManager.packetMap = {};

//Handshake
networkManager.packetMap[gv.CMD.HAND_SHAKE] = fr.InPacket.extend({
    ctor:function() {
        this._super();
    },
    readData:function(){
        this.token = this.getString();
    }
});

networkManager.packetMap[gv.CMD.USER_LOGIN] = fr.InPacket.extend({
    ctor:function() {
        this._super();
    },
    readData:function(){
    }
});

// USER
networkManager.packetMap[gv.CMD.USER_INFO] = fr.InPacket.extend({
    ctor: function () {
        this._super();
    },
    readData: function () {
        this.userId = this.getInt()
        this.userName = this.getString()
        this.userToken = this.getInt()
        this.userFame = this.getInt()
        this.currentSkin = this.getInt()

        let numberOwnedSkins = this.getInt()
        this.ownedSkins = []
        for (let i = 0; i < numberOwnedSkins; i++) {
            this.ownedSkins.push(this.getInt())
        }
    }
});

networkManager.packetMap[gv.CMD.CHANGE_SKIN] = fr.InPacket.extend({
    ctor: function () {
        this._super();
    },
    readData: function () {
    }
});

networkManager.packetMap[gv.CMD.BUY_SKIN] = fr.InPacket.extend({
    ctor: function () {
        this._super();
    },
    readData: function () {
    }
});

// MATCHING
networkManager.packetMap[gv.CMD.FIND_MATCH] = fr.InPacket.extend({
    ctor: function () {
        this._super();
        this.reset()
    },

    reset: function () {
        this.userIds = []
        this.userNames = []
        this.userFames = []
        this.userSkins = []
        this.mapMatrix = []
    },

    loadListInt: function (list) {
        for (let i = 0; i < 4; i++) {
            list.push(this.getInt())
        }
    },

    loadListString: function (list) {
        for (let i = 0; i < 4; i++) {
            list.push(this.getString())
        }
    },

    readData: function () {
        this.reset()

        this.loadListInt(this.userIds)
        this.loadListString(this.userNames)
        this.loadListInt(this.userFames)
        this.loadListInt(this.userSkins)

        this.mapSize = this.getInt()

        for (let i = 0; i < this.mapSize; i++) {
            this.mapMatrix[i] = []
            for (let j = 0; j < this.mapSize; j++) {
                this.mapMatrix[i][j] = this.getInt()
            }
        }
        this.randomSeed = this.getInt()
    }
});

networkManager.packetMap[gv.CMD.CANCLE_MATCH] = fr.InPacket.extend({
    ctor: function () {
        this._super();
    },
    readData: function () {

    }
});

// BATTLE
networkManager.packetMap[gv.CMD.LOOP_MAX] = fr.InPacket.extend({
    ctor: function () {
        this._super();
    },
    readData: function () {
        this.loopMax = this.getInt()
        this.frameRunAction = this.getInt()
        let numberOfAction = this.getInt()
        this.listAction = []
        for (let i = 0; i < numberOfAction; i++) {
            let cmdID = this.getInt()
            let userID = this.getInt()
            let errorCode = this.getInt()
            let action = new ActionBattle(userID, cmdID, errorCode, this.frameRunAction)
            if (errorCode === gv.ERROR.SUCCESS) {
                switch (cmdID) {
                    case gv.CMD.MOVE:
                        action.isUp = this.getInt() === 1
                        action.isDown = this.getInt() === 1
                        action.isLeft = this.getInt() === 1
                        action.isRight = this.getInt() === 1
                        break
                    case gv.CMD.ATTACK:
                        break
                    case gv.CMD.GET_ITEM:
                        action.posX = this.getInt()
                        action.posY = this.getInt()
                        break
                }
            }
            this.listAction.push(action)
        }
    }
});

networkManager.packetMap[gv.CMD.END_BATTLE] = fr.InPacket.extend({
    ctor: function () {
        this._super();
    },
    readData: function () {
        this.frameEnd = this.getInt();
        this.amountFame = this.getInt();
    }
});