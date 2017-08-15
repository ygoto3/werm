// @flow

import debug from 'debug';

export default function d(namespace: string) {
  return debug(`artwork:${namespace}`);
}
