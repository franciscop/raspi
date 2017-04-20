const server = require('server');
const { get, socket } = server.router;
const gpio = require('./gpio');

const timer = number => new Promise((resolve, reject) => {
  setTimeout(() => resolve(), number);
});

const led = gpio(12);

server({}, [
  get('/', ctx => ctx.res.render('index')),
  socket('left', async ctx => {
    await led.on();
    await timer(1000);
    await led.off();
    console.log('LEFT', out);
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
