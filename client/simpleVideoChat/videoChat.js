navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
 
var localStream;    // 自分の映像ストリームを保存しておく変数
var connectedCall;  // 接続したコールを保存しておく変数
 
var peer = new Peer({ key: 'nvxn9tnx5t6mkj4i', debug: 3});
var irobotCommand = io.connect('http://localhost:3333/irobotCommand');

var commandLists = {
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


var directionStatus = {
  statusForwarBack:0,
  statusRightLeft:0,
  stopForwardBack:0,
  stopAll:0
};


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


//Get peer id
peer.on('open', function(){
    $('#my-id').text(peer.id);
    console.log(peer.id);
    console.log(directionStatus)
});

//take calling from other peer
peer.on('call', function(call){
    connectedCall = call;
     $("#peer-id").text(call.peer);
    call.answer(localStream);
 
    call.on('stream', function(stream){
        var url = URL.createObjectURL(stream);
        $('#peer-video').prop('src', url);
    });
});

peer.on('connection', function(conn) {
    conn.on('data', function(data){
        console.log("data : " + JSON.stringify(data));
        $("#directionStatus").text("data : " + JSON.stringify(data));
    });
});
 
$(function() {
    navigator.getUserMedia({audio: true, video: true}, function(stream){
        localStream = stream;
        var url = URL.createObjectURL(stream);
        $('#my-video').prop('src', url);
    }, function() { alert("Error!"); });
     
 
    //recieve calling from other peer
    $('#call-start').click(function(){
        var peer_id = $('#peer-id-input').val();
        var call = peer.call(peer_id, localStream);
        var conn = peer.connect(peer_id);  

        conn.on('open',function(){
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
        }, 100);
    });

        call.on('stream', function(stream){
            $("#peer-id").text(call.peer);
            var url = URL.createObjectURL(stream);
            $('#peer-video').prop('src', url);
        });
    });
 
    // End　Callボタンクリック時の動作
    $('#call-end').click(function(){
        connectedCall.close();
    });
});