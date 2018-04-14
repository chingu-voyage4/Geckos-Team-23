import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import About from '../../components/About';

test('should render About correctly', () => {
  const wrapper = shallow(<About />);
  expect(toJSON(wrapper)).toMatchSnapshot();
});