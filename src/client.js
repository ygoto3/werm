// @flow

'use strict';

import React from 'react';
import { render } from 'react-dom';

import './global.css';

import App from './components/pages/App';

render((
  <App />
), document.getElementById('root'));
