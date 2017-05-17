const server = require('server');
const { get, socket } = server.router;
const motor = require('./motor');
const camera = require('./camera');

const motorL = motor(0, 2);
const motorR = motor(4, 5);

server({}, [
  get('/', ctx => ctx.res.render('index')),
  socket('init', ctx => {
    setInterval(async () => {
      ctx.socket.emit('frame', await camera({
        resolution: '320x240',
        rotate: 90
      }));
    }, parseInt(process.env.DELAY || 1000));
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
]).then(() => {
  console.log('Started!');
});
