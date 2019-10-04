package JustTry.CsLab;

import java.nio.ByteBuffer;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.Properties;
import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.crypto.cipher.CryptoCipher;
import org.apache.commons.crypto.utils.Utils;

public class AesEncDec {

    String secretTrigger = "";
    String ivTrigger = "";


    public AesEncDec(String secretTrigger, String ivTrigger){
        this.secretTrigger = secretTrigger;
        this.ivTrigger = ivTrigger;
    }


    private static byte[] getUTF8Bytes(String input) {
        return input.getBytes(StandardCharsets.UTF_8);
    }

    private static String asString(ByteBuffer buffer) {
        final ByteBuffer copy = buffer.duplicate();
        final byte[] bytes = new byte[copy.remaining()];
        copy.get(bytes);
        return new String(bytes, StandardCharsets.UTF_8);
    }

    public byte[] encAes256CbcByte(byte[] a) throws Exception{

        SecretKeySpec key = new SecretKeySpec(getUTF8Bytes(secretTrigger), "AES");
        IvParameterSpec iv = new IvParameterSpec(getUTF8Bytes(ivTrigger));
        Properties properties = new Properties();

        //Creates a CryptoCipher instance with the transformation and properties.
        String transform = "AES/CBC/PKCS5Padding";
        ByteBuffer outBuffer;
        int bufferSize = 1024;
        int updateBytes;
        int finalBytes;

        try (CryptoCipher encipher = Utils.getCipherInstance(transform, properties)) {
            ByteBuffer inBuffer = ByteBuffer.allocateDirect(bufferSize);
            outBuffer = ByteBuffer.allocateDirect(bufferSize);
            String R2 = Base64.encodeBase64String(a);
            inBuffer.put(getUTF8Bytes(R2));
            inBuffer.flip();
            encipher.init(Cipher.ENCRYPT_MODE, key, iv);
            updateBytes = encipher.update(inBuffer, outBuffer);
            finalBytes = encipher.doFinal(inBuffer, outBuffer);
        }
        outBuffer.flip();
        byte [] encoded = new byte[updateBytes + finalBytes];
        outBuffer.duplicate().get(encoded);
        return encoded;
    }

    public String decAes256CbcByte(byte[] a) throws Exception{
        SecretKeySpec key = new SecretKeySpec(getUTF8Bytes(secretTrigger), "AES");
        IvParameterSpec iv = new IvParameterSpec(getUTF8Bytes(ivTrigger));


        int bufferSize = 1024;
        String transform = "AES/CBC/PKCS5Padding";
        Properties properties = new Properties();

        ByteBuffer outBuffer;
        outBuffer = ByteBuffer.allocateDirect(bufferSize);
        outBuffer.put(a);
        outBuffer.flip();

        ByteBuffer decoded;

        try(CryptoCipher decipher = Utils.getCipherInstance(transform, properties)){

            decipher.init(Cipher.DECRYPT_MODE, key, iv);
            decoded = ByteBuffer.allocateDirect(bufferSize);
             decipher.update(outBuffer, decoded);
            decipher.doFinal(outBuffer, decoded);
            decoded.flip();
            return asString(decoded);
        }
    }
}
