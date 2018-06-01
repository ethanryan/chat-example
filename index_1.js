var Y = require('yjs')
require('y-array')(Y) // add the y-array type to Yjs
require('y-websockets-client')(Y)
require('y-memory')(Y)
require('y-map')(Y)
require('y-text')(Y)

const express = require('express');
const socketIO = require('socket.io');
// const path = require('path');

// const PORT = process.env.PORT || 3000;
// const PORT = process.env.PORT || 1234;
// const INDEX = path.join(__dirname, 'index.html');
//
// const server = express()
//   .use((req, res) => res.sendFile(INDEX) )
//   .listen(PORT, () => console.log(`Listening on port: ${ PORT }`));
//
// const io = socketIO(server); //note: the Socket.io server takes an HTTP server as an argument so that it can listen for socket.io-related requests


Y({
  db: {
    name: 'memory' // use the memory db adapter
  },
  connector: {
    name: 'websockets-client', // use the websockets-client connector
    room: 'Textarea-example-dev',
    // socket: io('http://localhost:1234'), // Pass socket.io object to use
    socket: socketIO('http://localhost:1234'), // Pass socket.io object to use
    url: 'http://localhost:1234' // the connection endpoint (see y-websockets-server)
    // if `url` is not set, the default connection endpoint is chosen
    // (provided by the i5 chair of computer science, RTWH University)
  },
  share: {
    textarea: 'Text' // y.share.textarea is of type Y.Text
  }
}).then(function (y) {
  // bind the textarea to a shared text element
  y.share.textarea.bind(document.getElementById('textfield'))
})
