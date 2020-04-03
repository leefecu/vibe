import React from 'react';
import { action } from '@storybook/addon-actions';

import TextInput from './TextInput'

import * as styles from '../../../../styles/story';

const mockRegister = '';

export default {
  title: 'Components | Text Input',
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
      register={mockRegister}
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
      defaultValue="-36.745393"
      onChange={action('change')}
      register={mockRegister}
    />
  </div>
);
