const express=require('express');
const http=require('http');
const path=require('path');
const socketIo=require('socket.io');
const ejs=require('ejs');
const ejsLayouts=require('express-ejs-layouts');
const formatMessage = require('./utils/format_messages');
const {formatUser,removeUser} = require('./utils/formatUser');
const app=express();



const server=http.createServer(app);
const io=socketIo(server);

//Static 
app.use(express.static(path.join(__dirname,'public')));

//EJS
app.use(ejsLayouts);
app.set('view engine','ejs');

//Mount route
app.get('/chit-chat',(req,res)=>{
  res.render('chat');
})

// io server
io.on('connection',(socket)=>{
 socket.broadcast.emit("message",formatMessage('ChatCord',"A new user has joined the chat"));

  socket.on('chatMessage',(msg)=>{
    io.emit('message',formatMessage(msg.name,msg.text));
  })

  socket.on("chatUsers",(name)=>{
    io.emit("showUsers",formatUser(name));
  })

  socket.on('removeUser',(name)=>{
    io.emit("showUsers",removeUser(name));
  })

  
  socket.on('disconnection', (msg) => {
   socket.broadcast.emit('message', formatMessage("ChatCord", msg));
})

});








PORT=process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`App listening on the port ${PORT}`);
});