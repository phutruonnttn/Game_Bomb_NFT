var InfoGUI = cc.Layer.extend({

    ctor: function (userIds, userNames, userSkins) {
        this._super();

        this.height = cc.winSize.height
        this.width = this.height / InfoGUI.RATIO_HEIGHT_TO_WIDTH

        this.bg = new cc.Sprite("res/bgInfoGUI2.png")
        this.bg.setScale(
            this.width / this.bg.getContentSize().width,
            this.height / this.bg.getContentSize().height
        )
        this.bg.setAnchorPoint(0,0)
        this.bg.setPosition(0, 0)

        this.addChild(this.bg)

        this.infoNode = []
        for (let i = 0; i < 4; i++) {
            let infoNode = ccs.load("InfoNode.json", "").node
            infoNode.setPosition(cc.p( this.width/2, this.height / 5 * (5 - i) - this.height / 8))
            this.addChild(infoNode)

            this.infoNode[i] = infoNode.getChildByName("cardInfo").getChildByName("bg")
            this.infoNode[i].getChildByName("name").setString(utils.String.loadStringLimitLength(userNames[i], 8))

            let skinInCard = new SkinInCard(userSkins[i], SkinInCard.STATIC_ANIM, i)
            skinInCard.setScale(5)
            skinInCard.setPosition(this.infoNode[i].getChildByName("nodeAvt"))
            skinInCard.setName("skin")
            this.infoNode[i].addChild(skinInCard)

            this.infoNode[i].getChildByName("bgDied").setVisible(false)
            this.infoNode[i].getChildByName("tagDied").setVisible(false)

            if (userIds[i] === gv.user.id) {
                this.infoNode[i].loadTexture("res/lobby/lobby_home_treasure_finished.png")
            }
        }

        let gameInfoNode = ccs.load("GameInfoNode.json", "").node
        gameInfoNode.setPosition(cc.p( this.width/2, this.height / 5 - this.height / 9))
        this.addChild(gameInfoNode)

        let gameInfoBg = gameInfoNode.getChildByName("cardInfo")
        this.timeLeft = gameInfoBg.getChildByName("timeBg").getChildByName("timeTxt")
    },
});

InfoGUI.RATIO_HEIGHT_TO_WIDTH = 3