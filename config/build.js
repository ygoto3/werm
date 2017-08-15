'use strict';

const path = require('path');

const projDir = path.resolve(__dirname, '..');

const src = `${ projDir }/src`;
const dest = `${ projDir }/build/static`;

module.exports = {

  production: process.env.NODE_ENV === 'production',

  projDir,

  src,

  js: {
    src: {
      client: `${ src }/client.js`,
      sw: `${ src }/sw.js`,
    },
    output: {
      path: dest,
      filename: '[name].js',
      sourceMapFilename: '[name].js.map'
    },
    testSrc: `${ src }/**/*.ts`
  },

  svg: {
    src: `${src}/assets`,
    output: `${dest}/assets`
  }

};
