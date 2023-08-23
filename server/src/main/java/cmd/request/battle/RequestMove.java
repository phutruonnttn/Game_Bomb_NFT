package cmd.request.battle;

import bitzero.server.extensions.data.DataCmd;

import java.nio.ByteBuffer;

public class RequestMove extends RequestBattleAction{

    public RequestMove(DataCmd data) {
        super(data);
        this.unpackData();
    }

    @Override
    public void unpackData(){
        ByteBuffer bf = makeBuffer();
        try {
            isUp = readInt(bf) == 1;
            isDown = readInt(bf) == 1;
            isLeft = readInt(bf) == 1;
            isRight = readInt(bf) == 1;
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
