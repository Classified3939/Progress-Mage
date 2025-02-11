let cores = 0;
let totalCores = 0;
let coreCost = 50;
let coreUpgrades = [1,1,1,1,0,0,0,0]
let coreUpgradeCosts = [1,3,5,7,9,Infinity]

function coreReset(){
    mana = 0;
    manaGainBase = 1;
    manaGainMulti = 1 + totalCores;
    manaProgress = 0;
    manaProgressBase = 1/20;
    manaProgressMulti = 1;
    timeToGain = 1;
    timeMulti = 1;
    elementAmounts = [0,0,0,0,0,0,0,0]
    for (let spell of allSpells){
        spell.timesCast = 0;
    }
    spellInit();
    coreUpgradesInit();
}

function tryCoreReset(){
    for (let i = 0; i < 4; i++){
        if (elementAmounts[i] < coreCost) return;
    }
    cores++;
    totalCores++;
    coreReset();
    if (totalCores == 13) window.alert("Congrats, you have reached the final point that I did while playtesting this version!"+
        "You can keep going if you want, but there be dragons (and grind).")
}

function coreUpgradesInit(){
    let upgradesRow1 = document.getElementById("coreUpgrades1");
    upgradesRow1.innerHTML = "";
    for (let i = 0; i < 4; i++){
        let upgradeButton = document.createElement("button");
        upgradeButton.style.height = "7.5em";
        upgradeButton.innerHTML = "Unlock " + elementNames[i] + " Spell " + (coreUpgrades[i] + 1) +
            "<br>-" + (coreUpgradeCosts[coreUpgrades[i]-1]) +
            (coreUpgradeCosts[coreUpgrades[i]-1] > 1 ? " Cores" : " Core");
        upgradeButton.classList.add("spellButton");
        upgradeButton.style.backgroundColor = elementColors[i];
        upgradeButton.onclick = ()=>{coreUpgradeButton(i);}
        upgradesRow1.appendChild(upgradeButton);
    }

    //not yet implemented 
    /*
    let upgradesRow2 = document.getElementById("coreUpgrades2");
    upgradesRow2.innerHTML = "";
    for (let i = 0; i < 4; i++){
        let upgradeButton = document.createElement("button");
        upgradeButton.style.height = "7.5em";
        upgradeButton.innerHTML = "Unlock " + elementNames[i+4] + " Spell " + (coreUpgrades[i+4] + 1) +
            "<br>-" + (coreUpgradeCosts[coreUpgrades[i+4]+1]) + 
            (coreUpgradeCosts[coreUpgrades[i+4]+1] > 1 ? " Cores" : " Core");
        upgradeButton.classList.add("spellButton");
        upgradeButton.style.backgroundColor = elementColors[i+4];
        upgradeButton.onclick = ()=>{coreUpgradeButton(i+4);}
        upgradesRow2.appendChild(upgradeButton);
    }
    */
}

function coreUpgradeButton(index){
    if (index < 4){
        if (cores < coreUpgradeCosts[coreUpgrades[index]-1]) return;
        cores -= coreUpgradeCosts[coreUpgrades[index]-1]
    }
    else{
        if (cores < coreUpgradeCosts[coreUpgrades[index+4]+1]) return;
        cores -= coreUpgradeCosts[coreUpgrades[index+4]+1]
    }
    coreUpgrades[index]++
    coreUpgradesInit();
    spellInit();
}

function coreRespec(){
    cores = totalCores;
    coreUpgrades = [1,1,1,1,0,0,0,0]
    coreReset();
}