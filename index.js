const server = require('server');
const { get, socket } = server.router;
var gpio = require("pi-gpio");

gpio.open(12, "output", function(err) {
  gpio.write(12, 1, function() {
    gpio.close(12);
  });
});

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
