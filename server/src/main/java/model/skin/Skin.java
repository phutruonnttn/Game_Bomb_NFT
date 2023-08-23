package model.skin;

public class Skin {
    public int id;
    public int cost;
    public boolean isOwned;

    public Skin(int id, int cost, boolean isOwned) {
        this.id = id;
        this.cost = cost;
        this.isOwned = isOwned;
    }

    public boolean isOwned() {
        return isOwned;
    }

    public void setOwned(boolean owned) {
        isOwned = owned;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getCost() {
        return cost;
    }

    public void setCost(int cost) {
        this.cost = cost;
    }
}
