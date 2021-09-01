if(game.user.character.data.items.find(i=> i.name===`Sorcerer`) == null) return ui.notifications.error("Sorcerers only, fools!");

let resource = game.user.character.data.data.resources.primary.value;
const resourceMax = game.user.character.data.data.resources.primary.max;

let content = `
<h1 id="display">You have <b>${resource}</b> Sorcery Points</h1>
<style>
.metaMagic {
  background-color: white;
  color: black;
  border: 2px solid red;
  width: 188px;
  height: 40px;
}

.utility {
  background-color: white;
  color: black;
  border: 2px solid #4CAF50;
  width: 188px;
  height: 40px;
}

.metaMagic:hover  {
  background-color: red;
  color: white;
}

.utility:hover  {
  background-color: #4CAF50;
  color: white;
}

</style>

<input type="number" id="number" min="1" max="9" step="1" value="1">


<button class="button metaMagic" id="twin">Twin</button>
<button class="button metaMagic" id="empower">Empower</button>
<button class="button metaMagic" id="quicken">Quicken</button>
<button class="button metaMagic" id="careful">Careful</button>

<button class="button utility" id="spendSP">Spend Sorcery Points</button>
<button class="button utility" id="getSP">Restore Sorcery Points</button>
<button class="button utility" id="ltp">Levels to Sorcery Points</button>
<button class="button utility" id="ptl">Sorcery Points to Levels</button>
`;

let d = new Dialog({
    title: `Sorcerer UI`,
    content,
    buttons: {},
    close() {},
    render(html) {
      function refreshDisplay() {
        html.find("#display").html(`You have <b> ${resource} </b> Sorcery Points`);
      }
      
      function setSP(newVal){
        game.user.character.update({"data.resources.primary.value": newVal});
      }

      function getNum(){
        return document.getElementById("number").value;
      }

      function metaMagic(name, val){
        	// ChatMessage.create()
          if (resource-val >= 0) {
            resource -= val;
            refreshDisplay();
            setSP(resource);
            ChatMessage.create({
              content: `${game.user.character.name} hat <b> ${val} </b> Sorcery Points ausgegeben, um  <b> ${name} Spell </b> zu nutzen!`, 
              user: game.user.id,
              speaker: ChatMessage.getSpeaker()
            });
          }
          else ChatMessage.create({
            content: `Nicht genügend Sorcrey Points für <b> ${name} spell! </b>`, 
            user: game.user.id,
            speaker: ChatMessage.getSpeaker()
            });
      }

      function convertCost(level) {
        switch(parseInt(level)){
          case 1: 
            return 2;
          case 2: 
            return 3;
          case 3: 
            return 5;
          case 4: 
            return 6;
          case 5: 
            return 7;
        }
      }


      html.find("#twin").on("click", async () => {
        metaMagic("Twinned", getNum());
      });

      html.find("#empower").on("click", async () => {
        metaMagic("Empowered", 1);
      });

      html.find("#quicken").on("click", async () => {
        metaMagic("Quickened", 2);
      });

      html.find("#careful").on("click", async () => {
        metaMagic("Careful", 1);
      });

      html.find("#spendSP").on("click", async () => {
        let value = getNum();
        if (resource - value >= 0) {
          resource-=value;
          refreshDisplay();
          setSP(resource);
          ChatMessage.create({
            content: `<b>${value}</b> Sorcerer Point ausgegeben!`, 
            user: game.user.id,
            speaker: ChatMessage.getSpeaker()
          });
        } 
      });

      html.find("#getSP").on("click", async () => {
        let value = getNum();
        if (parseInt(resource) + parseInt(value) <= resourceMax) {
          resource = parseInt(resource) + parseInt(value);
          refreshDisplay();
          setSP(resource);
          ChatMessage.create({
            content: `<b>${value}</b> Sorcerer Point wiederhergestellt!`, 
            user: game.user.id,
            speaker: ChatMessage.getSpeaker()
          });
        } 
      });

      html.find("#ltp").on("click", async () => {
        let level = document.getElementById("number").value;
        let spells = duplicate(game.user.character.data.data.spells);
        let slot = `spell${level}`;

        if (parseInt(resource) + parseInt(level) <= resourceMax && spells[slot].value > 0) {
          spells[slot].value--;
          await game.user.character.update({"data.spells": spells});
          resource = parseInt(resource) + parseInt(level);
          refreshDisplay();
          setSP(resource);
          ChatMessage.create({
            content: `Level <b>${level}</b> Spell Slot konvertiert zu <b>${level}</b> Sorcerer Points!`, 
            user: game.user.id,
            speaker: ChatMessage.getSpeaker()
          });
        }
      });

      html.find("#ptl").on("click", async () => {
        let level = document.getElementById("number").value;
        let spells = duplicate(game.user.character.data.data.spells);
        let slot = `spell${level}`;
        let spCost = convertCost(level);
        console.log(spCost);

        if (parseInt(resource) - parseInt(spCost) >= 0 && spells[slot].value < spells[slot].max) {
          spells[slot].value++;
          await game.user.character.update({"data.spells": spells});
          resource = parseInt(resource) - parseInt(spCost);
          refreshDisplay();
          setSP(resource);
          ChatMessage.create({
            content: `<b>${spCost}</b> Sorcerer Points konvertiert zu Level <b>${level}</b> Spell Slot!`, 
            user: game.user.id,
            speaker: ChatMessage.getSpeaker()
          });
        }     
      });
    


}});

d.render(true);