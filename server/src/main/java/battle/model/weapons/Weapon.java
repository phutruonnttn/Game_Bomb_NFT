package battle.model.weapons;

import battle.BattleMgr;
import battle.MapLogic;
import battle.model.Character;
import battle.model.Coordinate;

public class Weapon {
    public Character player;
    public Coordinate currentPos;
    public MapLogic mapMgr;
    public BattleMgr mapGUI;
    public double cellSize;
    public Coordinate curDir;
    public int numUse;

    public Weapon(Character player, Coordinate pos, MapLogic mapMgr, BattleMgr mapGUI, double cellSize) {
        this.player = player;
        this.currentPos = pos;
        this.mapMgr = mapMgr;
        this.mapGUI = mapGUI;
        this.cellSize = cellSize;
        this.curDir = new Coordinate(1,0);
    }

    public void updateDir(Coordinate direction, double dt) {
        if (direction.getX() == 0 && direction.getY() == 0) return;
        this.curDir = direction;
    }

    public void updatePosLogic(Coordinate currentPos) {
        this.currentPos.setX(currentPos.getX());
        this.currentPos.setY(currentPos.getY());
    }

    public void attack() {}

    public int getTimeUseWeapon() {
        return -1;
    }

    public void update(double dt) {}
}
