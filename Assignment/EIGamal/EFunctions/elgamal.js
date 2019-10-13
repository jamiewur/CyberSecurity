// Generate key
// function generateq() {
//     let n,q,min,max,i;
//     min = 20;
//     max = 100;
//     n = Math.floor(min + Math.random()*(max-min));
//     for( i = n ; i > min ; i-- ){
//         if(isPrime(i)) {
//             q = i;
//             break;
//         }
//     }
//     document.getElementById('q').value = q
// }

// function generateg() {
//     let g,q;
//     q = Number(document.getElementById('q').value);
//     g = Math.floor(Math.random()*(q-1));
//     document.getElementById('g').value = g
// }

function primitiveRoot(){
    let r = [];
    let q = Number(document.getElementById('q').value);
}


function generatePrivateKey() {
    let privateKey;
    let q = Number(document.getElementById('q').value);
    privateKey = Math.floor((q-2)*Math.random())+1;
    document.getElementById('privatekey').value = privateKey
}

function generatePublicKey() {
    let publicKey;
    let q,g,y,x;
    q = Number(document.getElementById('q').value);
    g = Number(document.getElementById('g').value);
    x = Number(document.getElementById('privatekey').value);
    y = fastExponentiation(g,x);
    // publicKey = "{".concat(q).concat(",").concat(g).concat(",").concat(y).concat("}");
    publicKey = "{"+q+","+g+","+y+"}";
    document.getElementById('publickey').value = y;
    document.getElementById('allpublickey').innerHTML = publicKey;
}

function fastExponentiation(m,d) {
    let n = Number(document.getElementById('q').value);
    let current = 1;
    m = m % n;
    while(d > 0){
        if((d & 1) === 1)
            current = (current * m) % n;
        d = d >> 1;
        m = (m*m) % n;
    }
    return current;
}

function isPrime(num) {
    for ( let i = 2; i < num; i++ ) {
        if ( num % i === 0 ) {
            return false;
        }
    }
    return true;
}

function genRandomK() {
    let q = Number(document.getElementById('q').value);
    let k = Math.floor(Math.random()*(q-1))+1;
    document.getElementById('k').value = k;
}

function encryptMessage() {
    let k = Number(document.getElementById('k').value);
    let plaintext = document.getElementById('message').value;
    let y = Number(document.getElementById('publickey').value);
    let g = Number(document.getElementById('g').value);
    let q = Number(document.getElementById('q').value);
    let K = fastExponentiation(y,k);
    let C1 = fastExponentiation(g,k);
    let C2 = (K*plaintext)%q;
    document.getElementById('c1').value = C1;
    document.getElementById('c2').value = C2;
    document.getElementById('ciphertext').value = "("+C1+","+C2+")";
}

function decryptMessage() {
    let c1 = Number(document.getElementById('c1').value);
    let c2 = Number(document.getElementById('c2').value);
    let x = Number(document.getElementById('privatekey').value);
    let q = Number(document.getElementById('q').value);
    let m = fastExponentiation(c1,q-x-1);
    let M = (c2*m)%q;
    document.getElementById('plaintext').value=M;
}

