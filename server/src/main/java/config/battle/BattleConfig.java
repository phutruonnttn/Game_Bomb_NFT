package config.battle;

import battle.model.Coordinate;
import config.DisplaySize.DisplaySizeConfig;
import java.util.HashMap;

public class BattleConfig {

    public static final int FEE_BATTLE = 100;
    public static final int INIT_TIME_COUNT_DOWN = 300;

    public static final int FRAME_PER_SECOND = 60;

    public static final int MAX_AMOUNT_GAME = 1000;

    public static final Coordinate UP_DIRECTION = new Coordinate(0,1);
    public static final Coordinate DOWN_DIRECTION = new Coordinate(0,-1);
    public static final Coordinate LEFT_DIRECTION = new Coordinate(-1,0);
    public static final Coordinate RIGHT_DIRECTION = new Coordinate(1,0);
}
