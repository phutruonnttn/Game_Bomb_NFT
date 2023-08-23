package battle.model.weapons.gun;

import battle.BattleMgr;
import battle.MapLogic;
import battle.model.Character;
import battle.model.Coordinate;
import battle.model.weapons.Weapon;
import config.battle.CharacterConfig;
import config.battle.WeaponsConfig;
import util.battle.BattleUtils;

public class Gun extends Weapon {
    public int width;

    public Gun(Character character, Coordinate currentPos, MapLogic mapMgr, BattleMgr battleMgr, double cellSize) {
        super(character, currentPos, mapMgr, battleMgr, cellSize);

        this.numUse = WeaponsConfig.TIME_USE_GUN;
        this.width = WeaponsConfig.WIDTH_GUN;
    }

    public int getTimeUseWeapon() {
        return this.numUse;
    }

    public void attack() {
        this.createBullet(this.player, this.curDir);
        this.numUse -= 1;
        this.player.updateTimeUseWeapon();
    }

    public void createBullet(Character player, Coordinate dirBullet) {
        // Tinh pos dau sung
        Coordinate pos = new Coordinate(this.currentPos.getX(), this.currentPos.getY());
        Coordinate dir = new Coordinate(this.curDir.getX(), this.curDir.getY());
        dir = BattleUtils.getInstance().normalizeVector(dir);
        pos = new Coordinate(pos.getX() + dir.getX() * this.width / 2, pos.getY() + dir.getY() * this.width / 2);

        // Add bullet
        Bullet bullet = new Bullet(player, pos, dirBullet, this.mapGUI, this.cellSize);
        this.mapGUI.listBullet.add(bullet);
    }
}
