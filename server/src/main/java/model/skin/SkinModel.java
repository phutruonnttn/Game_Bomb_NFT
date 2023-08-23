package model.skin;

import config.user.SkinConfig;
import model.base.AbstractUserModel;

public class SkinModel extends AbstractUserModel {

    public Skin[] listSkin = new Skin[SkinConfig.numberSkin];
    public int currentSkin;
    public int numberOwnedSkin;

    public SkinModel(int uid) {
        super(uid);

        currentSkin = -1;
        numberOwnedSkin = 0;

        for (int i = 0; i < SkinConfig.numberSkin; i++) {
            listSkin[i] = new Skin(i, SkinConfig.costSkins[i], SkinConfig.initStatus[i]);

            if (listSkin[i].isOwned()) {
                numberOwnedSkin ++;
            }
        }
    }

    public int getNumberOwnedSkin() {
        return numberOwnedSkin;
    }

    public int[] getListOwnedSkin() {
        int[] result = new int[numberOwnedSkin];
        int count = 0;

        for (int i = 0; i < SkinConfig.numberSkin; i++) {
            if (listSkin[i].isOwned()) {
                result[count++] = i;
            }
        }

        return result;
    }

    public void changeCurrentSkin(int indexSkin) {
        this.currentSkin = indexSkin;
    }

    public void buySkin(int skinIndex) {
        if (!this.listSkin[skinIndex].isOwned()) {
            numberOwnedSkin++;
            this.listSkin[skinIndex].setOwned(true);
        }

    }

    public void updateAllSkinFromSM(int[] listSkinSM) {
        currentSkin = -1;
        numberOwnedSkin = 0;

        for (int i = 0; i < SkinConfig.numberSkin; i++) {
            listSkin[i].setOwned(false);

            if (listSkinSM[i] > 0) {
                numberOwnedSkin++;
                listSkin[i].setOwned(true);

                // skin ban dau la skin dat nhat dang so huu
                currentSkin = i;
            }
        }
    }
}
