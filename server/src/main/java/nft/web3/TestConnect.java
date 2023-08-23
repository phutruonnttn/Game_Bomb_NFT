package nft.web3;

import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.DefaultBlockParameter;
import org.web3j.protocol.core.methods.response.EthGetBalance;
import org.web3j.protocol.http.HttpService;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.math.RoundingMode;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class TestConnect {
    public static void main(String[] args) throws ExecutionException, InterruptedException, TimeoutException {
        final Web3j client = Web3j.build(
                new HttpService(
                        "https://mainnet.infura.io/v3/d98fe82f2092455e8056ddff316aa2e7"
                )
        );
        final String ethAddress = "0xDB65702A9b26f8a643a31a4c84b9392589e03D7c";
        final EthGetBalance balanceResponse = client
                .ethGetBalance(ethAddress, DefaultBlockParameter.valueOf("latest")).sendAsync()
                .get(10, TimeUnit.SECONDS);

        final BigInteger unscaledBalance = balanceResponse.getBalance();
        final BigDecimal scaledBalance = new BigDecimal(unscaledBalance)
                .divide(new BigDecimal(1000000000000000000L), 18, RoundingMode.HALF_UP);

        System.out.println("unscaledBalance: " + unscaledBalance);
        System.out.println("scaledBalance: " + scaledBalance);
    }
}
