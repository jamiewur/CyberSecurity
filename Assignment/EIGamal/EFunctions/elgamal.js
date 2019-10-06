// Generate key
function generateq() {
    let n,q,min,max,i;
    min = 20;
    max = 100;
    n = Math.floor(min + Math.random()*(max-min));
    for( i = n ; i > min ; i-- ){
        if(isPrime(i)) {
            q = i;
            break;
        }
    }
    document.getElementById('q').value = q
}

function primitiveRoot(){
    let r = [];
    let q = Number(document.getElementById('q').value);
}

function generateg() {
    let g,q;
    q = Number(document.getElementById('q').value);
    g = Math.floor(Math.random()*(q-1));
    document.getElementById('g').value = g
}

function generatePrivateKey() {
    let privateKey;


    document.getElementById('privatekey').value = privateKey
}

function generatePublicKey() {
    let publicKey;


    document.getElementById('publickey').value = publicKey
}

function isPrime(num) {
    for ( let i = 2; i < num; i++ ) {
        if ( num % i === 0 ) {
            return false;
        }
    }
    return true;
}



function decryption() {

}

