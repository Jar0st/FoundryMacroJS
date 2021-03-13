// requires "Conditions for 5e" module
// applies or removes Conditions on multiple Tokens at once
const tokCon = canvas.tokens.controlled;

function applyCon(condition){
    if (tokCon.length === 0){
    return ui.notifications.error("Please select a token!");
    }
    if (condition === "clear") {
        tokCon.forEach(token => {
            clearConditions(token);
        });
        return;
    }
    const effect = `modules/conditions5e/icons/${condition}.svg`;
    tokCon.forEach(token => {
        token.toggleEffect(effect);
    });
}

async function clearConditions(token){
    const effectArray = token.data.effects;
    // token.update({"effects": []});
    let newEffectArray = [];
    for (let i = 0; i < effectArray.length; i++){
        if (!effectArray[i].includes("modules/conditions5e/icons/")){
            newEffectArray.push(effectArray[i]);
        }
    }
    await token.update({"effects" : newEffectArray});
}


let apply = false;
new Dialog({
    title: `Select Condition`,
    content: `<form>
      <div class="form-group">
        <label>Condition:</label>
        <select id="condition" name="condition">
          <option value="clear">Clear all Conditions</option>
          <option value="blind">Blind</option>
          <option value="charm">Charmed</option>
          <option value="deaf">Deafened</option>
          <option value="disease">Diseased</option>
          <option value="fright">Frightened</option>
          <option value="grap">Grappled</option>
          <option value="incap">Incapacitated</option>
          <option value="invis">Invisible</option>
          <option value="para">Paralyzed</option>
          <option value="petri">Petrified</option>
          <option value="poison">Poisoned</option>
          <option value="prone">Prone</option>
          <option value="restrain">Restrained</option>
          <option value="stun">Stunned</option>
          <option value="uncon">Unconscious</option>
          <option value="ex1">Exhaustion1</option>
          <option value="ex2">Exhaustion2</option>
          <option value="ex3">Exhaustion3</option>
          <option value="ex4">Exhaustion4</option>
          <option value="ex5">Exhaustion5</option>
        </select>
      </div>`,
    buttons: {
        confirm: {
            icon: "<i class='fas fa-check'></i>",
            label: `Apply Changes`,
            callback: () => apply = true
        }
    },
    default: "confirm",
    close: html => {
        if (apply) {
            let condition = html.find('[name="condition"]')[0].value;
            const options = 
            {
                blind:      "blinded",
                charm:      "charmed",
                deaf:       "deafened",
                disease:    "diseased",
                fright:     "frightened",
                grap:       "grappled",
                incap:      "incapacitated",
                invis:      "invisible",
                para:       "paralyzed",
                petri:      "petrified",
                poison:     "poisoned",
                prone:      "prone",
                restrain:   "restrained",
                stun:       "stunned",
                uncon:      "unconscious",
                ex1:        "exhaustion1",
                ex2:        "exhaustion2",
                ex3:        "exhaustion3",
                ex4:        "exhaustion4",
                ex5:        "exhaustion5",
                clear:      "clear"
            }
            applyCon(options[condition]);
        }
    }    
}).render(true);