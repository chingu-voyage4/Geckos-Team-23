import React from 'react';
import { shallow } from 'enzyme';
import Categories from '../../components/Categories';

test('should render Category list correctly', () => {
  const newTabCategory =  [ { categoryKey: 1, categoryName: 'React' },
                            { categoryKey: 2, categoryName: 'JavaScript' }
                          ];
  const wrapper = shallow(<Categories newTabCategory={newTabCategory}/>);
  expect(wrapper).toMatchSnapshot();
});

test('should render Category list with empty message', () => {
  const newTabCategory =  [];
  const wrapper = shallow(<Categories newTabCategory={newTabCategory}/>)
  expect(wrapper).toMatchSnapshot();
});

test('should render sort-arrow with 3 or more categories', () => {
  const newTabCategory =  [ { categoryKey: 1, categoryName: 'React' },
                            { categoryKey: 2, categoryName: 'JavaScript' },
                            { categoryKey: 2, categoryName: 'CSS' }
                          ];
  const wrapper = shallow(<Categories newTabCategory={newTabCategory}/>)
  expect(wrapper).toMatchSnapshot();
});