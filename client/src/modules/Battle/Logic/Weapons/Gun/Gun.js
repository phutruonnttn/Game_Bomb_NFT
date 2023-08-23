var Gun = Weapon.extend({

    ctor: function(player, pos, mapMgr, mapGUI, cellSize) {
        this._super(player, pos, mapMgr, mapGUI, cellSize, "res/gun.png");

        this.numUse = WEAPONS.TIME_USE_GUN
        this.width = WEAPONS.WIDTH_GUN;
    },

    getTimeUseWeapon: function () {
        return this.numUse
    },

    attack: function () {
        this.createBullet(this.player, this.curDir)
        this.numUse -= 1
        this.player.updateTimeUseWeapon()
    },

    createBullet: function (player, dirBullet) {
        // Tinh pos dau sung
        let pos = new cc.p(this.currentPos.x, this.currentPos.y);
        let dir = new cc.p(this.curDir.x, this.curDir.y);
        dir = cc.pNormalize(dir)
        pos = cc.pAdd(pos, cc.pMult(dir, this.width / 2))

        // Add bullet
        let bullet = new Bullet(player, pos, dirBullet, this.mapGUI, this.cellSize)
        this.mapGUI.listBullet.push(bullet)
        this.mapGUI.addChild(bullet)
    },
});