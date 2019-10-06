let H = [[], [], [], [], []];
let I = [[], [], [], [], []];
let J = [[], [], [], [], []];
let K = [[], [], [], [], []];
let L = [[], [], [], [], []];

function initχ() {
    let i, j;
    for (i = 0; i < 5; i++) {
        for (j = 0; j < 5; j++) {
            H[i][j] = Number(document.getElementById("πo".concat(Number(i).toString()).concat(Number(j).toString())).value);
            I[i][j] = Number(document.getElementById("πo".concat(Number(i).toString()).concat(Number(j).toString())).value);
            J[i][j] = Number(document.getElementById("πo".concat(Number(i).toString()).concat(Number(j).toString())).value);
        }
    }
}


//A[x,y] = B[x,y]^((iB[x+1,y] & B[x+2,y])
//XOR function
function keccakχ() {
    initχ();
    K = combination();

    //combine two array by XOR bitwise operator
    for (i = 0; i < 5; i++) {
        for (j = 0; j < 5; j++) {
            L[i][j] = H[i][j] ^ K[i][j];
        }
    }

    //Output the result
    for (m = 0; m < 5; m++) {
        for (n = 0; n < 5; n++) {
            document.getElementById("χo".concat(Number(m).toString()).concat(Number(n).toString())).value = L[m][n];
        }
    }
}


//And function
function combination() {
    I = move(I, 1);
    J = move(J, 2);
    I = inverse(I);

    //combine two array by AND bitwise operator
    let i, j;
    for (i = 0; i < 5; i++) {
        for (j = 0; j < 5; j++) {
            K[i][j] = I[i][j] & J[i][j];
        }
    }
    return K;
}

//Move the array
function move(arr1, k) {
    let i,j;
    for(i=0;i<5;i++){
        for(j=0;j<5;j++){
            let a = Number(document.getElementById("πo".concat(Number((i+k)%5).toString()).concat(Number(j).toString())).value);
            arr1[i][j] = a;
        }
    }
    return arr1;
}

//Inverse the array
function inverse(arr2) {
    let i, j;
    for (i = 0; i < 5; i++) {
        for (j = 0; j < 5; j++) {
            arr2[i][j] = arr2[i][j] === 1 ? 0 : 1;
        }
    }
    // return arr;
    return arr2;
}