package model.skin;

import bitzero.server.entities.User;
import cmd.response.skin.ResponseBuySkin;
import cmd.response.skin.ResponseChangeSkin;
import config.user.UserError;
import model.base.BaseService;
import model.player.PlayerModel;
import nft.post.PostUser;
import util.server.ServerConstant;

import java.util.ArrayList;

public class SkinService extends BaseService {

    private static SkinService skinService = null;
    private SkinService(){};

    public static SkinService getInstance(){
        if(skinService == null){
            skinService = new SkinService();
        }
        return skinService;
    }

    @Override
    public SkinModel getModelFromCache(User user) {
        return (SkinModel) user.getProperty(ServerConstant.PLAYER_SKIN);
    }

    public int getCurrentSkin(SkinModel skinModel) {
        return skinModel.currentSkin;
    }

    public ArrayList<Integer> getOwnedSkins(SkinModel skinModel) {
        ArrayList<Integer> result = new ArrayList<>();

        for (int i = 0; i < skinModel.listSkin.length; i++) {
            if (skinModel.listSkin[i].isOwned) {
                result.add(i);
            }
        }

        return result;
    }

    public ResponseChangeSkin changeSkin(SkinModel skinModel, int skinIndex) {
        if (skinIndex < 0 || skinIndex >= skinModel.listSkin.length) {
            return new ResponseChangeSkin(UserError.ERROR_INDEX_CHANGE);
        }

        if (!skinModel.listSkin[skinIndex].isOwned()) {
            return new ResponseChangeSkin(UserError.SKIN_DO_NOT_OWN);
        }

        skinModel.changeCurrentSkin(skinIndex);
        return new ResponseChangeSkin(UserError.SUCCESS);
    }

    public ResponseBuySkin buySkin(SkinModel skinModel, int skinIndex, PlayerModel playerModel) {
        if (skinIndex < 0 || skinIndex >= skinModel.listSkin.length) {
            return new ResponseBuySkin(UserError.ERROR_INDEX_BUY);
        }

        if (!playerModel.isEnoughToken(skinModel.listSkin[skinIndex].cost)) {
            return new ResponseBuySkin(UserError.NOT_ENOUGH_TOKEN);
        }

        if (skinModel.listSkin[skinIndex].isOwned()) {
            return new ResponseBuySkin(UserError.ERROR_OWNED_SKIN);
        }

        skinModel.buySkin(skinIndex);
        PostUser.postUserBuySkin(playerModel.getAddr(), skinModel.listSkin[skinIndex].cost, skinIndex);
        skinModel.changeCurrentSkin(skinIndex);
        playerModel.updateToken(-skinModel.listSkin[skinIndex].cost);

        return new ResponseBuySkin(UserError.SUCCESS);
    }
}
