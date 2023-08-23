package cmd.response.matching;

import bitzero.server.extensions.data.BaseMsg;
import cmd.CmdDefine;

import java.nio.ByteBuffer;

public class ResponseFindMatch extends BaseMsg {
    public int[] userIDs;
    public String[] userNames;
    public int[] userFame;
    public int[] userSkins;
    public int mapSize;
    public int[][] mapMatrix;
    public int randomSeed;

    public ResponseFindMatch(int[] userIDs, String[] userNames, int[] userFame,
                             int[] userSkins, int mapSize, int[][] mapMatrix,
                             int randomSeed) {
        super(CmdDefine.MATCHING);
        this.userIDs = userIDs;
        this.userNames = userNames;
        this.userFame = userFame;
        this.userSkins = userSkins;
        this.mapSize = mapSize;
        this.mapMatrix = mapMatrix;
        this.randomSeed = randomSeed;
    }

    @Override
    public byte[] createData(){
        ByteBuffer bf = makeBuffer();

        for (int i = 0; i < 4; i++) {
            bf.putInt(this.userIDs[i]);
        }

        for (int i = 0; i < 4; i++) {
            putStr(bf, this.userNames[i]);
        }

        for (int i = 0; i < 4; i++) {
            bf.putInt(this.userFame[i]);
        }

        for (int i = 0; i < 4; i++) {
            bf.putInt(this.userSkins[i]);
        }

        bf.putInt(this.mapSize);

        for (int i = 0; i < this.mapSize; i++) {
            for (int j = 0; j < this.mapSize; j++) {
                bf.putInt(this.mapMatrix[i][j]);
            }
        }

        bf.putInt(this.randomSeed);

        return packBuffer(bf);
    }
}
