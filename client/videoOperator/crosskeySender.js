var ButtonIdMap = {
  "38": "Forward",
  "40": "Back",
  "37": "Left",
  "39": "Right"
}

var btnStatus = {
  "key" : null,
  "pressed" : null
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

  if(conn != null) conn.send(ButtonIdMap[key]);
}

document.addEventListener("keydown", function (e) {
  keyPressed(e.which, true);
});
document.addEventListener("keyup", function (e) {
  keyPressed(e.which, false);
});