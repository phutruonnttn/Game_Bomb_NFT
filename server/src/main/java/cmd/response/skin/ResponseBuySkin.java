package cmd.response.skin;

import bitzero.server.extensions.data.BaseMsg;
import cmd.CmdDefine;

import java.nio.ByteBuffer;

public class ResponseBuySkin extends BaseMsg {

    public ResponseBuySkin(int err) {
        super(CmdDefine.BUY_SKIN, err);
    }

    @Override
    public byte[] createData() {
        ByteBuffer bf = makeBuffer();
        return packBuffer(bf);
    }
}
