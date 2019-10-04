package JustTry.CsLab;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Arrays;
import java.util.Properties;

import org.apache.commons.crypto.random.CryptoRandom;
import org.apache.commons.crypto.random.CryptoRandomFactory;

public class CryptoRandomGenerator {

    public byte[] genCryptoRandom(int length) throws GeneralSecurityException,IOException{
        byte[] r = new byte[length];
        Properties properties = new Properties();

        try(CryptoRandom random = CryptoRandomFactory.getCryptoRandom(properties)){
            System.out.println(random.getClass().getCanonicalName());

            random.nextBytes(r);

            return r;
        }
    }
}
