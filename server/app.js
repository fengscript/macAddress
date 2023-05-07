const http = require('http');
const https = require('https');
const os = require('os');
const fs = require('fs');
const path = require('path');
// const { exec } = require('child_process');
const service = require ("os-service");


const options = {
  key: fs.readFileSync(path.join(__dirname, 'localhost.key')),
  cert: fs.readFileSync(path.join(__dirname, 'localhost.crt')),
};

const port = 8001;
const networkInterfaces = os.networkInterfaces();

const requestListener = function (req,res) {
  res.setHeader('Content-Type', 'application/javascript;charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With');
  res.setHeader('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');

  res.end(JSON.stringify({
    macAddres: networkInterfaces
  }))
}

const server = https.createServer(options, requestListener);
// server.listen(port, () => {
//   // console.log(`server run at ${port}`);
// })


// service.add ("my-service");

// // service.remove ("my-service");

// service.run (function () {
//     server.listen(port, () => {
//     })

//     service.stop ();
// });