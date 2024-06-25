const { TIMEOUT } = require('dns');
const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const expressServer = http.createServer(app);
const io = new Server(expressServer);

const port = 3000;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
  console.log('New User Connected');

//   setTimeout(function() {
//     socket.send("This is Abuds shobhan From Server ----> Client");
// }, 10000);
// setInterval(function(){
//   let d = new Date();
//   let t = d.getTime();
//   socket.send(t);
// }, 1000);

// This section is for broadcusting...
io.sockets.emit("MyBroadcast", "Hello, This is Abdus_shobhan");


socket.on('message', function(msg) {

  console.log(msg);
})


  socket.on('disconnect', () => {
    console.log('User Disconnected');
  });

  //Add more custom event handlers here
  socket.on('message', (msg) => {
    console.log('Message received:', msg);
    io.emit('message', msg); // Broadcast the message to all clients
  });
});

expressServer.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
