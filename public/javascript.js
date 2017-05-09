const socket = io();

const joystick = document.querySelector('.joystick');
const position = document.querySelector('.position');

let last = new Date();
let pending = false;
const event = name => {
  if (new Date() - last < 500) {
    pending = name;
    setTimeout(() => event(pending), 500);
    return;
  }
  last = new Date();
  console.log(name);
  position.className = 'position ' + name;
  return socket.emit(name);
};

Mousetrap.bind('left', e => event('left'));
Mousetrap.bind('right', e => event('right'));
Mousetrap.bind('up', e => event('forward'));
Mousetrap.bind('down', e => event('backward'));

// Render the images in the <img> element
const img = document.querySelector('img');
socket.emit('init');
socket.on('frame', e => {
  if (e.image) {
    img.src = 'data:image/jpeg;base64,' + e.buffer;
    // ctx.drawImage(img, 0, 0);
  }
});


const controller = (sel, cb) => {
  let start = false;

  const begin = e => {
    joystick.classList.remove('stop');
    const client = e.clientX ? e : e.touches[0];
    start = { x: client.clientX, y: client.clientY }
  };
  joystick.addEventListener('mousedown', begin);
  joystick.addEventListener('touchstart', begin);

  const end = e => {
    joystick.classList.add('stop');
    joystick.setAttribute('style', '');
    start = false;
    cb({ x: 0, y: 0 });
  };
  document.addEventListener('mouseup', end);
  document.addEventListener('touchend', end);

  const control = e => {
    // Mousemove WHILE pressing it (not any other time)
    if (!start) return;

    const client = e.clientX ? e : e.touches[0];
    const diff = {
      x: client.clientX - start.x,
      y: start.y - client.clientY
    };
    const divisor = 2;
    //joystick.style.marginLeft = diff.x;
    joystick.setAttribute('style', 'margin-left: ' + (diff.x / divisor) + 'px; margin-top: ' + (-diff.y / divisor) + 'px;');
    cb(diff);
  };
  document.addEventListener('mousemove', control);
  document.addEventListener('touchmove', control);
};

controller('.joystick', diff => {

  // If similar to 0, it means stop
  if (Math.abs(diff.x) < 20 && Math.abs(diff.y) < 20) {
    return event('stop');
  }

  if (Math.abs(diff.x) > Math.abs(diff.y)) {
    return event(diff.x > 0 ? 'right' : 'left');
  }

  return event(diff.y > 0 ? 'forward' : 'backward');
});
