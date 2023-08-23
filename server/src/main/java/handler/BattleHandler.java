package handler;

import battle.BattleLoopMgr;
import battle.BattleMgr;
import bitzero.server.BitZeroServer;
import bitzero.server.core.BZEventParam;
import bitzero.server.core.BZEventType;
import bitzero.server.core.IBZEvent;
import bitzero.server.entities.User;
import bitzero.server.extensions.BaseClientRequestHandler;
import bitzero.server.extensions.data.DataCmd;
import cmd.CmdDefine;
import cmd.request.battle.*;
import cmd.response.battle.ResponseBattle;
import cmd.response.battle.ResponseEndBattle;
import config.battle.BattleConfig;
import event.eventType.DemoEventParam;
import event.eventType.DemoEventType;
import extension.FresherExtension;
import model.player.PlayerService;
import util.server.ServerConstant;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class BattleHandler extends BaseClientRequestHandler {
    public static short MULTI_IDS = 4000;

    public static Map<Integer, BattleLoopMgr> mapBattle = new HashMap<Integer, BattleLoopMgr>();
    public static Map<Integer, Integer> mapIdGame = new HashMap<>();
    private static BattleHandler single_instance = null;

    public static ArrayList<Boolean>[] listResult = new ArrayList[BattleConfig.MAX_AMOUNT_GAME];
    public static ArrayList<Integer>[] listEndSoon = new ArrayList[BattleConfig.MAX_AMOUNT_GAME];

    public BattleHandler(){
        super();
        for (int i = 0; i < 1000; i++) {
            listResult[i] = new ArrayList<>();
            listEndSoon[i] = new ArrayList<>();
        }
        single_instance = this;
    }

    public static BattleHandler getInstance() {
        if (single_instance == null) {
            single_instance = new BattleHandler();
        }
        return single_instance;
    }

    private FresherExtension getExtension(){
        return (FresherExtension) getParentExtension();
    }

    public void init() {
        getExtension().addEventListener(BZEventType.USER_DISCONNECT, this);
        getExtension().addEventListener(BZEventType.USER_RECONNECTION_SUCCESS, this);
        getExtension().addEventListener(DemoEventType.CHANGE_NAME, this);
    }

    public void handleServerEvent(IBZEvent ibzevent){
        if (ibzevent.getType() == BZEventType.USER_DISCONNECT)
            this.userDisconnect((User) ibzevent.getParameter(BZEventParam.USER));
        else if (ibzevent.getType() == DemoEventType.CHANGE_NAME)
            this.userChangeName((User) ibzevent.getParameter(DemoEventParam.USER), (String)ibzevent.getParameter(DemoEventParam.NAME));
    }

    public boolean isEndGameSoon(int idGame, int uid) {
        for (int i = 0; i < listEndSoon[idGame].size(); i++) {
            if (listEndSoon[idGame].get(i) == uid) {
                return true;
            }
        }
        return false;
    }

    public void sendResponseBattle(ResponseBattle responseBattle, User user) {
        send(responseBattle, user);
    }

    private void userDisconnect(User user){
        // log user disconnect
    }

    public void sendEndBattle(ResponseEndBattle responseEndBattle) {
        mapBattle.remove(responseEndBattle.user.getId());

        // Update Fame
        if (responseEndBattle.amountToken + BattleConfig.FEE_BATTLE > 0) {
            PlayerService.getInstance().updateToken(responseEndBattle.amountToken + BattleConfig.FEE_BATTLE, PlayerService.getInstance().getModelFromCache(responseEndBattle.user));
            PlayerService.getInstance().saveModelToDatabase(responseEndBattle.user);
        }

        send(responseEndBattle, responseEndBattle.user);
    }

    private void userChangeName(User user, String name){
        List<User> allUser = BitZeroServer.getInstance().getUserManager().getAllUsers();
        for(User aUser : allUser){
            // notify user's change
        }
    }

    public void createBattle(
            int idGame,
            ArrayList<User> listUser,
            int[] userIDs, String[] userNames, int[] userFame,
            int[] userSkins, int mapSize, int[][] mapMatrix, int randomSeed
    ) {
        BattleMgr battleMgr = new BattleMgr(
                idGame,
                listUser,
                userIDs,
                userNames,
                userFame,
                userSkins,
                mapSize,
                mapMatrix,
                randomSeed
        );
        BattleLoopMgr battleLoopMgr = new BattleLoopMgr(battleMgr);

        // Update list and map battle
        for (int i = 0; i < 4; i++) {
            mapBattle.put(userIDs[i], battleLoopMgr);
            mapIdGame.put(userIDs[i], idGame);
        }
   }

    @Override
    public void handleClientRequest(User user, DataCmd dataCmd) {
        synchronized (user.getProperty(ServerConstant.PLAYER)){
            try {
                switch (dataCmd.getId()){
                    case CmdDefine.MOVE:{
                        receiveBattleAction(user, dataCmd.getId(), new RequestMove(dataCmd));
                        break;
                    }
                    case CmdDefine.ATTACK:{
                        receiveBattleAction(user, dataCmd.getId(), null);
                        break;
                    }
                    case CmdDefine.GET_ITEM:{
                        receiveBattleAction(user, dataCmd.getId(),  new RequestGetItem(dataCmd));
                        break;
                    }
                }
            } catch (Exception e){
                e.printStackTrace();
            }
        }
    }

    public void receiveBattleAction(User user, int cmdID, RequestBattleAction actionArguments) {
        // Tran dau chua end moi nhan action
        if (mapBattle.get(user.getId()) != null) {
            mapBattle.get(user.getId()).battleMgr.addUserBattleAction(user, cmdID, actionArguments);
        }
    }
}
