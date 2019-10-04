function getQ() {
    return Number(document.getElementById('q-value').value);
}
function getP() {
    return Number(document.getElementById('p-value').value);
}

function showN(){
    let p = getP();
    let q = getQ();
    document.getElementById('n-value').value = (p*q);
};

function showX() {
    let p = getP();
    let q = getQ();
    let x = (p-1)*(q-1);
    document.getElementById('x-value').value = x;
}

function showE() {
    let e = generateE();
    document.getElementById('e-value').value = e;
}

function showD() {
    let d = generateD();
    document.getElementById('d-value').value = d;
}

function showSignature() {
    let sig = generateSig();
    document.getElementById('s-value').value = sig;
}

function showVerify() {
    let ver = verify();
    console.log(ver);
}

function callShows() {
    showX();
    showN();
}

function gcd(a,b){
    if(b){
        return gcd(b,a%b);
    }
    return Math.abs(a);
}

function fastExponentiation(m,d) {
    let n = Number(document.getElementById('n-value').value);
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

// Key Generation

function generateE(){
    let x = (getP()-1)*(getQ()-1);
    while(true){
        let e = Math.floor(Math.random() * x);
        if( gcd(e,x) === 1) {
            return e;
        }
    }
}

function generateD() {
    let e = Number(document.getElementById('e-value').value);
    let x = Number(document.getElementById('x-value').value);
    for(d=0;d<x;d++){
        if(((e*d)-1) % x === 0) return d;
    }
}




//signing

function generateSig() {
    let d = Number(document.getElementById('d-value').value);
    let n = Number(document.getElementById('n-value').value);
    let m = Number(document.getElementById('m-value').value);
    let s = fastExponentiation(m,d);
    return s;
}

//verifying

function verify() {
    let s = Number(document.getElementById('s-value').value);
    let e = Number(document.getElementById('e-value').value);
    let n = Number(document.getElementById('n-value').value);
    let m = Number(document.getElementById('m-value').value);
    let l = fastExponentiation(s,e);
    let r = m%n;
    return l===r;
}