let commandLists = {
  "Back" : 0,
  "Forward" : 1,
  "Right" : 2,
  "Left" : 3,
  "Reset" : 4,
  "Full" : 5,
  "Safe" : 6,
  "Passive" : 7,
  "Beep" : 10,
  "Close" : 11,
  "Stop" : 12
};


let directionStatus = {
  statusForwarBack:0,
  statusRightLeft:0,
  stopForwardBack:0,
  stopAll:0
};

(function(){
  if(!window.Gamepad) return;
  if(!navigator.getGamepads) return;
  setInterval(function(){
    let str = "";
    let gamepad_list = navigator.getGamepads();
    let num = gamepad_list.length;
    let i;
    for(i = 0; i < num; i++){
      let gamepad = gamepad_list[i];
      if(!gamepad)continue;
      str += "index: " + gamepad.index + "\n";
      str += "timestamp: " + gamepad.timestamp + "\n";
      str += "id: \"" + gamepad.id + "\"\n";
      str += "connected: " + gamepad.connected + "\n";
      str += "mapping: \"" + gamepad.mapping + "\"\n";
      let buttons = gamepad.buttons;
      str += "buttons: {\n";
      var j;
      var n = buttons.length;
      for(j = 0; j < n; j++){
        let button = buttons[j];
        str += "  \"" + j + "\": { ";
        str += "pressed:" + button.pressed + " , ";
        str += "value:" + button.value + " }\n";
      }
      str += "}\n";
      let axes = gamepad.axes;
      str += "axes: {\n";
      var j;
      var n = axes.length;
      for(j = 0; j < n; j++){
        str += "  \"" + j + "\": ";
        str += axes[j] + "\n";
      }
      str += "}\n";
      str += "\n ----- \n\n";
      if(axes[1] < 0){
        str += "FORWARD" + "\n";
        directionStatus.statusForwarBack = 0;
      } else if(axes[1] > 0){
        str += "BACK" + "\n";
        directionStatus.statusForwarBack = 1;
      }
      if(axes[2] > 0){
        str += "RIGHT" + "\n";
        directionStatus.statusRightLeft = 0;
      } else if(axes[2] < 0){
        str += "LEFT" + "\n";
        directionStatus.statusRightLeft = 1;
      }
      if(Math.abs(axes[0]) < 0.1 && Math.abs(axes[1]) < 0.1){
        directionStatus.stopForwardBack = 1;
      } else {
        directionStatus.stopForwardBack = 0;
      }

      if(Math.abs(axes[0]) < 0.1 && Math.abs(axes[1]) < 0.1 && Math.abs(axes[2]) < 0.2 && Math.abs(axes[3]) < 0.2){
        directionStatus.stopAll = 1;
      } else {
        directionStatus.stopAll = 0;
      }
    }
     
      conn.send(directionStatus);  
     
     
    //console.log(directionStatus);
    //controlIrobot(directionStatus);
  }, 1000 / 60);
})();

function controlIrobot(directionStatus){
  if(directionStatus.stopAll == 1){
    console.log("message", { id : commandLists["Stop"] });
  } else {
    if(directionStatus.stopForwardBack == 1){
      if(directionStatus.statusRightLeft == 0)console.log("message", { id : commandLists["Right"] });
      if(directionStatus.statusRightLeft == 1)console.log("message", { id : commandLists["Left"] });
    } else {
      if(directionStatus.statusForwarBack == 0)console.log("message", { id : commandLists["Forward"] });
      if(directionStatus.statusForwarBack == 1)console.log("message", { id : commandLists["Back"] });
    }
  }
}