package JustTry.CsLab.Week10;

import org.apache.commons.crypto.random.CryptoRandom;
import org.apache.commons.crypto.random.CryptoRandomFactory;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Properties;

public class CrytoRandomGenerator {

    public byte[] genCryptoRandom(int length) throws GeneralSecurityException, IOException {
        byte[] r = new byte[length];
        Properties properties = new Properties();

//        properties.put(CryptoRandomFactory.CLASSES_KEY, CryptoRandomFactory.RandomProvider.OPENSSL.getClassName());

        try ( CryptoRandom random = CryptoRandomFactory.getCryptoRandom(properties)){
            System.out.println(random.getClass().getCanonicalName());
            random.nextBytes(r);
            return r;
        }
    }
}
