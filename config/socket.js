
const cookieParser = require('cookie-parser')
const MongoStore = require("connect-mongo");

const passportSocketIo = require('passport.socketio')

const socket = function(Server){
    
const io = require('socket.io')(Server,{cors:{origin:'*'}})

io.use(
    passportSocketIo.authorize({
      cookieParser: cookieParser,
      store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
      secret: process.env.SESSION_SECRET,

    })
  );

let userCount = 0
io.on("connection", (socket) => {
    userCount++
    // send a message to the client
    io.emit('user', {
        name:  socket.request.user.username,
        userCount,
        connected: true
      });
    socket.on('chat message', (message) => {
        io.emit('chat message', {
             name:socket.request.user.username,
             message 
            });
        });
      socket.on('disconnect', () => {
        console.log('A user has disconnected');
        --userCount;
            io.emit('user',{
            name:socket.request.user.username,
            userCount,
            connected: false
            });
      });

    
  });
}
module.exports = socket