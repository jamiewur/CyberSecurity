function checkValue(k) {
    return (k<26 && isNaN(k) === false && k%2!=0 && k!=13);
}

function inverseValue(k) {
    let k3 = 0;
    if(checkValue(k) === true){
        for(j=1;j<=26;j++){
            if((k*j)%26 === 1){
                k3 = j;
                break;
            }
        }
    }
    return k3;

}

function encrypt() {
let plaintext = document.getElementById("en-plaintext").value.toLowerCase();
let ciphertext = '';
let k1 = Number(document.getElementById("en-k1").value);
let k2 = Number(document.getElementById("en-k2").value);
if(checkValue(k1)&&checkValue(k2)) {
    for (i = 0; i < plaintext.length; i++) {
        ciphertext += String.fromCharCode(((((plaintext.charCodeAt(i)-97)*k1)+k2)%26)+97);
    }
}
document.getElementById("en-ciphertext").value = ciphertext;
}

function decrypt() {
    let ciphertext = document.getElementById("de-ciphertext").value;
    let plaintext = '';
    let k1 = Number(document.getElementById("de-k1").value);
    let k2 = Number(document.getElementById("de-k2").value);
    let verseK1 = inverseValue(k1);
    console.log(verseK1);
    if(checkValue(k1)&&checkValue(k2)){
        for(i = 0; i<ciphertext.length;i++){
            plaintext += String.fromCharCode(((verseK1*(ciphertext.charCodeAt(i)+26-k2-97))%26)+97)
            console.log(ciphertext.charCodeAt(i))
            console.log(ciphertext.charCodeAt(i))
        }
    }
    document.getElementById("de-plaintext").value = plaintext;
}