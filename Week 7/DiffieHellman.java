package JustTry;
import com.sun.xml.internal.rngom.parse.host.Base;
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.codec.binary.Hex;

import java.security.*;
import javax.crypto.*;
import javax.crypto.interfaces.DHPublicKey;
import javax.crypto.spec.DHParameterSpec;

public class DiffieHellman {

    KeyPair aliceKeyPair;
    KeyAgreement aliceKeyAgree;
    PublicKey alicePubKey;
    PrivateKey alicePriKey;

    KeyPair bobKeyPair;
    KeyAgreement bobKeyAgree;
    PublicKey bobPubKey;
    PrivateKey bobPriKey;
    DHParameterSpec dhParam;


    /*
     * Alice Side
     */

    private void setAliceKeyPair(KeyPair aliceKeyPair){
        this.aliceKeyPair = aliceKeyPair;
        this.alicePubKey = aliceKeyPair.getPublic();
        this.alicePriKey = aliceKeyPair.getPrivate();
    }

    private KeyPair getAliceKpair(){
        return this.aliceKeyPair;
    }

    private void setAliceKeyAgree(KeyAgreement aliceKeyAgree){
        this.aliceKeyAgree = aliceKeyAgree;
    }

    private PublicKey getAlicePubKey(){
        return this.alicePubKey;
    }

    private PrivateKey getAlicePriKey(){
        return this.alicePriKey;
    }

    private void genAliceKeyPair() throws NoSuchAlgorithmException {
        /*
         * Alice create her own DH key with 2048-bit key size
         */
        System.out.println("ALICE: Generate DH keypair ...");

        //Specify the type of key pairs, final String DH = "DH"
        KeyPairGenerator aliceKpairGen = KeyPairGenerator.getInstance("DH");

        // KeyLength=2048bits=256bytes
        int keyLength = 2048;
        aliceKpairGen.initialize(keyLength);
        KeyPair aliceKpair = aliceKpairGen.generateKeyPair();

        this.setAliceKeyPair(aliceKpair);
    }

    public void genAliceKeyAgree() throws NoSuchAlgorithmException, InvalidKeyException{
        // Alice creates and init her DH keyAgreement object
        System.out.println("ALICE: Initialization...");
        KeyAgreement aliceKeyAgree = KeyAgreement.getInstance("DH");
        aliceKeyAgree.init(this.getAlicePriKey());

        this.setAliceKeyAgree(aliceKeyAgree);
    }



    /*
     * Bob Side
     */

    private void setBobKeyPair(KeyPair bobKeyPair){
        this.bobKeyPair = bobKeyPair;
        this.bobPubKey = bobKeyPair.getPublic();
        this.bobPriKey = bobKeyPair.getPrivate();
    }

    private void setBobKeyAgree(KeyAgreement bobKeyAgree){
        this.bobKeyAgree = bobKeyAgree;
    }

    private PublicKey getBobPubKey(){
        return this.bobPubKey;
    }

    private PrivateKey getBobPriKey(){
        return this.bobPriKey;
    }

    public void setDhParam(PublicKey pubKey){
        DHParameterSpec dhParamFromAlicePubKey = ((DHPublicKey) pubKey).getParams();

        this.dhParam = dhParamFromAlicePubKey;
    }

    public KeyPair getBobKeyPair(){
        return this.bobKeyPair;
    }

    private void genBobKeyPair() throws InvalidAlgorithmParameterException,NoSuchAlgorithmException {
        /*
         * Bob create her own DH key with 2048-bit key size
         */
        System.out.println("BOB: Generate DH keypair ...");

        //Specify the type of key pairs, final String DH = "DH"
        KeyPairGenerator bobKpairGen = KeyPairGenerator.getInstance("DH");

        // KeyLength=2048bits=256bytes
        bobKpairGen.initialize(dhParam);

        KeyPair bobKpair = bobKpairGen.generateKeyPair();

        this.setBobKeyPair(bobKpair);
    }

    public void genBobKeyAgree() throws NoSuchAlgorithmException, InvalidKeyException{
        // Bob creates and init her DH keyAgreement object
        System.out.println("BOB: Initialization...");
        KeyAgreement bobKeyAgree = KeyAgreement.getInstance("DH");
        bobKeyAgree.init(bobKeyPair.getPrivate());

        this.setBobKeyAgree(bobKeyAgree);
    }



    // Main

    public static void main(String[] args){

        DiffieHellman df = new DiffieHellman();

        try {
            //Alice side init
            df.genAliceKeyPair();
            df.genAliceKeyAgree();
            KeyPair aliceKpair = df.getAliceKpair();
            df.setAliceKeyPair(aliceKpair);
            PublicKey alicePubKey = df.getAlicePubKey();
            PrivateKey alicePriKey = df.getAlicePriKey();

            //Bob side init
            df.setDhParam(alicePubKey);
            df.genBobKeyPair();
            df.genBobKeyAgree();
            KeyPair bobKpair = df.getBobKeyPair();
            df.setBobKeyPair(bobKpair);
            PublicKey bobPubKey = df.getBobPubKey();
            PrivateKey bobPriKey = df.getBobPriKey();

            // key agreement
            System.out.println("ALICE: Execute PHASE1 ...");
            df.aliceKeyAgree.doPhase(bobPubKey,true);

            System.out.println("BOB: Execute PHASE1 ...");
            df.bobKeyAgree.doPhase(alicePubKey,true);

            // Encode the keys
            byte[] alicePubKeyEncoded = alicePubKey.getEncoded();
            byte[] alicePriKeyEncoded = alicePriKey.getEncoded();
            System.out.println("[Alice side]: Alice generates diffie-hellman key agreement.");
            byte[] bobPubKeyEncoded = bobPubKey.getEncoded();
            byte[] bobPriKeyEncoded = bobPriKey.getEncoded();
            System.out.println("[Bob side]: Bob generates diffie-hellman key agreement.");

            String alicePubKeyBase64 = Base64.encodeBase64String(alicePubKeyEncoded);
            System.out.println("[ALice side]: Alice sends public key to Bob: "+ alicePubKeyBase64);


            String bobPubKeyBase64 = Base64.encodeBase64String(bobPubKeyEncoded);
            System.out.println("[Bob side]: Bob sends public key to Alice: "+ bobPubKeyBase64);


            byte[] aliceSharedSecret = df.aliceKeyAgree.generateSecret();
            int aliceLen = aliceSharedSecret.length;
            byte[] bobSharedSecret = new byte[aliceLen];
            int bobLen = df.bobKeyAgree.generateSecret(bobSharedSecret,0);

            System.out.println("Alice secret: "+ Hex.encodeHexString(aliceSharedSecret));
            System.out.println("Bob secret: "+ Hex.encodeHexString(bobSharedSecret));
            if(!java.util.Arrays.equals(aliceSharedSecret, bobSharedSecret))
                throw new Exception("Shared secrets differ");
            System.out.println("Shared secrets are the same");

        }catch (InvalidAlgorithmParameterException iape){
            System.out.println(iape.getMessage());
        }catch (NoSuchAlgorithmException nae){
            System.out.printf(nae.getMessage());
        }catch (InvalidKeyException ike){
            System.out.println(ike.getMessage());
        }catch (ShortBufferException sbe){
            System.out.println(sbe.getMessage());
        }catch (Exception e){
            e.printStackTrace();
        }


    }

}
