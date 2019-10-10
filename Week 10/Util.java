package JustTry.CsLab.Week10;

import java.nio.charset.StandardCharsets;
import java.util.Arrays;

public class Util {
    public static byte[] concatenateByteArray(byte[] chA, byte[] chB) {
        int length1 = chA.length;
        int length2 = chB.length;
        byte[] chAB = Arrays.copyOf(chA,length1);
        chAB = Arrays.copyOf(chB,length1+length2);
        return chAB;
    }
    public static byte[] getUTF8Bytes(String input) {
        return input.getBytes(StandardCharsets.UTF_8);
    }
}
