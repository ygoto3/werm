// @flow

'use strict';

import path from 'path';
import http from 'http';
import express from 'express';

import debug from './server/utils/debug';
import Web from './server/Web';
import Term from './server/Term';

const logger = debug('app');
const app = express();
const port = 5000;

new Web(app, {
  staticPaths: {
    '/sw.js': path.resolve(__dirname, 'static/sw.js'),
    '/static': path.resolve(__dirname, 'static'),
    '/xterm.css': path.resolve(__dirname, '../node_modules/xterm/dist/xterm.css'),
  }
});

const server = http.createServer(app);

new Term(server); 
function onListening(): void {
  logger(`Listening on ${port}`);
}

server.listen(port);
server.on('listening', onListening);
