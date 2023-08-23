var LoginScreen = cc.Layer.extend({
    ctor: function (){
        this._super();
        this.loginController = getLoginController();
        let loginScreen = ccs.load("LoginGUI.json", "").node;

        this.bg = loginScreen.getChildByName("bg")

        this.bgInput = this.bg.getChildByName("bgTextField")
        this.userIdTxt = this.bgInput.getChildByName("userIdTxt")

        this.loginBtn = this.bg.getChildByName("btnLogin");
        this.loginBtn.addClickEventListener(this.onSelectLogin.bind(this));

        this.notifyLabel = this.bg.getChildByName("notifyLabel");
        this.notifyLabel.setVisible(false);
        this.timeout = null;

        this.bg.setScale(cc.winSize.width / this.bg.width, cc.winSize.height / this.bg.height)

        this.addChild(loginScreen);
        this.handleEventIdTxt()
    },

    handleEventIdTxt: function () {
        this.userIdTxt = this.addEditBox(this.userIdTxt)
    },

    addEditBox: function (old) {
        if (!cc.sys.isNative)
            return old;
        let tf = this.createEditBox(old);
        this.bg.addChild(tf);
        tf.setPosition(this.bgInput.getPosition());
        old.setVisible(false);
        tf.setFontColor(cc.color('#ffffff'))
        tf.setPlaceholderFontColor(cc.color('#ffffff'))
        //tf.y += 3
        return tf;
    },

    createEditBox: function (tf) {
        let ret = new cc.EditBox(tf.getContentSize(), new cc.Scale9Sprite());
        ret.setFontName(tf.getFontName());
        ret.setFontSize(tf.getFontSize());
        ret.setPlaceHolder(tf.getPlaceHolder());
        ret.setPlaceholderFontName(tf.getFontName());
        ret.setPlaceholderFontSize(tf.getFontSize());
        ret.setPosition(tf.getPosition());
        ret.setAnchorPoint(tf.getAnchorPoint());
        ret.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
        ret.setMaxLength(500);
        return ret;
    },

    onSelectLogin: function (){
        let userId = this.userIdTxt.string;
        this.loginController.userId = userId
        let status = this.loginController.connectServer(userId);
        if(status === LoginController.INPUT_EMPTY){
            this.notifyLabel.setString("Please enter user ID!");
            this.showNotify();
        }
        if(status === LoginController.INPUT_IS_NOT_NUMBER){
            this.notifyLabel.setString("User ID can only contain digits!");
            this.showNotify();
        }
        if(status === LoginController.INPUT_INVALID){
            this.notifyLabel.setString("Invalid User ID!");
            this.showNotify();
        }
    },

    showNotify: function (){
        if(this.timeout != null){
            clearTimeout(this.timeout);
        }
        this.notifyLabel.setVisible(true);
        this.timeout = setTimeout(() => {
            this.notifyLabel.setVisible(false);
        }, 3000);
    },

    onConnectSuccess: function (){
        cc.log("connect success")
        // fr.view(LobbyGUI, 1);
    },

    onConnectFail: function (str){
        cc.log(str)
    }
})