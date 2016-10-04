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
    console.log("hello call start");
    partnerID = document.getElementById("partner-id-input").value;
    console.log(partnerID);
    conn = peer.connect(partnerID);
    document.getElementById("partnerID").innerHTML = partnerID;
}

function sendHi(){
    console.log("send HI!!");
    conn.send('HI!');
    conn.on('open', function(){        
        console.log("sent HI!!");
    }); 
}

function callEnd() {
    conn.close();
}