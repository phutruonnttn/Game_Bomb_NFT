var ActionBattle = cc.Class.extend({

    ctor: function (userID, cmdID, errorCode, frameRunAction) {
        this.userID = userID
        this.cmdID = cmdID
        this.errorCode = errorCode
        this.frameRunAction = frameRunAction

        this.posX = -1
        this.posY = -1
        this.isUp = false
        this.isDown = false
        this.isLeft = false
        this.isRight = false
    }
})