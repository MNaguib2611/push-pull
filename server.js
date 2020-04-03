const cors =require('cors'); 
const app=require('express')();
const socketIo =require('socket.io'); 
const server =require('http').Server(app); 



app.use (cors());


const io = socketIo(server);

io.on('connection',(client)=>{
    client.on('message',(message)=>{
        io.emit('new-message',message);
    });
})


server .listen(3000,(err)=>{
    if (!err) console.log('\x1b[32m%s\x1b[0m','Server was started on port 3000');
});


