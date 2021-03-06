import React from 'react';
import { action } from '@storybook/addon-actions';

import TreeSelector from './TreeSelector';

import * as styles from '../../../../styles/story';

import { Locations } from '../../../../__fixtures__/data';

export default {
  title: 'Components | Tree Selector',
  component: TreeSelector,
};

export const Default = () => (
  <div style={styles.modalContainer}>
    <TreeSelector
      options={Locations}
      onSelected={action('selected')}
      onClearAll={action('clear all')}
      onSelectAll={action('select all')}
    />
  </div>
);
