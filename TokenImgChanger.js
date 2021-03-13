// For Changelings and Disguise Self Addicts
const folder = "DoppioPics"; // Folder Name in Userdirectory/
const imgArray = ["Doppio.png","Kobold.png","QuddosNecro.png"]; // Img name in folder
const imgNames = ["OG Doppio", "Skip", "Doppiomancer"]; // name in Dropdown menu (equal to index in imgArray)

if (canvas.tokens.controlled.length != 1)
  return ui.notifications.error("Chose ONE Token");

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
           token.update({img : folder + "/" + imgChoice}); 
        }
    }
}).render(true);