package handler;

import bitzero.server.BitZeroServer;
import bitzero.server.core.BZEventParam;
import bitzero.server.core.BZEventType;
import bitzero.server.core.IBZEvent;
import bitzero.server.entities.User;
import bitzero.server.extensions.BaseClientRequestHandler;
import bitzero.server.extensions.data.DataCmd;
import cmd.CmdDefine;
import cmd.request.lobby.RequestBuySkin;
import cmd.request.lobby.RequestChangeSkin;
import cmd.response.player.ResponsePlayerGetInfo;
import cmd.response.skin.ResponseBuySkin;
import cmd.response.skin.ResponseChangeSkin;
import event.eventType.DemoEventParam;
import event.eventType.DemoEventType;
import extension.FresherExtension;
import model.player.PlayerModel;
import model.player.PlayerService;
import model.skin.SkinModel;
import model.skin.SkinService;
import util.server.ServerConstant;

import java.util.List;

public class UserHandler extends BaseClientRequestHandler{
    public static short USER_MULTI_IDS = 1000;
    PlayerService playerService = PlayerService.getInstance();
    SkinService skinService = SkinService.getInstance();

    public UserHandler(){
        super();
    }

    public void init(){
        getExtension().addEventListener(BZEventType.USER_DISCONNECT, this);
        getExtension().addEventListener(BZEventType.USER_RECONNECTION_SUCCESS, this);
        getExtension().addEventListener(DemoEventType.CHANGE_NAME, this);
    }

    private FresherExtension getExtension(){
        return (FresherExtension) getParentExtension();
    }

    public void handleServerEvent(IBZEvent ibzevent){
        if (ibzevent.getType() == BZEventType.USER_DISCONNECT)
            this.userDisconnect((User) ibzevent.getParameter(BZEventParam.USER));
        else if (ibzevent.getType() == DemoEventType.CHANGE_NAME)
            this.userChangeName((User) ibzevent.getParameter(DemoEventParam.USER), (String)ibzevent.getParameter(DemoEventParam.NAME));
    }

    public void handleClientRequest(User user, DataCmd dataCmd){
        synchronized (user.getProperty(ServerConstant.PLAYER)){
            try{
                switch (dataCmd.getId()){
                    case CmdDefine.GET_USER_INFO:{
                        getUserInfo(user);
                        break;
                    }
                    case CmdDefine.CHANGE_SKIN:{
                        RequestChangeSkin req = new RequestChangeSkin(dataCmd);
                        changeSkin(user, req.getSkinIndex());
                        break;
                    }
                    case CmdDefine.BUY_SKIN:{
                        RequestBuySkin req = new RequestBuySkin(dataCmd);
                        buySkin(user, req.getSkinIndex());
                        break;
                    }
                }
            } catch (Exception e){
                e.printStackTrace();
            }
        }
    }

    private void buySkin(User user, int skinIndex) {
        SkinModel skinModel = skinService.getModelFromCache(user);
        PlayerModel playerModel = playerService.getModelFromCache(user);

        ResponseBuySkin res = skinService.buySkin(skinModel, skinIndex, playerModel);
        skinService.saveModelToDatabase(user);
        playerService.saveModelToDatabase(user);

        send(res, user);
    }

    private void changeSkin(User user, int skinIndex) {
        SkinModel skinModel = skinService.getModelFromCache(user);

        ResponseChangeSkin res = skinService.changeSkin(skinModel, skinIndex);
        skinService.saveModelToDatabase(user);

        send(res, user);
    }

    private void getUserInfo(User user){
        // Neu dang finish game thi cho finish game xong moi gui info
        if (BattleHandler.getInstance().mapIdGame.containsKey(user.getId())) {
            int idGame = BattleHandler.getInstance().mapIdGame.get(user.getId());

            if (BattleHandler.getInstance().isEndGameSoon(idGame, user.getId())) {
                if (MatchingHandler.getInstance().isDoneJoin[idGame] == true) {
                    // cho end
                } else {
                    System.out.println("CHUA JOIN GAME XONG!");
                    return;
                }
            } else if (MatchingHandler.getInstance().isDoneFinish[idGame] == false) {
                System.out.println("CHUA END GAME!");
                return;
            }
        }

        PlayerModel playerModel = playerService.getModelFromCache(user);
        SkinModel skinModel = skinService.getModelFromCache(user);

        ResponsePlayerGetInfo res = playerService.getData(playerModel, skinModel);
        send(res, user);
    }

    private void userDisconnect(User user){
        // log user disconnect
    }

    private void userChangeName(User user, String name){
        List<User> allUser = BitZeroServer.getInstance().getUserManager().getAllUsers();
        for(User aUser : allUser){
            // notify user's change
        }
    }

}
