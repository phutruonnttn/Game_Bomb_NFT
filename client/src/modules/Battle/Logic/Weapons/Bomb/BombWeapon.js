var BombWeapon = Weapon.extend({

    ctor: function(player, pos, mapMgr, mapGUI, cellSize) {
        this._super(player, pos, mapMgr, mapGUI, cellSize, "res/noItem.png");

        this.numUse = WEAPONS.TIME_USE_BOMB
    },

    getTimeUseWeapon: function () {
        return this.numUse
    },

    attack: function () {
        let posLogic = this.mapGUI.convertIndexToPosLogic(this.player)
        if (this.checkCondition(posLogic)) {
            let bomb = new Bomb(this.player, this.mapGUI, posLogic, this.cellSize)
            bomb.setScale(
                this.cellSize / bomb.width,
                this.cellSize / bomb.height
            )
            bomb.setPosition(this.mapGUI.convertIndexToPosUI(posLogic.x, posLogic.y))
            this.mapGUI.listBomb.push(bomb)
            this.mapGUI.addChild(bomb)
        }
    },

    checkCondition: function (posLogic) {
        // Check trong o co bomb khong?
        if (this.mapGUI.isBomb(posLogic.x, posLogic.y)) {
            return false
        }

        // Check player con dat duoc bom khong?
        if  (!this.player.canBomb()) {
            return false
        }
        return true
    }
});