let sneakattack = "4d6";
let hex = "1d6";
let bb = "1"
let profbonus = game.user.character.data.data.attributes.prof;
let level = game.user.character.data.data.details.level;


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
<label for="gfb" class="gfb">
<input type="checkbox" name="gfb" id="gfb">
Green Flame Blade
</label>
<br>
<label for="hex" class="hex">
    <input type="checkbox" name="hex" id="hex"> 
    Hex
</label>
<br>
<label for="crit" class="crit">
    <input type="checkbox" name="crit" id="crit">
    Critical Hit
</label>
<br>
<label for="genie" class="genie">
    <input type="checkbox" name="genie" id="genie"> 
    Genie's Wrath
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
                sneakattack = "8d6";
                hex = "2d6";
                bb = "2";
            }
            if (document.getElementById("sneak").checked){
                let damageType = document.getElementById("dmg").value;
                new Roll(sneakattack).toMessage({flavor: `Sneak Attack ${damageType} Damage`});                
            }
            if (document.getElementById("genie").checked){
                new Roll(`${profbonus}`).toMessage({flavor: `Genies Wrath Cold Damage`});;
            }
            if (document.getElementById("hex").checked){
                new Roll(hex).toMessage({flavor: `Hex Necrotic Damage`});;
            }
            if (document.getElementById("boom").checked){
                // if (level < 5) => (0 || 0) && (1 || 2)
                if (5 > level < 11){
                    new Roll(`${bb}d8`).toMessage({flavor: `Booming Blade Thunder Damage`}); // (1 || 2) && (2 || 4)
                    bb*= 2;
                }
                else if (level < 17){
                    let bb2 = bb * 2;
                    new Roll(`${bb2}d8`).toMessage({flavor: `Booming Blade Thunder Damage`}); // (2 || 4) && (3 || 6)
                    bb*= 3;
                }
                else {
                    let bb2 = bb * 3;
                    new Roll(`${bb2}d8`).toMessage({flavor: `Booming Blade Thunder Damage`}) // (3 || 6) && (4 || 8)
                    bb*= 4;
                }
                new Roll(`${bb}d8`).toMessage({flavor: `Wenn Target sich bewegt Thunder Damage`});
            }
            if (document.getElementById("gfb").checked){
                // if (level < 5) => (0 || 0) && CHA
                if (level < 5){
                    bb = 0;
                }
                else if (level < 11){
                    new Roll(`${bb}d8`).toMessage({flavor: `GFB HIT Fire Damage`}); // (1 || 2) && CHA
                }
                else if (level < 17){
                    bb *= 2;
                    new Roll(`${bb}d8`).toMessage({flavor: `GFB HIT Fire Damage`}); // (2 || 4) && CHA
                }
                else {
                    bb *= 3;
                    new Roll(`${bb}d8`).toMessage({flavor: `GFB HIT Fire Damage`}) // (3 || 6) && CHA
                }
                let cha = game.user.character.data.data.abilities.cha.mod;
                if (bb == 0) new Roll(`${cha}`).toMessage({flavor: `GFB CHA Fire Damage`});
                else new Roll(`${bb}d8+${cha}`).toMessage({flavor: `GFB CHA Fire Damage`});
            }
        }
    }
}).render(true);
