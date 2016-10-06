navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

var peer;
var conn;
var call;

var localStream;
var connectedCall;

var myID;
var partnerID;


window.onload = function(){
    displayMyCamera();
}

function displayMyCamera(){
    navigator.getUserMedia({audio: true, video: true}, function(stream){
        localStream = stream;
        document.getElementById("myVideo").src = URL.createObjectURL(stream);
    }, function() { alert("Error!"); });
}

function setmyID(){
    myID = document.getElementById("my-id-input").value;
    document.getElementById("myID").innerHTML = myID;
    if(myID){
        startPeerConnection();
    } else alert("please input your id");
}

function startPeerConnection() {
    peer = new Peer( myID, {key: 'nvxn9tnx5t6mkj4i', debug: 3});
    peer.on('open', function(){
        console.log(peer.id);
    });
    peer.on('call', function(call){
        connectedCall = call;
        call.answer(localStream);

        call.on('stream', function(stream){
            document.getElementById("partnerVideo").src = URL.createObjectURL(stream);
        });
    });
}

function callStart(){
    partnerID = document.getElementById("partner-id-input").value;
    conn = peer.connect(partnerID);
    document.getElementById("partnerID").innerHTML = partnerID;
    var call = peer.call(partnerID, localStream);
    call.on('stream', function(stream){
        document.getElementById("partnerVideo").src = URL.createObjectURL(stream);
    })
}

function takeCall(call) {
    connectedCall = call;
    call.answer(localStream);

    call.on('stream', function(stream){
        document.getElementById("partnerVideo").src = URL.createObjectURL(stream);
    })
}

function callEnd() {
    connectedCall.close();
    conn.close();
}

function Reset(){
    if(conn != null) conn.send("Reset");
}

function Passive(){
    if(conn != null) conn.send("Passive");
}

function Safe(){
    if(conn != null) conn.send("Safe");
}

function Full(){
    if(conn != null) conn.send("Full");
}

function Beep(){
    if(conn != null) conn.send("Beep");
}

function Close(){
    if(conn != null) conn.send("Close");
}