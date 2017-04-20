const socket = io();

dom.class.goup.on.click = e => socket.emit('up');
dom.class.goleft.on.click = e => socket.emit('left');
dom.class.goright.on.click = e => socket.emit('right');
dom.class.godown.on.click = e => socket.emit('down');

Mousetrap.bind('left', e => socket.emit('left'));
Mousetrap.bind('right', e => socket.emit('right'));
Mousetrap.bind('up', e => socket.emit('up'));
Mousetrap.bind('down', e => socket.emit('down'));
