let A = [[],[],[],[],[]];
let F = [[],[],[],[],[]];
let C = [];
let D = [];

function initθ() {
    let i,j;
    for(i=0;i<5;i++){
        for(j=0;j<5;j++){
            A[i][j] = Number(document.getElementById("θi".concat(Number(i).toString()).concat(Number(j).toString())).value);
        }
    }
}
// function initθ() {
//     let i, j;
//     for (i = 0; i < 5; i++) {
//         for (j = 0; j < 5; j++) {
//             A[i][j] = Math.round(Math.random());
//             document.getElementById("θi".concat(Number(i).toString()).concat(Number(j).toString())).value = A[i][j];
//         }
//     }
// }

// function initθ() {
//     A[0][4] = 1;
//     A[1][4] = 1;
//     A[2][4] = 1;
//     A[3][4] = 1;
//     A[4][4] = 1;
//     A[0][3] = 1;
//     A[1][3] = 1;
//     A[2][3] = 1;
//     A[3][3] = 1;
//     A[4][3] = 0;
//     A[0][2] = 1;
//     A[1][2] = 1;
//     A[2][2] = 1;
//     A[3][2] = 0;
//     A[4][2] = 0;
//     A[0][1] = 1;
//     A[1][1] = 1;
//     A[2][1] = 0;
//     A[3][1] = 0;
//     A[4][1] = 0;
//     A[0][0] = 1;
//     A[1][0] = 0;
//     A[2][0] = 0;
//     A[3][0] = 0;
//     A[4][0] = 0;
//
//     for (i = 0; i < 5; i++) {
//         for (j = 0; j < 5; j++) {
//             document.getElementById("θi".concat(Number(i).toString()).concat(Number(j).toString())).value = A[i][j];
//         }
//     }
// }


function Keccakθ(){
    // init Array
    initθ();
    iniC();
    iniD();
    let i,j,m,n;

    // Get the result
    for(i=0;i<5;i++){
        for (j=0;j<5;j++){
            F[i][j] = A[i][j] ^ D[i];
        }
    }

    // Output the result
    for(m=0;m<5;m++){
        for(n=0;n<5;n++){
            document.getElementById("θo".concat(Number(m).toString()).concat(Number(n).toString())).value = F[m][n];
        }
    }
}


function iniC(){
    for(i=0;i<5;i++){
        C[i] = A[i][0] ^ A[i][1] ^ A[i][2] ^ A[i][3] ^ A[i][4]
    }
}

function iniD() {
    for (i = 1; i < 4; i++) {
        D[i] = C[i - 1] ^ C[i + 1];
    }
    D[0] = C[4] ^ C[1];
    D[4] = C[3] ^ C[0];

}5