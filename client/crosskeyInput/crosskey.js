var key;
document.addEventListener("keypress", function(e) {
  key = e.which || e.keyCode;
  for (i = 37; i <= 40; i++) {
    if(key === i) {
      console.log("pressed keycode:" + i);
      document.getElementById("keycode" + i).style.backgroundColor = "red";
    }
  }
});
document.addEventListener("keyup", function(e) {
  console.log(e.which);
  document.getElementById("keycode" + key).style.backgroundColor = "yellow";
});