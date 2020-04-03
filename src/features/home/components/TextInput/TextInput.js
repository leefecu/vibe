import React from 'react';
import PropTypes from 'prop-types';

import './TextInput.scss';

export interface Props {
  defaultValue?: string;
  id: string;
  label?: string;
  name: string;
  placeholder?: string;
  type?: string;
  onChange?: (e: ChangeEvent) => void;
}

const TextInput = ({
  id,
  label,
  name,
  placeholder,
  type,
  defaultValue,
  required,
  onChange,
  ...rest
}) => (
  <div className="text-input">
    {label && <div className="label">{label}</div>}
    <input
      className="input"
      id={id}
      name={id}
      placeholder={placeholder || ''}
      type={type}
      onChange={onChange}
      defaultValue={defaultValue}
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
};

TextInput.defaultProps = {
  label: '',
  placeholder: '',
  type: 'text',
};

export default TextInput;
