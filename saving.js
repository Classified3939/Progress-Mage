function saveGame(){
    var gameSave = {
        mana: mana,
        manaGainBase: manaGainBase,
        manaGainMulti : manaGainMulti,
        manaProgressBase : manaProgressBase,
        manaProgressMulti : manaProgressMulti,
        timeToGain : timeToGain,
        timeMulti : timeMulti,
        timesCast : (getTimesCast()),
        cores: cores,
        totalCores: totalCores,
        coreUpgrades : coreUpgrades,
        elementAmounts : elementAmounts,
    }
    localStorage.setItem("progressMage",JSON.stringify(gameSave));
}

function resetSave(){
    localStorage.clear("progressMage");
}

function loadGame(){
    let savedGame = JSON.parse(localStorage.getItem("progressMage"));
    if (savedGame == null) return;
    if (typeof savedGame.mana !== "undefined") mana = savedGame.mana;
    if (typeof savedGame.manaGainBase !== "undefined") manaGainBase = savedGame.manaGainBase;
    if (typeof savedGame.manaGainMulti !== "undefined") manaGainMulti = savedGame.manaGainMulti;
    if (typeof savedGame.manaProgressBase !== "undefined") manaProgressBase = savedGame.manaProgressBase;
    if (typeof savedGame.manaProgressMulti !== "undefined") manaProgressMulti = savedGame.manaProgressMulti;
    if (typeof savedGame.timeToGain !== "undefined") timeToGain = savedGame.timeToGain;
    if (typeof savedGame.timeMulti !== "undefined") timeMulti = savedGame.timeMulti;
    if (typeof savedGame.cores !== "undefined") cores = savedGame.cores;
    if (typeof savedGame.totalCores !== "undefined") totalCores = savedGame.totalCores;
    if (typeof savedGame.elementAmounts !== "undefined") elementAmounts = savedGame.elementAmounts;
    if (typeof savedGame.coreUpgrades !== "undefined") {
        coreUpgrades = savedGame.coreUpgrades;
        coreUpgradesInit();
        spellInit();
    }
    if (typeof savedGame.timesCast !== "undefined") {
        for (let i = 0; i < savedGame.timesCast.length; i++){
            console.log(savedGame.timesCast[i]);
            allSpells[i].timesCast = savedGame.timesCast[i];
            spellInit();
        }
    }
}

function getTimesCast(){
    let toReturn = [];
    for (let spell of allSpells){
        toReturn.push(spell.timesCast);
    }
    return toReturn;
}