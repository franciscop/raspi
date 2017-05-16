const webcam = require('node-webcam');
const os = require('os');
const fs = require('mz/fs');
const { exec } = require('mz/child_process');
const path = require('path');

const cam = webcam.create({ width: 640, height: 480 });
const temp = path.join(os.tmpdir(), 'demo.jpg');

// Stream an image each N ms
module.exports = async ctx => {

  // setInterval(async () => {
  //   const out = await exec(`fswebcam -r 640x480 -`);
  //   const img = out[0];
  //   await fs.writeFile('demo.jpg', img);
  //   ctx.socket.emit('frame', { image: true, buffer: img.toString('base64') });
  // }, 1000);

  setInterval(async () => {
    await new Promise((resolve, reject) => {
      cam.capture(temp, (err, data) => err ? reject(err) : resolve(data));
    });
    const file = await fs.readFile(temp);
    ctx.socket.emit('frame', { image: true, buffer: file.toString('base64') });
  }, parseInt(process.env.DELAY));
};
