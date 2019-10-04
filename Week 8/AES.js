
let ctObj;

function encryption(){
    let password = '';
    let key = document.getElementById('key').value;
    let contents = document.getElementById('contents').value;
    let hmacP = document.getElementById('hmacP').value;
    let p = {
        adata: hmacP,
        iter:1000,
        mode: 'ccm',
        ts: 64,
        ks:128
    };
    ctObj = sjcl.encrypt(key,contents,p);
    document.getElementById('cipher').value = JSON.parse(ctObj).ct;
    document.getElementById('contents').value='';
    document.getElementById('hmacC').value = JSON.parse(ctObj).adata;
    document.getElementById('hmacP').value = '';

};

function decryption(){
    let key = document.getElementById('key').value;
    let ct = document.getElementById('cipher').value;
    let plaintext = sjcl.decrypt(key, ctObj);
    document.getElementById('cipher').value = '';
    document.getElementById('contents').value = plaintext;
};

