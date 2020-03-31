import React from 'react';
import { shallow } from 'enzyme';
import { DefaultPage } from '../../../src/features/playlists/DefaultPage';

describe('playlists/DefaultPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      playlists: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DefaultPage {...props} />
    );

    expect(
      renderedComponent.find('.playlists-default-page').length
    ).toBe(1);
  });
});
