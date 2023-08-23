package battle;

import battle.model.BattleAction;
import battle.model.Character;
import battle.model.Coordinate;
import battle.model.RandomCustom;
import battle.model.weapons.bomb.Bomb;
import battle.model.weapons.gun.Bullet;
import bitzero.server.entities.User;
import cmd.request.battle.RequestBattleAction;
import config.DisplaySize.DisplaySizeConfig;
import config.battle.BattleConfig;
import config.battle.MapConfig;
import config.battle.SynchronizeConfig;
import cmd.CmdDefine;
import logState.LogState;
import util.battle.BattleUtils;

import java.util.*;

public class BattleMgr {

    public int[] userIds;
    public String[] userNames;
    public int[] userFame;
    public int[] userSkins;
    public int mapSize;
    public int[][] mapMatrix;
    public int countFrame;
    public double timeCountDown;
    public int countReceiveAction;
    public ArrayList<ArrayDeque<BattleAction>> queueAction;
    public List<BattleAction> listActionResponse;
    public RandomCustom randomCustom;
    public MapLogic mapMgr;
    public double cellSize;
    public double width;
    public double height;
    public ArrayList<Bullet> listBullet;
    public ArrayList<Character> listPlayer;
    public ArrayList<Bomb> listBomb;
    public ArrayList<User> listUser;
    public ArrayList<Coordinate> directionFromServer;
    public int idGame;

    public BattleMgr(
            int idGame,
            ArrayList<User> listUser,
            int[] userIDs, String[] userNames, int[] userFame,
            int[] userSkins, int mapSize, int[][] mapMatrix, int randomSeed
    ) {
        this.idGame = idGame;
        this.listUser = new ArrayList<>();
        for (int i = 0; i < listUser.size(); i++) {
            this.listUser.add(listUser.get(i));
        }

        this.userIds = userIDs;
        this.userNames = userNames;
        this.userFame = userFame;
        this.userSkins = userSkins;
        this.mapSize = mapSize;
        this.mapMatrix = mapMatrix;
        this.randomCustom = new RandomCustom(randomSeed);

        // Init stat
        countFrame = 0;
        timeCountDown = BattleConfig.INIT_TIME_COUNT_DOWN;
        countReceiveAction= 0;
        this.directionFromServer = new ArrayList<>();
        for (int i = 0; i < 4; i++) {
            this.directionFromServer.add(new Coordinate(0,0));
        }

        // Init queue
        queueAction = new ArrayList<>();
        for (int i = 0; i < 4; i++) {
            ArrayDeque<BattleAction> queue = new ArrayDeque<>();
            queueAction.add(queue);
        }
        listActionResponse = Collections.synchronizedList(new ArrayList<>());

        // Init map
        this.mapMgr = new MapLogic();
        this.cellSize = DisplaySizeConfig.HEIGHT / MapConfig.SIZE;

        this.width = this.mapMgr.size * this.cellSize;
        this.height = this.mapMgr.size * this.cellSize;

        // Init list bullets
        this.listBullet = new ArrayList<>();

        // Init list bombs
        this.listBomb = new ArrayList<>();

        // Add list player
        this.listPlayer = new ArrayList<>();

        for (int i = 0; i < 4; i++) {
            Character iPlayer = new Character(
                    userIds[i],
                    userNames[i],
                    userFame[i],
                    userSkins[i],
                    i,
                    this.getPosUIPlayerByOrder(i),
                    this.mapMgr,
                    this,
                    cellSize
            );

            this.listPlayer.add(iPlayer);
        }
    }

    // Lay vi tri bat dau cua user theo thu tu
    // 0: Vị trí trái trên
    // 1: Vị trí phải trên
    // 2: Vị trí phải dưới
    // 3: Vị trí trái dưới
    public Coordinate getPosUIPlayerByOrder(int order) {
        switch (order) {
            case 0:
                return this.convertIndexToPosUI(1, MapConfig.SIZE - 2);
            case 1:
                return this.convertIndexToPosUI(MapConfig.SIZE - 2, MapConfig.SIZE - 2);
            case 2:
                return this.convertIndexToPosUI(MapConfig.SIZE - 2, 1);
            case 3:
                return this.convertIndexToPosUI(1, 1);
        }
        return null;
    }

    public Coordinate convertIndexToPosUI(int corX, int corY) {
        double x = corX * this.cellSize + this.cellSize / 2;
        double y = corY * this.cellSize + this.cellSize / 2;
        return new Coordinate(x, y);
    }

    public Coordinate convertIndexToPosLogic(Coordinate cor) {
        double x = Math.floor(cor.getX() / this.cellSize);
        double y = Math.floor(cor.getY() / this.cellSize);
        return new Coordinate(x, y);
    }

    public boolean isBomb(int x, int y) {
        return this.mapMgr.isBomb(x,y);
    }

    public void setMapLogicType(int x, int y, int type) {
        this.mapMgr.setType(x, y, type);
    }

    public int getMapLogicType(int x, int y) {
        return this.mapMgr.getType(x, y);
    }

    public void damageCell(Coordinate pos) {
        if (this.getMapLogicType((int) pos.getX(),(int) pos.getY()) == MapConfig.ATTACKABLE_OBSTACLE_TYPE) {
            this.setRandomItem((int) pos.getX(), (int) pos.getY());
        }
    }

    public void setRandomItem(int x, int y) {
        // random = 5 -> 10 (10 la khong co item)
        int random = (int) Math.floor(this.randomCustom.getRandom() * 7) + 4;

        if (random != MapConfig.NO_ITEM) {
            this.setMapLogicType(x,y,random);
        } else {
            this.setMapLogicType(x, y, MapConfig.LAND_TYPE);
        }
    }

    public void updateBombs(double dt) {
        ArrayList<Bomb> newListBomb = new ArrayList<>();
        for (int i = 0; i < listBomb.size(); i++) {
            listBomb.get(i).update(dt);

            if (!listBomb.get(i).isDestroy) {
                newListBomb.add(listBomb.get(i));
            }
        }

        listBomb = newListBomb;
    }

    public void updateBullets(double dt) {
        ArrayList<Bullet> newListBullet = new ArrayList<>();
        for (int i = 0; i < listBullet.size(); i++) {
            listBullet.get(i).update(dt);

            if (!listBullet.get(i).isDestroy) {
                newListBullet.add(listBullet.get(i));
            }
        }

        listBullet = newListBullet;
    }

    public ArrayList<Coordinate> getListCurrentObstacle() {
        ArrayList<Coordinate> listObs = new ArrayList<>();

        for (int i = 0; i < this.mapMgr.size; i++) {
            for (int j = 0; j < this.mapMgr.size; j++) {
                if (this.getMapLogicType(i,j) == MapConfig.UNATTACKABLE_OBSTACLE_TYPE
                        || this.getMapLogicType(i,j) == MapConfig.ATTACKABLE_OBSTACLE_TYPE) {
                    listObs.add(new Coordinate(i,j));
                }
            }
        }

        return listObs;
    }

    public void updateCountFrame() {
        this.countFrame++;
    }

    public void updateTimeCountDown(double dt) {
        this.timeCountDown -= dt;
    }

    public void addActionToQueue(ArrayDeque<BattleAction> queueAction, BattleAction battleAction) {
        if (queueAction.size() == SynchronizeConfig.MAX_USER_ACTION) {
            queueAction.removeFirst();
        }
        queueAction.addLast(battleAction);
    }

    public void addUserBattleAction(User user, int cmdID, RequestBattleAction actionArguments) {
        countReceiveAction++;
        BattleAction battleAction = new BattleAction(user, cmdID, countReceiveAction, actionArguments);

        for (int i = 0; i < 4; i++) {
            if (this.userIds[i] == user.getId()) {
                addActionToQueue(queueAction.get(i), battleAction);
                break;
            }
        }
    }

    public void runAction(BattleAction battleAction) {
        try {
            switch (battleAction.cmdID) {
                case CmdDefine.MOVE:{
                    handleActionMove(battleAction);
                    break;
                }
                case CmdDefine.ATTACK:{
                    handleActionAttack(battleAction);
                    break;
                }
                case CmdDefine.GET_ITEM: {
                    handleActionGetItem(battleAction);
                    break;
                }

            }
        } catch (Exception e) {
            System.out.println(e);
        }
    }

    private void handleActionGetItem(BattleAction battleAction) {
    }

    private void handleActionAttack(BattleAction battleAction) {
        for (int i = 0; i < this.listPlayer.size(); i++) {
            if (this.listPlayer.get(i).userId == battleAction.user.getId()) {
                this.listPlayer.get(i).attack();
                break;
            }
        }

        listActionResponse.add(battleAction);
    }

    private void handleActionMove(BattleAction battleAction) {
        Coordinate direction = new Coordinate(0,0);
        if (battleAction.actionArguments.isUp) {
            direction = new Coordinate(direction.getX() + BattleConfig.UP_DIRECTION.getX(),
                    direction.getY() + BattleConfig.UP_DIRECTION.getY());
        }
        if (battleAction.actionArguments.isDown) {
            direction = new Coordinate(direction.getX() + BattleConfig.DOWN_DIRECTION.getX(),
                    direction.getY() + BattleConfig.DOWN_DIRECTION.getY());
        }
        if (battleAction.actionArguments.isLeft) {
            direction = new Coordinate(direction.getX() + BattleConfig.LEFT_DIRECTION.getX(),
                    direction.getY() + BattleConfig.LEFT_DIRECTION.getY());
        }
        if (battleAction.actionArguments.isRight) {
            direction = new Coordinate(direction.getX() + BattleConfig.RIGHT_DIRECTION.getX(),
                    direction.getY() + BattleConfig.RIGHT_DIRECTION.getY());
        }

        if (direction.getX() != 0 || direction.getY() != 0) {
            direction = BattleUtils.getInstance().normalizeVector(direction);
        }

        for (int i = 0; i < this.listPlayer.size(); i++) {
            if (this.listPlayer.get(i).userId == battleAction.user.getId()) {
                this.directionFromServer.set(i, direction);
                break;
            }
        }

        listActionResponse.add(battleAction);
    }

    public void handleMoveLoop(double dt) {
        for (int i = 0; i < this.listPlayer.size(); i++) {
            if (!this.listPlayer.get(i).isDestroy) {
                this.listPlayer.get(i).updateMove(this.directionFromServer.get(i), dt);
            }
        }
    }

    private boolean checkHaveAction() {
        for (int i = 0; i < queueAction.size(); i++) {
            if (queueAction.get(i).size() > 0) {
                return true;
            }
        }
        return false;
    }

    private BattleAction getEarliestActionFromQueue() {
        int countAct = SynchronizeConfig.MAX_COUNT_RECEIVE_ACTION;
        int resIndex = -1;

        for (int i = 0; i < queueAction.size(); i++) {
            if (queueAction.get(i).size() > 0) {
                if (queueAction.get(i).getFirst().countReceiveAction < countAct) {
                    countAct = queueAction.get(i).getFirst().countReceiveAction;
                    resIndex = i;
                }
            }
        }

        BattleAction resAction = queueAction.get(resIndex).getFirst();
        queueAction.get(resIndex).removeFirst();

        return resAction;
    }

    public void handleAction() {
        while (checkHaveAction()){
            runAction(getEarliestActionFromQueue());
        }
    }

    public boolean checkEndBattle() {
        if (this.timeCountDown <= 0) {
            return true;
        }
        int countUserDestroy = 0;
        for (int i = 0; i < this.listPlayer.size(); i++) {
            if (this.listPlayer.get(i).isDestroy) {
                countUserDestroy++;
            }
        }
        return countUserDestroy >= 3;
    }

    public void updatePlayer(double dt){
        for (Character character : this.listPlayer) {
            if (!character.isDestroy) {
                character.update(dt);
            }

        }
    }

    public void update(double dt, boolean doHandleAction){
        this.updateTimeCountDown(dt);
        this.updateCountFrame();
        if (doHandleAction) {
            handleAction();
        }

        this.updateBullets(dt);
        this.updateBombs(dt);
        this.updatePlayer(dt);

        // Ghi log ra file
//        LogState.getInstance().logToFile(this, this.countFrame);
    }
}