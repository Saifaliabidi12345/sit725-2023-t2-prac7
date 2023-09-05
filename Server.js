const express = require('express');
const app = express();
const port = 3000;
require('./DBconnection');
let router = require('./Routers/Router');

let http = require ('http').createServer(app);
let io = require ('socket.io')(http);
const {Socket} = require('socket.io');

app.use(express.static(__dirname + '/'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api', router); 

io.on('connection',(socket)=>{
  console.log('User has established his Connection');
  socket.on('disconnect', () => {
      console.log('User was disconnected from connection');
  });

  setInterval(()=>{
      socket.emit('number', parseInt(Math.random()*10));
  }, 1000)
});


http.listen(port, ()=>{
  console.log('express server started');
});
