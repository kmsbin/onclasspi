const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();

const db = require('./src/database/database');
const routes = require('./src/routes/routes');
const { v4: uuidV4 } = require('uuid')
var http = require('http');
var serv = http.createServer(app)
var io  = require('socket.io')(http).listen(serv);

// var videoStream = require('./src/stream/signaling-server')
// videoStream(io);

app.use(session({ secret: 'secret', resave: true, saveUninitialized: true }));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(bodyParser.text());
app.set('view engine', 'html');
app.set('X-Content-Type-Options', 'nosniff')

app.use('/', routes);

io.on('connection', socket => {
    socket.on('join-room', (roomId, userId) => {
      socket.join(roomId)
      socket.to(roomId).broadcast.emit('user-connected', userId)
  
      socket.on('disconnect', () => {
        socket.to(roomId).broadcast.emit('user-disconnected', userId)
      })
    })
  })



const server = serv.listen(process.env.PORT, () => {
    const host = server.address().address;
    const port = server.address().port;

    // db.sequelize.sync({ force: true });

    console.log(`Server listening at https://${host}:${port}`);
});