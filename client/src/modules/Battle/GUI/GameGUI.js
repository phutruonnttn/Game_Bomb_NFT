var GameGUI = cc.Layer.extend({

    ctor: function (cellSize, userIds, userNames, userFames, userSkins, randomSeed) {
        this._super();

        gv.gameGUI = this
        this.countLoopToFixDelay = 0
        this.listActions = []
        this.directionFromServer = []
        for (let i = 0; i < 4; i++) {
            this.directionFromServer.push(cc.p(0,0));
        }

        // Random
        this.randomCustom = new RandomCustom(randomSeed)

        // Init stat
        this.countFrame = 0
        this.timeCountDown = GameGUI.INIT_TIME_COUNT_DOWN

        // Init map
        this.mapMgr = new MapMgr();
        this.cellSize = cellSize
        this.width = this.mapMgr.size * this.cellSize
        this.height = this.mapMgr.size * this.cellSize
        this.initMap()

        // Init list bullets
        this.listBullet = []

        // Init list bombs
        this.listBomb = []

        // Add list player
        this.listPlayer = []

        for (let i = 0; i < 4; i++) {
            let iPlayer = new Character(
                userIds[i],
                userNames[i],
                userFames[i],
                userSkins[i],
                i,
                this.getPosUIPlayerByOrder(i),
                this.mapMgr,
                this,
                cellSize
            )

            this.listPlayer.push(iPlayer)
            this.addChild(iPlayer)
        }
    },

    // Lay vi tri bat dau cua user theo thu tu
    // 0: Vị trí trái trên
    // 1: Vị trí phải trên
    // 2: Vị trí phải dưới
    // 3: Vị trí trái dưới
    getPosUIPlayerByOrder: function (order) {
        switch (order) {
            case 0:
                return this.convertIndexToPosUI(1, MAP.SIZE - 2)
            case 1:
                return this.convertIndexToPosUI(MAP.SIZE - 2, MAP.SIZE - 2)
            case 2:
                return this.convertIndexToPosUI(MAP.SIZE - 2, 1)
            case 3:
                return this.convertIndexToPosUI(1, 1)
        }
    },

    handleActionMove: function (action) {
        let direction = cc.p(0,0)
        if (action.isUp) {
            direction = cc.pAdd(direction, GameScene.UP_DIRECTION)
        }
        if (action.isDown) {
            direction = cc.pAdd(direction, GameScene.DOWN_DIRECTION)
        }
        if (action.isLeft) {
            direction = cc.pAdd(direction, GameScene.LEFT_DIRECTION)
        }
        if (action.isRight) {
            direction = cc.pAdd(direction, GameScene.RIGHT_DIRECTION)
        }

        if (direction.x !== 0 || direction.y !== 0) {
            direction = this.normalizeVector(direction)
        }

        for (let i = 0; i < this.listPlayer.length; i++) {
            if (this.listPlayer[i].userId === action.userID) {
                this.directionFromServer[i] = direction
                break
            }
        }
    },

    handleMoveLoop: function (dt) {
        for (let i = 0; i < this.listPlayer.length; i++) {
            if (!this.listPlayer[i].isDestroy) {
                this.listPlayer[i].updateMove(this.directionFromServer[i], dt)
            }
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

    handleActionAttack: function (action) {
        for (let i = 0; i < this.listPlayer.length; i++) {
            if (this.listPlayer[i].userId === action.userID) {
                this.listPlayer[i].attack()
                break
            }
        }
    },

    handleActionGetItem: function (action) {

    },

    initMap: function() {
        for (let i = 0; i < this.mapMgr.size; i++){
            for (let j = 0; j < this.mapMgr.size; j++){
                if (this.mapMgr.data[i][j] === MapMgr.UNATTACKABLE_OBSTACLE_TYPE) {
                    this.addObjectUI("res/brick.png", i,j, 1);
                    continue;
                }

                // Random type cell
                let ran =  Math.floor(Math.random() * (this.mapMgr.size - 1));
                if (ran === 0 || ran > 2) {
                    this.addObjectUI("res/cell0.png", i,j, 1);
                } else if (ran === 1) {
                    this.addObjectUI("res/cell1.png", i,j, 1);
                } else if (ran === 2) {
                    this.addObjectUI("res/cell2.png", i,j, 1);
                }

                if (this.mapMgr.data[i][j] === MapMgr.ATTACKABLE_OBSTACLE_TYPE) {
                    this.addObjectUI("res/attackable_obstacle.png", i,j, 1, i * 100 + j);
                }
            }
        }
    },

    addObjectUI: function (_res, corX, corY, _scale, tag) {
        let object = new cc.Sprite(_res)
        object.setScale(_scale * this.cellSize / object.getContentSize().height)
        let pos = this.convertIndexToPosUI(corX, corY)
        object.setPosition(pos)
        if (tag) {
            object.setTag(tag)
        }
        this.addChild(object)
    },

    convertIndexToPosUI: function (corX, corY) {
        let x = corX * this.cellSize + this.cellSize / 2
        let y = corY * this.cellSize + this.cellSize / 2
        return new cc.p(x, y)
    },

    convertIndexToPosLogic: function (cor) {
        let x = Math.floor(cor.x / this.cellSize)
        let y = Math.floor(cor.y / this.cellSize)
        return new cc.p(x, y)
    },

    isBomb: function (x, y) {
        return this.mapMgr.isBomb(x,y)
    },

    setMapLogicType: function (x, y, type) {
        this.mapMgr.setType(x, y, type)
    },

    getMapLogicType: function (x, y) {
        return this.mapMgr.getType(x, y)
    },

    damageCell: function (pos) {
        if (this.getMapLogicType(pos.x, pos.y) === MapMgr.ATTACKABLE_OBSTACLE_TYPE) {
            let tag = pos.x * 100 + pos.y
            if (this.getChildByTag(tag)) {
                this.removeChildByTag(tag)
                this.setRandomItem(pos.x, pos.y)
            }
        }
    },

    setRandomItem: function (x, y) {
        // random = 5 -> 10 (10 la khong co item)
        let random = Math.floor(this.randomCustom.getRandom() * 7) + 4

        if (random !== MapMgr.NO_ITEM) {
            this.setMapLogicType(x,y,random)
            let item = new Item(random)
            item.setPosition(this.convertIndexToPosUI(x,y))
            item.setTag(x * 100 + y)
            this.addChild(item)
        } else {
            this.setMapLogicType(x, y, MapMgr.LAND_TYPE)
        }
    },

    updateBullets: function(dt) {
        let newListBullet = []
        for (let i = 0; i < this.listBullet.length; i++) {
            this.listBullet[i].update(dt)

            if (!this.listBullet[i].isDestroy) {
                newListBullet.push(this.listBullet[i])
            }
        }
        this.listBullet = newListBullet
    },

    updateBombs: function(dt) {
        let newListBomb = []
        for (let i = 0; i < this.listBomb.length; i++) {
            this.listBomb[i].update(dt)

            if (!this.listBomb[i].isDestroy) {
                newListBomb.push(this.listBomb[i])
            }
        }

        this.listBomb = newListBomb
    },

    getListCurrentObstacle: function () {
        let listObs = []

        for (let i = 0; i < this.mapMgr.size; i++) {
            for (let j = 0; j < this.mapMgr.size; j++) {
                if (this.getMapLogicType(i,j) === MapMgr.UNATTACKABLE_OBSTACLE_TYPE
                || this.getMapLogicType(i,j) === MapMgr.ATTACKABLE_OBSTACLE_TYPE) {
                    listObs.push(new cc.p(i,j));
                }
            }
        }

        return listObs
    },

    updateCountFrame: function () {
        this.countFrame++
    },

    updateTimeCountDown: function (dt) {
        this.timeCountDown -= dt
    },

    update: function (dt) {
        this.countLoopToFixDelay++;
        this.handleDelay(dt);
        if (this.countFrame < gv.loopMax) {
            this.updateLogic(dt)
        }
    },

    updatePlayer: function (dt) {
        for (let i = 0; i < this.listPlayer.length; i++) {
            if (!this.listPlayer[i].isDestroy) {
                this.listPlayer[i].update(dt);
            }
        }
    },

    updateLogic: function (dt) {
        this.handleMoveLoop(dt)

        this.updateTimeCountDown(dt)
        this.updateCountFrame()
        this.runListAction()
        this.updateBullets(dt)
        this.updateBombs(dt)
        this.updatePlayer(dt)

        if (this.countFrame === gv.battle.frameEnd) {
            gv.gameScene.showResult(gv.battle.amountFame)
            cc.log("END: " + gv.battle.amountFame)
        }

        // Ghi log ra file
        // LogState.getInstance().logToFile(this, this.countFrame)
    },

    handleDelay: function (dt) {
        let currentDelay = gv.loopMax - this.countFrame - GameGUI.FRAME_PERIOD

        if (currentDelay > GameGUI.MAX_DELAY) {
            for (let i = 0; i < currentDelay - GameGUI.MAX_DELAY; i++) {
                this.updateLogic(dt)
            }
        }

        if (this.countLoopToFixDelay === GameGUI.PERIOD_TO_FIX_DELAY) {
            this.countLoopToFixDelay = 0;
            if (gv.loopMax - this.countFrame - GameGUI.FRAME_PERIOD > 0) {
                this.updateLogic(dt)
            }
        }
    },

    runListAction: function() {
        while (this.listActions.length > 0 && this.listActions[0].frameRunAction === this.countFrame){
            let action = this.listActions.shift()
            if (action.errorCode === gv.ERROR.SUCCESS) {
                switch (action.cmdID) {
                    case gv.CMD.MOVE:{
                        this.handleActionMove(action);
                        break;
                    }
                    case gv.CMD.ATTACK:{
                        this.handleActionAttack(action);
                        break;
                    }
                    case gv.CMD.GET_ITEM: {
                        this.handleActionGetItem(action);
                        break;
                    }
                }
            } else {
                cc.log("Error battle: " + action.errorCode)
            }
        }
    },
});

GameGUI.INIT_TIME_COUNT_DOWN = 300;
GameGUI.MAX_DELAY = 5
GameGUI.FRAME_PERIOD = 5
GameGUI.PERIOD_TO_FIX_DELAY = 10