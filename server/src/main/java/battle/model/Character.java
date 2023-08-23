package battle.model;

import battle.BattleMgr;
import battle.MapLogic;
import battle.model.weapons.Weapon;
import battle.model.weapons.bomb.BombWeapon;
import battle.model.weapons.gun.Gun;
import battle.model.weapons.hammer.Hammer;
import config.battle.CharacterConfig;
import config.battle.MapConfig;

import java.util.ArrayList;

public class Character {
    public int userId;
    public String userName;
    public int userFame;
    public int userSkin;
    public int order;
    public double cellSize;
    public MapLogic mapMgr;
    public BattleMgr battleMgr;
    public Coordinate currentPos;

    public double speed;
    public boolean isDestroy;
    public double scale;
    public double radius;
    public boolean canDamage;
    public boolean canMove;
    public double width;

    public int numbMaxBomb;
    public int powerBlast;
    public int additionSpeed;
    public int numberOfLife;
    public boolean haveShield;
    public boolean canPushBomb;
    public boolean isInvincibility;

    public int numbUsedBomb;
    public ArrayList<Coordinate> listBombPosIsNotObstacle;
    public Weapon weapon;

    public double timer;
    public boolean onEffectDamaged;
    public double height;

    public Character(
            int userId, String userName, int userFame, int userSkin, int order,
            Coordinate currentPos, MapLogic mapMgr, BattleMgr battleMgr,
            double cellSize
    ) {
        this.userId = userId;
        this.userName = userName;
        this.userFame = userFame;
        this.userSkin = userSkin;
        this.order = order;
        this.cellSize = cellSize;
        this.mapMgr = mapMgr;
        this.battleMgr = battleMgr;
        this.currentPos = currentPos;

        this.speed = CharacterConfig.SPEED_DEFAULT;
        this.isDestroy = false;
        this.width = CharacterConfig.DEFAULT_WIDTH;
        this.height = CharacterConfig.DEFAULT_HEIGHT;
        this.scale = CharacterConfig.SCALE * this.cellSize / this.width;
        this.radius = this.width / 2 * this.scale;
        this.canDamage = true;
        this.canMove = true;

        this.timer = 0;
        this.onEffectDamaged = false;

        // Ability
        this.numbMaxBomb = CharacterConfig.NUMB_BOMB_DEFAULT;
        this.powerBlast = CharacterConfig.POWER_BLAST_DEFAULT;
        this.additionSpeed = CharacterConfig.ADDITION_SPEED_DEFAULT;
        this.numberOfLife = CharacterConfig.NUMB_LIFE_DEFAULT;
        this.haveShield = CharacterConfig.HAVE_SHIELD_DEFAULT;
        this.canPushBomb = CharacterConfig.CAN_PUSH_THE_BOMB_DEFAULT;
        this.isInvincibility = CharacterConfig.IS_INVINCIBILITY;

        this.numbUsedBomb = 0;
        this.listBombPosIsNotObstacle = new ArrayList<>();

        // Add default weapon
        this.weapon = new BombWeapon(this, currentPos, mapMgr, battleMgr, cellSize);
    }

    public void updateTimeUseWeapon() {
        int time = this.weapon.getTimeUseWeapon();
        if (time == 0) {
            this.weapon = new BombWeapon(this, this.currentPos, this.mapMgr, this.battleMgr, this.cellSize);
        }
    }

    // Kiem tra xem co dat bom duoc khong
    public boolean canBomb() {
        return this.numbUsedBomb < this.numbMaxBomb;
    }

    public void damaged() {
        this.numberOfLife--;

        if (this.numberOfLife <= 0) {
            this.isDestroy = true;
        } else {
            this.effectDamaged();
        }
    }

    public void effectDamaged() {
        this.canDamage = false;
        this.timer = 0;
        this.onEffectDamaged = true;
    }

    public void update(double dt) {
        timer += dt;
        if (timer >= CharacterConfig.TIME_UNATTACKABLE_AFTER_DAMAGED && this.onEffectDamaged) {
            this.canDamage = true;
            this.onEffectDamaged = false;
        }

        this.weapon.update(dt);
    }

    public void updateMove(Coordinate direction, double dt) {
        if (!this.canMove) {
            return;
        }

        // Update character
        if (direction.getX() != 0 || direction.getY() != 0) {
            Coordinate displacement = new Coordinate(direction.getX() * this.speed * dt, direction.getY() * this.speed * dt);

            Coordinate newPosX = new Coordinate(this.currentPos.getX() + displacement.getX(), this.currentPos.getY());
            this.updateMoveX(newPosX);

            Coordinate newPosY = new Coordinate(this.currentPos.getX(), this.currentPos.getY() + displacement.getY());
            this.updateMoveY(newPosY);
        }

        // Update item
        if (this.isItemCell(this.currentPos)) {
            this.updateItem(this.currentPos);
        }

        // Update weapon
        this.weapon.updatePosLogic(this.currentPos);
        this.weapon.updateDir(direction, dt);
    }

    public void changeWeapon(int type) {
        switch (type) {
            case MapConfig.SHOTGUN:
                this.weapon = new Gun(this, this.currentPos, this.mapMgr, this.battleMgr, this.cellSize);
                break;
            case MapConfig.HAMMER:
                this.weapon = new Hammer(this, this.currentPos, this.mapMgr, this.battleMgr, this.cellSize);
                break;
        }
    }

    public void updateItem(Coordinate point) {
        Coordinate p = this.convertIndexToPosLogic(point);
        switch (this.mapMgr.data[(int) p.getX()][(int) p.getY()]) {
            case MapConfig.BOMB_PLUS:
                this.numbMaxBomb++;
                break;
            case MapConfig.POWER_BLAST_PLUS:
                this.powerBlast++;
                break;
            case MapConfig.SPEED_PLUS:
                this.speed = this.speed + this.speed * CharacterConfig.ADDITION_SPEED;
                this.additionSpeed += CharacterConfig.ADDITION_SPEED;
                break;
            case MapConfig.LIFE_PLUS:
                this.numberOfLife++;
                break;
            case MapConfig.SHOTGUN:
                this.changeWeapon(MapConfig.SHOTGUN);
                this.updateTimeUseWeapon();
                break;
            case MapConfig.HAMMER:
                this.changeWeapon(MapConfig.HAMMER);
                this.updateTimeUseWeapon();
                break;
        }

        this.battleMgr.setMapLogicType((int) p.getX(),(int)  p.getY(), MapConfig.LAND_TYPE);
    }

    public void attack() {
        this.weapon.attack();
    }

    public void updateMoveX(Coordinate newPosX) {
        this.currentPos.setX(this.checkCollisionX(newPosX));
    }

    public void updateMoveY(Coordinate newPosY) {
        this.currentPos.setY(this.checkCollisionY(newPosY));
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

    public void removeBombPosIsNotObstacle(Coordinate removePos) {
        this.listBombPosIsNotObstacle.remove(removePos);
    }

    // Check xem ô đó có phải ô vừa đặt bom không
    // Nếu đang đứng trên ô đó thì không coi bom vừa đặt là
    // vật cản cho đến khi đi ra khỏi đó
    public boolean isInListBombPosIsNotObstacle(int x, int y) {
        for (int i = 0; i < this.listBombPosIsNotObstacle.size(); i++) {
            Coordinate pos = this.listBombPosIsNotObstacle.get(i);
            if ((int)pos.getX() == x && (int)pos.getY() == y) {
                return true;
            }
        }
        return false;
    }

    public boolean isItemCell(Coordinate point) {
        Coordinate p = this.convertIndexToPosLogic(point);
        int pX = (int)p.getX();
        int pY = (int)p.getY();
        return this.mapMgr.data[pX][pY] == MapConfig.BOMB_PLUS
                || this.mapMgr.data[pX][pY] == MapConfig.POWER_BLAST_PLUS
                || this.mapMgr.data[pX][pY] == MapConfig.SPEED_PLUS
                || this.mapMgr.data[pX][pY] == MapConfig.LIFE_PLUS
                || this.mapMgr.data[pX][pY] == MapConfig.SHOTGUN
                || this.mapMgr.data[pX][pY] == MapConfig.HAMMER;
    }

    public boolean isObstacleCell(int x, int y) {
        return (this.mapMgr.data[x][y] == MapConfig.UNATTACKABLE_OBSTACLE_TYPE
                || this.mapMgr.data[x][y] == MapConfig.ATTACKABLE_OBSTACLE_TYPE
                || this.mapMgr.data[x][y] == MapConfig.BOMB_TYPE)
                && !this.isInListBombPosIsNotObstacle(x, y);
    }

    // Xét cả trường hợp kích thước nhân vật lớn hơn 1 ô
    public double checkCollisionX(Coordinate newPos) {
        int l = (int)Math.floor((newPos.getX() - this.radius) / this.cellSize);
        int r = (int)Math.floor((newPos.getX() + this.radius) / this.cellSize);

        int u = (int)Math.floor((newPos.getY() + this.radius) / this.cellSize);
        int d = (int)Math.floor((newPos.getY() - this.radius) / this.cellSize);

        for (int i = l; i <= r; i++){
            if (this.isObstacleCell(i,u)){
                double tmp = this.convertIndexToPosUI(i,u).getX();
                return this.getCorrectPos(tmp, this.currentPos.getX());
            }
            if (this.isObstacleCell(i,d)){
                double tmp = this.convertIndexToPosUI(i,d).getX();
                return this.getCorrectPos(tmp, this.currentPos.getX());
            }
        }
        for (int i = d; i <= u; i++){
            if (this.isObstacleCell(l,i)){
                double tmp = this.convertIndexToPosUI(l,i).getX();
                return this.getCorrectPos(tmp, this.currentPos.getX());
            }
            if (this.isObstacleCell(r,i)){
                double tmp = this.convertIndexToPosUI(r,i).getX();
                return this.getCorrectPos(tmp, this.currentPos.getX());
            }
        }
        return newPos.getX();
    }

    // Xét cả trường hợp kích thước nhân vật lớn hơn 1 ô
    public double checkCollisionY(Coordinate newPos) {
        int l = (int)Math.floor((newPos.getX() - this.radius) / this.cellSize);
        int r = (int)Math.floor((newPos.getX() + this.radius) / this.cellSize);

        int u = (int)Math.floor((newPos.getY() + this.radius) / this.cellSize);
        int d = (int)Math.floor((newPos.getY() - this.radius) / this.cellSize);

        for (int i = l; i <= r; i++){
            if (this.isObstacleCell(i,u)){
                double tmp = this.convertIndexToPosUI(i,u).getY();
                return this.getCorrectPos(tmp, this.currentPos.getY());
            }
            if (this.isObstacleCell(i,d)){
                double tmp = this.convertIndexToPosUI(i,d).getY();
                return this.getCorrectPos(tmp, this.currentPos.getY());
            }
        }
        for (int i = d; i <= u; i++){
            if (this.isObstacleCell(l,i)){
                double tmp = this.convertIndexToPosUI(l,i).getY();
                return this.getCorrectPos(tmp, this.currentPos.getY());
            }
            if (this.isObstacleCell(r,i)){
                double tmp = this.convertIndexToPosUI(r,i).getY();
                return this.getCorrectPos(tmp, this.currentPos.getY());
            }
        }
        return newPos.getY();
    }

    public double getCorrectPos(double posVC, double posPlayer) {
        if (posVC > posPlayer) {
            return posVC - this.cellSize / 2 - this.radius - 1;
        } else{
            return posVC + this.cellSize / 2 + this.radius + 1;
        }
    }
}
