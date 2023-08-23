var GameScene = cc.Layer.extend({

    ctor: function(userIds, userNames, userFames, userSkins, mapSize, mapMatrix, randomSeed) {
        this._super();

        gv.gameScene = this
        gv.loopMax = 0
        MAP.SIZE = mapSize
        MAP.MATRIX_MAP = mapMatrix

        this.sendEnd = false

        this.cellSize = cc.winSize.height / MAP.SIZE
        this.preDirection = cc.p(-2, -2)

        this.back = new cc.Sprite("res/bg.png")
        this.back.setAnchorPoint(0,0)
        this.back.setScale(cc.winSize.width / this.back.width, cc.winSize.height / this.back.height)
        this.addChild(this.back)

        // Add game GUI
        this.gameGUI = new GameGUI(this.cellSize, userIds, userNames, userFames, userSkins, randomSeed);
        this.gameGUI.setAnchorPoint(0, 0)
        this.addChild(this.gameGUI);

        // Add info GUI
        this.infoGUI = new InfoGUI(userIds, userNames, userSkins);
        this.infoGUI.setAnchorPoint(0, 0)
        this.addChild(this.infoGUI);

        // Set position
        this.gapGUI = this.infoGUI.width / GameScene.RATIO_WIDTH_BETWEEN_INFO_GUI_TO_GAP_GUI
        this.paddingSide = (cc.winSize.width
            - this.infoGUI.width
            - this.gameGUI.width
            - this.gapGUI) / 2

        this.infoGUI.setPosition(this.paddingSide,0)
        this.gameGUI.setPosition(this.paddingSide + this.infoGUI.width + this.gapGUI,0)

        // Add control panel
        this.controlPanel = new ControlPanel(this)
        this.addChild(this.controlPanel);

        this.addKeyboardListener();

        // Loop logic
        this.schedule(
            ()=>{
                this.update(Utils.round(1 / GameScene.FRAME_PER_SECOND))
            },
            Utils.round(1 / GameScene.FRAME_PER_SECOND)
        )
        // this.scheduleUpdate();
    },

    showResult: function (amountToken) {
        let resultGUI = ccs.load("ResultGUI.json", "").node
        let bg = resultGUI.getChildByName("bg")

        let txtToken = bg.getChildByName("txtToken")
        let resultTxt = bg.getChildByName("resultTxt")
        let backBtn = bg.getChildByName("backBtn")

        if (amountToken >= 0) {
            txtToken.setString("+ " + amountToken)
        } else {
            txtToken.setString(amountToken)
        }

        if (amountToken <= 0) {
            resultTxt.setString("YOU LOSE!")
        } else {
            resultTxt.setString("YOU WIN!")
        }

        backBtn.addClickEventListener(()=>{
            backBtn.setTouchEnabled(false)

            // Do phai cho smart contract xong,
            // Nen se gui len lien tuc den khi nao duoc tra ve
            getUserController().sendGetUserInfo()

            let self = this
            this.sendEnd = true
            this.interval = setInterval(()=>{
                if (self.sendEnd) {
                    getUserController().sendGetUserInfo()
                }
            }, 5000)

            // fr.view(LobbyGUI);
        })

        bg.setScale(cc.winSize.width / bg.width, cc.winSize.height / bg.height)

        this.addChild(resultGUI)
    },

    addKeyboardListener: function () {
        if (cc.sys.capabilities.hasOwnProperty('keyboard')) {
            cc.eventManager.addListener({
                event: cc.EventListener.KEYBOARD,

                onKeyPressed: function (key, event) {
                    KB.KEYS[key] = true
                },

                onKeyReleased: function (key, event) {
                    KB.KEYS[key] = false
                }
            }, this)
        }
    },

    getVectorLengthSqr: function (vector) {
        return Math.abs(vector.x * vector.x + vector.y * vector.y)
    },

    getVectorLength: function (vector) {
        return Math.sqrt(this.getVectorLengthSqr(vector))
    },

    // Chuan hoa vector
    normalizeVector: function (vector) {
        let lengthOfVector = this.getVectorLength(vector);
        return cc.p(
            vector.x / lengthOfVector,
            vector.y / lengthOfVector
        )
    },

    // isUp, isDown, isLeft, isRight
    convertTo4Direction: function (direction) {
        if (Utils.equal(direction.x, 0) && Utils.equal(direction.y, 0)) {
            return [false, false, false, false]
        }

        // right
        if (Utils.equal(direction.x, 1)) {
            return [false, false, false, true]
        }

        // left
        if (Utils.equal(direction.x, -1)) {
            return [false, false, true, false]
        }

        // up
        if (Utils.equal(direction.y, 1)) {
            return [true, false, false, false]
        }

        // down
        if (Utils.equal(direction.y, -1)) {
            return [false, true, false, false]
        }

        // up, right
        if (Utils.round(direction.x) > 0 && Utils.round(direction.x) < 1
            && Utils.round(direction.y) > 0 && Utils.round(direction.y) < 1
        ) {
            return [true, false, false, true]
        }

        // down, right
        if (Utils.round(direction.x) > 0 && Utils.round(direction.x) < 1
            && Utils.round(direction.y) < 0 && Utils.round(direction.y) > -1
        ) {
            return [false, true, false, true]
        }

        // up, left
        if (Utils.round(direction.x) < 0 && Utils.round(direction.x) > -1
            && Utils.round(direction.y) > 0 && Utils.round(direction.y) < 1
        ) {
            return [true, false, true, false]
        }

        // down, left
        if (Utils.round(direction.x) < 0 && Utils.round(direction.x) > -1
            && Utils.round(direction.y) < 0 && Utils.round(direction.y) > -1
        ) {
            return [false, true, true, false]
        }
    },

    sendRequestPlayerMove: function (direction) {
        if (!Utils.equal(direction.x, this.preDirection.x) || !Utils.equal(direction.y, this.preDirection.y)) {
            this.preDirection = direction
            let convertedDir = this.convertTo4Direction(direction)
            getBattleController().sendMove(convertedDir[0], convertedDir[1], convertedDir[2], convertedDir[3]);
        }
    },

    sendRequestPlayerAttack: function () {
        getBattleController().sendAttack()
    },

    update: function(dt) {
        // Update position to request move
        let joystickDirection = this.controlPanel.joystick.direction
        if (joystickDirection.x !== 0 || joystickDirection.y !== 0) {
            this.sendRequestPlayerMove(joystickDirection, dt)
        } else {
            let keyboardDirection = cc.p(0,0)
            if (KB.KEYS[cc.KEY.up]) {
                keyboardDirection = cc.pAdd(keyboardDirection, GameScene.UP_DIRECTION)
            }
            if (KB.KEYS[cc.KEY.down]) {
                keyboardDirection = cc.pAdd(keyboardDirection, GameScene.DOWN_DIRECTION)
            }
            if (KB.KEYS[cc.KEY.left]) {
                keyboardDirection = cc.pAdd(keyboardDirection, GameScene.LEFT_DIRECTION)
            }
            if (KB.KEYS[cc.KEY.right]) {
                keyboardDirection = cc.pAdd(keyboardDirection, GameScene.RIGHT_DIRECTION)
            }

            if (keyboardDirection.x !== 0 || keyboardDirection.y !== 0) {
                this.sendRequestPlayerMove(this.normalizeVector(keyboardDirection), dt)
            } else {
                this.sendRequestPlayerMove(keyboardDirection, dt)
            }
        }

        // Check attack player
        if (KB.KEYS[KB.ATTACK_KEY]) {
            this.sendRequestPlayerAttack()
            KB.KEYS[KB.ATTACK_KEY] = false
        }

        // Update info GUI
        for (let i = 0; i < 4; i++) {
            let infoNode = this.infoGUI.infoNode[i]

            if (this.gameGUI.listPlayer[i].isDestroy) {
                infoNode.getChildByName("bgDied").setVisible(true)
                infoNode.getChildByName("tagDied").setVisible(true)
                infoNode.getChildByName("skin").setVisible(false)
            }

            // Get txt
            let healthBg = infoNode.getChildByName("healthBg")
            let healthTxt = healthBg.getChildByName("healthTxt")

            let bombBg = infoNode.getChildByName("bombBg")
            let bombTxt = bombBg.getChildByName("bombTxt")

            let blastBg = infoNode.getChildByName("blastBg")
            let blastTxt = blastBg.getChildByName("blastTxt")

            let speedBg = infoNode.getChildByName("speedBg")
            let speedTxt = speedBg.getChildByName("speedTxt")

            // Set info
            healthTxt.setString(this.gameGUI.listPlayer[i].numberOfLife)
            bombTxt.setString(this.gameGUI.listPlayer[i].numbMaxBomb)
            blastTxt.setString(this.gameGUI.listPlayer[i].powerBlast)
            speedTxt.setString((Math.floor(this.gameGUI.listPlayer[i].additionSpeed * 100)) + "%")

            this.infoGUI.timeLeft.setString(
                utils.String.customFormatHour(this.gameGUI.timeCountDown)
            )
        }

        this.gameGUI.update(dt)
    }
});

GameScene.scene = function () {
    let scene = new cc.Scene();
    let layer = new GameScene();
    scene.addChild(layer);
    return scene;
};

GameScene.RATIO_WIDTH_BETWEEN_INFO_GUI_TO_GAP_GUI = 3
GameScene.UP_DIRECTION = cc.p(0,1)
GameScene.DOWN_DIRECTION = cc.p(0,-1)
GameScene.LEFT_DIRECTION = cc.p(-1,0)
GameScene.RIGHT_DIRECTION = cc.p(1,0)
GameScene.FRAME_PER_SECOND = 60