function Keccak() {
    let time = Number(document.getElementById('round').innerText);
    if(time < 12) {
        Keccakθ();
        Keccakπ();
        keccakχ();
        Keccakι();
        let a = Number(document.getElementById('round').innerText);
        document.getElementById('round').innerText = a + 1;
    }else alert('Only 12 rounds accepted!!!');
}