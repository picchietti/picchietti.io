import React from 'react';
import { shallow } from 'enzyme';

describe('unit tests should have working', () => {
  test('jest', () => {
    expect(true).toBeTruthy();
  });
  test('enzyme', () => {
    const Component = () => (
      <span>Enzyme</span>
    );
    const renderedComponent = shallow(<Component />);
    expect(renderedComponent.text()).toBe('Enzyme');
  });
});
