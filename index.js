const server = require('server');
const { get, socket } = server.router;

server({}, [
  get('/', ctx => ctx.res.render('index')),
  socket('left', ctx => {
    console.log('LEFT');
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
