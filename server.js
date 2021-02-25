const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
// require('dotenv').config({path: path.resolve(__dirname, '.env')});


const app = express();

const db = require('./src/database/database');
const routes = require('./src/routes/routes');
const { v4: uuidV4 } = require('uuid')
var cors = require('cors')
var http = require('http');
var serv = http.createServer(app)
var io  = require('socket.io')(http).listen(serv);
const ngrok = require('ngrok');

// var videoStream = require('./src/stream/signaling-server')
// videoStream(io);

app.use(session({ secret: 'secret', resave: true, saveUninitialized: true }));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(bodyParser.text());
app.set('view engine', 'html');

app.use(session({
  secure: true,
  secret: 'onclass',
  resave: true,
  saveUninitialized: true,
  cookie: {maxAge: 2*60*1000}
}) 

)

app.use(cors())
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



const server = serv.listen(8081, () => {
    const host = server.address().address;
    const port = server.address().port;

    // db.sequelize.sync({ force: true });

    console.log(`Server listening at https://${host}:${port}`);
});
