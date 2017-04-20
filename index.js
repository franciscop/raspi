const server = require('server');
const { get, socket } = server.router;
const gpio = require('./gpio');
const motor = require('./motor');

const motorL = motor(0, 2);
const motorR = motor(4, 5);

server({}, [
  get('/', ctx => ctx.res.render('index')),
  socket('left', async ctx => {
    console.log('LEFT');
    await motorL.forward();
  }),
  socket('right', ctx => {
    console.log('RIGHT');
  }),
  socket('up', ctx => {
    console.log('UP');
  }),
  socket('down', ctx => {
    console.log('DOWN');
  }),
]);
