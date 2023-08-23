package nft.bearer;

import com.fasterxml.jackson.annotation.JsonProperty;

public class BearerObject {
    @JsonProperty("address")
    private String address;

    @JsonProperty("signature")
    private String signature;

    @JsonProperty("duration")
    private String duration;

    public String getAddress() {
        return address;
    }

    public String getSignature() {
        return signature;
    }

    public String getDuration() {
        return duration;
    }
}
