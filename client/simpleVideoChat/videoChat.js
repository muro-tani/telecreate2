navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
 
var localStream;    // 自分の映像ストリームを保存しておく変数
var connectedCall;  // 接続したコールを保存しておく変数
 
var peer = new Peer({ key: 'nvxn9tnx5t6mkj4i', debug: 3});

//Get peer id
peer.on('open', function(){
    $('#my-id').text(peer.id);
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