var Bullet = cc.Sprite.extend({

    ctor: function(player, pos, direction, mapGUI, cellSize) {
        this._super("res/bullet.png");
        this.setScale(3)
        this.radius = this.width / 2;
        this.isDestroy = false
        this.active = true;
        this.player = player;
        this.currentPos = pos;
        this.speed = WEAPONS.BULLET_SPEED
        this.cellSize = cellSize

        this.mapGUI = mapGUI;
        this.direction = direction;
        this.disMove = 0; //quang duong di chuyen

        this.obsTakeDame = {}
    },

    update: function (dt) {
        let displacement = cc.pMult(this.direction, this.speed * dt);
        let newPos = cc.pAdd(this.currentPos, cc.p(displacement.x, displacement.y));

        this.disMove += Utils.round(cc.pDistance(newPos, this.currentPos));
        if (this.checkCollision(newPos)) {
            this.isDestroy = true;
            this.removeFromParent(true)
        } else {
            this.currentPos = newPos;
            this.setPosition(this.currentPos)
        }
    },

    getIntVector: function (p) {
        let x = parseInt(p.x);
        let y = parseInt(p.y);
        return new cc.p(x, y)
    },

    getPointInsideRectangle: function (point, centerRectangle, width, height) {
        point = this.getIntVector(point);
        centerRectangle = this.getIntVector(centerRectangle);
        let intersection = null;
        if(point.x >= centerRectangle.x-width/2 && point.x <= centerRectangle.x +width/2
            && point.y >= centerRectangle.y - height/2 && point.y <= centerRectangle.y + height/2){
            intersection = new cc.p(point.x, point.y);
        }
        return intersection;
    },

    // (p0,p1) (q0, q1) la 2 diem dau va cuoi cua doan thang
    getTwoLineIntersection: function (p0, p1, q0, q1) {
        p0 = this.getIntVector(p0);
        p1 = this.getIntVector(p1);
        q0 = this.getIntVector(q0);
        q1 = this.getIntVector(q1);

        let AB = cc.pSub(p1, p0); // vector AB
        let CD = cc.pSub(q1, q0); // vector CD
        let n1 = cc.p(-AB.y, AB.x); // vector pháp tuyến của AB
        let n2 = cc.p(-CD.y, CD.x); // vector pháp tuyến của CD

        // Tính giao điểm của hai đường thẳng
        let d1 = cc.pDot(n1, p0); // hằng số d của AB
        let d2 = cc.pDot(n2, q0); // hằng số d của CD

        let det = cc.pCross(n1, n2);
        if (det == 0) {
            // hai đường thẳng song song, không có điểm giao nhau
            return null;
        } else {
            // intersection là điểm giao nhau của hai đường thẳng AB và CD
            let intersection = cc.p(-(d2 * AB.x - d1 * CD.x) / det, -(d2 * AB.y - d1 * CD.y) / det);
            let x = intersection.x
            let y= intersection.y

            // Kiểm tra xem giao điểm có nằm trên cả hai đoạn thẳng hay không
            if (x < Math.min(p0.x, p1.x) ||
                x > Math.max(p0.x, p1.x) ||
                x < Math.min(q0.x, q1.x) ||
                x > Math.max(q0.x, q1.x) ||
                y < Math.min(p0.y, p1.y) ||
                y > Math.max(p0.y, p1.y) ||
                y < Math.min(q0.y, q1.y) ||
                y > Math.max(q0.y, q1.y)
            ) {
                // Giao điểm không nằm trên cả hai đoạn thẳng
                return null;
            } else {
                // Giao điểm nằm trên cả hai đoạn thẳng
                return new cc.p(x,y);
            }
        }
    },

    // (p0,p1) la 2 diem dau va cuoi cua doan thang
    getIntersectionLineAndRectangle: function (p0, p1, centerRectangle, width, height) {
        p0 = this.getIntVector(p0);
        p1 = this.getIntVector(p1);
        centerRectangle = this.getIntVector(centerRectangle);
        let intersection = null;
        let p11 = new cc.p(p1.x, p1.y);
        let lu = new cc.p(centerRectangle.x - width/2, centerRectangle.y+height/2);
        let ld = new cc.p(centerRectangle.x - width/2, centerRectangle.y-height/2);
        let ru = new cc.p(centerRectangle.x + width/2, centerRectangle.y+height/2);
        let rd = new cc.p(centerRectangle.x + width/2, centerRectangle.y-height/2);
        let d1 = this.getTwoLineIntersection(p0, p11, lu, ld);
        if(d1 != null){
            intersection = new cc.p(d1.x, d1.y);
            p11 = new cc.p(d1.x, d1.y);
        }
        let d2 = this.getTwoLineIntersection(p0, p11, lu, ru);
        if(d2 != null){
            intersection = new cc.p(d2.x, d2.y);;
            p11 = d2;
        }
        let d3 = this.getTwoLineIntersection(p0, p11, rd, ld);
        if(d3 != null){
            intersection = new cc.p(d3.x, d3.y);;
            p11 = d3;
        }
        let d4 = this.getTwoLineIntersection(p0, p11, rd, ru);
        if(d4 != null){
            intersection = new cc.p(d4.x, d4.y);;
        }
        return intersection;
    },

    getIntersectionWithObstacle: function (p00, p11) {
        let p0 = this.getIntVector(p00);
        let p1 = this.getIntVector(p11);
        let intersection = null;
        let disMin = 99999;
        let dis1 = Utils.round(cc.pDistance(p0, p1));

        let listObs = this.mapGUI.getListCurrentObstacle()
        for (let i=0; i < listObs.length; i++){
            let gd = null;
            let posBlock = this.mapGUI.convertIndexToPosUI(listObs[i].x, listObs[i].y);
            if (Utils.round(cc.pDistance(p1, posBlock)) > (dis1 + this.cellSize)) continue;
            let g1 = this.getPointInsideRectangle(p1, posBlock, this.cellSize, this.cellSize);
            if(g1 != null) gd = g1;
            let g2 = this.getIntersectionLineAndRectangle(p0, p1, posBlock, this.cellSize, this.cellSize);
            if(g2 != null) gd = g2;
            if(gd != null){
                let dis = Utils.round(cc.pDistance(p0, gd));
                if (dis < disMin) {
                    intersection = gd;
                    disMin = dis;
                    this.obsTakeDame = listObs[i]
                }
            }
        }
        return intersection;
    },

    getIntersectionWithOtherPlayer: function (p0, p1) {
        let intersection = null;
        let disMin = 99999;
        let retPlayerId = null;
        let dis1 = Utils.round(cc.pDistance(p0, p1));

        for (let i = 0; i < this.mapGUI.listPlayer.length; i++) {
            if (!this.mapGUI.listPlayer[i].isDestroy) {
                let playerTakeDamage = this.mapGUI.listPlayer[i]
                if (!playerTakeDamage.isDestroy && playerTakeDamage.userId !== this.player.userId) {
                    let gd = null;
                    let posEnemy = new cc.p(playerTakeDamage.currentPos.x, playerTakeDamage.currentPos.y);

                    if (Utils.round(cc.pDistance(p1, posEnemy)) > (dis1 + this.cellSize)) continue;

                    let widthPlayer = playerTakeDamage.width * playerTakeDamage.scale
                    let heightPlayer = playerTakeDamage.height * playerTakeDamage.scale

                    let g1 = this.getPointInsideRectangle(p1, posEnemy, widthPlayer, heightPlayer);
                    if (g1 != null) {
                        gd = g1;
                    } else {
                        let g2 = this.getIntersectionLineAndRectangle(p0, p1, posEnemy, widthPlayer, heightPlayer);
                        if (g2 != null) gd = g2;
                    }
                    if (gd != null) {
                        let dis = Utils.round(cc.pDistance(p0, gd));
                        if (dis < disMin) {
                            intersection = gd
                            disMin = dis;
                            retPlayerId = playerTakeDamage.userId;
                        }
                    }
                }
            }
        }

        if (intersection != null) {
            return {
                "intersection": intersection,
                "userId": retPlayerId
            };
        }
        return null;
    },

    checkCollision: function (newPos) {
        let p1 = new cc.p(this.currentPos.x, this.currentPos.y)
        let p2 = new cc.p(newPos.x, newPos.y)

        let tmp = false;

        // Check collision with block
        let gdBlock = this.getIntersectionWithObstacle(p1, p2);
        if(gdBlock != null) {
            p2 = gdBlock;
            tmp = true;
        }

        //check collision voi players
        let playerTakeDamage = this.getIntersectionWithOtherPlayer(p1, p2);
        if (playerTakeDamage !== null) {
            let posTakeDamage = playerTakeDamage.intersection
            let playerId = playerTakeDamage.userId

            this.currentPos = posTakeDamage;
            this.handleDamagePlayer(playerId)

            return true;
        }

        //neu collision voi block ma ko collision voi enemy
        if (tmp) {
            this.currentPos = gdBlock;
            this.handleDamageObstacle(this.obsTakeDame)
            return true;
        }

        // Khi bullet di ra ngoai bien
        if (newPos.x < this.cellSize){
            return true;
        }

        if (newPos.x > this.cellSize * MAP.SIZE){
            return true;
        }

        if (newPos.y < this.cellSize){
            return true;
        }

        if (newPos.y > this.cellSize * MAP.SIZE){
            return true;
        }

        return false;
    },

    handleDamageObstacle: function (pos) {
        if (this.mapGUI.getMapLogicType(pos.x, pos.y) === MapMgr.ATTACKABLE_OBSTACLE_TYPE) {
            this.showEffect(this.obsTakeDame)
        }
        this.mapGUI.damageCell(pos)
    },

    handleDamagePlayer: function (playerID) {
        for (let i = 0; i < this.mapGUI.listPlayer.length; i++) {
            if (!this.mapGUI.listPlayer[i].isDestroy) {
                let iPlayer = this.mapGUI.listPlayer[i]
                if (iPlayer.userId === playerID) {
                    if (iPlayer.canDamage) {
                        iPlayer.damaged()
                        this.showEffect(this.mapGUI.convertIndexToPosLogic(iPlayer.currentPos))
                    }
                    return
                }
            }
        }
    },

    showEffect: function (pos) {
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
        }, WEAPONS.BULLET_TIME_EXPLODE * 1000)
    }
});