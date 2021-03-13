// requires "Mage Armor" Active Effect setup in effects tab 
let effectName = "Mage Armor"; // effect name in effects tab
let img = "systems/dnd5e/icons/skills/blue_18.jpg"; // path to condition img
if (canvas.tokens.controlled.length === 0)
  return ui.notifications.error("Please select a token!");
let effect = token.actor.data.effects.find(i => i.label === effectName);
let target = canvas.tokens.controlled[0];
if (token.actor.data.effects[0].disabled){
    if (!target.data.effects.includes(img)) target.toggleEffect(img);
    token.actor.updateEmbeddedEntity("ActiveEffect", {"_id": effect._id,  "disabled" : false});
}
else{
    if (target.data.effects.includes(img)) target.toggleEffect(img);
    token.actor.updateEmbeddedEntity("ActiveEffect", {"_id": effect._id,  "disabled" : true});
}