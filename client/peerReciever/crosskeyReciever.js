var ButtonIdMap = {
  "38": "forward",
  "40": "back",
  "37": "turnLeft",
  "39": "turnRight"
}

function keyRecieved(data) {
  console.log(data);
  keyPressed(data.key, data.pressed);
}

function keyPressed(key, pressed) {
  if (key < 37 || 40 < key) {
    return;
  }
  console.log("Direction: " + ButtonIdMap[key] + ", pressed:" + pressed);
  let elem = document.getElementById(ButtonIdMap[key]);
  if (pressed) {
    elem.style.backgroundColor = "red";
  } else {
    elem.style.backgroundColor = "yellow";
  }
}