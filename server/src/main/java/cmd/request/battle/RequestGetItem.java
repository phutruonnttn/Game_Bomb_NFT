package cmd.request.battle;

import bitzero.server.extensions.data.DataCmd;

import java.nio.ByteBuffer;

public class RequestGetItem extends RequestBattleAction {

    public RequestGetItem(DataCmd data) {
        super(data);
        this.unpackData();
    }

    @Override
    public void unpackData(){
        ByteBuffer bf = makeBuffer();
        try {
            posX = readInt(bf);
            posY = readInt(bf);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
