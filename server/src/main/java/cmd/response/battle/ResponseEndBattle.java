package cmd.response.battle;

import bitzero.server.entities.User;
import bitzero.server.extensions.data.BaseMsg;
import cmd.CmdDefine;

import java.nio.ByteBuffer;

public class ResponseEndBattle extends BaseMsg {

    public final int frameEnd;
    public final int amountToken;

    public User user;

    public ResponseEndBattle(int frameEnd, int amountToken, User user) {
        super(CmdDefine.END_BATTLE);
        this.user = user;
        this.frameEnd = frameEnd;
        this.amountToken = amountToken;
    }

    @Override
    public byte[] createData() {
        ByteBuffer bf = this.makeBuffer();
        bf.putInt(this.frameEnd);
        bf.putInt(this.amountToken);
        return this.packBuffer(bf);
    }
}
