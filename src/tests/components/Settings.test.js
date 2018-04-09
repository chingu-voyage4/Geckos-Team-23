import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import Settings from '../../components/Settings';

test('should render Settings correctly', () => {
  const wrapper = shallow(<Settings />);
  expect(toJSON(wrapper)).toMatchSnapshot();
});