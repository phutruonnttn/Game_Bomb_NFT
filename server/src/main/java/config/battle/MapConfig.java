package config.battle;

public class MapConfig {

    public static final int SIZE = 21;
    public static final int[][] LOGIC_MAP = {
            {1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1},
            {1, 0, 0, 2, 0, 2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 2, 0, 2, 0, 0, 1},
            {1, 0, 0, 1, 0, 2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 2, 0, 1, 0, 0, 1},
            {1, 2, 1, 1, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 1, 1, 2, 1},
            {1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1},
            {1, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 1},
            {1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1},
            {1, 0, 0, 0, 0, 2, 0, 0, 0, 2, 2, 2, 0, 0, 0, 2, 0, 0, 0, 0, 1},
            {1, 0, 0, 0, 0, 2, 0, 0, 2, 0, 1, 0, 2, 0, 0, 2, 0, 0, 0, 0, 1},
            {1, 0, 0, 0, 0, 2, 0, 2, 0, 0, 1, 0, 0, 2, 0, 2, 0, 0, 0, 0, 1},
            {1, 1, 2, 2, 2, 1, 2, 2, 1, 1, 1, 1, 1, 2, 2, 1, 2, 2, 2, 1, 1},
            {1, 0, 0, 0, 0, 2, 0, 2, 0, 0, 1, 0, 0, 2, 0, 2, 0, 0, 0, 0, 1},
            {1, 0, 0, 0, 0, 2, 0, 0, 2, 0, 1, 0, 2, 0, 0, 2, 0, 0, 0, 0, 1},
            {1, 0, 0, 0, 0, 2, 0, 0, 0, 2, 2, 2, 0, 0, 0, 2, 0, 0, 0, 0, 1},
            {1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1},
            {1, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 1},
            {1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1},
            {1, 2, 1, 1, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 1, 1, 2, 1},
            {1, 0, 0, 1, 0, 2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 2, 0, 1, 0, 0, 1},
            {1, 0, 0, 2, 0, 2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 2, 0, 2, 0, 0, 1},
            {1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1}
    };

    public static final int LAND_TYPE = 0;
    public static final int UNATTACKABLE_OBSTACLE_TYPE = 1;
    public static final int ATTACKABLE_OBSTACLE_TYPE = 2;
    public static final int BOMB_TYPE = 3;

    // Abilities
    public static final int BOMB_PLUS = 4;
    public static final int POWER_BLAST_PLUS = 5;
    public static final int SPEED_PLUS = 6;
    public static final int LIFE_PLUS = 7;

    // Weapons
    public static final int SHOTGUN = 8;
    public static final int HAMMER = 9;
    public static final int NO_ITEM = 10;
}
