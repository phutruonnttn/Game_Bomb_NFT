var Bomb = cc.Sprite.extend({

    ctor: function (player, mapGUI, pos, cellSize) {
        this._super("res/bomb.png");
        this.player = player
        this.mapGUI = mapGUI
        this.pos = pos
        this.cellSize = cellSize
        this.isDestroy = false

        this.timer = 0
        this.player.numbUsedBomb += 1
        this.mapGUI.setMapLogicType(this.pos.x, this.pos.y, MapMgr.BOMB_TYPE)

        this.listPlayerInCell = []
        for (let i = 0; i < this.mapGUI.listPlayer.length; i++) {
            if (!this.mapGUI.listPlayer[i].isDestroy) {
                let player = this.mapGUI.listPlayer[i]
                let posLogic = this.mapGUI.convertIndexToPosLogic(player)
                if (posLogic.x === this.pos.x && posLogic.y === this.pos.y) {
                    player.listBombPosIsNotObstacle.push(pos)
                    this.listPlayerInCell.push(player)
                }
            }
        }

        this.setLocalZOrder(MAP.SIZE - pos.y)
    },

    // Xét cả trường hợp kích thước nhân vật lớn hơn 1 ô
    updateListPlayerInCell: function () {
        let newList = []
        for (let k = 0; k < this.listPlayerInCell.length; k++) {
            let isDone = true
            let player = this.listPlayerInCell[k]

            let l = Math.floor((player.x - player.radius) / player.cellSize);
            let r = Math.floor((player.x + player.radius) / player.cellSize);
            let u = Math.floor((player.y + player.radius) / player.cellSize);
            let d = Math.floor((player.y - player.radius) / player.cellSize);

            for (let i = l; i <= r; i++){
                if (i === this.pos.x && u === this.pos.y) {
                    isDone = false
                    break
                }
                if (i === this.pos.x && d === this.pos.y) {
                    isDone = false
                    break
                }
            }

            if (!isDone) {
                newList.push(player)
                continue
            }

            for (let i = d; i <= u; i++){
                if (l === this.pos.x && i === this.pos.y) {
                    isDone = false
                    break
                }
                if (r === this.pos.x && i === this.pos.y) {
                    isDone = false
                    break
                }
            }
            if (!isDone) {
                newList.push(player)
            } else {
                player.removeBombPosIsNotObstacle(this.pos)
            }
        }

        this.listPlayerInCell = newList
    },

    update: function (dt) {
        this.updateListPlayerInCell()
        this.timer += dt
        if (this.timer >= WEAPONS.TIMER_BOMB) {
            this.explode()
            this.isDestroy = true
        }
    },

    loadCellExploded: function () {
        this.listCellExploded = []
        this.listCellExploded.push(this.pos)

        for (let i = this.pos.x - 1; i >= Math.max(this.pos.x - this.player.powerBlast, 0); i--) {
            if (this.mapGUI.getMapLogicType(i, this.pos.y) === MapMgr.UNATTACKABLE_OBSTACLE_TYPE) {
                break
            } else if (this.mapGUI.getMapLogicType(i, this.pos.y) === MapMgr.ATTACKABLE_OBSTACLE_TYPE) {
                this.listCellExploded.push(cc.p(i, this.pos.y))
                break
            } else {
                this.listCellExploded.push(cc.p(i, this.pos.y))
            }
        }

        for (let i = this.pos.x + 1; i <= Math.min(this.pos.x + this.player.powerBlast, MAP.SIZE - 1); i++) {
            if (this.mapGUI.getMapLogicType(i, this.pos.y) === MapMgr.UNATTACKABLE_OBSTACLE_TYPE) {
                break
            } else if (this.mapGUI.getMapLogicType(i, this.pos.y) === MapMgr.ATTACKABLE_OBSTACLE_TYPE) {
                this.listCellExploded.push(cc.p(i, this.pos.y))
                break
            } else {
                this.listCellExploded.push(cc.p(i, this.pos.y))
            }
        }

        for (let i = this.pos.y - 1; i >= Math.max(this.pos.y - this.player.powerBlast, 0); i--) {
            if (this.mapGUI.getMapLogicType(this.pos.x, i) === MapMgr.UNATTACKABLE_OBSTACLE_TYPE) {
                break
            } else if (this.mapGUI.getMapLogicType(this.pos.x, i) === MapMgr.ATTACKABLE_OBSTACLE_TYPE) {
                this.listCellExploded.push(cc.p(this.pos.x, i))
                break
            } else {
                this.listCellExploded.push(cc.p(this.pos.x, i))
            }
        }

        for (let i = this.pos.y + 1; i <= Math.min(this.pos.y + this.player.powerBlast, MAP.SIZE - 1); i++) {
            if (this.mapGUI.getMapLogicType(this.pos.x, i) === MapMgr.UNATTACKABLE_OBSTACLE_TYPE) {
                break
            } else if (this.mapGUI.getMapLogicType(this.pos.x, i) === MapMgr.ATTACKABLE_OBSTACLE_TYPE) {
                this.listCellExploded.push(cc.p(this.pos.x, i))
                break
            } else {
                this.listCellExploded.push(cc.p(this.pos.x, i))
            }
        }
    },

    explodeEffect: function () {
        let listExploded = []

        for (let i = 0; i < this.listCellExploded.length; i++) {
            let exploded = new cc.Sprite("res/flame.png")
            exploded.setScale(
                this.cellSize / exploded.width,
                this.cellSize / exploded.height
            )
            exploded.setPosition(this.mapGUI.convertIndexToPosUI(this.listCellExploded[i].x, this.listCellExploded[i].y))
            this.mapGUI.addChild(exploded, 1000)

            listExploded.push(exploded)
        }

        // No xong bien mat
        setTimeout(()=>{
            for (let i = 0; i < listExploded.length; i++) {
                listExploded[i].removeFromParent(true)
            }
        }, WEAPONS.TIMER_EXPLODE * 1000)
    },

    handleDamage: function () {
        // Damage player
        for (let i = 0; i < this.mapGUI.listPlayer.length; i++) {
            if (!this.mapGUI.listPlayer[i].isDestroy) {
                let player = this.mapGUI.listPlayer[i]
                let playerPos = this.mapGUI.convertIndexToPosLogic(player.currentPos)

                if (this.isDamaged(playerPos) && player.canDamage) {
                    player.damaged()
                }
            }
        }

        // Damage obstacle
        for (let i = 0; i < this.listCellExploded.length; i++) {
            this.mapGUI.damageCell(this.listCellExploded[i])
        }
    },

    isDamaged: function (pos) {
        for (let i = 0; i < this.listCellExploded.length; i++) {
            let cellPos = this.listCellExploded[i]
            if (cellPos.x === pos.x && cellPos.y === pos.y) {
                return true
            }
        }
        return false
    },

    explode: function () {
        this.loadCellExploded()
        this.explodeEffect()
        this.handleDamage()

        this.removeFromParent(true)
        this.player.numbUsedBomb -= 1
        this.mapGUI.setMapLogicType(this.pos.x, this.pos.y, MapMgr.LAND_TYPE)
    }
});

Bomb.FPS = 60