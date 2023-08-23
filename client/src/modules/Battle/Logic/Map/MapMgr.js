var MapMgr = cc.Class.extend({
    
    ctor: function () {
        this.size = MAP.SIZE

        this.data = Array.from(
            {length: this.size},
            () => Array.from(
                {length: this.size}
            )
        );

        this.init();
    },

    init: function () {
        for (let i = 0 ; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                this.data[i][j] = MAP.MATRIX_MAP[MAP.SIZE - 1 - j][i]
            }
        }
    },

    isBomb: function (x, y) {
        return this.data[x][y] === MapMgr.BOMB_TYPE
    },

    setType: function (x, y, type) {
        this.data[x][y] = type
    },

    getType: function (x, y) {
        return this.data[x][y]
    }
});

MapMgr.LAND_TYPE = 0
MapMgr.UNATTACKABLE_OBSTACLE_TYPE = 1
MapMgr.ATTACKABLE_OBSTACLE_TYPE = 2
MapMgr.BOMB_TYPE = 3

// Abilities
MapMgr.BOMP_PLUS = 4
MapMgr.POWER_BLAST_PLUS = 5
MapMgr.SPEED_PLUS = 6
MapMgr.LIFE_PLUS = 7

// Weapons
MapMgr.SHOTGUN = 8
MapMgr.HAMMER = 9
MapMgr.NO_ITEM = 10
