// toggles ALL scenes (no idea why you would want that but i made it so its in here)
let sceneIds = [];
for (let i = 0; i < game.scenes._source.length; i++){
  sceneIds.push(game.scenes._source[i]._id);
}
for (let i = 0 ; i < sceneIds.length; i++) {
  const getScene = game.scenes.get(sceneIds[i]);
  getScene.update({navigation: !getScene.data.navigation});
}