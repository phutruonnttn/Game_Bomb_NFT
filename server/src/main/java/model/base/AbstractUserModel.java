package model.base;

import util.database.DataModel;

public class AbstractUserModel extends DataModel {
    int uid;

    public int getUid() {
        return uid;
    }

    public void setUid(int uid) {
        this.uid = uid;
    }

    public AbstractUserModel(int uid) {
        this.uid = uid;
    }

    public void save() {
        try {
            saveModel(uid);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
