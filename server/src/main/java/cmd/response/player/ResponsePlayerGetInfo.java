package cmd.response.player;

import bitzero.server.extensions.data.BaseMsg;
import cmd.CmdDefine;

import java.nio.ByteBuffer;

public class ResponsePlayerGetInfo extends BaseMsg {

    int userId;
    String userName;
    int userToken;
    int userFame;
    int currentSkin;
    int numberOwnedSkin;
    int[] ownedSkins;

    public ResponsePlayerGetInfo(int userId, String userName,
                                 int userToken, int userFame,
                                 int currentSkin, int numberOwnedSkin,
                                 int[] ownedSkins) {
        super(CmdDefine.GET_USER_INFO);
        this.userId = userId;
        this.userName = userName;
        this.userToken = userToken;
        this.userFame = userFame;
        this.currentSkin = currentSkin;
        this.numberOwnedSkin = numberOwnedSkin;

        this.ownedSkins = new int[this.numberOwnedSkin];
        for (int i = 0; i < this.numberOwnedSkin; i++) {
            this.ownedSkins[i] = ownedSkins[i];
        }
    }

    @Override
    public byte[] createData(){
        ByteBuffer bf = makeBuffer();
        bf.putInt(userId);
        putStr(bf, userName);
        bf.putInt(userToken);
        bf.putInt(userFame);
        bf.putInt(currentSkin);
        bf.putInt(numberOwnedSkin);
        for (int i = 0; i < numberOwnedSkin; i++) {
            bf.putInt(ownedSkins[i]);
        }
        return packBuffer(bf);
    }
}
