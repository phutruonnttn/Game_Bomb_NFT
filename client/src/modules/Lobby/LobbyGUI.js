var LobbyGUI = cc.Layer.extend({

    ctor: function () {
        this._super()

        gv.lobby = this
        let lobbyGUI = ccs.load("LobbyGUI.json", "").node
        let bg = lobbyGUI.getChildByName("bg")

        this.name = bg.getChildByName("bgName").getChildByName("txtName")
        this.token = bg.getChildByName("tokenBg").getChildByName("txt")

        this.nodeAnimFindMatch = bg.getChildByName("nodeAnimFindMatch")
        this.iconFindMatch = bg.getChildByName("iconFindMatch")

        this.pShop = bg.getChildByName("pShop")
        this.nodeSkinCard = []
        for (let i = 0; i < 6; i++) {
            this.nodeSkinCard[i] = this.pShop.getChildByName("node" + i)
        }

        this.btnFindMatch = bg.getChildByName("btnFindMatch")
        this.txtBtnFindMatch = this.btnFindMatch.getChildByName("txt")

        this.btnCancelFindMatch = bg.getChildByName("btnCancelFindMatch")
        this.btnCancelFindMatch.setOpacity(0)

        let self = this
        this.btnCancelFindMatch.addClickEventListener(()=>{
            self.requestCancelMatch()
        })

        this.pHideShop = bg.getChildByName("pHideShop")
        this.pHideShop.setVisible(false)

        this.pLoading = bg.getChildByName("pLoading")
        this.loadingIcon = this.pLoading.getChildByName("loadingIcon")
        this.loadingIcon.runAction(
            cc.rotateBy(2,360).repeatForever()
        )
        this.pLoading.setVisible(false)

        this.notEnoughTokenTxt = bg.getChildByName("notEnoughTokenTxt")
        this.notEnoughTokenTxt.setOpacity(0)

        this.btnFindMatch.addClickEventListener(()=>{
            self.findMatch()
        })

        bg.setScale(cc.winSize.width / bg.width, cc.winSize.height / bg.height)
        this.addChild(lobbyGUI)

        this.listCard = []

        this.initSkinCards()
        this.initAnimFindMatch()
    },

    setVisiblePLoading: function (bool) {
        this.pLoading.setVisible(bool)
    },

    initSkinCards: function () {
        for (let i = 0; i < 6; i++) {
            let card = ccs.load("SkinCard.json", "").node

            let bgCard = card.getChildByName("bgCard")
            bgCard.loadTexture(SkinConfig.RES_BG[i])

            let bgStatus = bgCard.getChildByName("txtStatus")
            let statusTxt = bgStatus.getChildByName("txt")

            statusTxt.setString(utils.String.formatIntToCurrencyString(SkinConfig.COST[i]))

            let border = bgCard.getChildByName("cardBorder")
            border.loadTexture(SkinConfig.RES_BORDER[i])

            let btnChooseOrBuy = bgCard.getChildByName("btnChooseOrBuy")
            btnChooseOrBuy.setOpacity(0)
            btnChooseOrBuy.setTouchEnabled(false)

            let skinInCard = new SkinInCard(i, SkinInCard.IDLE_ANIM, 0)
            skinInCard.setScale(4)

            this.nodeSkinCard[i].addChild(card)
            this.nodeSkinCard[i].addChild(skinInCard)
            this.listCard.push(card)
        }
    },

    updateSkinCards: function (user) {
        for (let i = 0; i < 6; i++) {
            let card = this.listCard[i]

            let bgCard = card.getChildByName("bgCard")
            let bgStatus = bgCard.getChildByName("txtStatus")
            let statusTxt = bgStatus.getChildByName("txt")

            let btnChooseOrBuy = bgCard.getChildByName("btnChooseOrBuy")
            let txtBtnChooseOrBuy = btnChooseOrBuy.getChildByName("txt")

            let btnCard = bgCard.getChildByName("cardBtn")

            if (user.currentSkin !== i) {
                btnCard.addClickEventListener(()=>{
                    if (btnChooseOrBuy.getOpacity() === 0) {
                        btnChooseOrBuy.setOpacity(255)
                        btnChooseOrBuy.setTouchEnabled(true)
                    } else {
                        btnChooseOrBuy.setOpacity(0)
                        btnChooseOrBuy.setTouchEnabled(false)
                    }
                })
            }

            if (user.currentSkin === i) {
                statusTxt.setString("Using")
            } else {
                if (user.listStatusSkin[i]) {
                    statusTxt.setString("Owned")
                    txtBtnChooseOrBuy.setString("Use")

                    let self = this
                    let index = i
                    btnChooseOrBuy.addClickEventListener(()=>{
                        getUserController().sendChangeSkin(index)
                        user.currentSkin = index
                        self.updateSkinCards(user)

                        btnChooseOrBuy.setOpacity(0)
                        btnChooseOrBuy.setTouchEnabled(false)
                    })
                } else {
                    statusTxt.setString(utils.String.formatIntToCurrencyString(SkinConfig.COST[i]))
                    txtBtnChooseOrBuy.setString("Buy")

                    let self = this
                    let fee = SkinConfig.COST[i]
                    let index = i
                    btnChooseOrBuy.addClickEventListener(()=>{
                        if (user.token >= fee) {
                            getUserController().sendBuySkin(index)
                            // getUserController().sendChangeSkin(index)
                            self.setVisiblePLoading(true)
                            user.currentSkin = index
                            user.listStatusSkin[index] = true
                            user.updateToken(-fee)

                            txtBtnChooseOrBuy.setString("Use")
                            btnChooseOrBuy.setOpacity(0)
                            btnChooseOrBuy.setTouchEnabled(false)
                        } else {
                            self.showNotifyNotEnoughToken()

                            btnChooseOrBuy.setOpacity(0)
                            btnChooseOrBuy.setTouchEnabled(false)
                        }
                    })
                }
            }
        }
    },

    showNotifyNotEnoughToken: function (){
        this.notEnoughTokenTxt.stopAllActions()
        this.notEnoughTokenTxt.setString("Not enough tokens!")

        this.notEnoughTokenTxt.runAction(
            cc.sequence(
                cc.fadeIn(0.5),
                cc.delayTime(1),
                cc.fadeOut(0.5)
            )
        )
    },

    showNotifyBuySkin: function (){
        this.notEnoughTokenTxt.stopAllActions()
        this.notEnoughTokenTxt.setString("You must have the character to play!")

        this.notEnoughTokenTxt.runAction(
            cc.sequence(
                cc.fadeIn(0.5),
                cc.delayTime(1),
                cc.fadeOut(0.5)
            )
        )
    },

    requestCancelMatch: function () {
        this.btnCancelFindMatch.setTouchEnabled(false)
        getBattleController().sendCancelMatch()
    },

    cancelMatch: function () {
        this.stopAllActions()
        this.btnFindMatch.stopAllActions()
        this.btnCancelFindMatch.stopAllActions()
        this.iconFindMatch.stopAllActions()

        this.btnFindMatch.setTouchEnabled(true)
        this.pHideShop.setVisible(false)
        this.btnFindMatch.runAction(cc.fadeIn(0.5))
        this.btnCancelFindMatch.runAction(cc.fadeOut(0.5))
        this.iconFindMatch.runAction(cc.fadeIn(0.5))
        this.animFindMatch.runAction(cc.fadeOut(0.5))
    },

    findMatch: function () {
        if (!gv.user.hasEnoughToken(User.FEE_BATTLE)) {
            this.showNotifyNotEnoughToken()
            return
        }

        if (gv.user.currentSkin === -1) {
            this.showNotifyBuySkin()
            return
        }

        this.stopAllActions()
        this.btnFindMatch.stopAllActions()
        this.btnCancelFindMatch.stopAllActions()

        this.btnFindMatch.setTouchEnabled(false)
        this.pHideShop.setVisible(true)
        this.btnFindMatch.runAction(cc.fadeOut(0.5))
        this.btnCancelFindMatch.runAction(cc.fadeIn(0.5))
        this.btnCancelFindMatch.setTouchEnabled(true)

        this.iconFindMatch.setOpacity(255)
        this.animFindMatch.setOpacity(0)

        // Show animation
        let self = this
        this.runAction(
            cc.sequence(
                cc.callFunc(()=>{
                    self.iconFindMatch.runAction(cc.fadeOut(0.5))
                }),
                cc.delayTime(0.5),
                cc.callFunc(()=>{
                    self.animFindMatch.runAction(cc.fadeIn(0.5))
                })
            )
        )

        // Send packet
        getBattleController().sendFindMatch()
    },

    initAnimFindMatch: function () {
        let bgAnim = new cc.Sprite("res/transparent.png")
        let rotate = cc.rotateBy(2,360).repeatForever()
        bgAnim.runAction(rotate)
        this.nodeAnimFindMatch.addChild(bgAnim)

        this.animFindMatch = new cc.Sprite("res/common/common_icon_glass.png")
        this.animFindMatch.setPosition(bgAnim.getContentSize().width/2 + 15,bgAnim.getContentSize().height / 2)
        this.animFindMatch.setScale(1.3)
        rotate = cc.rotateBy(2,-360).repeatForever()
        this.animFindMatch.runAction(rotate)
        bgAnim.addChild(this.animFindMatch, 1)

        this.animFindMatch.setOpacity(0)
    },

    updateUI: function () {
        this.name.setString(utils.String.loadStringPublicAddress(gv.user.name))
        this.token.setString(utils.String.formatIntToCurrencyString(gv.user.token))
        this.updateSkinCards(gv.user)
    }
})