package nft.get;

import org.apache.http.HttpResponse;
import org.apache.http.impl.nio.client.CloseableHttpAsyncClient;
import org.apache.http.impl.nio.client.HttpAsyncClients;
import org.apache.http.nio.IOControl;
import org.apache.http.nio.client.methods.AsyncCharConsumer;
import org.apache.http.nio.client.methods.HttpAsyncMethods;
import org.apache.http.protocol.HttpContext;
import org.json.JSONArray;

import java.io.IOException;
import java.math.BigInteger;
import java.nio.CharBuffer;
import java.util.concurrent.Future;
import java.util.concurrent.TimeUnit;

public class GetUser {
    public static int getBalance(String addr) {
        String url = "http://localhost:3000/user-balance/" + addr;
        CloseableHttpAsyncClient httpclient = HttpAsyncClients.createDefault();
        httpclient.start();
        try {
            UserBalanceResponse userBalanceResponse = new UserBalanceResponse();
            final Future<Boolean> future = httpclient.execute(
                    HttpAsyncMethods.createGet(url),
                    userBalanceResponse,
                    null
            );

            final Boolean result = future.get();

            if (result != null && result.booleanValue()) {
                return userBalanceResponse.value.intValue();
            } else {
                System.out.println("Request failed and resend!");
                return GetUser.getBalance(addr);
            }
        } catch (Exception e) {
            System.out.println(e);
        } finally {
            try {
                httpclient.close();
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }

        System.out.println("Catch error and resend!");
        return GetUser.getBalance(addr);
    }

    public static int[] getListSkin(String addr) {
        String url = "http://localhost:3000/user-skin/" + addr;
        CloseableHttpAsyncClient httpclient = HttpAsyncClients.createDefault();
        httpclient.start();
        try {
            UserListSkinResponse userListSkinResponse = new UserListSkinResponse();
            final Future<Boolean> future = httpclient.execute(
                    HttpAsyncMethods.createGet(url),
                    userListSkinResponse,
                    null
            );

            final Boolean result = future.get();

            if (result != null && result.booleanValue()) {
                return userListSkinResponse.value;
            } else {
                System.out.println("Request failed and resend!");
                return GetUser.getListSkin(addr);
            }
        } catch (Exception e) {
            System.out.println(e);
        } finally {
            try {
                httpclient.close();
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }

        System.out.println("Catch error and resend!");
        return GetUser.getListSkin(addr);
    }

    public static int getIndexGame() {
        String url = "http://localhost:3000/game-index";
        CloseableHttpAsyncClient httpclient = HttpAsyncClients.createDefault();
        httpclient.start();
        try {
            UserGameIndexResponse userGameIndexResponse = new UserGameIndexResponse();
            final Future<Boolean> future = httpclient.execute(
                    HttpAsyncMethods.createGet(url),
                    userGameIndexResponse,
                    null
            );

            final Boolean result = future.get();

            if (result != null && result.booleanValue()) {
                int value = userGameIndexResponse.value;
                if (value == -1) {
                    return GetUser.getIndexGame();
                } else {
                    return value;
                }

            } else {
                System.out.println("Request failed and resend!");
                return GetUser.getIndexGame();
            }
        } catch (Exception e) {
            System.out.println(e);
        } finally {
            try {
                httpclient.close();
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }

        System.out.println("Catch error and resend!");
        return GetUser.getIndexGame();
    }
}

class UserBalanceResponse extends AsyncCharConsumer<Boolean> {

    public String responseData = "";
    public BigInteger value;

    @Override
    protected void onResponseReceived(final HttpResponse response) {}

    @Override
    protected void onCharReceived(final CharBuffer buf, final IOControl ioctrl) {
        while (buf.hasRemaining()) {
            responseData += buf.get();
        }
    }

    @Override
    protected void releaseResources() {}

    @Override
    protected Boolean buildResult(final HttpContext context) {
        if (responseData != null && !responseData.isEmpty()) {
            try  {
                value = new BigInteger(responseData).divide(new BigInteger("1000000000000000000"));
            } catch (Exception e) {
                System.out.println("Request failed!");
                value = new BigInteger("-1");
            }

        }
        return Boolean.TRUE;
    }
}

class UserListSkinResponse extends AsyncCharConsumer<Boolean> {

    public String responseData = "";
    public int[] value = new int[10];

    @Override
    protected void onResponseReceived(final HttpResponse response) {}

    @Override
    protected void onCharReceived(final CharBuffer buf, final IOControl ioctrl) {
        while (buf.hasRemaining()) {
            responseData += buf.get();
        }
    }

    @Override
    protected void releaseResources() {}

    @Override
    protected Boolean buildResult(final HttpContext context) {
        if (responseData != null && !responseData.isEmpty()) {
            try  {
                JSONArray jsonArray = new JSONArray(responseData);

                for (int i = 0; i < jsonArray.length(); i++) {
                    value[i] = Integer.parseInt(jsonArray.getString(i));
                }
            } catch (Exception e) {
                System.out.println("Request failed!");
                value = new int[]{0, 0, 0, 0, 0, 0};
            }

        }
        return Boolean.TRUE;
    }
}

class UserGameIndexResponse extends AsyncCharConsumer<Boolean> {

    public String responseData = "";
    public int value;

    @Override
    protected void onResponseReceived(final HttpResponse response) {}

    @Override
    protected void onCharReceived(final CharBuffer buf, final IOControl ioctrl) {
        while (buf.hasRemaining()) {
            responseData += buf.get();
        }
    }

    @Override
    protected void releaseResources() {}

    @Override
    protected Boolean buildResult(final HttpContext context) {
        if (responseData != null && !responseData.isEmpty()) {
            try {
                value = Integer.parseInt(responseData);
            } catch (Exception e) {
                value = -1;
            }
        }
        return Boolean.TRUE;
    }
}