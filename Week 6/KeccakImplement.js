let B = [[],[],[],[],[]];
let D = [[],[],[],[],[]];
let E = [[],[],[],[],[]];
let F = [[],[],[],[],[]];
let G = [[],[],[],[],[]];

function init() {
    let i,j;
    for(i=0;i<5;i++){
        for(j=0;j<5;j++){
            B[i][j] = Number(document.getElementById("cell".concat(Number(i).toString()).concat(Number(j).toString())).value);
            D[i][j] = Number(document.getElementById("cell".concat(Number(i).toString()).concat(Number(j).toString())).value);
            E[i][j] = Number(document.getElementById("cell".concat(Number(i).toString()).concat(Number(j).toString())).value);
        }
    }
}


//A[x,y] = B[x,y]^((iB[x+1,y] & B[x+2,y])
//XOR function
function keccak() {
    init();
    F = combination();
    //combine two array by XOR bitwise operator
    for(i=0;i<5;i++){
        for(j=0;j<5;j++){
            G[i][j] = B[i][j] ^ F[i][j];
        }
    }
    //Output the result
    for(m=0;m<5;m++){
        for(n=0;n<5;n++){
            document.getElementById("cel".concat(Number(m).toString()).concat(Number(n).toString())).value = G[m][n];
        }
    }
}


//And function
function combination() {
    D = move(D,1);
    E = move(E,2);
    D = inverse(D);
    //combine two array by AND bitwise operator
    let i,j;
    for(i=0;i<5;i++){
        for(j=0;j<5;j++){
            F[i][j] = D[i][j] & E[i][j];
        }
    }
    return F;
}

//Move the array
function move(arr1, k) {
    while (k > 0) {
        arr1.forEach(function (a) {
            let current = a.shift();
            a.push(current);
        });
        k--;
    }
    return arr1;
}

//Inverse the array
function inverse(arr2) {
    let i,j;
    for(i=0;i<5;i++){
        for(j=0;j<5;j++){
            arr2[i][j] = arr2[i][j] === 1 ? 0 : 1;
        }
    }
    // return arr;
    return arr2;
}