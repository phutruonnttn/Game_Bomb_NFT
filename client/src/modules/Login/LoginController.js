var LoginController = cc.Class.extend({
    _gameClient : null,
    userId: null,
    ctor: function (gameClient){
        this._gameClient = gameClient;
    },

    sendLoginReq: function (){
        let pk = this._gameClient.getOutPacket(CmdSendLogin);
        pk.pack(this.userId);
        this._gameClient.sendPacket(pk);
    },

    connectServer: function (userId){
        if (this.userIdIsEmpty(userId)){
            return LoginController.INPUT_EMPTY;
        }
        if (!this.checkValidId(userId)){
            return LoginController.INPUT_INVALID;
        }
        this._gameClient.connect();
    },

    checkValidId: function (loginId) {
        let decodeBase64Str = Utils.getInstance().decodeBase64(loginId)
        try {
            let json = JSON.parse(decodeBase64Str)
            if (!Utils.getInstance().isPublicAddress(json.address)) {
                return false
            } else {
                return true
            }
        } catch (e) {
            return false
        }
    },

    userIdIsEmpty: function (userId){
        return !userId.length;
    }
});

var loginController = null;

var getLoginController = function (){
    if(loginController == null){
        loginController = new LoginController(gv.gameClient);
    }
    return loginController;
}

LoginController.INPUT_EMPTY = 0
LoginController.INPUT_IS_NOT_NUMBER = 1
LoginController.INPUT_INVALID = 2