const server = require('server');
const { get, socket } = server.router;
const motor = require('./motor');

const motorL = motor(0, 2);
const motorR = motor(4, 5);

server({}, [
  get('/', ctx => ctx.res.render('index')),
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
  socket('up', async ctx => {
    console.log('FORWARD');
    await Promise.all([
      motorL.forward(),
      motorR.forward()
    ]);
  }),
  socket('down', async ctx => {
    console.log('BACKWARD');
    await Promise.all([
      motorL.stop(),
      motorR.stop()
    ]);
  }),
]);
