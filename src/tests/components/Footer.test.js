import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import Footer from '../../components/Footer';

test('should render Footer correctly', () => {
  const wrapper = shallow(<Footer />);
  expect(toJSON(wrapper)).toMatchSnapshot();
});