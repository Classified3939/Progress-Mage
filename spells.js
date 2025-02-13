let typeToId = ["water","earth","fire","air","shadow","light","life","metal"];

class Spell{
    title = ""
    type = 0;
    cost = 1;
    timesCast = 0;
    maxCast = -1
    display = "";
    unlocked = false;
    result = function(){};

    constructor(type,cost,title,display,result,maxCast=-1){
        this.type = type;
        this.typeId = typeToId.indexOf(type);
        this.cost = cost;
        this.title = title;
        this.display = display;
        this.timesCast = 0;
        this.result = result;
        this.maxCast = maxCast;
        this.unlocked = false
        this.buttonId = this.type + this.cost + "button";
    }

    cast(){
        if (this.timesCast == this.maxCast || elementAmounts[this.typeId] < this.cost) return;
        elementAmounts[this.typeId] -= this.cost; 
        this.timesCast += 1;
        this.result();
    }
}

let allSpells = [
    new Spell("water",5,"Mana Flow","+0.05 Base Mana Rate",()=>{manaProgressBase += 1/20/20},100),
    new Spell("water",500,"Droplet","+0.5 Base Mana Rate",()=>{manaProgressBase += 1/2/20},50),
    new Spell("water",10000,"Puddle","+1 Base Mana Rate",()=>{manaProgressBase += 1/20},75),
    new Spell("water",150000,"River","+7.5 Base Mana Rate",()=>{manaProgressBase += 7.5/20},30),
    new Spell("water",1e6,"Lake","+15 Base Mana Rate",()=>{manaProgressBase += 15/20},20),
    new Spell("water",5e7,"Ocean","+50 Base Mana Rate",()=>{manaProgressBase += 50/20},1),
    new Spell("earth",5,"Mana Harden","+0.1 Base Mana per Fill",()=>{manaGainBase += 0.1},50),
    new Spell("earth",500,"Pebble","+1 Base Mana per Fill",()=>{manaGainBase += 1},25),
    new Spell("earth",10000,"Rock","+5 Base Mana per Fill",()=>{manaGainBase += 5},20),
    new Spell("earth",150000,"Stone","+15 Base Mana per Fill",()=>{manaGainBase += 5},10),
    new Spell("earth",1e6,"Boulder","+30 Base Mana per Fill",()=>{manaGainBase += 30},5),
    new Spell("earth",5e7,"Mountain","+100 Base Mana per Fill",()=>{manaGainBase += 100},1),
    new Spell("fire",5,"Mana Burn","*1.05 Mana Rate Multi",()=>(manaProgressMulti *= 1.05),25),
    new Spell("fire",500,"Ember","*1.1 Mana Rate Multi",()=>(manaProgressMulti *= 1.1),10),
    new Spell("fire",10000,"Kindling","*1.15 Mana Rate Multi",()=>(manaProgressMulti *= 1.15),7),
    new Spell("fire",150000,"Campfire","*1.2 Mana Rate Multi",()=>(manaProgressMulti *= 1.2),5),
    new Spell("fire",1e6,"Bondfire","*1.25 Mana Rate Multi",()=>(manaProgressMulti *= 1.25),3),
    new Spell("fire",5e7,"Inferno","*1.35 Mana Rate Multi",()=>(manaProgressMulti *= 1.35),1),
    new Spell("air",5,"Mana Scatter","*1.1 Mana per Fill Multi",()=>{manaGainMulti *= 1.1},10),
    new Spell("air",500,"Breeze","*1.13 Mana per Fill Multi",()=>{manaGainMulti *= 1.13},5),
    new Spell("air",10000,"Cloud","*1.15 Mana per Fill Multi",()=>{manaGainMulti *= 1.15},4),
    new Spell("air",150000,"Gust","*1.17 Mana per Fill Multi",()=>{manaGainMulti *= 1.17},3),
    new Spell("air",1e6,"Cloud","*1.19 Mana per Fill Multi",()=>{manaGainMulti *= 1.19},2),
    new Spell("air",5e7,"Gust","*1.25 Mana per Fill Multi",()=>{manaGainMulti *= 1.25},1),
];

function getSpell(type,cost){
    return allSpells.find((e)=>e.typeId == type && e.cost == cost);
}


function spellInit(){
    startingSpells();

    document.getElementById("waterSpells").innerHTML = "";
    document.getElementById("earthSpells").innerHTML = "";
    document.getElementById("fireSpells").innerHTML = "";
    document.getElementById("airSpells").innerHTML = "";

    for (let spell of allSpells){
        let spellButton = document.createElement("button");
        spellButton.style.background = elementColors[spell.typeId];
        spellButton.classList.add("spellButton");
        spellButton.id = spell.buttonId;
        spellButton.onclick = ()=>{
            spell.cast();
            timesCastRefresh();
        };
        if (!spell.unlocked) spellButton.style.display = "none";
        if (spell.type == "water") document.getElementById("waterSpells").appendChild(spellButton);
        if (spell.type == "earth") document.getElementById("earthSpells").appendChild(spellButton);
        if (spell.type == "fire") document.getElementById("fireSpells").appendChild(spellButton);
        if (spell.type == "air") document.getElementById("airSpells").appendChild(spellButton);
    }
    timesCastRefresh();
}

function timesCastRefresh(){
    for (let spell of allSpells){
        let spellButton = document.getElementById(spell.buttonId);
        spellButton.innerHTML = spell.title + " " + spell.timesCast + (spell.maxCast != -1 ? "/"+spell.maxCast : "") + "<br>" + spell.display 
        + "<br>-" + formatNumber(spell.cost) + " " + elementNames[spell.typeId] + " ";
    }
}

function startingSpells(){
    let spellTiers = [5,500,10000,150000,1e6,5e7]
    for (let spell of allSpells){
        spell.unlocked = false;
    }

    for (let i = 0; i < 8; i++){
        for (let j = 0; j < coreUpgrades[i]; j++){
            if (j >= spellTiers.length) continue;
            getSpell(i,spellTiers[j]).unlocked = true;
        }
    }
}
