import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import OneTab from '../../components/OneTab';

test('should render OneTab correctly', () => {
  const wrapper = shallow(<OneTab />);
  expect(toJSON(wrapper)).toMatchSnapshot();
});