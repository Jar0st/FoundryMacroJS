const imgArray = ["Doppio.png","Kobold.png"]; // Pfad im DoppioPics Ordner
const imgNames = ["OG Doppio", "Skip"]; // Anzeigename

if (canvas.tokens.controlled.length != 1)
  return ui.notifications.error("Wähle EINEN Token");

let imgHtml = `<form>
<div class="form-group">
  <label>Appearance:</label>
  <select id="img-chosen" name="img-chosen">` 
for (let i = 0; i < imgArray.length; i++){
    imgHtml += `<option value="${imgArray[i]}">${imgNames[i]}</option>`;
} 
imgHtml += `</select></div></form>`;

let applyImage = false;
new Dialog({
    title: `Doppio Shapeshift UI`,
    content: imgHtml,
    buttons: {
      apply: {
        icon: "<i class='fas fa-check'></i>",
        label: `Apply`,
        callback: () => applyImage = true
      }
    },
    default: "apply",
    close: _html => {
        if (applyImage) {
           let imgChoice = _html.find('[name="img-chosen"]')[0].value;
           token.update({img : "DoppioPics/" + imgChoice}); 
        }
    }
}).render(true);