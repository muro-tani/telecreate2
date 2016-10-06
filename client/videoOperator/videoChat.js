navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

var localStream;
var connectedCall;

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

