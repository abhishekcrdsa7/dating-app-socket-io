const express = require('express');
const app = express();
const http = require('http');
const routes = require('./routes');
const cors = require('cors');
const bodyParser = require('body-parser');
const socketIO = require('socket.io');
const server = http.createServer(app);
require('./database/db-connect');
const sockets = require('./sockets');
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());
app.use(routes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('build'));

    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
    });
}

const io = socketIO(server);
io.on('connection',(socket) => {
    socket.on('saveUserId', (userId) => {
       sockets[userId] = socket.id;
    });

    socket.on('like',(email ,userId) => {
        io.to(sockets[userId]).emit('like',{email, message: `${email} liked your profile!!`});
    });

    socket.on('superlike',(email, picture ,userId) => {
        io.to(sockets[userId]).emit('superlike',{email, message: `${email} superliked your profile!!`, picture});
    });

    socket.on('block',(user, userBlockedId) => {
        io.to(sockets[userBlockedId]).emit('block',{user: user});
    });

    socket.on('disconnect',() => {
        Object.keys(sockets).forEach(function(key){
            if(sockets[key] === socket.id)
                delete sockets[key];
        });
    });
});

server.listen(PORT);
