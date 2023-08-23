package nft.post;

import handler.BattleHandler;
import handler.MatchingHandler;
import org.apache.http.entity.StringEntity;
import org.json.JSONObject;
import org.apache.http.HttpHeaders;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.nio.client.CloseableHttpAsyncClient;
import org.apache.http.impl.nio.client.HttpAsyncClients;
import org.apache.http.nio.IOControl;
import org.apache.http.nio.client.methods.AsyncCharConsumer;
import org.apache.http.nio.client.methods.HttpAsyncMethods;
import org.apache.http.protocol.HttpContext;

import java.io.IOException;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.CharBuffer;
import java.util.ArrayList;
import java.util.Objects;
import java.util.concurrent.*;

public class PostUser {

    public static void postUserJoinGame(ArrayList<String> listBearer, int idGame) {
        try {
            // Create a URL object with the endpoint you want to call
            URL url = new URL("http://localhost:3000/user-joingame");

            // Open a connection to the URL
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();

            CompletableFuture.supplyAsync(() -> {
                try {
                    // Set the request method to POST
                    connection.setRequestMethod("POST");

                    // Set request headers
                    connection.setRequestProperty("Authorization", "Bearer " + listBearer.get(MatchingHandler.getInstance().countPost[idGame]));

                    // Get the response code
                    return connection.getResponseCode();

                } catch (Exception e) {
                    return -1;
                }
            }).thenAccept(content -> {
                if (content != 201) {
                    System.out.println("postUserJoinGame error: " + content);
                    postUserJoinGame(listBearer, idGame);
                } else {
                    System.out.println("Success join game " + idGame + " : " + MatchingHandler.getInstance().countPost[idGame]);
                    if (MatchingHandler.getInstance().countPost[idGame] + 1 < 4) {
                        MatchingHandler.getInstance().countPost[idGame]++;
                        postUserJoinGame(listBearer, idGame);
                    } else {
                        MatchingHandler.getInstance().isDoneJoin[idGame] = true;

                        if (MatchingHandler.getInstance().isWaitingFinish[idGame] == true) {
                            postUserFinalGame(idGame, BattleHandler.listResult[idGame]);
                        }
                    }
                }

                // Close the connection
                connection.disconnect();
            });

        } catch (Exception e) {
            System.out.println("postUserJoinGame: " + e);
        }
    }

    public static void postUserFinalGame(int indexGame, ArrayList<Boolean> arrayData) {
        if (MatchingHandler.getInstance().isDoneJoin[indexGame] == false) {
            System.out.println("Waiting to end ...");
            MatchingHandler.getInstance().isWaitingFinish[indexGame] = true;
            return;
        }
        MatchingHandler.getInstance().isWaitingFinish[indexGame] = false;
        try {
            // Create a URL object with the endpoint you want to call
            URL url = new URL("http://localhost:3000/user-winner");

            // Open a connection to the URL
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();

            JSONObject requestBody = new JSONObject();
            requestBody.put("gameIndex", indexGame);
            requestBody.put("arrayData", arrayData);
            String jsonBody = requestBody.toString();

            CompletableFuture.supplyAsync(() -> {
                try {
                    // Set the request method to POST
                    connection.setRequestMethod("POST");

                    // Set request headers
                    connection.setRequestProperty("accept", "*/*");
                    connection.setRequestProperty("Content-Type", "application/json"); // Set the appropriate content type

                    // Enable output (sending data to the server)
                    connection.setDoOutput(true);

                    // Write the body data to the connection's output stream
                    OutputStream outputStream = connection.getOutputStream();
                    outputStream.write(jsonBody.getBytes());
                    outputStream.flush();
                    outputStream.close();

                    // Get the response code
                    return connection.getResponseCode();

                } catch (Exception e) {
                    return -1;
                }

            }).thenAccept(content -> {
                if (content != 201) {
                    System.out.println("postUserFinalGame error: " + content);
                    postUserFinalGame(indexGame, arrayData);
                } else {
                    MatchingHandler.getInstance().isDoneFinish[indexGame] = true;
                    System.out.println("Success finish game: " + indexGame);
                }

                // Close the connection
                connection.disconnect();
            });

        } catch (Exception e) {
            System.out.println("postUserFinalGame: " + e);
        }
    }

    public static void postUserBuySkin(String addr, int cost, int id) {
        String url = "http://localhost:3000/user-buy-skin";
        final CloseableHttpAsyncClient httpclient = HttpAsyncClients.createDefault();
        httpclient.start();
        try {
            HttpPost request = new HttpPost(url);

            // Thiết lập header "Content-Type" là "application/json"
            request.setHeader(HttpHeaders.CONTENT_TYPE, "application/json");

            // Tạo chuỗi JSON
            String jsonBody = "{ \"addr\": \"" + addr + "\", \"cost\": " + cost + ", \"id\": " + id + " }";

            // Thiết lập nội dung của request là chuỗi JSON
            request.setEntity(new StringEntity(jsonBody, "UTF-8"));

            UserGameResponse response = new UserGameResponse();
            final Future<Boolean> future = httpclient.execute(
                    HttpAsyncMethods.create(request),
                    response, null);

            final Boolean result = future.get();

            if (result != null && result.booleanValue()) {
                System.out.println(response.responseData);
                if (!Objects.equals(response.responseData, "true")) {
                    PostUser.postUserBuySkin(addr,cost,id);
                }
            } else {
                System.out.println("Request failed");
                PostUser.postUserBuySkin(addr,cost,id);
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
    }
}

class UserGameResponse extends AsyncCharConsumer<Boolean> {

    public String responseData = "";

    @Override
    protected void onResponseReceived(final HttpResponse response) {
    }

    @Override
    protected void onCharReceived(final CharBuffer buf, final IOControl ioctrl)
            throws IOException {
        while (buf.hasRemaining()) {
            responseData += buf.get();
        }
    }

    @Override
    protected void releaseResources() {
    }

    @Override
    protected Boolean buildResult(final HttpContext context) {
        if (responseData != null && !responseData.isEmpty()) {

        }
        return Boolean.TRUE;
    }
}