package cmd.request.lobby;

import bitzero.server.extensions.data.BaseCmd;
import bitzero.server.extensions.data.DataCmd;

import java.nio.ByteBuffer;

public class RequestChangeSkin extends BaseCmd {

    int skinIndex;
    public RequestChangeSkin(DataCmd data) {
        super(data);
        this.unpackData();
    }

    @Override
    public void unpackData(){
        ByteBuffer bf = makeBuffer();
        try {
            skinIndex = readInt(bf);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public int getSkinIndex() {
        return skinIndex;
    }
}
