var peer;
var conn;

var myID;
var partnerID;

function getmyID(){
    myID = document.getElementById("my-id-input").value;
    document.getElementById("myID").innerHTML = myID;
    startPeerConnection();
}

function startPeerConnection() {
    peer = new Peer( myID, {key: 'nvxn9tnx5t6mkj4i', debug: 3});
    peer.on('open', function(){
        console.log(peer.id);
    });
}

function callStart(){
    partnerID = document.getElementById("partner-id-input").value;
    conn = peer.connect(partnerID);
    document.getElementById("partnerID").innerHTML = partnerID;
}

function callEnd() {
    conn.close();
}