const socket = io('/')
var a_random_id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);
const videoGrid = document.getElementById('video-grid')
const myPeer = new Peer({
  config: {'iceServers': [
    { url: 'stun:stun.l.google.com:19302' },

{url: "stun.12connect.com:3478"},
{url: "stun.12voip.com:3478"},
{url: "stun.1und1.de:3478"},
{url: "stun.2talk.co.nz:3478"},
{url: "stun.2talk.com:3478"},
{url: "stun.3clogic.com:3478"},
{url: "stun.3cx.com:3478"},
{url: "stun.a-mm.tv:3478"},
{url: "stun.aa.net.uk:3478"},
{url: "stun.acrobits.cz:3478"},
{url: "stun.actionvoip.com:3478"},
{url: "stun.advfn.com:3478"},
{url: "stun.aeta-audio.com:3478"},
{url: "stun.aeta.com:3478"},
{url: "stun.alltel.com.au:3478"},
{url: "stun.altar.com.pl:3478"},
{url: "stun.annatel.net:3478"},
{url: "stun.antisip.com:3478"},
{url: "stun.arbuz.ru:3478"},
{url: "stun.avigora.com:3478"},
{url: "stun.avigora.fr:3478"},
{url: "stun.awa-shima.com:3478"},
{url: "stun.awt.be:3478"},
{url: "stun.b2b2c.ca:3478"},
  ]} /* Sample servers, please use appropriate ones */
})
const myVideo = document.createElement('video')
myVideo.muted = true
const peers = {}
navigator.mediaDevices.getUserMedia({
  video: true,
  audio: true
}).then(stream => {
  addVideoStream(myVideo, stream)

  myPeer.on('call', call => {
    call.answer(stream)
    const video = document.createElement('video')
    call.on('stream', userVideoStream => {
      addVideoStream(video, userVideoStream)
    })
  })

  socket.on('user-connected', userId => {
    connectToNewUser(userId, stream)
  })
})

socket.on('user-disconnected', userId => {
  if (peers[userId]) peers[userId].close()
})

myPeer.on('open', id => {
  socket.emit('join-room', ROOM_ID, id)
})

function connectToNewUser(userId, stream) {
  const call = myPeer.call(userId, stream)
  const video = document.createElement('video')
  call.on('stream', userVideoStream => {
    addVideoStream(video, userVideoStream)
  })
  call.on('close', () => {
    video.remove()
  })

  peers[userId] = call
}

function addVideoStream(video, stream) {
  video.srcObject = stream
  video.addEventListener('loadedmetadata', () => {
    video.play()
  })
  videoGrid.append(video)
}