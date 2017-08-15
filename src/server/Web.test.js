/*global it, describe, expect */
// @flow

import request from 'supertest';
import express from 'express';
import cheerio from 'cheerio';

import Web from './Web';

const app = express();
new Web(app, {
  staticPaths: {},
});

describe('Web', () => {
  it('should respond with correct HTML', () => {
    return request(app).get('/')
      .expect(200)
      .then(res => {
        const $ = cheerio.load(res.text);
        expect($('title').text()).toBe('Werm');
        expect($('link[href="/xterm.css"]').length).toBe(1);
        expect($('link[href="/static/app.css"]').length).toBe(1);
        expect($('script[src="/static/client.js"]').length).toBe(1);
      });
  });
});
