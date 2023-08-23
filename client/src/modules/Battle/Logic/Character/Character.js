
var Character = AnimatedSprite.extend({

    ctor: function(userId, userName, userFame, userSkin, order, currentPos, mapMgr, mapGUI, cellSize) {
        this._super("res/knight_f_run_anim_f0.png");

        this.userId = userId
        this.userName = userName
        this.userFame = userFame
        this.userSkin = userSkin
        this.order = order
        this.cellSize = cellSize
        this.mapMgr = mapMgr
        this.mapGUI = mapGUI
        this.speed = CHARACTER.SPEED_DEFAULT
        this.isDestroy = false
        this.currentPos = currentPos;

        this.scale = CHARACTER.SCALE * this.cellSize / this.width
        this.radius = this.width / 2 * this.scale
        this.canDamage = true
        this.canMove = true

        // Ability
        this.numbMaxBomb = CHARACTER.NUMB_BOMB_DEFAULT
        this.powerBlast = CHARACTER.POWER_BLAST_DEFAULT
        this.additionSpeed = CHARACTER.ADDITION_SPEED_DEFAULT
        this.numberOfLife = CHARACTER.NUMB_LIFE_DEFAULT
        this.haveShield = CHARACTER.HAVE_SHIELD_DEFAULT
        this.canPushBomb = CHARACTER.CAN_PUSH_THE_BOMB_DEFAULT
        this.isInvincibility = CHARACTER.IS_INVINCIBILITY

        this.numbUsedBomb = 0
        this.listBombPosIsNotObstacle = []

        this.timer = 0;
        this.onEffectDamaged = false;

        this.setScale(this.scale)
        this.setAnchorPoint(0.55, 0.3)
        this.initAnimation()
        this.setCascadeOpacityEnabled(false)

        // Add default weapon
        this.weapon = new BombWeapon(this, currentPos, mapMgr, mapGUI, cellSize);
        this.weapon.setPosition(this.width/2, this.height/6)
        this.addChild(this.weapon)

        this.setCascadeColorEnabled(true)

        this.initTimeUseWeapon()
        this.setPosition(this.currentPos)
    },

    initTimeUseWeapon: function () {
        let time = this.weapon.getTimeUseWeapon()

        this.labelTime = new ccui.Text(time, res.font.SVN_Supercell_Magic, 7)
        this.labelTime.setPosition(this.width / 1.5, this.height * 1.3)
        this.addChild(this.labelTime)
        this.labelTime.setVisible(false)
        this.labelTime.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER)

        if (time > 0) {
            this.labelTime.setVisible(true)
        }
    },

    updateTimeUseWeapon: function () {
        let time = this.weapon.getTimeUseWeapon()

        if (time === 0) {
            this.weapon.removeFromParent()
            this.weapon = new BombWeapon(this, this.currentPos, this.mapMgr, this.mapGUI, this.cellSize);
            this.weapon.setPosition(this.width/2, this.height/6)
            this.addChild(this.weapon)
        }

        if (time > 0) {
            this.labelTime.setString(time)
            this.labelTime.setVisible(true)
        } else {
            this.labelTime.setVisible(false)
        }
    },

    // Kiem tra xem co dat bom duoc khong
    canBomb: function () {
        return this.numbUsedBomb < this.numbMaxBomb
    },

    damaged: function () {
        this.numberOfLife --

        if (this.numberOfLife === 0) {
            this.isDestroy = true
            this.removeFromParent(true)
        } else {
            this.effectDamaged()
        }
    },

    effectDamaged: function () {
        this.canDamage = false

        let blinkAction = cc.blink(CHARACTER.TIME_UNATTACKABLE_AFTER_DAMAGED, CHARACTER.TIMES_BLINK);
        this.runAction(blinkAction);

        this.timer = 0;
        this.onEffectDamaged = true;
    },

    initAnimation: function () {
        const duration = 0.6

        this.load("res/skin/skin" + this.userSkin + "_" + this.order + ".plist",
            "skin_" + this.userSkin + "_" + this.order + "_idle_%01d.png", 0, 3, duration)
        this.load( "res/skin/skin" + this.userSkin + "_" + this.order + ".plist",
            "skin_" + this.userSkin + "_" + this.order + "_run_%01d.png", 0, 3, duration)

        this.play(0)
    },

    update: function (dt) {
        this.timer += dt;
        if (this.timer >= CHARACTER.TIME_UNATTACKABLE_AFTER_DAMAGED && this.onEffectDamaged) {
            this.canDamage = true;
            this.onEffectDamaged = false;
        }

        this.weapon.update(dt)
    },

    updateMove: function (direction, dt) {
        if (!this.canMove) {
            this.play(0)
            return
        }

        // Update character
        if(direction.x === 0) this.play(0)
        if(direction.x > 0) {
            this.play(1)
            this.setRotationY(0)
            this.labelTime.setRotationY(0)
        }
        if(direction.x < 0) {
            this.play(1)
            this.setRotationY(180)
            this.labelTime.setRotationY(180)
        }

        if (direction.x !== 0 || direction.y !== 0) {
            let displacement = cc.pMult(direction, this.speed * dt);
            let newPosX = cc.pAdd(this.currentPos, cc.p(displacement.x,0));
            this.updateMoveX(newPosX);

            let newPosY = cc.pAdd(this.currentPos, cc.p(0,displacement.y));
            this.updateMoveY(newPosY);
        }

        // Update item
        if (this.isItemCell(this.currentPos)) {
            this.updateItem(this.currentPos)
        }

        // Update z-order
        this.setLocalZOrder(MAP.SIZE - Math.floor(this.currentPos.y / this.cellSize))

        // Update weapon
        this.weapon.updatePosLogic(this.currentPos)
        this.weapon.updateDir(direction, dt)

        this.setPosition(this.currentPos)
    },

    changeWeapon: function (type) {
        this.weapon.removeFromParent()
        switch (type) {
            case MapMgr.SHOTGUN:
                this.weapon = new Gun(this, this.currentPos, this.mapMgr, this.mapGUI, this.cellSize);
                break
            case MapMgr.HAMMER:
                this.weapon = new Hammer(this, this.currentPos, this.mapMgr, this.mapGUI, this.cellSize);
                break
        }
        this.weapon.setPosition(this.width/2, this.height/6)
        this.addChild(this.weapon)
    },

    updateItem: function (point) {
        let p = this.convertIndexToPosLogic(point)
        switch (this.mapMgr.data[p.x][p.y]) {
            case MapMgr.BOMP_PLUS:
                this.numbMaxBomb++
                break
            case MapMgr.POWER_BLAST_PLUS:
                this.powerBlast++
                break
            case MapMgr.SPEED_PLUS:
                this.speed = this.speed + this.speed * CHARACTER.ADDITION_SPEED
                this.additionSpeed += CHARACTER.ADDITION_SPEED
                break
            case MapMgr.LIFE_PLUS:
                this.numberOfLife++
                break
            case MapMgr.SHOTGUN:
                this.changeWeapon(MapMgr.SHOTGUN)
                this.updateTimeUseWeapon()
                break
            case MapMgr.HAMMER:
                this.changeWeapon(MapMgr.HAMMER)
                this.updateTimeUseWeapon()
                break
        }

        let tag = p.x * 100 + p.y
        if (this.mapGUI.getChildByTag(tag)) {
            this.mapGUI.removeChildByTag(tag)
            this.mapGUI.setMapLogicType(p.x, p.y, MapMgr.LAND_TYPE)
        }
    },

    attack: function () {
        this.weapon.attack()
    },

    updateMoveX: function (newPosX) {
        this.currentPos.x = this.checkCollisionX(newPosX);
    },

    updateMoveY: function (newPosY) {
        this.currentPos.y = this.checkCollisionY(newPosY);
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

    removeBombPosIsNotObstacle: function (removePos) {
        let newList = []
        for (let i = 0; i < this.listBombPosIsNotObstacle.length; i++) {
            let pos = this.listBombPosIsNotObstacle[i]
            if (pos.x === removePos.x && pos.y === removePos.y) {
                continue
            } else {
                newList.push(pos)
            }
        }
        this.listBombPosIsNotObstacle = newList
    },

    // Check xem ô đó có phải ô vừa đặt bom không
    // Nếu đang đứng trên ô đó thì không coi bom vừa đặt là
    // vật cản cho đến khi đi ra khỏi đó
    isInListBombPosIsNotObstacle: function (x, y) {
        for (let i = 0; i < this.listBombPosIsNotObstacle.length; i++) {
            let pos = this.listBombPosIsNotObstacle[i]
            if (pos.x === x && pos.y === y) {
                return true
            }
        }
        return false
    },

    isItemCell: function (point) {
        let p = this.convertIndexToPosLogic(point)
        return this.mapMgr.data[p.x][p.y] === MapMgr.BOMP_PLUS
            || this.mapMgr.data[p.x][p.y] === MapMgr.POWER_BLAST_PLUS
            || this.mapMgr.data[p.x][p.y] === MapMgr.SPEED_PLUS
            || this.mapMgr.data[p.x][p.y] === MapMgr.LIFE_PLUS
            || this.mapMgr.data[p.x][p.y] === MapMgr.SHOTGUN
            || this.mapMgr.data[p.x][p.y] === MapMgr.HAMMER
    },

    isObstacleCell: function (x, y) {
        return (this.mapMgr.data[x][y] === MapMgr.UNATTACKABLE_OBSTACLE_TYPE
            || this.mapMgr.data[x][y] === MapMgr.ATTACKABLE_OBSTACLE_TYPE
            || this.mapMgr.data[x][y] === MapMgr.BOMB_TYPE)
            && !this.isInListBombPosIsNotObstacle(x, y)
    },

    // Xét cả trường hợp kích thước nhân vật lớn hơn 1 ô
    checkCollisionX: function (newPos) {
        let l = Math.floor((newPos.x - this.radius) / this.cellSize);
        let r = Math.floor((newPos.x + this.radius) / this.cellSize);

        let u = Math.floor((newPos.y + this.radius) / this.cellSize);
        let d = Math.floor((newPos.y - this.radius) / this.cellSize);

        for (let i = l; i <= r; i++){
            if (this.isObstacleCell(i,u)){
                let tmp = this.convertIndexToPosUI(i,u).x;
                return this.getCorrectPos(tmp, this.currentPos.x);
            }
            if (this.isObstacleCell(i,d)){
                let tmp = this.convertIndexToPosUI(i,d).x;
                return this.getCorrectPos(tmp, this.currentPos.x);
            }
        }
        for (let i = d; i <= u; i++){
            if (this.isObstacleCell(l,i)){
                let tmp = this.convertIndexToPosUI(l,i).x;
                return this.getCorrectPos(tmp, this.currentPos.x);
            }
            if (this.isObstacleCell(r,i)){
                let tmp = this.convertIndexToPosUI(r,i).x;
                return this.getCorrectPos(tmp, this.currentPos.x);
            }
        }
        return newPos.x;
    },

    // Xét cả trường hợp kích thước nhân vật lớn hơn 1 ô
    checkCollisionY: function (newPos) {
        let l = Math.floor((newPos.x - this.radius) / this.cellSize);
        let r = Math.floor((newPos.x + this.radius) / this.cellSize);

        let u = Math.floor((newPos.y + this.radius) / this.cellSize);
        let d = Math.floor((newPos.y - this.radius) / this.cellSize);
        
        for (let i = l; i <= r; i++){
            if (this.isObstacleCell(i,u)){
                let tmp = this.convertIndexToPosUI(i,u).y;
                return this.getCorrectPos(tmp, this.currentPos.y);
            }
            if (this.isObstacleCell(i,d)){
                let tmp = this.convertIndexToPosUI(i,d).y;
                return this.getCorrectPos(tmp, this.currentPos.y);
            }
        }
        for (let i = d; i <= u; i++){
            if (this.isObstacleCell(l,i)){
                let tmp = this.convertIndexToPosUI(l,i).y;
                return this.getCorrectPos(tmp, this.currentPos.y);
            }
            if (this.isObstacleCell(r,i)){
                let tmp = this.convertIndexToPosUI(r,i).y;
                return this.getCorrectPos(tmp, this.currentPos.y);
            }
        }
        return newPos.y;
    },

    getCorrectPos: function (posVC, posPlayer) {
        if (posVC > posPlayer) {
            return posVC - this.cellSize / 2 - this.radius - 1;
        } else{
            return posVC + this.cellSize / 2 + this.radius + 1;
        }
    }
});