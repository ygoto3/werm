/*global it, describe, expect */
// @flow

import React from 'react';
import { shallow } from 'enzyme';

import { Terminal } from './index';

describe('Terminal', () => {
  it('should render with appropriate props', () => {
    const wrapper = shallow(<Terminal className="hoge" />);
    const $div = wrapper.find('div');
    expect($div).toHaveLength(1);
    expect($div.props().className).toEqual(expect.stringContaining('hoge'));
  });
});
