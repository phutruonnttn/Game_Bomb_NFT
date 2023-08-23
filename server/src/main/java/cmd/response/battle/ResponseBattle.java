package cmd.response.battle;

import config.battle.BattleError;
import battle.model.BattleAction;
import bitzero.server.extensions.data.BaseMsg;
import cmd.CmdDefine;
import cmd.request.battle.RequestBattleAction;
import config.battle.SynchronizeConfig;

import java.nio.ByteBuffer;
import java.util.ArrayList;
import java.util.List;

public class ResponseBattle extends BaseMsg {
    public int loopMax;
    public List<BattleAction> listActionResponse;

    public ResponseBattle(int loopMax, List<BattleAction> listActionResponse) {
        super(CmdDefine.LOOP_MAX);
        this.loopMax = loopMax;
        this.listActionResponse = new ArrayList<>(listActionResponse);
    }

    @Override
    public byte[] createData(){
        ByteBuffer bf = makeBuffer();
        bf.putInt(loopMax);
        bf.putInt(loopMax - SynchronizeConfig.DELAY_FRAME + 1);
        bf.putInt(listActionResponse.size());
        for (int i = 0; i < listActionResponse.size(); i++) {
            BattleAction actionResponse = listActionResponse.get(i);
            bf.putInt(actionResponse.cmdID);
            bf.putInt(actionResponse.user.getId());
            bf.putInt(actionResponse.errorCode);
            if (actionResponse.errorCode == BattleError.SUCCESS) {
                RequestBattleAction actionArguments = actionResponse.actionArguments;
                switch (actionResponse.cmdID) {
                    case CmdDefine.MOVE:
                        bf.putInt(actionArguments.isUp ? 1 : 0);
                        bf.putInt(actionArguments.isDown ? 1 : 0);
                        bf.putInt(actionArguments.isLeft ? 1 : 0);
                        bf.putInt(actionArguments.isRight ? 1 : 0);
                        break;
                    case CmdDefine.ATTACK:
                        break;
                    case CmdDefine.GET_ITEM:
                        bf.putInt(actionArguments.posX);
                        bf.putInt(actionArguments.posY);
                        break;
                }
            }
        }

        return packBuffer(bf);
    }
}
