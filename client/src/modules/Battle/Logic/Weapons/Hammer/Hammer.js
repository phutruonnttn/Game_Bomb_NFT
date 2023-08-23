var Hammer = Weapon.extend({

    ctor: function(player, pos, mapMgr, mapGUI, cellSize) {
        this._super(player, pos, mapMgr, mapGUI, cellSize, "res/hammer.png");

        this.numUse = WEAPONS.TIME_USE_HAMMER
        this.timer = 0
        this.onAnim = false
        this.posTakeDame = {}
    },

    getTimeUseWeapon: function () {
        return this.numUse
    },

    attack: function () {
        if (this.onAnim) return;
        let posLogic = this.mapGUI.convertIndexToPosLogic(this.player)

        this.posTakeDame = posLogic
        if (this.curDir.x > 0) {
            this.posTakeDame.x++
        } else if (this.curDir.x < 0) {
            this.posTakeDame.x--
        }

        if (this.curDir.y > 0) {
            this.posTakeDame.y++
        } else if (this.curDir.y < 0) {
            this.posTakeDame.y--
        }

        let originScale = this.getScale()

        this.player.canMove = false;
        this.timer = 0;
        this.onAnim = true;
        this.runAction(
            cc.sequence(
                cc.scaleTo(0, 0.8),
                cc.rotateBy(0.3, -15),
                cc.rotateBy(0.4, 60),
                cc.rotateBy(0.1, -45),
                cc.scaleTo(0, originScale)
            )
        )
    },

    handleDamage: function (posTakeDame) {
        let isDamage = false
        // Damage player
        for (let i = 0; i < this.mapGUI.listPlayer.length; i++) {
            if (!this.mapGUI.listPlayer[i].isDestroy) {
                let player = this.mapGUI.listPlayer[i]
                let playerPos = this.mapGUI.convertIndexToPosLogic(player.currentPos)

                if (posTakeDame.x === playerPos.x && posTakeDame.y === playerPos.y && player.canDamage) {
                    player.damaged()
                    isDamage = true
                }
            }
        }

        // Damage obstacle
        if (this.mapGUI.getMapLogicType(posTakeDame.x, posTakeDame.y) === MapMgr.ATTACKABLE_OBSTACLE_TYPE) {
            isDamage = true
            this.mapGUI.damageCell(posTakeDame)
        }

        return isDamage
    },

    damageEffect: function (pos) {
        // Add effect
        let exploded = new cc.Sprite("res/flame3.png")
        exploded.setScale(
            this.cellSize * 1.3 / exploded.width,
            this.cellSize * 1.3 / exploded.height
        )
        exploded.setPosition(this.mapGUI.convertIndexToPosUI(pos.x, pos.y))
        this.mapGUI.addChild(exploded, 1000)

        // No xong bien mat
        setTimeout(()=>{
            exploded.removeFromParent(true)
        }, WEAPONS.HAMMER_TIME_EXPLODE * 1000)
    },

    update: function (dt) {
        this.timer += dt;
        if (this.timer >= 0.8 && this.onAnim) {
            let isDamage = this.handleDamage(this.posTakeDame)
            if (isDamage) {
                this.damageEffect(this.posTakeDame)
            }

            this.player.canMove = true;
            this.numUse -= 1;
            this.player.updateTimeUseWeapon();

            this.onAnim = false;
        }
    }
});