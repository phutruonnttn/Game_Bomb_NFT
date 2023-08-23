package battle.model.weapons.hammer;

import battle.BattleMgr;
import battle.MapLogic;
import battle.model.Character;
import battle.model.Coordinate;
import battle.model.weapons.Weapon;
import config.battle.MapConfig;
import config.battle.WeaponsConfig;

public class Hammer extends Weapon {
    public double timer;
    public Coordinate posTakeDame;
    public boolean onAnim;

    public Hammer(Character character, Coordinate currentPos, MapLogic mapMgr, BattleMgr battleMgr, double cellSize) {
        super(character, currentPos, mapMgr, battleMgr, cellSize);

        this.numUse = WeaponsConfig.TIME_USE_HAMMER;
        this.timer = 0;
        this.onAnim = false;
    }

    public int getTimeUseWeapon() {
        return this.numUse;
    }

    public void attack() {
        if (this.onAnim) return;
        Coordinate posLogic = this.mapGUI.convertIndexToPosLogic(this.player.currentPos);

        posTakeDame = posLogic;
        if (this.curDir.getX() > 0) {
            posTakeDame.setX(posLogic.getX() + 1);
        } else if (this.curDir.getX() < 0) {
            posTakeDame.setX(posLogic.getX() - 1);
        }

        if (this.curDir.getY() > 0) {
            posTakeDame.setY(posLogic.getY() + 1);
        } else if (this.curDir.getY() < 0) {
            posTakeDame.setY(posLogic.getY() - 1);
        }

        this.player.canMove = false;
        this.timer = 0;
        this.onAnim = true;
    }

    public void update(double dt) {
        timer += dt;
        if (timer >= 0.8 && this.onAnim) {
            this.handleDamage(posTakeDame);
            this.player.canMove = true;
            this.numUse -= 1;
            this.player.updateTimeUseWeapon();

            this.onAnim = false;
        }
    }

    public void handleDamage(Coordinate posTakeDame) {
        // Damage player
        for (int i = 0; i < this.mapGUI.listPlayer.size(); i++) {
            Character player = this.mapGUI.listPlayer.get(i);
            Coordinate playerPos = this.mapGUI.convertIndexToPosLogic(player.currentPos);

            if ((int)posTakeDame.getX() == (int)playerPos.getX()
                    && (int)posTakeDame.getY() == (int)playerPos.getY()
                    && player.canDamage
            ) {
                player.damaged();
            }
        }

        // Damage obstacle
        if (this.mapGUI.getMapLogicType((int)posTakeDame.getX(), (int)posTakeDame.getY()) == MapConfig.ATTACKABLE_OBSTACLE_TYPE) {
            this.mapGUI.damageCell(posTakeDame);
        }

    }
}
