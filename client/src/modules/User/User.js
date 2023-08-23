
var User = cc.Class.extend({

    ctor: function () {
        gv.user = this;
        this.id = -1
        this.name = gv.USER.DEFAULT_NAME;
        this.avatar = gv.USER.DEFAULT_AVATAR;
        this.token = -1
        this.fame = -1
        this.currentSkin = -1
        this.ownedSkins = []
        this.listStatusSkin = []
    },

    loadStat: function (stat) {
        for (let i = 0; i < 6; i++) {
            this.listStatusSkin.push(false)
        }

        this.id = stat.userId
        this.name = stat.userName
        this.token = stat.userToken
        this.fame = stat.userFame
        this.currentSkin = stat.currentSkin
        this.ownedSkins = stat.ownedSkins

        for (let i = 0; i < this.ownedSkins.length; i++) {
            this.listStatusSkin[this.ownedSkins[i]] = true
        }

        gv.lobby.updateUI();
    },

    hasEnoughToken: function (tokenValue) {
        return this.token >= tokenValue;
    },

    updateToken: function (amount) {
        this.token += amount;
        gv.lobby.updateUI();
    }
});

User.FEE_BATTLE = 100;