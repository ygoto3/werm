// @flow

import express from 'express';
import type { $Application, $Request, $Response } from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';

import env from './config/environment';
import { auth } from './middlewares/auth.js';
import App from '../components/pages/App';

type StaticPaths = { [key: string]: string };

export type Params = {
  staticPaths: StaticPaths;
};

export default class Web {

  app: $Application;
  staticPaths: StaticPaths;

  constructor(app: $Application, params: Params) {
    this.staticPaths = params.staticPaths;

    this.app = app;
    this.middleware();
  }

  middleware(): void {
    this.mapStaticPaths(this.staticPaths);
    if (env.USER_NAME && env.USER_PASS) {
      this.app.use(auth({ name: env.USER_NAME, pass: env.USER_PASS }));
    }
    this.app.use(this.render);
  }

  render(req: $Request, res: $Response): void {
    const html = `
      <title>Werm</title>
      <link rel="stylesheet" href="/xterm.css" />
      <link rel="stylesheet" href="/static/app.css" />
      <div id="root">${renderToString(<App />)}</div>
      <script>
        window.addEventListener('load', () => {
          if (
            !('serviceWorker' in navigator) ||
            !(
              window.location.protocol === 'https:' ||
              window.location.hostname === 'localhost' ||
              window.location.hostname === '[::1]'
            )
          ) return;
          navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('serviceWorker registered'))
            .catch(err => console.log('serviceWorker failed to be registered', err));
        });
      </script>
      <script src="/static/client.js"></script>
    `;
    res.send(html);
  }

  mapStaticPaths(staticPaths: StaticPaths): void {
    for (let path in staticPaths) {
      this.app.use(path, express.static(staticPaths[path]));
    }
  }

}
