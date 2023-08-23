//package nft.web3;
//
//import java.io.IOException;
//import java.math.BigInteger;
//import java.nio.CharBuffer;
//import java.util.ArrayList;
//import java.util.List;
//import java.util.concurrent.ExecutionException;
//import java.util.concurrent.Future;
//
//import com.fasterxml.jackson.annotation.JsonProperty;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import org.apache.http.HttpHeaders;
//import org.apache.http.HttpResponse;
//import org.apache.http.NameValuePair;
//import org.apache.http.client.entity.UrlEncodedFormEntity;
//import org.apache.http.client.methods.HttpPost;
//import org.apache.http.impl.nio.client.CloseableHttpAsyncClient;
//import org.apache.http.impl.nio.client.HttpAsyncClients;
//import org.apache.http.message.BasicNameValuePair;
//import org.apache.http.nio.IOControl;
//import org.apache.http.nio.client.methods.AsyncCharConsumer;
//import org.apache.http.nio.client.methods.HttpAsyncMethods;
//import org.apache.http.protocol.HttpContext;
//
//public class TestAsyncHttp {
//
//    public static void main(final String[] args) {
////        getUserBalance("0x37f8054ff34fC6E03Be4405A1f9476cB2D302");
////        postUserJoinGame("eyJhZGRyZXNzIjoiMHgzN2Y4MDU0ZmYzNGZjNmUwM2JlNDQwNWExZjk0Nzk5ZDZjYjJkMzAyIiwic2lnbmF0dXJlIjoiMHg4NWQwOGViZjc0OWVmMDA3NDhmNzVjNmUxNDI4Y2VhZDI1MWI5Yjc1NDI1YmJjNDNmYWVlOWY3YzNkNzVhMTNhNmIzYWFjZDU1YzQ4YWQzZmI5ZmM4MWVmMjYyZDBlM2YxNzk4ZWI2ZDQ2NTNmOWIxNDdmOWM4NTQ1ZjZmNWJhMTFjIiwiZHVyYXRpb24iOjE2ODg4ODg4MzV9");
//    }
//
//    public static void getUserBalance(String addr) {
//        String url = "http://localhost:3000/user-balance/" + addr;
//        CloseableHttpAsyncClient httpclient = HttpAsyncClients.createDefault();
//        httpclient.start();
//        try {
//            UserBalanceResponse userBalanceResponse = new UserBalanceResponse();
//            final Future<Boolean> future = httpclient.execute(
//                    HttpAsyncMethods.createGet(url),
//                    userBalanceResponse,
//                    null
//            );
//
//            final Boolean result = future.get();
//
//            if (result != null && result.booleanValue()) {
//                System.out.println("Get user balance " + addr + ": " + userBalanceResponse.value);
//            } else {
//                System.out.println("Request failed");
//            }
//        } catch (Exception e) {
//            System.out.println(e);
//        } finally {
//            try {
//                httpclient.close();
//            } catch (IOException e) {
//                throw new RuntimeException(e);
//            }
//        }
//    }
//
//    public static void postUserJoinGame(String bearToken) {
//        String url = "http://localhost:3000/user-joingame";
//        final CloseableHttpAsyncClient httpclient = HttpAsyncClients.createDefault();
//        httpclient.start();
//        try {
//            HttpPost request = new HttpPost(url);
//
//            // Set header as a key-value pair
//            request.addHeader(HttpHeaders.AUTHORIZATION, "Bearer " + bearToken);
//
////            // Set headers
////            request.setHeader(HttpHeaders.CONTENT_TYPE, "application/x-www-form-urlencoded");
////
////            // Set post data
////            List<NameValuePair> postData = new ArrayList<>();
////            postData.add(new BasicNameValuePair("param1", "value1"));
////            postData.add(new BasicNameValuePair("param2", "value2"));
////            request.setEntity(new UrlEncodedFormEntity(postData));
//
//            MyResponseConsumer myResponseConsumer = new MyResponseConsumer();
//            final Future<Boolean> future = httpclient.execute(
//                    HttpAsyncMethods.create(request),
//                    myResponseConsumer, null);
//
//            final Boolean result = future.get();
//
//            if (result != null && result.booleanValue()) {
//                System.out.println("Response object: " + myResponseConsumer.responseObject.toString());
//                System.out.println("\nRequest successfully executed");
//            } else {
//                System.out.println("Request failed");
//            }
//        } catch (Exception e) {
//            System.out.println(e);
//        } finally {
//            try {
//                httpclient.close();
//            } catch (IOException e) {
//                throw new RuntimeException(e);
//            }
//        }
//    }
//
//    static class MyResponseConsumer extends AsyncCharConsumer<Boolean> {
//
//        public String responseData = "";
//        public YourResponseObject responseObject;
//
//        @Override
//        protected void onResponseReceived(final HttpResponse response) {
//        }
//
//        @Override
//        protected void onCharReceived(final CharBuffer buf, final IOControl ioctrl)
//                throws IOException {
//            while (buf.hasRemaining()) {
//                responseData += buf.get();
//            }
//        }
//
//        @Override
//        protected void releaseResources() {
//        }
//
//        @Override
//        protected Boolean buildResult(final HttpContext context) {
//            if (responseData != null && !responseData.isEmpty()) {
//                try {
//                    ObjectMapper mapper = new ObjectMapper();
//                    responseObject = mapper.readValue(responseData, YourResponseObject.class);
//                } catch (IOException e) {
//                    e.printStackTrace();
//                }
//            }
//            return Boolean.TRUE;
//        }
//    }
//}
//
//class UserBalanceResponse extends AsyncCharConsumer<Boolean> {
//
//    public String responseData = "";
//    public BigInteger value;
//
//    @Override
//    protected void onResponseReceived(final HttpResponse response) {}
//
//    @Override
//    protected void onCharReceived(final CharBuffer buf, final IOControl ioctrl) {
//        while (buf.hasRemaining()) {
//            responseData += buf.get();
//        }
//    }
//
//    @Override
//    protected void releaseResources() {}
//
//    @Override
//    protected Boolean buildResult(final HttpContext context) {
//        if (responseData != null && !responseData.isEmpty()) {
//            try  {
//                value = new BigInteger(responseData).divide(new BigInteger("1000000000000000000"));
//            } catch (Exception e) {
//                value = new BigInteger("0");
//            }
//
//        }
//        return Boolean.TRUE;
//    }
//}
//
//class YourResponseObject {
//    @JsonProperty("statusCode")
//    private int statusCode;
//
//    @JsonProperty("message")
//    private String message;
//
//    // Các getters và setters
//
//    @Override
//    public String toString() {
//        return "YourResponseObject [statusCode=" + statusCode + ", message=" + message + "]";
//    }
//}