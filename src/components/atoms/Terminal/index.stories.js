import React from 'react';

import { Terminal } from './index';

export default function (stories) {
  return stories
  .add('normal', () => (
    <Terminal />
  ));
}
