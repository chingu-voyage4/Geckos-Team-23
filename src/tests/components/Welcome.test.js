import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import Welcome from '../../components/Welcome';

test('should render Welcome correctly', () => {
  const wrapper = shallow(<Welcome />);
  expect(toJSON(wrapper)).toMatchSnapshot();
});