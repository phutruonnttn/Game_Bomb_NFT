package battle.model.weapons.bomb;

import battle.BattleMgr;
import battle.model.Character;
import battle.model.Coordinate;
import config.battle.MapConfig;
import config.battle.WeaponsConfig;

import java.util.ArrayList;

public class Bomb {
    public Character player;
    public BattleMgr mapGUI;
    public Coordinate pos;
    public double cellSize;
    public double timer;
    public ArrayList<Character> listPlayerInCell;
    public ArrayList<Coordinate> listCellExploded;
    public boolean isDestroy;

    public Bomb(Character player, BattleMgr mapGUI, Coordinate posLogic, double cellSize) {
        this.player = player;
        this.mapGUI = mapGUI;
        this.pos = posLogic;
        this.cellSize = cellSize;
        this.isDestroy = false;

        this.timer = 0;
        this.player.numbUsedBomb += 1;
        this.mapGUI.setMapLogicType((int)this.pos.getX(), (int)this.pos.getY(), MapConfig.BOMB_TYPE);

        this.listPlayerInCell = new ArrayList<>();
        for (int i = 0; i < this.mapGUI.listPlayer.size(); i++) {
            Character iPlayer = this.mapGUI.listPlayer.get(i);
            Coordinate iPosLogic = this.mapGUI.convertIndexToPosLogic(iPlayer.currentPos);
            if (iPosLogic.getX() == this.pos.getX() && iPosLogic.getY() == this.pos.getY()) {
                iPlayer.listBombPosIsNotObstacle.add(pos);
                this.listPlayerInCell.add(iPlayer);
            }
        }
    }

    // Xét cả trường hợp kích thước nhân vật lớn hơn 1 ô
    public void updateListPlayerInCell () {
        ArrayList<Character> newList = new ArrayList<>();
        for (int k = 0; k < this.listPlayerInCell.size(); k++) {
            boolean isDone = true;
            Character player = this.listPlayerInCell.get(k);

            int l = (int) Math.floor((player.currentPos.getX() - player.radius) / player.cellSize);
            int r = (int) Math.floor((player.currentPos.getX() + player.radius) / player.cellSize);
            int u = (int) Math.floor((player.currentPos.getY() + player.radius) / player.cellSize);
            int d = (int) Math.floor((player.currentPos.getY() - player.radius) / player.cellSize);

            for (int i = l; i <= r; i++){
                if (i == (int) this.pos.getX() && u == (int) this.pos.getY()) {
                    isDone = false;
                    break;
                }
                if (i == (int) this.pos.getX() && d == (int) this.pos.getY()) {
                    isDone = false;
                    break;
                }
            }

            if (!isDone) {
                newList.add(player);
                continue;
            }

            for (int i = d; i <= u; i++){
                if (l == (int) this.pos.getX() && i == (int) this.pos.getY()) {
                    isDone = false;
                    break;
                }
                if (r == (int) this.pos.getX() && i == (int) this.pos.getY()) {
                    isDone = false;
                    break;
                }
            }
            if (!isDone) {
                newList.add(player);
            } else {
                player.removeBombPosIsNotObstacle(this.pos);
            }
        }

        this.listPlayerInCell = newList;
    }

    public void update (double dt) {
        this.updateListPlayerInCell();
        this.timer += dt;
        if (this.timer >= WeaponsConfig.TIMER_BOMB) {
            this.explode();
            this.isDestroy = true;
        }
    }

    public void loadCellExploded() {
        this.listCellExploded = new ArrayList<>();
        this.listCellExploded.add(this.pos);

        for (int i = (int) this.pos.getX() - 1; i >= (int) Math.max(this.pos.getX() - this.player.powerBlast, 0); i--) {
            if (this.mapGUI.getMapLogicType(i, (int)this.pos.getY()) == MapConfig.UNATTACKABLE_OBSTACLE_TYPE) {
                break;
            } else if (this.mapGUI.getMapLogicType(i, (int)this.pos.getY()) == MapConfig.ATTACKABLE_OBSTACLE_TYPE) {
                this.listCellExploded.add(new Coordinate(i, this.pos.getY()));
                break;
            } else {
                this.listCellExploded.add(new Coordinate(i, this.pos.getY()));
            }
        }

        for (int i = (int)this.pos.getX() + 1; i <= Math.min(this.pos.getX() + this.player.powerBlast, MapConfig.SIZE - 1); i++) {
            if (this.mapGUI.getMapLogicType(i, (int)this.pos.getY()) == MapConfig.UNATTACKABLE_OBSTACLE_TYPE) {
                break;
            } else if (this.mapGUI.getMapLogicType(i, (int)this.pos.getY()) == MapConfig.ATTACKABLE_OBSTACLE_TYPE) {
                this.listCellExploded.add(new Coordinate(i, this.pos.getY()));
                break;
            } else {
                this.listCellExploded.add(new Coordinate(i, this.pos.getY()));
            }
        }

        for (int i = (int)this.pos.getY() - 1; i >= Math.max(this.pos.getY() - this.player.powerBlast, 0); i--) {
            if (this.mapGUI.getMapLogicType((int)this.pos.getX(), i) == MapConfig.UNATTACKABLE_OBSTACLE_TYPE) {
                break;
            } else if (this.mapGUI.getMapLogicType((int)this.pos.getX(), i) == MapConfig.ATTACKABLE_OBSTACLE_TYPE) {
                this.listCellExploded.add(new Coordinate(this.pos.getX(), i));
                break;
            } else {
                this.listCellExploded.add(new Coordinate(this.pos.getX(), i));
            }
        }

        for (int i = (int)this.pos.getY() + 1; i <= Math.min(this.pos.getY() + this.player.powerBlast, MapConfig.SIZE - 1); i++) {
            if (this.mapGUI.getMapLogicType((int)this.pos.getX(), i) == MapConfig.UNATTACKABLE_OBSTACLE_TYPE) {
                break;
            } else if (this.mapGUI.getMapLogicType((int)this.pos.getX(), i) == MapConfig.ATTACKABLE_OBSTACLE_TYPE) {
                this.listCellExploded.add(new Coordinate(this.pos.getX(), i));
                break;
            } else {
                this.listCellExploded.add(new Coordinate(this.pos.getX(), i));
            }
        }
    }

    public void handleDamage() {
        // Damage player
        for (int i = 0; i < this.mapGUI.listPlayer.size(); i++) {
            Character player = this.mapGUI.listPlayer.get(i);
            Coordinate playerPos = this.mapGUI.convertIndexToPosLogic(player.currentPos);

            if (this.isDamaged(playerPos) && player.canDamage) {
                player.damaged();
            }
        }

        // Damage obstacle
        for (int i = 0; i < this.listCellExploded.size(); i++) {
            this.mapGUI.damageCell(this.listCellExploded.get(i));
        }
    }

    public boolean isDamaged(Coordinate pos) {
        for (int i = 0; i < this.listCellExploded.size(); i++) {
            Coordinate cellPos = this.listCellExploded.get(i);
            if ((int)cellPos.getX() == (int)pos.getX() && (int)cellPos.getY() == (int)pos.getY()) {
                return true;
            }
        }
        return false;
    }

    public void explode () {
        this.loadCellExploded();
        this.handleDamage();

        this.player.numbUsedBomb -= 1;
        this.mapGUI.setMapLogicType((int)this.pos.getX(), (int)this.pos.getY(), MapConfig.LAND_TYPE);
    }
}
