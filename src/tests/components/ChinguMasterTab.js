import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import ChinguMasterTab from '../../components/ChinguMasterTab';
import * as ls from '../../fromRepl';

test('should render OneTab correctly', () => {
  const wrapper = shallow(<ChinguMasterTab />);
  expect(toJSON(wrapper)).toMatchSnapshot();
});