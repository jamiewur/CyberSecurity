package JustTry.CsLab;




import com.sun.xml.internal.rngom.parse.host.Base;
import org.apache.commons.codec.binary.Base64;

import java.io.IOException;
import java.security.GeneralSecurityException;

public class ReflectionAttack {

    public static void  main(String[] args){

        // initialize the crypto random generator
        CryptoRandomGenerator ranGen = new CryptoRandomGenerator();

        // define the length of random number - 16bytes (128 bits/ 1 AES block)
        int ranLen = 16;

        // Secret key K
       String secretTrigger = "s3649332s3649332s3649332s3649332";
       String ivTrigger = "s3649332s3649332";
       System.out.println("[Shared password]:" + secretTrigger);

       // initialize the AES
        AesEncDec aesEnc = new AesEncDec(secretTrigger,ivTrigger);

        try {
            // Communication 1
            System.out.println("----------------Communication 1----------------");
            // Trudy pretends to be Alice
            System.out.println("[Trudy side] Hi I'm Alice.");
            // Trudy generates the challenge R2
            byte[] r2BArr = ranGen.genCryptoRandom(ranLen);
            System.out.println("[Trudy side] R2 :" + Base64.encodeBase64String(r2BArr));
            System.out.println("Trudy sends the R2 to Bob");
            // Bob generates the challenge R1
            byte[] r1BArr = ranGen.genCryptoRandom(ranLen);
            System.out.println("[Bob side] R1: "+ Base64.encodeBase64String(r1BArr));
            // Bobe encrypts the R2 under his secret key K
            byte[] cipherR2 = aesEnc.encAes256CbcByte(r2BArr);
            System.out.println("[Bob side] The encrypted R2: "+ Base64.encodeBase64String(cipherR2));
            System.out.println("Bob sends the R1, and the encrypted R2 to Trudy.");


            // Communication 2
            System.out.println("----------------Communication 2----------------");
            // Trudy pretends to be Lily
            System.out.println("[Trudy side] Hi I'm Lily.");
            // Trudy sends Bob's challenge R1 to Bob
            System.out.println("[Trudy side] R1: "+Base64.encodeBase64String(r1BArr));
            // Trudy generates the challenge R3
            byte[] r3BArr = ranGen.genCryptoRandom(ranLen);
            // Bobe encrypts the R1 under his secret key K
            byte[] cipherR1 = aesEnc.encAes256CbcByte(r1BArr);
            System.out.println("[Bob side] The encrypted R1: " + Base64.encodeBase64String(cipherR1));
            System.out.println("Bob sends the R3,  and the encrypted R1 to Trudy");


            // Back to Communication 1
            System.out.println("----------------Communication 1----------------");
            // Trudy now has the encrypted R1 and sends to Bob
            System.out.println("Trudy sends the encrypted R1 to Bob. The encrypted R1: "+Base64.encodeBase64String(cipherR1));
            // Bob uses his secret key K to do decryption
            String plainR1 = aesEnc.decAes256CbcByte(cipherR1);
            System.out.println("[Bob side] decrypted R1: "+ plainR1);
            System.out.println("[Bob side] original R1: "+ Base64.encodeBase64String(r1BArr));
            if(plainR1.equals(Base64.encodeBase64String(r1BArr))){
                System.out.println("[Bob side] Alice (Trudy) is a legitimate user.");
            }

        }catch (GeneralSecurityException e){
            e.printStackTrace();
        }catch (IOException e){
            e.printStackTrace();
        }catch (Exception e){
            e.printStackTrace();
        }

    }
}
