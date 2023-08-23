var Weapon = cc.Sprite.extend({

    ctor: function(player, pos, mapMgr, mapGUI, cellSize, res) {
        this._super(res);

        this.player = player
        this.currentPos = pos;
        this.mapMgr = mapMgr;
        this.mapGUI = mapGUI;
        this.cellSize = cellSize
        this.curDir = cc.p(1,0);

        this.setScale(0.6)
        this.setAnchorPoint(0, 0.1)
    },

    updateDir: function (direction, dt) {
        if (direction.x === 0 && direction.y === 0) return;
        let angle = cc.pToAngle(direction);
        this.curDir = direction;

        if (direction.x >= 0) {
            this.setRotation(- angle / Math.PI * 180);
        }

        if (direction.x < 0) {
            this.setRotation(-180 + angle / Math.PI * 180);
        }
    },

    updatePosLogic: function (currentPos) {
        this.currentPos = currentPos;
    },

    attack: function () {
    },

    getTimeUseWeapon: function () {
    },

    update: function (dt) {
    }
});