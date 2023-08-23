package logState;

import battle.BattleMgr;
import config.battle.MapConfig;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;

public class LogState {

    private static LogState single_instance = null;

    public static LogState getInstance() {
        if (single_instance == null) {
            single_instance = new LogState();
        }
        return single_instance;
    }

    public void logToFile(BattleMgr gameMgr, int countLoop){
        String content = "";

        // Log monster
        content += "Player: [x - y - numBomb - powerBlast - numberOfLife - speed]";
        double sumPlayer = 0;
        for (int i = 0; i < gameMgr.listPlayer.size(); i++) {
            content += "\n" + i + ". ["
                    + String.format("%.3f", gameMgr.listPlayer.get(i).currentPos.getX()) + " - "
                    + String.format("%.3f", gameMgr.listPlayer.get(i).currentPos.getY()) + "-"
                    + gameMgr.listPlayer.get(i).numbMaxBomb + "-"
                    + gameMgr.listPlayer.get(i).powerBlast + "-"
                    + gameMgr.listPlayer.get(i).numberOfLife + "-"
                    + String.format("%.3f", gameMgr.listPlayer.get(i).speed) + "]";

            sumPlayer += gameMgr.listPlayer.get(i).currentPos.getX()
                    + gameMgr.listPlayer.get(i).currentPos.getY()
                    + gameMgr.listPlayer.get(i).numbMaxBomb
                    + gameMgr.listPlayer.get(i).powerBlast
                    + gameMgr.listPlayer.get(i).numberOfLife
                    + gameMgr.listPlayer.get(i).speed;
        }

        // Log list bomb
        content += "\n\nBomb: [userID - x - y - timer]";
        double sumBomb = 0;
        for (int i = 0; i < gameMgr.listBomb.size(); i++) {
            content += "\n" + i + ". ["
                    + gameMgr.listBomb.get(i).player.userId + " - "
                    + String.format("%.3f", gameMgr.listBomb.get(i).pos.getX()) + " - "
                    + String.format("%.3f", gameMgr.listBomb.get(i).pos.getY()) + " - "
                    + String.format("%.3f", gameMgr.listBomb.get(i).timer) + "]";

            sumBomb += gameMgr.listBomb.get(i).player.userId
                    + gameMgr.listBomb.get(i).pos.getX()
                    + gameMgr.listBomb.get(i).pos.getY()
                    + gameMgr.listBomb.get(i).timer;
        }

        // Log list bullet
        content += "\n\nBullet: [userID - x - y - isDestroy]";
        double sumBullet = 0;
        for (int i = 0; i < gameMgr.listBullet.size(); i++) {
            content += "\n" + i + ". ["
                    + gameMgr.listBullet.get(i).player.userId + " - "
                    + String.format("%.3f", gameMgr.listBullet.get(i).currentPos.getX()) + " - "
                    + String.format("%.3f", gameMgr.listBullet.get(i).currentPos.getY()) + " - "
                    + gameMgr.listBullet.get(i).isDestroy + "]";

            sumBullet += gameMgr.listBullet.get(i).player.userId
                    + gameMgr.listBullet.get(i).currentPos.getX()
                    + gameMgr.listBullet.get(i).currentPos.getY();
        }

        // Log map state
        content += "\n\nMap logic:";
        double sumMap = 0;
        for (int i = 0 ; i < gameMgr.mapMgr.size; i++) {
            content += "\n[";
            for (int j = 0; j < gameMgr.mapMgr.size; j++) {
                sumMap += gameMgr.mapMgr.data[i][j];
                content += gameMgr.mapMgr.data[i][j];
                if ( j != gameMgr.mapMgr.size - 1) {
                    content += " - ";
                }
            }
            content += "]";
        }

        // Round
        String contentSum = String.format("%.3f", sumPlayer) + "\n"
                            + String.format("%.3f", sumBomb) + "\n"
                            + String.format("%.3f", sumBullet) + "\n"
                            + sumMap;

        logState(content, countLoop);
        logSumState(contentSum, countLoop);
    }

    public void logState(String content, int countLoop) {
        try {
            // Make new directory
            String dir = "../logServer/logState";
            File theDir = new File(dir);
            if (!theDir.exists()){
                theDir.mkdirs();
            }

            // Make new file
            String path = dir + "/"+ countLoop + "-server-stateFrame.txt";
            File file = new File(path);
            file.createNewFile();

            // Write file
            FileWriter fw = new FileWriter(path, false);// ghi de
            BufferedWriter bw = new BufferedWriter(fw);
            bw.write(content);
            bw.close();

        } catch (Exception e) {
            System.out.println(e);
        }
    }

    public void logSumState(String content, int countLoop) {
        try {
            // Make new directory
            String dir = "../logServer/logSumState";
            File theDir = new File(dir);
            if (!theDir.exists()){
                theDir.mkdirs();
            }

            // Make new file
            String path = dir + "/" + countLoop + "-server-sumStateFrame.txt";
            File file = new File(path);
            file.createNewFile();

            // Write file
            FileWriter fw = new FileWriter(path, false);// ghi de
            BufferedWriter bw = new BufferedWriter(fw);
            bw.write(content);
            bw.close();

        } catch (Exception e) {
            System.out.println(e);
        }
    }
}
