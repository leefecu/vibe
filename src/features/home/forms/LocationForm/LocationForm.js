import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import reduce from 'lodash/reduce';
import map from 'lodash/map';
import Switch from 'react-switch';

import TextInput from '../../components/TextInput/TextInput';
import TreeSelector, { TOptions } from '../../components/TreeSelector/TreeSelector';

import './LocationForm.scss';

const validationSchema = yup.object().shape({
  latitude: yup.number().required('Please enter latitude'),
  longitude: yup.number().required('Please enter latitude'),
  useLatLng: yup.bool(),
  selectedLocations: yup.string().required('Please select at least one location'),
});

const transformLocationOptions = (locationOptions, clearAll = false, selectAll = false) =>
  reduce(
    locationOptions,
    (locations, option) => ({
      ...locations,
      [option.id]: {
        ...option,
        selected: clearAll ? false : selectAll ? true : option.selected,
        children: reduce(
          option.children,
          (childLocations, child) => ({
            ...childLocations,
            [child.id]: {
              ...child,
              selected: clearAll ? false : selectAll ? true : child.selected,
            },
          }),
          {},
        ),
      },
    }),
    {},
  );

const getSelectedLocations = locations => {
  const selectedLocations = reduce(
    locations,
    (locationArray, location) => {
      const newLocationArray = [...locationArray];
      if (location.selected) {
        newLocationArray.push(location.name);
      } else if (Object.keys(location.children).length > 0) {
        map(location.children, child => {
          if (child.selected) {
            newLocationArray.push(child.name);
          }
        });
      }
      return newLocationArray;
    },
    [],
  );
  return selectedLocations.join(', ');
};

const LocationForm = ({ latitude, longitude, useLatLng, locationOptions }) => {
  const [locations, setLocations] = useState(transformLocationOptions(locationOptions));
  const [saving, setSaving] = useState(false);
  const [selectedLocations, setSelectedLocations] = useState(getSelectedLocations(locations));
  const [useLatLngOn, setUseLatLngOn] = useState(useLatLng);
  const defaultValues = {
    latitude,
    longitude,
    useLatLng,
    selectedLocations: getSelectedLocations(locations),
  };
  const { register, handleSubmit } = useForm({ defaultValues, validationSchema });
  const onSubmit = data => {
    setSaving(true);
    // This is where submit API needs to be hooked up
    console.log(data);
    setSaving(false);
  };

  const handleLocationSelect = (option, selected) => {
    if (option.parentId === 0) {
      setLocations({
        ...locations,
        [option.id]: {
          ...locations[option.id],
          selected,
        },
      });
    } else {
      setLocations({
        ...locations,
        [option.parentId]: {
          ...locations[option.parentId],
          children: {
            ...locations[option.parentId].children,
            [option.id]: {
              ...locations[option.parentId].children[option.id],
              selected,
            },
          },
        },
      });
    }
  };

  const handleClearAllLocation = () => {
    setLocations(transformLocationOptions(locationOptions, true, false))
  };

  const handleSelectAllLocation = () => {
    setLocations(transformLocationOptions(locationOptions, false, true))
  };

  useEffect(() => {
    setSelectedLocations(getSelectedLocations(locations));
  }, [locations]);

  return (
    <form className="location-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-row two-column-row">
        <div className="toggle-row">
          <Switch
            className="toggle-switch"
            onChange={setUseLatLngOn}
            checked={useLatLngOn}
            checkedIcon={false}
            uncheckedIcon={false}
            width={30}
            height={15}
          />
          Use Latitude / Longitude
        </div>
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
        <div className="label">Locations</div>
        <div className="multi-line">{selectedLocations}</div>
      </div>

      <div className="form-row">
        <TreeSelector
          options={locations}
          onSelected={handleLocationSelect}
          onClearAll={handleClearAllLocation}
          onSelectAll={handleSelectAllLocation}
        />
      </div>
    </form>
  );
};

LocationForm.propTypes = {
  latitude: PropTypes.number,
  longitude: PropTypes.number,
  useLatLng: PropTypes.bool,
  locationOptions: TOptions,
};

LocationForm.defaultProps = {
  latitude: '',
  longitude: '',
  useLatLng: false,
  locationOptions: [],
};

export default LocationForm;
