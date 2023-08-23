package nft.web3;

import javafx.geometry.Pos;
import nft.get.GetUser;
import nft.post.PostUser;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;

class MathUtil {
    public static int times(int number, int times) {
        return number * times;
    }

    public static int squared(int number) {
        return number * number;
    }

    public static boolean isEven(int number) {
        return number % 2 == 0;
    }
}

public class CompletableFuture5 {

    public static final int NUMBER = 5;

    public static void run() throws ExecutionException, InterruptedException {
        // Create a CompletableFuture
        CompletableFuture<Integer> times2 = CompletableFuture.supplyAsync(() -> {
            try {
                TimeUnit.SECONDS.sleep(2);
            } catch (InterruptedException e) {
                throw new IllegalStateException(e);
            }
            return MathUtil.times(NUMBER, 2);
        });

        // Attach a callback to the Future using thenApply()
        CompletableFuture<Boolean> greetingFuture = times2.thenApply(n -> {
            try {
                TimeUnit.SECONDS.sleep(2);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            return MathUtil.squared(n);
        })
                // Chaining multiple callbacks
                .thenApply(n -> {
                    try {
                        TimeUnit.SECONDS.sleep(2);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                    return MathUtil.isEven(n);
                });

        // Block and get the result of the future.
        System.out.println(greetingFuture.get()); // true
    }

    public static void main(String[] args) throws InterruptedException, ExecutionException {
//        for (int i = 0; i < 4; i++) {
//            run();
//            System.out.println("Done " + i);
//        }
//        System.out.println("done !!!!!!");

//        ArrayList<Boolean> a = new ArrayList<>();
//        a.add(false);
//        a.add(true);
//        a.add(false);
//        a.add(false);
//        PostUser.postUserFinalGame(5, a);

//        { gameIndex: 1, arrayData: [ true, true, false, false ] }
//        { gameIndex: 2, arrayData: [ false, true, false, false ] }

//        { gameIndex: 2, arrayData: [ true, true, false, false ] }
//        { gameIndex: 2, arrayData: [ false, true, false, false ] }

        System.out.println("a");

        int idGame = GetUser.getIndexGame();
        System.out.println("Id game: " + idGame);

        System.out.println("b");
        try {
            TimeUnit.SECONDS.sleep(200);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
