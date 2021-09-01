// made for Sorcerer/Rogue D&D 5e 
// const sneakDice = Math.ceil(game.users.current.character.data.items.find(i=> i.name===`Rogue`).data.levels/2);
const sneakDice = 3;
let sneakattack = sneakDice + "d6";
let bb = "1"; // bb modifier
const profbonus = game.user.character.data.data.attributes.prof;
const level = game.user.character.data.data.details.level;


let html = `
<form>
<div class="form-group">
    <select id="dmg" name="dmg">
    <option value="Piercing">Piercing Damage</option>
    <option value="Bludgeoning">Bludgeoning Damage</option>
    <option value="Slashing">Slashing Damage</option>
    <option value="Psychic">Psychic Damage</option>
    </select></div></form>
<div class="addto-maps">    
<label for="sneak" class="sneak">
    <input type="checkbox" name="sneak" id="sneak">
    Sneak Attack
</label>
<br>
<label for="boom" class="boom">
    <input type="checkbox" name="boom" id="boom">
    Booming Blade
</label>
<br>
<label for="crit" class="crit">
    <input type="checkbox" name="crit" id="crit">
    Critical Hit
</label>
<br>
</div>
`.trim();
let attack = false;
new Dialog({
title: `AT Weapon Attack`,
content: html,
    buttons: {
    apply: {
        icon: "<i class='fas fa-check'></i>",
        label: `Apply`,
        callback: () =>  attack = true
        }
    },
    default: "apply",
    close: _html => {
        if (attack) {
            if (document.getElementById("crit").checked){
                sneakattack = sneakDice * 2 + "d6";
                bb = "2";
            }
            if (document.getElementById("sneak").checked){
                let damageType = document.getElementById("dmg").value;
                new Roll(sneakattack).toMessage({flavor: `Sneak Attack ${damageType} Damage`});                
            }
            if (document.getElementById("boom").checked){
                // if (level < 5) => (0 || 0) && (1 || 2)
                if (4 > level < 11){
                    new Roll(`${bb}d8`).toMessage({flavor: `Booming Blade Thunder Damage`}); // (1 || 2) && (2 || 4)
                    bb*= 2;
                }
                else if (level < 17){
                    let bb2 = bb * 2;
                    new Roll(`${bb2}d8`).toMessage({flavor: `Booming Blade Thunder Damage`}); // (2 || 4) && (3 || 6)
                    bb*= 3;
                }
                else if (level >= 17){
                    let bb2 = bb * 3;
                    new Roll(`${bb2}d8`).toMessage({flavor: `Booming Blade Thunder Damage`}) // (3 || 6) && (4 || 8)
                    bb*= 4;
                }
                new Roll(`${bb}d8`).toMessage({flavor: `Wenn Target sich bewegt Thunder Damage`});
            }
        }
    }
}).render(true);
