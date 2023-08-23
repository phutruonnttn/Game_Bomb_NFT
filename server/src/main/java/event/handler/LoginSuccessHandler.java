package event.handler;

import bitzero.server.core.BZEvent;
import bitzero.server.core.BZEventParam;
import bitzero.server.core.IBZEvent;
import bitzero.server.entities.User;
import bitzero.server.extensions.BaseServerEventHandler;
import bitzero.server.extensions.ExtensionLogLevel;
import bitzero.util.ExtensionUtility;
import event.eventType.DemoEventParam;
import event.eventType.DemoEventType;
import model.player.PlayerModel;
import model.skin.SkinModel;
import util.server.ServerConstant;

import java.util.HashMap;
import java.util.Map;

public class LoginSuccessHandler extends BaseServerEventHandler {
    public LoginSuccessHandler() {
        super();
    }

    public void handleServerEvent(IBZEvent iBZEvent) {
        this.onLoginSuccess((User) iBZEvent.getParameter(BZEventParam.USER));
    }

    /**
     * @param user
     * description: after login successful to server, core framework will dispatch this event
     */
    private void onLoginSuccess(User user) {
        trace(ExtensionLogLevel.DEBUG, "On Login Success ", user.getId());
        SkinModel skinModel = null;
        PlayerModel playerModel = null;

        try {
            playerModel = (PlayerModel) PlayerModel.getModel(user.getId(), PlayerModel.class);
        } catch (Exception e) {
            e.printStackTrace();
        }

        if (playerModel==null){
            playerModel = new PlayerModel(user.getId(), user.getName());
            skinModel = new SkinModel(user.getId());
            try {
                playerModel.save();
                skinModel.save();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }else {
            try {
                playerModel = (PlayerModel) PlayerModel.getModel(user.getId(), PlayerModel.class);
                skinModel = (SkinModel) SkinModel.getModel(user.getId(), SkinModel.class);
            }catch (Exception e){
                e.printStackTrace();
            }
        }

        /**
         * cache playerinfo in RAM
         */
        user.setProperty(ServerConstant.PLAYER_SKIN, skinModel);
        user.setProperty(ServerConstant.PLAYER, playerModel);
        /**
         * send login success to client
         * after receive this message, client begin to send game logic packet to server
         */
        ExtensionUtility.instance().sendLoginOK(user);
        
        /**
         * dispatch event here
         */
        Map evtParams = new HashMap();
        evtParams.put(DemoEventParam.USER, user);
        evtParams.put(DemoEventParam.NAME, user.getName());
        ExtensionUtility.dispatchEvent(new BZEvent(DemoEventType.LOGIN_SUCCESS, evtParams));

    }

}
