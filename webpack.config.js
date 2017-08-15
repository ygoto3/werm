'use strict';

const wpconf = require('./config/webpack');
const build = require('./config/build');

module.exports = wpconf({ entry: build.js.src });
