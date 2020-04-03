import React from 'react';
import PropTypes from 'prop-types';

import './TextInput.scss';

const TextInput = ({
  id,
  label,
  name,
  placeholder,
  type,
  defaultValue,
  onChange,
  register,
  ...rest
}) => (
  <div className="text-input">
    {label && <label className="label">{label}</label>}
    <input
      className="input"
      id={id}
      name={id}
      placeholder={placeholder || ''}
      type={type}
      onChange={onChange}
      defaultValue={defaultValue}
      ref={register || null}
      {...rest}
    />
  </div>
);

TextInput.propTypes = {
  defaultValue: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
  register: PropTypes.any,
};

TextInput.defaultProps = {
  label: '',
  placeholder: '',
  type: 'text',
};

export default TextInput;
