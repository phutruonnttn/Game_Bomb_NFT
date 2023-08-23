package handler;

import cmd.response.matching.ResponseFindMatch;
import config.battle.BattleConfig;
import config.battle.MapConfig;
import config.matching.MatchingError;
import bitzero.server.BitZeroServer;
import bitzero.server.core.BZEventParam;
import bitzero.server.core.BZEventType;
import bitzero.server.core.IBZEvent;
import bitzero.server.entities.User;
import bitzero.server.extensions.BaseClientRequestHandler;
import bitzero.server.extensions.data.DataCmd;
import cmd.CmdDefine;
import cmd.response.matching.ResponseCancelMatching;
import event.eventType.DemoEventParam;
import event.eventType.DemoEventType;
import extension.FresherExtension;
import model.player.PlayerModel;
import model.player.PlayerService;
import model.skin.SkinModel;
import model.skin.SkinService;
import nft.get.GetUser;
import nft.post.PostUser;

import java.util.*;

public class MatchingHandler extends BaseClientRequestHandler {
    public static short MULTI_IDS = 3000;

    public static ArrayList<User> listUserFindMatch = new ArrayList<>();
    public static int[] countPost = new int[BattleConfig.MAX_AMOUNT_GAME];
    public static boolean[] isDoneJoin = new boolean[BattleConfig.MAX_AMOUNT_GAME];
    public static boolean[] isDoneFinish = new boolean[BattleConfig.MAX_AMOUNT_GAME];
    public static boolean[] isWaitingFinish = new boolean[BattleConfig.MAX_AMOUNT_GAME];
    private static MatchingHandler single_instance = null;

    public MatchingHandler() {
        super();
        single_instance = this;
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

    private void userDisconnect(User user){
        System.out.println("Disconnect: User " + user.getId());
        cancelMatching(user);
    }

    private void userChangeName(User user, String name){
        List<User> allUser = BitZeroServer.getInstance().getUserManager().getAllUsers();
        for(User aUser : allUser){
            // notify user's change
        }
    }

    @Override
    public void handleClientRequest(User user, DataCmd dataCmd) {
        synchronized (listUserFindMatch) {
            try{
                switch (dataCmd.getId()){
                    case CmdDefine.MATCHING:{
                        matchingHandle(user);
                        break;
                    }
                    case CmdDefine.CANCEL_MATCHING:{
                        cancelMatching(user);
                        break;
                    }
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    public void matchingHandle(User user) {
        PlayerModel playerModel = PlayerService.getInstance().getModelFromCache(user);
        if (playerModel.getToken() < BattleConfig.FEE_BATTLE) {
            return;
        }

        SkinModel skinModel = SkinService.getInstance().getModelFromCache(user);
        // Chua co skin nao
        if (skinModel.currentSkin == -1) {
            return;
        }

        System.out.println("Find match: User " + user.getId());
        listUserFindMatch.add(user);

        if (listUserFindMatch.size() == 4) {
            int idGame = GetUser.getIndexGame() + 1;
            countPost[idGame] = 0;
            isDoneJoin[idGame] = false;
            isWaitingFinish[idGame] = false;
            isDoneFinish[idGame] = false;

            sendPostJoinGame(listUserFindMatch, idGame);
            createBattle(listUserFindMatch, idGame);
            listUserFindMatch.clear();
        }
    }

    public void cancelMatching(User user) {
        boolean flag = false;
        for (int i = 0; i < listUserFindMatch.size(); i++) {
            if (user.getId() == listUserFindMatch.get(i).getId()) {
                listUserFindMatch.remove(i);
                flag = true;
            }
        }

        ResponseCancelMatching responseCancelMatching;
        if (flag) {
            responseCancelMatching = new ResponseCancelMatching(MatchingError.MATCHING_SUCCESS);
        } else {
            responseCancelMatching = new ResponseCancelMatching(MatchingError.ALREADY_IN_MATCH);
        }

        send(responseCancelMatching,user);
    }

    public void sendPostJoinGame(ArrayList<User> listUser, int idGame) {
        ArrayList<String> listBearer = new ArrayList<>();
        for (int i = 0; i < 4; i++) {
            PlayerModel playerModel = PlayerService.getInstance().getModelFromCache(listUser.get(i));
            listBearer.add(playerModel.getBearerToken());
        }

        PostUser.postUserJoinGame(listBearer, idGame);
    }

    public void createBattle(ArrayList<User> listUser, int idGame) {
        System.out.println("Create battle: "
                + listUser.get(0).getId() + " - " +
                + listUser.get(1).getId() + " - " +
                + listUser.get(2).getId() + " - " +
                + listUser.get(3).getId()
        );

        int[] userIDs = new int[4];
        String[] userNames = new String[4];
        int[] userFame = new int[4];
        int[] userSkins = new int[4];

        for (int i = 0; i < 4; i++) {
            userIDs[i] = listUser.get(i).getId();
            userNames[i] = listUser.get(i).getName();

            PlayerModel playerModel = PlayerService.getInstance().getModelFromCache(listUser.get(i));
            userFame[i] = playerModel.getFame();

            SkinModel skinModel = SkinService.getInstance().getModelFromCache(listUser.get(i));
            userSkins[i] = skinModel.currentSkin;

            playerModel.updateToken(-BattleConfig.FEE_BATTLE);
            PlayerService.getInstance().saveModelToDatabase(listUser.get(i));
        }

        int mapSize = MapConfig.SIZE;
        int[][] mapMatrix = new int[mapSize][mapSize];

        for (int i = 0; i < mapSize; i++) {
            for (int j = 0; j < mapSize; j++) {
                mapMatrix[i][j] = MapConfig.LOGIC_MAP[i][j];
            }
        }

        // Generate random seed
        int randomSeed = (int)(Math.random()* Math.pow(2,16));

        ResponseFindMatch responseFindMatch = new ResponseFindMatch(
                userIDs, userNames,userFame, userSkins, mapSize,
                mapMatrix, randomSeed
        );

        // Send to clients
        for (int i = 0; i < 4; i++) {
            send(responseFindMatch, listUser.get(i));
        }

        BattleHandler.getInstance().createBattle(
                idGame,
                listUser,
                userIDs, userNames, userFame,
                userSkins, mapSize, mapMatrix, randomSeed
        );
    }

    public static MatchingHandler getInstance() {
        if (single_instance == null) {
            single_instance = new MatchingHandler();
        }
        return single_instance;
    }
}
