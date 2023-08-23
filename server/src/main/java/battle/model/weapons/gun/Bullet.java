package battle.model.weapons.gun;

import battle.BattleMgr;
import battle.model.Character;
import battle.model.Coordinate;
import config.battle.CharacterConfig;
import config.battle.MapConfig;
import config.battle.WeaponsConfig;
import util.battle.BattleUtils;

import java.util.ArrayList;

public class Bullet {
    public int width;
    public double radius;
    public boolean isDestroy;
    public boolean active;
    public Character player;
    public Coordinate currentPos;
    public double speed;
    public double cellSize;
    public BattleMgr mapGUI;
    public Coordinate direction;
    public double disMove;
    public Coordinate obsTakeDame;

    public Bullet(Character player, Coordinate pos, Coordinate direction, BattleMgr mapGUI, double cellSize) {
        this.width = 8;
        this.radius = this.width / 2;
        this.isDestroy = false;
        this.active = true;
        this.player = player;
        this.currentPos = pos;
        this.speed = WeaponsConfig.BULLET_SPEED;
        this.cellSize = cellSize;

        this.mapGUI = mapGUI;
        this.direction = direction;
        this.disMove = 0; //quang duong di chuyen
    }

    public void update (double dt) {
        Coordinate displacement = new Coordinate(
                this.direction.getX() * this.speed * dt,
                this.direction.getY() * this.speed * dt
        );
        Coordinate newPos = new Coordinate(
                this.currentPos.getX() + displacement.getX(),
                this.currentPos.getY() +  displacement.getY()
        );

        this.disMove += BattleUtils.getInstance().getVectorLength(
                new Coordinate(
                    newPos.getX() - this.currentPos.getX(),
                    newPos.getY() - this.currentPos.getY()
                )
        );
        if (this.checkCollision(newPos)) {
            this.isDestroy = true;
        } else {
            this.currentPos = newPos;
        }
    }

    public Coordinate getIntVector (Coordinate p) {
        return new Coordinate((int)p.getX(), (int)p.getY());
    }

    public Coordinate getPointInsideRectangle(Coordinate point, Coordinate centerRectangle, double width, double height) {
        point = this.getIntVector(point);
        centerRectangle = this.getIntVector(centerRectangle);
        Coordinate intersection = null;
        if(point.getX() >= centerRectangle.getX() - width/2 && point.getX() <= centerRectangle.getX() +width/2
                && point.getY() >= centerRectangle.getY() - height/2 && point.getY() <= centerRectangle.getY() + height/2){
            intersection = point;
        }
        return intersection;
    }

    // (p0,p1) (q0, q1) la 2 diem dau va cuoi cua doan thang
    public Coordinate getTwoLineIntersection(Coordinate p0, Coordinate p1, Coordinate q0, Coordinate q1) {
        p0 = this.getIntVector(p0);
        p1 = this.getIntVector(p1);
        q0 = this.getIntVector(q0);
        q1 = this.getIntVector(q1);

        Coordinate AB = new Coordinate(p1.getX() - p0.getX(), p1.getY() - p0.getY()); // vector AB
        Coordinate CD = new Coordinate(q1.getX() - q0.getX(), q1.getY() - q0.getY()); // vector CD
        Coordinate n1 = new Coordinate(-AB.getY(), AB.getX()); // vector pháp tuyến của AB
        Coordinate n2 = new Coordinate(-CD.getY(), CD.getX()); // vector pháp tuyến của CD

        // Tính giao điểm của hai đường thẳng
        double d1 = n1.getX() * p0.getX() + n1.getY() * p0.getY(); // hằng số d của AB
        double d2 = n2.getX() * q0.getX() + n2.getY() * q0.getY(); // hằng số d của CD

        double det = n1.getX() * n2.getY() - n1.getY() * n2.getX();
        if ((int)det == 0) {
            // hai đường thẳng song song, không có điểm giao nhau
            return null;
        } else {
            // intersection là điểm giao nhau của hai đường thẳng AB và CD
            Coordinate intersection = new Coordinate(-(d2 * AB.getX() - d1 * CD.getX()) / det, -(d2 * AB.getY() - d1 * CD.getY()) / det);
            double x = intersection.getX();
            double y = intersection.getY();

            // Kiểm tra xem giao điểm có nằm trên cả hai đoạn thẳng hay không
            if (x < Math.min(p0.getX(), p1.getX()) ||
                    x > Math.max(p0.getX(), p1.getX()) ||
                    x < Math.min(q0.getX(), q1.getX()) ||
                    x > Math.max(q0.getX(), q1.getX()) ||
                    y < Math.min(p0.getY(), p1.getY()) ||
                    y > Math.max(p0.getY(), p1.getY()) ||
                    y < Math.min(q0.getY(), q1.getY()) ||
                    y > Math.max(q0.getY(), q1.getY())
            ) {
                // Giao điểm không nằm trên cả hai đoạn thẳng
                return null;
            } else {
                // Giao điểm nằm trên cả hai đoạn thẳng
                return new Coordinate(x,y);
            }
        }
    }

    // (p0,p1) la 2 diem dau va cuoi cua doan thang
    public Coordinate getIntersectionLineAndRectangle(
            Coordinate p0, Coordinate p1, Coordinate centerRectangle, double width, double height
            ) {
        p0 = this.getIntVector(p0);
        p1 = this.getIntVector(p1);
        centerRectangle = this.getIntVector(centerRectangle);
        Coordinate intersection = null;
        Coordinate p11 = new Coordinate(p1.getX(), p1.getY());
        Coordinate lu = new Coordinate(centerRectangle.getX() - width/2, centerRectangle.getY()+height/2);
        Coordinate ld = new Coordinate(centerRectangle.getX() - width/2, centerRectangle.getY()-height/2);
        Coordinate ru = new Coordinate(centerRectangle.getX() + width/2, centerRectangle.getY()+height/2);
        Coordinate rd = new Coordinate(centerRectangle.getX() + width/2, centerRectangle.getY()-height/2);
        Coordinate d1 = this.getTwoLineIntersection(p0, p11, lu, ld);
        if(d1 != null){
            intersection = new Coordinate(d1.getX(), d1.getY());
            p11 = new Coordinate(d1.getX(), d1.getY());
        }
        Coordinate d2 = this.getTwoLineIntersection(p0, p11, lu, ru);
        if(d2 != null){
            intersection = new Coordinate(d2.getX(), d2.getY());;
            p11 = d2;
        }
        Coordinate d3 = this.getTwoLineIntersection(p0, p11, rd, ld);
        if(d3 != null){
            intersection = new Coordinate(d3.getX(), d3.getY());;
            p11 = d3;
        }
        Coordinate d4 = this.getTwoLineIntersection(p0, p11, rd, ru);
        if(d4 != null){
            intersection = new Coordinate(d4.getX(), d4.getY());;
        }
        return intersection;
    }

    public Coordinate getIntersectionWithObstacle(Coordinate p00, Coordinate p11) {
        Coordinate p0 = this.getIntVector(p00);
        Coordinate p1 = this.getIntVector(p11);
        Coordinate intersection = null;
        double disMin = 99999;
        double dis1 = BattleUtils.getInstance().getVectorLength(new Coordinate(p0.getX() - p1.getX(), p0.getY() - p1.getY()));

        ArrayList<Coordinate> listObs = this.mapGUI.getListCurrentObstacle();
        for (int i=0; i < listObs.size(); i++){
            Coordinate gd = null;
            Coordinate posBlock = this.mapGUI.convertIndexToPosUI((int)listObs.get(i).getX(), (int)listObs.get(i).getY());

            double disP1AndPosBlock = BattleUtils.getInstance().getVectorLength(new Coordinate(p1.getX() - posBlock.getX(), p1.getY() - posBlock.getY()));
            if (disP1AndPosBlock > (dis1 + this.cellSize)) continue;
            Coordinate g1 = this.getPointInsideRectangle(p1, posBlock, this.cellSize, this.cellSize);
            if(g1 != null) gd = g1;
            Coordinate g2 = this.getIntersectionLineAndRectangle(p0, p1, posBlock, this.cellSize, this.cellSize);
            if(g2 != null) gd = g2;
            if(gd != null){
                double dis = BattleUtils.getInstance().getVectorLength(new Coordinate(p0.getX() - gd.getX(), p0.getY() - gd.getY()));
                if (dis < disMin) {
                    intersection = gd;
                    disMin = dis;
                    this.obsTakeDame = listObs.get(i);
                }
            }
        }
        return intersection;
    }

    public ObjIntersectionWithUID getIntersectionWithOtherPlayer (Coordinate p0, Coordinate p1) {
        Coordinate intersection = null;
        double disMin = 99999;
        int retPlayerId = -1;
        double dis1 = BattleUtils.getInstance().getVectorLength(new Coordinate(p0.getX() - p1.getX(), p0.getY() - p1.getY()));

        for (int i = 0; i < this.mapGUI.listPlayer.size(); i++) {
            Character playerTakeDamage = this.mapGUI.listPlayer.get(i);
            if (!playerTakeDamage.isDestroy && playerTakeDamage.userId != this.player.userId) {
                Coordinate gd = null;
                Coordinate posEnemy = new Coordinate(playerTakeDamage.currentPos.getX(), playerTakeDamage.currentPos.getY());

                double disP1AndPosEnemy = BattleUtils.getInstance().getVectorLength(new Coordinate(p1.getX() - posEnemy.getX(), p1.getY() - posEnemy.getY()));
                if (disP1AndPosEnemy > (dis1 + this.cellSize)) continue;


                double widthPlayer = CharacterConfig.DEFAULT_WIDTH_WITH_GUN * playerTakeDamage.scale;
                double heightPlayer = CharacterConfig.DEFAULT_HEIGHT_WITH_GUN * playerTakeDamage.scale;

                Coordinate g1 = this.getPointInsideRectangle(p1, posEnemy, widthPlayer, heightPlayer);
                if(g1 != null) {
                    gd = g1;
                }else{
                    Coordinate g2 = this.getIntersectionLineAndRectangle(p0, p1, posEnemy, widthPlayer, heightPlayer);
                    if(g2 != null) gd = g2;
                }
                if (gd != null) {
                    double dis = BattleUtils.getInstance().getVectorLength(new Coordinate(p0.getX() - gd.getX(), p0.getY() - gd.getY()));
                    if (dis < disMin) {
                        intersection = gd;
                        disMin = dis;
                        retPlayerId = playerTakeDamage.userId;
                    }
                }
            }
        }

        if (intersection != null) {
            return new ObjIntersectionWithUID(intersection, retPlayerId);
        }
        return null;
    }

    public boolean checkCollision(Coordinate newPos) {
        Coordinate p1 = new Coordinate(this.currentPos.getX(), this.currentPos.getY());
        Coordinate p2 = new Coordinate(newPos.getX(), newPos.getY());

        boolean tmp = false;

        // Check collision with block
        Coordinate gdBlock = this.getIntersectionWithObstacle(p1, p2);
        if(gdBlock != null) {
            p2 = gdBlock;
            tmp = true;
        }

        //check collision voi players
        ObjIntersectionWithUID playerTakeDamage = this.getIntersectionWithOtherPlayer(p1, p2);
        if (playerTakeDamage != null) {
            Coordinate posTakeDamage = playerTakeDamage.intersection;
            int playerId = playerTakeDamage.userId;

            this.currentPos = posTakeDamage;
            this.handleDamagePlayer(playerId);

            return true;
        }

        //neu collision voi block ma ko collision voi enemy
        if (tmp) {
            this.currentPos = gdBlock;
            this.handleDamageObstacle(this.obsTakeDame);
            return true;
        }

        // Khi bullet di ra ngoai bien
        if (newPos.getX() < this.cellSize){
            return true;
        }

        if (newPos.getX() > this.cellSize * MapConfig.SIZE){
            return true;
        }

        if (newPos.getY() < this.cellSize){
            return true;
        }

        if (newPos.getY() > this.cellSize * MapConfig.SIZE){
            return true;
        }

        return false;
    }

    public void handleDamageObstacle (Coordinate pos) {
        this.mapGUI.damageCell(pos);
    }

    public void handleDamagePlayer(int playerID) {
        for (int i = 0; i < this.mapGUI.listPlayer.size(); i++) {
            Character iPlayer = this.mapGUI.listPlayer.get(i);
            if (iPlayer.userId == playerID) {
                if (iPlayer.canDamage) {
                    iPlayer.damaged();
                }
                break;
            }
        }
    }
}

class ObjIntersectionWithUID {
    public Coordinate intersection;
    public int userId;

    public ObjIntersectionWithUID(Coordinate intersection, int userId) {
        this.intersection = intersection;
        this.userId = userId;
    }
}