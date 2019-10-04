// Read local text file
function loadFile(o)
{
    let fr = new FileReader();
    fr.onload = function(e)
    {
        showDataFile(e, o);
    };
    fr.readAsText(o.files[0]);
}


function showDataFile(e, o)
{
    document.getElementById("contents").innerText = e.target.result;
}

function saveFile(){
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.style.display = 'none';

    let data = document.getElementById('cipher').value;
    let fileName = document.getElementById('fileName').value

    let json = JSON.stringify(data),
        blob = new Blob([data], {type: "text/plain;charset=utf-8"}),
        url = window.URL.createObjectURL(blob);

    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
}

function saveFile2(){
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.style.display = 'none';

    let data = ctObj;
    let fileName = document.getElementById('fileName2').value

    let json = JSON.stringify(data),
        blob = new Blob([data], {type: "text/plain;charset=utf-8"}),
        url = window.URL.createObjectURL(blob);

    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
}