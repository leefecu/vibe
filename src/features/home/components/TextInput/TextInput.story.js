import React from 'react';
import { action } from '@storybook/addon-actions';

import TextInput from './TextInput'

import * as styles from '../../../../styles/story';

export default {
  title: 'TextInput',
  component: TextInput,
};

export const Default = () => (
  <div style={styles.modalContainer}>
    <TextInput
      id="latitude"
      label="Latitude"
      name="latitude"
      placeholder="Latitude"
      onChange={action('change')}
    />
  </div>
)

export const WithValue = () => (
  <div style={styles.modalContainer}>
    <TextInput
      id="latitude"
      label="Latitude"
      name="latitude"
      placeholder="Latitude"
      value="-36.745393"
      onChange={action('change')}
    />
  </div>
);
