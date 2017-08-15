// @flow

import React, { Component } from 'react';
import io from 'socket.io-client';
import type { SocketIOClient } from 'socket.io-client';
import type { Size } from 'xterm';

import { App as Template } from '../../templates/App';
import type { TermData } from '../../templates/App';

type AppState = {
  termData?: TermData;
  termFitUpdate?: number;
};

export default class App extends Component<*,*,AppState> {

  state: AppState;

  termDataUpdate: number;
  termFitUpdate: number;
  socket: SocketIOClient;

  onTermData: (data: string) => void;
  onTermResize: Function;

  constructor() {
    super();
    this.state = {};
    this.termDataUpdate = 0;
    this.termFitUpdate = 0;
    this.onTermData = this.onTermData.bind(this);
    this.onTermResize = this.onTermResize.bind(this);
  }

  componentDidMount() {
    const socket = io();
    this.socket = socket;
    socket.on('data', d => {
      const data = { body: d, update: ++this.termDataUpdate };
      this.setState({ termData: data })
    });
    socket.on('connect', () => this.setState({ termFitUpdate: ++this.termFitUpdate }));
  }

  render() {
    const { onTermData, onTermResize } = this;
    const { termData, termFitUpdate } = this.state;
    return (
      <Template termData={termData}
                termFitUpdate={termFitUpdate}
                onTermData={onTermData}
                onTermResize={onTermResize} />
    );
  }

  onTermData(data: string): void {
    this.socket.emit('data', data);
  }

  onTermResize(size: Size) {
    const sz = `{ "cols": ${size.cols}, "rows": ${size.rows} }`;
    this.socket.emit('resize', sz);
  }

}
