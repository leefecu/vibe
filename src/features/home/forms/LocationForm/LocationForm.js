import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import TextInput from '../../components/TextInput/TextInput';

import './LocationForm.scss';

const validationSchema = yup.object().shape({
  latitude: yup.number().required('Please enter latitude'),
  longitude: yup.number().required('Please enter latitude'),
  useLatLng: yup.bool(),
  locations: yup.string().required('Please select at least one location'),
});

const LocationForm = ({ latitude, longitude, useLatLng, locations }) => {
  const defaultValues = {
    latitude,
    longitude,
    useLatLng,
    locations: '',
  }
  const { register, handleSubmit } = useForm({ defaultValues, validationSchema });
  const onSubmit = data => {
    setSaving(true)
    console.log(data);
    setSaving(false)
  };

  const [saving, setSaving] = useState(false)
  return (
    <form className="location-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-row two-column-row">
        <div>Use Latitude / Longitude</div>
        <div>{saving && 'Saving...'}</div>
      </div>

      <div className="form-row two-column-row">
        <div className="form-column">
          <TextInput id="latitude" name="latitude" label="Latitude" register={register} />
        </div>
        <div className="form-column">
          <TextInput id="longitude" name="longitude" label="Longitude" register={register} />
        </div>
      </div>

      <div className="form-row">
        <label>Locations</label>
        <div className="multi-line"></div>
      </div>
    </form>
  );
}

LocationForm.propTypes = {
  latitude: PropTypes.string,
  longitude: PropTypes.string,
  useLatLng: PropTypes.bool,
  locations: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    parentId: PropTypes.number,
    name: PropTypes.string,
    selected: PropTypes.bool,
    children: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      parentId: PropTypes.number,
      name: PropTypes.string,
      selected: PropTypes.bool,
      })),
  })),
};

LocationForm.defaultProps = {
  latitude: '',
  longitude: '',
  useLatLng: false,
  location: [],
};

export default LocationForm