import React from 'react';
import { shallow } from 'enzyme';
import TabGroup from '../../components/TabGroup';

test('should render TabGroup list correctly', () => {
  const match={params:{categoryName:'React'}};
  const wrapper = shallow(<TabGroup match={match}/>);
  expect(wrapper).toMatchSnapshot();
});

test('should render TabGroup list with empty message', () => {
  const match={params:{categoryName:'hello'}};
  const wrapper = shallow(<TabGroup match={match}/>);
  expect(wrapper).toMatchSnapshot();
});

