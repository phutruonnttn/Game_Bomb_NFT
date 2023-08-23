package battle;

import battle.model.Character;
import bitzero.server.BitZeroServer;
import cmd.response.battle.ResponseBattle;
import cmd.response.battle.ResponseEndBattle;
import config.battle.BattleConfig;
import config.battle.SynchronizeConfig;
import handler.BattleHandler;
import handler.LoopBattleHandle;
import nft.post.PostUser;
import util.battle.BattleUtils;

import java.util.ArrayList;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.TimeUnit;

public class BattleLoopMgr {
    public BattleMgr battleMgr;
    public ScheduledFuture simulateLoop;
    public LoopBattleHandle loopBattleHandle;

    public BattleLoopMgr(BattleMgr battleMgr) {
        this.battleMgr = battleMgr;
        this.loopBattleHandle = new LoopBattleHandle(this);
        runSimulateLoopClient();
    }

    public void cancelSimulateLoopClient() {
        simulateLoop.cancel(true);
    }

    public void runSimulateLoopClient() {
        simulateLoop = BitZeroServer.getInstance().getTaskScheduler().schedule(
                this.loopBattleHandle,
                2,
                TimeUnit.SECONDS
        );
    }

    public ArrayList<Integer> handleTokenEndGame(ArrayList<Boolean> listPlayer1FrameEarlierEnd, ArrayList<Character> listPlayerFrameEnd) {
        ArrayList<Integer> returnList = new ArrayList<>();

        int countUserAlive = 0;
        int countUserAlive1FrameEarlier = 0;
        for (int i = 0; i < 4; i++) {
            returnList.add(- BattleConfig.FEE_BATTLE);
            if (!listPlayerFrameEnd.get(i).isDestroy) countUserAlive++;
            if (!listPlayer1FrameEarlierEnd.get(i)) countUserAlive1FrameEarlier++;
        }

        switch (countUserAlive) {
            case 4: {
                for (int i = 0; i < 4; i++) {
                    returnList.set(i, (int) (BattleConfig.FEE_BATTLE * 0.95) - BattleConfig.FEE_BATTLE);
                }
                break;
            }
            case 3: {
                for (int i = 0; i < 4; i++) {
                    if (!listPlayerFrameEnd.get(i).isDestroy){
                        returnList.set(i, (int) (BattleConfig.FEE_BATTLE * 4 * 0.99 / 3) - BattleConfig.FEE_BATTLE);
                    }
                }
                break;
            }
            case 2: {
                for (int i = 0; i < 4; i++) {
                    if (!listPlayerFrameEnd.get(i).isDestroy){
                        returnList.set(i, (int) (BattleConfig.FEE_BATTLE * 4 * 0.99 / 2) - BattleConfig.FEE_BATTLE);
                    }
                }
                break;
            }
            case 1: {
                for (int i = 0; i < 4; i++) {
                    if (!listPlayerFrameEnd.get(i).isDestroy){
                        returnList.set(i, (int) (BattleConfig.FEE_BATTLE * 4 * 0.99) - BattleConfig.FEE_BATTLE);
                    }
                }
                break;
            }
            case 0: {
                switch (countUserAlive1FrameEarlier) {
                    case 4: {
                        for (int i = 0; i < 4; i++) {
                            returnList.set(i, (int) (BattleConfig.FEE_BATTLE * 0.95) - BattleConfig.FEE_BATTLE);
                        }
                        break;
                    }
                    case 3: {
                        for (int i = 0; i < 4; i++) {
                            if (!listPlayer1FrameEarlierEnd.get(i)) {
                                returnList.set(i, (int) (BattleConfig.FEE_BATTLE * 4 * 0.99 / 3) - BattleConfig.FEE_BATTLE);
                            }
                        }
                        break;
                    }
                    case 2: {
                        for (int i = 0; i < 4; i++) {
                            if (!listPlayer1FrameEarlierEnd.get(i)) {
                                returnList.set(i, (int) (BattleConfig.FEE_BATTLE * 4 * 0.99 / 2) - BattleConfig.FEE_BATTLE);
                            }
                        }
                        break;
                    }
                }
                break;
            }
        }


        return returnList;
    }

    public void runUpdateLoop(int numberFrameToUpdate) {
        // Start time to run update loop
        long startTime = System.nanoTime();

        ArrayList<Boolean> listPlayer1FrameEarlier = new ArrayList<>();
        ArrayList<Boolean> listPlayer1CycleEarlier = new ArrayList<>();

        for (int i = 0; i < 4; i++) {
            listPlayer1CycleEarlier.add(battleMgr.listPlayer.get(i).isDestroy);
        }

        for (int i = 0; i < numberFrameToUpdate; i++) {
            listPlayer1FrameEarlier = new ArrayList<>();
            for (int j = 0; j < 4; j++) {
                listPlayer1FrameEarlier.add(battleMgr.listPlayer.get(j).isDestroy);
            }

            double dt = BattleUtils.round((double) 1 / BattleConfig.FRAME_PER_SECOND);
            battleMgr.handleMoveLoop(dt);
            battleMgr.update(dt, i == 0);

            if (battleMgr.checkEndBattle()) break;
        }

        // Send end game soon
        for (int i = 0; i< 4; i++) {
            if (!listPlayer1CycleEarlier.get(i) && battleMgr.listPlayer.get(i).isDestroy && !battleMgr.checkEndBattle()) {
                BattleHandler.getInstance().listEndSoon[battleMgr.idGame].add(battleMgr.listUser.get(i).getId());
                BattleHandler.getInstance().sendEndBattle(
                        new ResponseEndBattle(
                                battleMgr.countFrame,
                                - BattleConfig.FEE_BATTLE,
                                battleMgr.listUser.get(i)
                        )
                );
            }
        }

        // End time to run update loop
        long endTime = System.nanoTime();

        if (this.battleMgr.checkEndBattle()) {
            System.out.println("SERVER END BATTLE!!!");
            ArrayList<Integer> listTokenEndGame = this.handleTokenEndGame(listPlayer1FrameEarlier, battleMgr.listPlayer);

            // Post data to final game
            ArrayList<Boolean> arrayDataPost = new ArrayList<>();
            for (int i = 0; i < 4; i++) {
                boolean value = !battleMgr.listPlayer.get(i).isDestroy;
                arrayDataPost.add(value);
                BattleHandler.getInstance().listResult[battleMgr.idGame].add(value);
            }
            PostUser.postUserFinalGame(battleMgr.idGame, arrayDataPost);

            // Send end packet
            for (int i = 0; i < listPlayer1FrameEarlier.size(); i++) {
                if (!listPlayer1FrameEarlier.get(i)) {
                    BattleHandler.getInstance().sendEndBattle(
                        new ResponseEndBattle(
                            battleMgr.countFrame,
                            listTokenEndGame.get(i),
                            battleMgr.listUser.get(i)
                        )
                    );
                }
            }

            // Send maxLoop + list action to user
            ResponseBattle responseBattle = new ResponseBattle(battleMgr.countFrame, battleMgr.listActionResponse);
            for (int i = 0; i < listPlayer1FrameEarlier.size(); i++) {
                if (!listPlayer1FrameEarlier.get(i)) {
                    BattleHandler.getInstance().sendResponseBattle(responseBattle, battleMgr.listUser.get(i));
                }
            }

            // Clear list action
            battleMgr.listActionResponse.clear();

            cancelSimulateLoopClient();
        } else {
            // Send maxLoop + list action to user
            ResponseBattle responseBattle = new ResponseBattle(battleMgr.countFrame, battleMgr.listActionResponse);
            for (int i = 0; i < listPlayer1CycleEarlier.size(); i++) {
                if (!listPlayer1CycleEarlier.get(i)) {
                    BattleHandler.getInstance().sendResponseBattle(responseBattle, battleMgr.listUser.get(i));
                }
            }

            // Clear list action
            battleMgr.listActionResponse.clear();

            int delay = (int) (BattleUtils.round((double) SynchronizeConfig.DELAY_FRAME / BattleConfig.FRAME_PER_SECOND) * 1000000000)
                        - (int) (endTime - startTime);
            this.simulateLoop = BitZeroServer.getInstance().getTaskScheduler().schedule(
                this.loopBattleHandle,
                delay,
                TimeUnit.NANOSECONDS
            );
        }
    }
}
