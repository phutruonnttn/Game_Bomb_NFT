package nft.web3;

import org.apache.http.impl.cookie.RFC2965PortAttributeHandler;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;

class MailUtil {
    public static String getMailInfo() {
        return "Your email content";
    }

    public static boolean sendMail() {
        System.out.println("Send mail: completed");
        return true;
    }

    public static void logging() {
        System.out.println("Log: Send mail at " + System.currentTimeMillis());
    }
}

public class CompletableFuture6 {
    public static void run(int i) {
        CompletableFuture.supplyAsync(() -> {
            try {
                TimeUnit.SECONDS.sleep(2);
            } catch (InterruptedException e) {
                throw new IllegalStateException(e);
            }
            return "aaaaaa " + i;
        }).thenAccept(content -> {
            System.out.println("Content: " + content);
        });
    }

    public static void main(String[] args) throws InterruptedException, ExecutionException {
        System.out.println("start");
        for (int i = 0; i < 4; i++) {
            run(i);
        }
        System.out.println("end");


        try {
            TimeUnit.SECONDS.sleep(10);
        } catch (InterruptedException e) {
            throw new IllegalStateException(e);
        }
    }
}
