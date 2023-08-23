package nft.web3;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;

public class testFuture {

//    public static void main(String[] args) throws InterruptedException, ExecutionException {
//
//        CompletableFuture<String> completableFuture = new CompletableFuture<>();
//
//        System.out.println("Manually complete");
//        completableFuture.complete(computeSomething());
//
//        System.out.print("Get the result: ");
//        String result = completableFuture.get();
//        System.out.println(result);
//    }

    public static String computeSomething() {
        try {
            System.out.println("Computing ... ");
            Thread.sleep(3000);
            System.out.println("Compute completed ... ");
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return "Future's Result";
    }
}

 class CompletableFuture2 {

    public static void main(String[] args) throws InterruptedException, ExecutionException {
        for (int i = 0; i < 4; i++) {
            run(i);
        }
    }

    public static void run(int i) throws ExecutionException, InterruptedException {
        System.out.println("Run a task specified " + i);
        CompletableFuture<Void> future = CompletableFuture.runAsync(() -> {
            System.out.println("It is runnig in a separate thread than the main thread"  + i);
            try {
                TimeUnit.SECONDS.sleep(3);
            } catch (InterruptedException e) {
                throw new IllegalStateException(e);
            }
            System.out.println("Completed " + i);
        });

        System.out.println("It is also running... "  + i);
        // Block and wait for the future to complete
        future.get();
        System.out.println("Done!!! "  + i);
    }
}