package cmd.request.battle;

import bitzero.server.extensions.data.BaseCmd;
import bitzero.server.extensions.data.DataCmd;

public abstract class RequestBattleAction extends BaseCmd {
    public int posX;
    public int posY;
    public boolean isUp;
    public boolean isDown;
    public boolean isLeft;
    public boolean isRight;

    public RequestBattleAction(DataCmd data) {
        super(data);
    }

}
