import React from 'react';

import LocationForm from './LocationForm';

import * as styles from '../../../../styles/story';

import { Locations } from '../../../../__fixtures__/data';

export default {
  title: 'Forms | Location Form',
  component: LocationForm,
};

export const EmptyForm = () => (
  <div style={styles.modalContainer}>
    <LocationForm
      latitude={-36.745393}
      longitude={174.697275}
      useLatLng={true}
      locationOptions={Locations}
    />
  </div>
);
