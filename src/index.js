const http = require('http');
const path = require('path');
const express = require('express');
const socketio = require('socket.io');
const app = express();

const server = http.createServer(app);
const io = socketio.listen(server);

const mongoose = require('mongoose');

//db connection
//
mongoose.connect('mongodb://kalanikochs:kalanikochs@cluster0-shard-00-00-fkqke.mongodb.net:27017,cluster0-shard-00-01-fkqke.mongodb.net:27017,cluster0-shard-00-02-fkqke.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority', {
    useNewUrlParser: true, 
    useUnifiedTopology: true
    })
    .then(db => console.log('db is connected'))
    .catch(err => console.log(err));

//settings
app.set('port', process.env.PORT || 3000);

require('./sockets')(io);

//static files
app.use(express.static(path.join(__dirname, 'public')));

//starting server
server.listen(app.get('port'), () => {
    console.log('server on port 3000');
});