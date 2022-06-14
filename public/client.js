$(document).ready(function () {

  /*global io*/
  let socket = io();

  //const socket = io("ws://localhost:3000");
  //user connected/disconnected
  socket.on('user', data => {
    $('#num-users').text(data.userCount + ' users online');
    //console.log(data.name)
    let message =
      data.name +
      (data.connected ? ' has joined the chat.' : ' has left the chat.');
    $('#messages').append($('<li>').html('<b>' + message + '</b>'));
  });

  //user want to send a message
  $('form').submit(function () {
    var messageToSend = $('#m').val();
    socket.emit('chat message', messageToSend);

    $('#m').val('');
    return false; 
  });

  socket.on('chat message', (data) => {
    $('#messages').append($('<li>').text(`${data.name}: ${data.message}`));
  });

});
