const server = require('server');
const { get, socket } = server.router;
const motor = require('./motor');
const webcam = require('node-webcam');
const os = require('os');
const fs = require('fs');
const path = require('path');
const cam = webcam.create({ width: 640, height: 480 });
const temp = path.join(os.tmpdir(), 'demo.jpg');

const motorL = motor(0, 2);
const motorR = motor(4, 5);

server({}, [
  get('/', ctx => ctx.res.render('index')),
  socket('init', async ctx => {
    setInterval(() => {
      cam.capture(temp, function(err, data) {
        const file = fs.readFileSync(temp);
        ctx.socket.emit('frame', { image: true, buffer: file.toString('base64') });
      });
    }, 1000);
  }),
  socket('left', async ctx => {
    console.log('LEFT');
    await Promise.all([
      motorR.forward(),
      motorL.backward()
    ]);
  }),
  socket('right', async ctx => {
    console.log('RIGHT');
    await Promise.all([
      motorL.forward(),
      motorR.backward()
    ]);
  }),
  socket('forward', async ctx => {
    console.log('FORWARD');
    await Promise.all([
      motorL.forward(),
      motorR.forward()
    ]);
  }),
  socket('backward', async ctx => {
    console.log('BACKWARD');
    await Promise.all([
      motorL.backward(),
      motorR.backward()
    ]);
  }),
  socket('stop', async ctx => {
    console.log('STOP');
    await Promise.all([
      motorL.stop(),
      motorR.stop()
    ]);
  }),
]);
