let E = [[],[],[],[],[]];
let G = [[],[],[],[],[]];


function initπ() {
    let i,j;
    for(i=0;i<5;i++){
        for(j=0;j<5;j++){
            E[i][j] = Number(document.getElementById("θo".concat(Number(i).toString()).concat(Number(j).toString())).value);
        }
    }
}


function Keccakπ(){

    // Initial Input
    initπ();
    let i,j,m,n,a;

    // Get the result
    for(i=0;i<5;i++){
        for(j=0;j<5;j++){
            let a = Number(document.getElementById("θo".concat(Number(i).toString()).concat(Number(j).toString())).value);
            G[j][(2*i+3*j)%5] = a;
        }
    }

    //Output the result
    for(m=0;m<5;m++){
        for(n=0;n<5;n++){
            document.getElementById("πo".concat(Number(m).toString()).concat(Number(n).toString())).value = G[m][n];
        }
    }
}