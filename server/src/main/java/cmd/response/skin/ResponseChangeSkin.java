package cmd.response.skin;

import bitzero.server.extensions.data.BaseMsg;
import cmd.CmdDefine;

import java.nio.ByteBuffer;

public class ResponseChangeSkin extends BaseMsg {

    public ResponseChangeSkin(int err) {
        super(CmdDefine.CHANGE_SKIN, err);
    }

    @Override
    public byte[] createData() {
        ByteBuffer bf = makeBuffer();
        return packBuffer(bf);
    }
}
