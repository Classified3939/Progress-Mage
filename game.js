let mana = 0;
let manaGainBase;
let manaGainMulti;
let manaProgress;
let manaProgressBase;
let manaProgressMulti;
let timeToGain;
let timeMulti;

let manaCountLabel = document.getElementById("manaCount");
let manaGainLabel = document.getElementById("manaGain");
let manaProgressBar = document.getElementById("manaProgressBar");

let elementAmounts;
let elementNames = ["Water Mana","Earth Mana","Fire Mana","Air Mana","Shadow Mana", "Light Mana", "Life Mana", "Metal Mana"]
let elementColors = ["rgb(0, 140, 255)","rgb(238, 176, 95)","rgb(199, 0, 0)","rgb(214, 237, 240)",
                    "rgb(80, 80, 80)","rgb(255, 178, 249)","rgb(0, 179, 9)","rgb(224, 120, 0)"]


let lastUpdate;

function update(){
    if (manaProgressBase * manaProgressMulti >= timeToGain){
        timeMulti *= 20;
        timeToGain *= 20;
    }
    manaProgress += (manaProgressBase * manaProgressMulti)
    if (manaProgress >= timeToGain){
        mana += (manaGainBase * manaGainMulti * timeMulti);
        manaProgress = 0;
    }
    coreCost = 50 * (Math.pow(3,totalCores));
    uiUpdate();
}

function bigUpdate(seconds){
    mana += (manaGainBase * manaGainMulti * timeMulti * manaProgressMulti * manaProgressBase / timeToGain * 20 * seconds);
}

function uiUpdate(){
    manaCountLabel.innerHTML = "Mana: "+ formatNumber(mana)
    manaProgressBar.style.width = (manaProgress / timeToGain * 100) + "%"; 
    manaGainLabel.innerHTML = "(+" + formatNumber(manaGainBase * manaGainMulti * timeMulti * manaProgressMulti * manaProgressBase / timeToGain * 20)+"/s)"+
        "<br>(" + formatNumber(manaProgressBase*manaProgressMulti/timeToGain*20) + " fills per second)";
    for (let i = 0; i < 8; i++){
        if (i < 4){
            document.getElementById("prestigeGainLabel"+i).innerHTML = "(+" + formatNumber(mana/((i+1)*2.5)) + ")";
        }
        else{
            document.getElementById("prestigeGainLabel"+i).innerHTML = "(+" + formatNumber(mana/20) + ")";
        }
        document.getElementById("elementAmount"+ i).innerHTML = elementNames[i] + ": " + formatNumber(elementAmounts[i]);
    }

    
    document.getElementById("coreCount").innerHTML = "Cores: " + cores;
    document.getElementById("coreButton").innerHTML = 
        "Elemental Core<br>" + formatNumber(coreCost) + " Water, Earth, Fire, Air Mana";
    document.getElementById("coreMult").innerHTML = "Your total cores muliply Mana gain by " + (totalCores+1);
}

function uiInit(){
    let container = document.getElementById("prestigeButtons");
    let secondaryContainer = document.getElementById("secondaryPrestigeButtons");

    for (let i = 0; i < 8; i++){
        let button = document.createElement("button");
        button.innerHTML = elementNames[i] + " Conversion";
        button.style.background = elementColors[i];
        button.classList.add("prestigeButton");

        button.onclick = ()=>{elementPrestige(i);}

        let gainLabel = document.createElement("div");
        gainLabel.id = "prestigeGainLabel" + i;

        button.appendChild(gainLabel);
        
        if (i < 4) container.appendChild(button);
        else {
            button.style.display = "none";
            secondaryContainer.appendChild(button)
        };
    }

    let coreButton = document.getElementById("coreButton");
    coreButton.style.marginLeft = "38%";

    for (let i = 0; i < 8; i++){
        let label = document.createElement("h4");
        label.id = "elementAmount" + i;
        label.style.textAlign = "center";
        label.style.width = "25%";
        if (i < 4) document.getElementById("elementalResources").appendChild(label);
        else {
            document.getElementById("secondaryElementalResources").appendChild(label)
            label.style.display = "none";
        };
    }
 }

function elementPrestige(index){
    if (index < 4){
        elementAmounts[index] += mana/((index+1)*2.5);
        mana = 0;
    }
    else{
        elementAmounts[index] += mana/(20);
        mana = 0; 
    }
}

function calculateTime(){
    if (lastUpdate === undefined) {
        lastUpdate = Date.now();
        update();
    }
    let now = Date.now();
    let dt = now-lastUpdate;
    if (dt > 500) bigUpdate(dt/1000);
    lastUpdate = now;
    update();
}

coreReset();
loadGame();
uiInit();
tabSwitch(1);
setInterval(calculateTime,50);
setInterval(saveGame,10000);