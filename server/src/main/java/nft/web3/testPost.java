package nft.web3;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.concurrent.CompletableFuture;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.http.HttpHeaders;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.concurrent.FutureCallback;
import org.apache.http.impl.nio.client.CloseableHttpAsyncClient;
import org.apache.http.impl.nio.client.HttpAsyncClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.nio.IOControl;
import org.apache.http.nio.client.methods.AsyncCharConsumer;
import org.apache.http.nio.client.methods.HttpAsyncMethods;
import org.apache.http.protocol.HttpContext;
import sun.plugin2.ipc.windows.WindowsIPCFactory;

import java.io.IOException;
import java.nio.CharBuffer;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.*;



public class testPost {
    public static void main(String[] args) throws IOException {
        String[] strings = {
          "eyJhZGRyZXNzIjoiMHgzN2Y4MDU0ZmYzNGZjNmUwM2JlNDQwNWExZjk0Nzk5ZDZjYjJkMzAyIiwic2lnbmF0dXJlIjoiMHg2NTM5MDBkN2UzN2VjNTIyMGI4YTVlYjkwMTZiZGJlMjRiOWE1NGRkYjI3YjVmOTIyNmNiODk5YWE0YzRlYjQ4NzBmMDFjMDMyMzAzNDM1MTNlNjE5ODBlMGE2NWVjMjMyYjYyODA4YTYyMDg4ZjNhYTVkNzY3MWMyNGQ0MTMwNTFiIiwiZHVyYXRpb24iOjE2ODk1MDE2NDd9",
          "eyJhZGRyZXNzIjoiMHg3OWQ5MmQ5ZDlmMGMwYWI4ZTg1ZjJkNDc4MDExYWU2YTI3YzFkYzFhIiwic2lnbmF0dXJlIjoiMHhhMTgyNTE2NzM5YzEyOTcyNjhiMjJjOWZiMzNmMWUzZjdjMzk0ODhkNWI4ODlhMDhiNDRjOTU0ZTU5NWU1OTFmMTJlOWZmNmJkY2UxYTlkZmVhYzA5OWE2NTNhNzVmZjMxODRiMWZkYzFjNjVhYWJiOThjOWY5NGE4YjQ0YTE1MzFjIiwiZHVyYXRpb24iOjE2ODk1MDE3NTR9",
          "eyJhZGRyZXNzIjoiMHhkN2NkZjQyNDE4MzdlNWQyYjE0NGM2OTExMjZiMmIwNzdlNzQwNjViIiwic2lnbmF0dXJlIjoiMHg1ZWIyODAxODYxNGQzNDFlMmJiZWZhYmZmMjBhZGYzMTc1ODQ2Y2RhNjY1ZWE4YzYxZWMzOWU1NzgxNDQ3ZTdmNjA2Y2IyZDcyNjk1NDBhNThjNzM0Y2RmNTVjNjc3YmRiZGIyMzU2NmQ4NzIwMmM2NWFiN2ZiODkyYmZkMThjYTFiIiwiZHVyYXRpb24iOjE2ODk1MDE3OTN9",
          "eyJhZGRyZXNzIjoiMHhkYzU0NmJkYjQ5ZmM0YmMwMGU2ZjU3ZGJiY2VmYTUwNmFkN2M3MTFiIiwic2lnbmF0dXJlIjoiMHhjZWRkNTU4ODZjM2ExYzFjZmU3NDNmNzhhZDdjNjQ4MDExNDY5OTg2MDNiZjEyNDUyODUzZDIxNmJmMmZiNjEyNzdlYmJjZGU0YTc2MGQ2NTU4NWY2N2E4MGQ4OTVjYWFmNjc0NGUxNWU0ODNhZjAzMTAyMzBlNTRjNjdlODE2ZDFjIiwiZHVyYXRpb24iOjE2ODk1MDE4MzB9"
        };

        System.out.println("start");
        for (int i = 0; i < 4; i++) {
            run(strings[i]);
            System.out.println("run " + i);
        }
        System.out.println("end");

        try {
            TimeUnit.SECONDS.sleep(200);
        } catch (InterruptedException e) {
            throw new IllegalStateException(e);
        }
    }

    public static void run(String s) throws IOException {
        // Create a URL object with the endpoint you want to call
        URL url = new URL("http://localhost:3000/user-joingame");

        // Open a connection to the URL
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();

        CompletableFuture.supplyAsync(() -> {
            try {
                // Set the request method to POST
                connection.setRequestMethod("POST");

                // Set request headers
                connection.setRequestProperty("Authorization", "Bearer " + s);

                // Get the response code
                return connection.getResponseCode();

            } catch (Exception e) {
                System.out.println(e);
                return -1;
            }

        }).thenAccept(content -> {
            if (content != 201) {
                try {
                    run(s);
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            } else {
                System.out.println("Content: " + content);
            }

            // Close the connection
            connection.disconnect();
        });

    }
}
