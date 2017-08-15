// @flow

import React, { Component } from 'react';

import { Terminal } from '../../atoms/Terminal';
import type { Data } from '../../atoms/Terminal';

import styles from './styles.css';

export type TermData = Data;

export type AppProps = {
  termData?: TermData;
  termFitUpdate?: number;
  onTermData?: Function;
  onTermResize?: Function;
};

export class App extends Component<*,AppProps,*> {
  render() {
    const { termData, termFitUpdate, onTermData, onTermResize } = this.props;
    return (
      <Terminal className={styles.container}
                data={termData}
                fitUpdate={termFitUpdate}
                onData={onTermData}
                onResize={onTermResize} />
    );
  }
}
