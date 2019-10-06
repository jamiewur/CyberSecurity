let RC = [];
let M = [[], [], [], [], []];

RC = [
    "0x0000000000000001",
    "0x0000000000008082",
    "0x800000000000808A",
    "0x8000000080008000",
    "0x000000000000808B",
    "0x0000000080000001",
    "0x8000000080008081",
    "0x8000000000008009",
    "0x000000000000008A",
    "0x0000000000000088",
    "0x0000000080008009",
    "0x000000008000000A",
    "0x000000008000808B",
    "0x800000000000008B",
    "0x8000000000008089",
    "0x8000000000008003",
    "0x8000000000008002",
    "0x8000000000000080",
    "0x000000000000800A",
    "0x800000008000000A",
    "0x8000000080008081",
    "0x8000000000008080",
    "0x0000000080000001",
    "0x8000000080008008"
];


function initι() {
    let i, j;
    for (i = 0; i < 5; i++) {
        for (j = 0; j < 5; j++) {
            M[i][j] = Number(document.getElementById("χo".concat(Number(i).toString()).concat(Number(j).toString())).value);
        }
    }
}

function Keccakι() {
    // Initial Input
    initι();
    let i, j, m, n, a;

    // Get the result
    let b = Number(document.getElementById('round').innerText);
    let rc = RC[b][2];
    let rcInt = parseInt(rc, 16).toString(2)[0];
    M[0][0] = M[0][0] ^ parseInt(rcInt);

    //Output the result
    for (m = 0; m < 5; m++) {
        for (n = 0; n < 5; n++) {
            document.getElementById("ιo".concat(Number(m).toString()).concat(Number(n).toString())).value = M[m][n];
            document.getElementById("θi".concat(Number(m).toString()).concat(Number(n).toString())).value = M[m][n];

        }
    }
}

function hex2bin(hex) {
    return (parseInt(hex, 16).toString(2)).padStart(8, '0');
}
