// @flow

import Io from 'socket.io';
import pty from 'pty.js';

export default class Socket {

  constructor(server: Server) {
    this.connect(server);
  }

  connect(server: Server) {
    const io = new Io(server);
    io.on('connect', socket => {
      const term = pty.spawn('sh', [], {
        name: 'xterm-256color',
        cols: 80,
        rows: 24,
      });

      term.on('data', d => socket.emit('data', d));
      socket.on('data', d => term.write(d));
      socket.on('resize', size => {
        const sz = JSON.parse(size);
        term.resize(sz.cols, sz.rows)
      });
      socket.on('disconnect', () => term.destroy());
    });
  }

}
