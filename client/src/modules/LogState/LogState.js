var LogState = cc.Class.extend({

    ctor: function () {
        this.flag = false;
        this.dirState = "../logClient/logState/user" + gv.user.id + "/"
        this.dirSumState = "../logClient/logSumState/user" + gv.user.id + "/"
        jsb.fileUtils.createDirectory(this.dirState)
        jsb.fileUtils.createDirectory(this.dirSumState)

        this.deltaPlayer = 0.1;
        this.deltaBomb = 0.1;
        this.deltaBullet = 0.1;
        this.deltaMap = 0.1;
    },

    logToFile: function (gameMgr, countLoop) {
        let content = ""

        // Log player's position
        content += "\nPlayer: [x - y - numBomb - powerBlast - numberOfLife - speed]"
        let sumPlayer = 0
        for (let i = 0; i < gameMgr.listPlayer.length; i++) {
            content += "\n" + i + ". ["
                + gameMgr.listPlayer[i].currentPos.x.toFixed(3) + " - "
                + gameMgr.listPlayer[i].currentPos.y.toFixed(3) + "-"
                + gameMgr.listPlayer[i].numbMaxBomb + "-"
                + gameMgr.listPlayer[i].powerBlast + "-"
                + gameMgr.listPlayer[i].numberOfLife + "-"
                + gameMgr.listPlayer[i].speed.toFixed(3) + "]"

            sumPlayer += gameMgr.listPlayer[i].currentPos.x
                + gameMgr.listPlayer[i].currentPos.y
                + gameMgr.listPlayer[i].numbMaxBomb
                + gameMgr.listPlayer[i].powerBlast
                + gameMgr.listPlayer[i].numberOfLife
                + gameMgr.listPlayer[i].speed
        }

        // Log list bomb
        content += "\n\nBomb: [userID - x - y - timer]";
        let sumBomb = 0;
        for (let i = 0; i < gameMgr.listBomb.length; i++) {
            content += "\n" + i + ". ["
                + gameMgr.listBomb[i].player.userId + " - "
                + gameMgr.listBomb[i].pos.x.toFixed(3) + " - "
                + gameMgr.listBomb[i].pos.y.toFixed(3) + " - "
                + gameMgr.listBomb[i].timer.toFixed(3) + "]";

            sumBomb += gameMgr.listBomb[i].player.userId
                + gameMgr.listBomb[i].pos.x
                + gameMgr.listBomb[i].pos.y
                + gameMgr.listBomb[i].timer;
        }

        // Log list bullet
        content += "\n\nBullet: [userID - x - y - isDestroy]";
        let sumBullet = 0;
        for (let i = 0; i < gameMgr.listBullet.length; i++) {
            content += "\n" + i + ". ["
                + gameMgr.listBullet[i].player.userId + " - "
                + gameMgr.listBullet[i].currentPos.x.toFixed(3) + " - "
                + gameMgr.listBullet[i].currentPos.y.toFixed(3) + " - "
                + gameMgr.listBullet[i].isDestroy + "]";

            sumBullet += gameMgr.listBullet[i].player.userId
                + gameMgr.listBullet[i].currentPos.x
                + gameMgr.listBullet[i].currentPos.y;
        }

        // Log map state
        content += "\n\nMap logic:";
        let sumMap = 0;
        for (let i = 0 ; i < gameMgr.mapMgr.size; i++) {
            content += "\n[";
            for (let j = 0; j < gameMgr.mapMgr.size; j++) {
                sumMap += gameMgr.mapMgr.data[i][j];
                content += gameMgr.mapMgr.data[i][j];
                if ( j !== gameMgr.mapMgr.size - 1) {
                    content += " - ";
                }
            }
            content += "]";
        }

        // Get path
        let pathState = this.dirState + "/"+ countLoop +"-client-stateFrame.txt"
        let pathSumState = this.dirSumState + "/"+ countLoop +"-client-sumStateFrame.txt"

        this.dirSumStateServer = "../logServer/logSumState/"
        let pathSumStateServer = this.dirSumStateServer + "/"+ countLoop +"-server-sumStateFrame.txt"

        // Compare with server state
        let sumStateServer = jsb.fileUtils.getStringFromFile(pathSumStateServer)
        let sum = sumStateServer.split("\n");
        let svSumPlayer = Number(sum[0])
        let svSumBomb = Number(sum[1])
        let svSumBullet = Number(sum[2])
        let svSumMap = Number(sum[3])

        this.logError(sumPlayer, svSumPlayer, countLoop, "Player", this.deltaPlayer)
        this.logError(sumBomb, svSumBomb, countLoop, "Bomb", this.deltaBomb)
        this.logError(sumBullet, svSumBullet, countLoop, "Bullet", this.deltaBullet)
        this.logError(sumMap, svSumMap, countLoop, "Map", this.deltaMap)

        // Round
        sumPlayer = Utils.round(sumPlayer).toFixed(3);
        sumBomb = Utils.round(sumBomb).toFixed(3);
        sumBullet = Utils.round(sumBullet).toFixed(3);
        sumMap = Utils.round(sumMap).toFixed(3);
        let contentSum = sumPlayer + "\n" + sumBomb + "\n" + sumBullet + "\n" + sumMap;

        // Log state to file
        jsb.fileUtils.writeStringToFile(content, pathState);
        jsb.fileUtils.writeStringToFile(contentSum, pathSumState);
    },

    logError: function (client, server, countLoop, txt, delta) {
        if (Math.abs(client - server) > delta) {
            cc.log("\n" + txt + " - USER " + gv.user.id + " - ERROR STATE AT FRAME: " + countLoop + ", " + Math.abs(client - server) + "\n")

            switch (txt) {
                case "Player": {
                    this.deltaPlayer = delta + Math.abs(client - server)
                    break
                }
                case "Bomb": {
                    this.deltaBomb = delta + Math.abs(client - server)
                    break
                }
                case "Bullet": {
                    this.deltaBullet = delta + Math.abs(client - server)
                    break
                }
                case "Map": {
                    this.deltaMap = delta + Math.abs(client - server)
                    break
                }
            }
        }
    }
})

var _logState;
LogState.getInstance = function () {
    if (_logState === undefined)
        _logState = new LogState();
    return _logState;
}