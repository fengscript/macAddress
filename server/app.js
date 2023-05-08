const http = require('http');
const https = require('https');
const os = require('os');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

console.log(__dirname);
const path2 = path.join(__dirname, './cert/CA/CA.pem');


// exec(`sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain /Users/fengyanggang/Desktop/Code/0_others/macAddress/server/cert/CA/CA.pem`, (err, stdout, stderr) => {
exec(`certutil -addstore -f "ROOT" ${path2}`,(err, stdout, stderr) => {
  if(err) {
      console.log(err);
      return;
  }
  console.log(`stdout: install cert...  ${stdout}`);
  console.log(`stderr: ${stderr}`);
})


const key = fs.readFileSync(path.join(__dirname, './cert/CA/localhost/localhost.decrypted.key'));
const cert = fs.readFileSync(path.join(__dirname, './cert/CA/localhost/localhost.crt'));

const options = {
  key,
  cert
  // key: fs.readFileSync(path.join(__dirname, 'key.pem')),
  // cert: fs.readFileSync(path.join(__dirname, 'cert.pem')),
};


const port = 8001;
const networkInterfaces = os.networkInterfaces();

const requestListener = function (req,res) {
  res.setHeader('Content-Type', 'application/javascript;charset=utf-8');
  // res.setHeader('Access-Control-Allow-Origin', '*');
  // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With');
  // res.setHeader('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');

  res.end(`getMacAddress('${JSON.stringify(networkInterfaces)}')`)

  // res.end(JSON.stringify({
  //   macAddres: networkInterfaces
  // }))
}

const server = https.createServer(options, requestListener);
server.listen(port, () => {
  console.log(`server run at ${port}`);
})

