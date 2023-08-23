package cmd.authen;

import bitzero.server.extensions.data.BaseCmd;
import bitzero.server.extensions.data.DataCmd;

import java.nio.ByteBuffer;

public class RequestLogin extends BaseCmd {
    public String loginId;
    public RequestLogin(DataCmd dataCmd) {
        super(dataCmd);
    }
    
    @Override
    public void unpackData() {
        ByteBuffer bf = makeBuffer();
        try {
            int length = readInt(bf);
            loginId = "";
            for (int i = 0; i < length; i++) {
                loginId += (char) readInt(bf);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
