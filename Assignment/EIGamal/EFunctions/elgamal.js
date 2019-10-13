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
    let q,g,y,x,p;
    p = Number(document.getElementById('p').value);
    q = Number(document.getElementById('q').value);
    g = Number(document.getElementById('g').value);
    x = Number(document.getElementById('privatekey').value);
    y = fastExponentiation(g,x);
    // publicKey = "{".concat(q).concat(",").concat(g).concat(",").concat(y).concat("}");
    publicKey = "{"+p+","+g+","+y+"}";
    document.getElementById('publickey').value = y;
    document.getElementById('allpublickey').innerHTML = publicKey;
}

function fastExponentiation(m,d) {
    let n = Number(document.getElementById('p').value);
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
    document.getElementById('k').value = Math.floor(Math.random()*(q-1))+1;
    document.getElementById('k1').value = Math.floor(Math.random()*(q-1))+1;
    document.getElementById('k2').value = Math.floor(Math.random()*(q-1))+1;
    document.getElementById('k3').value = Math.floor(Math.random()*(q-1))+1;
    document.getElementById('k4').value = Math.floor(Math.random()*(q-1))+1;
    document.getElementById('k5').value = Math.floor(Math.random()*(q-1))+1;
}

function encryptMessage() {
    let k = Number(document.getElementById('k').value);
    let plaintext = document.getElementById('message').value;
    let y = Number(document.getElementById('publickey').value);
    let g = Number(document.getElementById('g').value);
    let p = Number(document.getElementById('p').value);
    let K = fastExponentiation(y,k);
    let C1 = fastExponentiation(g,k);
    let C2 = (K*plaintext)%p;
    document.getElementById('c1').value = C1;
    document.getElementById('c2').value = C2;
    document.getElementById('ciphertext').value = "("+C1+","+C2+")";
}

function decryptMessage() {
    let c1 = Number(document.getElementById('c1').value);
    let c2 = Number(document.getElementById('c2').value);
    let x = Number(document.getElementById('privatekey').value);
    let p = Number(document.getElementById('p').value);
    let m = fastExponentiation(c1,p-x-1);
    let M = (c2*m)%p;
    document.getElementById('plaintext').value = M;
}

function multiFunction(){
    // read the basic keys
    let p = Number(document.getElementById('p').value);
    let y = Number(document.getElementById('publickey').value);
    let g = Number(document.getElementById('g').value);
    let x = Number(document.getElementById('privatekey').value);

    let k1 = Number(document.getElementById('k1').value);
    let k2 = Number(document.getElementById('k2').value);
    let k3 = Number(document.getElementById('k3').value);
    let k4 = Number(document.getElementById('k4').value);
    let k5 = Number(document.getElementById('k5').value);


    // read the input
    let n1 = Number(document.getElementById('n1i').value);
    let n2 = Number(document.getElementById('n2i').value);
    let n3 = Number(document.getElementById('n3i').value);
    let n4 = Number(document.getElementById('n4i').value);
    let n5 = Number(document.getElementById('n5i').value);

    // Multiply the input numbers
    let multi = (n1*n2*n3*n4*n5)%p;
    document.getElementById('multinput').value = multi;

    // Get c1
    let c1 = fastExponentiation(g,k1+k2+k3+k4+k5);
    document.getElementById('c1o').value = c1;

    // Get c2
    let c2 = ((n1*n2*n3*n4*n5)%p * fastExponentiation(y,k1+k2+k3+k4+k5))%p;
    document.getElementById('c2o').value = c2;

    // Get c
    let cc =  "("+c1+","+c2+")";
    document.getElementById('co').value = cc;

    // Get decryption number
    let ec1 = fastExponentiation(c1,p-1-x);
    let m = (ec1*c2)%p;
    document.getElementById('Decypt-Result').value = m;

}

