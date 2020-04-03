import React from 'react';
import { action } from '@storybook/addon-actions';

import Checkbox from './Checkbox';

import * as styles from '../../../../styles/story';

export default {
  title: 'Components | Checkbox',
  component: Checkbox,
};

export const Default = () => (
  <div style={styles.containerWithBG}>
    <Checkbox
      checked={false}
      id="test1"
      name="test1"
      label="Screensaver"
      onChecked={action('checked')}
      value="screensaver"
    />
  </div>
);

export const Checked = () => (
  <div style={styles.containerWithBG}>
    <Checkbox
      checked={true}
      id="test1"
      name="test1"
      label="Screensaver"
      onChecked={action('checked')}
      value="screensaver"
    />
  </div>
);
