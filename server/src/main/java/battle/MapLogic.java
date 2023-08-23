package battle;

import config.battle.MapConfig;

public class MapLogic {
    public int size;
    public int[][] data;

    public MapLogic() {
        this.size = MapConfig.SIZE;
        this.data = new int[this.size][this.size];

        this.init();
    }

    public void init() {
        for (int i = 0 ; i < this.size; i++) {
            for (int j = 0; j < this.size; j++) {
                this.data[i][j] = MapConfig.LOGIC_MAP[MapConfig.SIZE - 1 - j][i];
            }
        }
    }

    public boolean isBomb(int x, int y) {
        return this.data[x][y] == MapConfig.BOMB_TYPE;
    }

    public void setType(int x, int y, int type) {
        this.data[x][y] = type;
    }

    public int getType(int x, int y) {
        return this.data[x][y];
    }
}
