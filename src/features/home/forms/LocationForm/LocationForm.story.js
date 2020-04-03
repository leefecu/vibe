import React from 'react';
import { action } from '@storybook/addon-actions';

import LocationForm from './LocationForm';

import * as styles from '../../../../styles/story';

export default {
  title: 'Forms | Location Form',
  component: LocationForm,
};

export const EmptyForm = () => (
  <div style={styles.modalContainer}>
    <LocationForm />
  </div>
);
