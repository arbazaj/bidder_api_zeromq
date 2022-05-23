var zmq = require('zeromq')
, sock = zmq.socket('pub');

const address = `tcp://${process.env.TCP_IP}:${process.env.TCP_PORT}`;

sock.bindSync(address);

console.log('Publisher bound to port: ', address);

const publish = (topic, data) => {
  console.log(address);
  return sock.send([topic, JSON.stringify(data)])
};

module.exports = {
  publish
};