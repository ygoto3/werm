// @flow

import React, { Component } from 'react';
import Term from 'xterm';
import type { Size, $Term } from 'xterm';

import styles from './styles.css';

export type Data = {
  body: string;
  update: number;
};

export type TerminalProps = {
  className: string;
  data?: Data;
  fitUpdate?: number;
  onData?: Function;
  onResize?: Function;
};

export class Terminal extends Component<*,TerminalProps,*> {

  terminal: HTMLDivElement;

  term: $Term;

  dataUpdate: number;

  fitUpdate: number;

  componentDidMount() {
    Term.loadAddon('fit');
    const term = new Term();
    this.term = term;

    term.open(this.terminal, true);
    term.on('data', d => { this.onData(d); });
    term.on('resize', size => { this.onResize(size); });
    term.textarea.addEventListener('blur', (ev: Event) => {
      ev.preventDefault();
      term.textarea.focus();
    });

    window.addEventListener('resize', () => term.fit());
  }

  componentWillReceiveProps({ data, fitUpdate }: TerminalProps) {
    this.write(data);
    this.fit(fitUpdate);
  }

  render() {
    const { className } = this.props;
    return (
      <div ref={t => this.terminal = t}
           className={`${className} ${styles.container}`} />
    );
  }

  fit(fitUpdate: ?number) {
    if (!fitUpdate || this.fitUpdate === fitUpdate) return;
    this.fitUpdate = fitUpdate;
    this.term.fit();
  }

  write(data: ?Data) {
    if (!data || this.dataUpdate === data.update) return;
    this.term.write(data.body);
  }

  onData(data: string): void {
    if (!this.props.onData) return;
    this.props.onData(data);
  }

  onResize(size: Size): void {
    if (!this.props.onResize) return;
    this.props.onResize(size);
  }

}

Object.assign(Terminal, {
  defaultProps: {
    className: '',
  },
});
