package nft.bearer;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

public class DecoderBearer {

    public static BearerObject decodeToken(String token) {
        byte[] decodedBytes = Base64.getDecoder().decode(token);
        String decodedToken = new String(decodedBytes);

        ObjectMapper objectMapper = new ObjectMapper();
        BearerObject dataObject = null;
        try {
            dataObject = objectMapper.readValue(decodedToken, BearerObject.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return dataObject;
    }
}
