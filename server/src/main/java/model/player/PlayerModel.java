package model.player;

import config.user.UserConfig;
import model.base.AbstractUserModel;

public class PlayerModel extends AbstractUserModel {

    int fame = UserConfig.initFame;
    String name;
    int token = UserConfig.initToken;
    String addr;
    String signature;
    String bearerToken;

    public PlayerModel(int uid, String loginStringId){
        super(uid);
        String[] split = loginStringId.split("_");
        this.name = split[0];
        this.addr = split[0];
        this.signature = split[1];
        this.bearerToken = split[2];
    }

    public String getAddr() {
        return addr;
    }

    public void setAddr(String addr) {
        this.addr = addr;
    }

    public String getSignature() {
        return signature;
    }

    public void setSignature(String signature) {
        this.signature = signature;
    }

    public String getBearerToken() {
        return bearerToken;
    }

    public void setBearerToken(String bearerToken) {
        this.bearerToken = bearerToken;
    }

    public int getToken() {
        return token;
    }

    public void setToken(int token) {
        this.token = token;
    }

    public int getFame() {
        return fame;
    }

    public void setFame(int fame) {
        this.fame = fame;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isEnoughToken(int cost) {
        return this.token >= cost;
    }

    public void updateToken(int amount) {
            this.token += amount;
    }
}
