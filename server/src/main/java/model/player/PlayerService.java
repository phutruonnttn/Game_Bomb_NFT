package model.player;

import bitzero.server.entities.User;
import cmd.response.player.ResponsePlayerGetInfo;
import config.user.SkinConfig;
import model.base.BaseService;
import model.skin.SkinModel;
import nft.get.GetUser;
import util.server.ServerConstant;

public class PlayerService extends BaseService {

    private static PlayerService playerService = null;

    public static PlayerService getInstance(){

        if(playerService == null){
            playerService = new PlayerService();
        }

        return playerService;
    }

    @Override
    public PlayerModel getModelFromCache(User user){
        return (PlayerModel) user.getProperty(ServerConstant.PLAYER);
    }

    public ResponsePlayerGetInfo getData(PlayerModel playerModel, SkinModel skinModel){
        playerModel.setToken(GetUser.getBalance(playerModel.addr));
        skinModel.updateAllSkinFromSM(GetUser.getListSkin(playerModel.addr));

        return new ResponsePlayerGetInfo(
                playerModel.getUid(),
                playerModel.getName(),
                playerModel.getToken(),
                playerModel.getFame(),

                skinModel.currentSkin,
                skinModel.getNumberOwnedSkin(),
                skinModel.getListOwnedSkin()
        );
    }

    public void addFame(int amount, PlayerModel playerModel) {
        playerModel.fame += amount;
    }

    public void updateToken(int amount, PlayerModel playerModel) {
        playerModel.updateToken(amount);
    }
}
