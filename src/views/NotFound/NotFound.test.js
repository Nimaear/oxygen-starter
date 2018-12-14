import * as React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import NotFound from './NotFound';

describe('NotFound', () => {
  const page = mount(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>
  );

  it('should have the proper text', () => {
    expect(page.find('h1').text()).toEqual('Not found');
  });

  it('should have a button', () => {
    expect(page.find('button').exists());
  });
});
