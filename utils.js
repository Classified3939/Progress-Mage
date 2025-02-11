function formatNumber(number){
    if (number < 1e5) return number.toFixed(2);
    else return number.toExponential(3)
}

function tabSwitch(index){
    for (let i = 0; i < document.getElementById("tabs").children.length; i++){
        document.getElementById("tab"+(i+1)).style.display = "none";
    }
    document.getElementById("tab"+index).style.display = "block"; 
}