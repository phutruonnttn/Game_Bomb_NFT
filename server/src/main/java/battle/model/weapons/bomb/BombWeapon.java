package battle.model.weapons.bomb;

import battle.BattleMgr;
import battle.MapLogic;
import battle.model.Character;
import battle.model.Coordinate;
import battle.model.weapons.Weapon;
import config.battle.WeaponsConfig;

public class BombWeapon extends Weapon {
    public BombWeapon(Character character, Coordinate currentPos, MapLogic mapMgr, BattleMgr battleMgr, double cellSize) {
        super(character, currentPos, mapMgr, battleMgr, cellSize);
        this.numUse = WeaponsConfig.TIME_USE_BOMB;
    }

    public int getTimeUseWeapon() {
        return this.numUse;
    }

    public void attack() {
        Coordinate posLogic = this.mapGUI.convertIndexToPosLogic(this.player.currentPos);
        if (this.checkCondition(posLogic)) {
            Bomb bomb = new Bomb(this.player, this.mapGUI, posLogic, this.cellSize);
            this.mapGUI.listBomb.add(bomb);
        }
    }

    public boolean checkCondition(Coordinate posLogic) {
        // Check trong o co bomb khong?
        if (this.mapGUI.isBomb((int) posLogic.getX(), (int) posLogic.getY())) {
            return false;
        }

        // Check player con dat duoc bom khong?
        return this.player.canBomb();
    }
}
