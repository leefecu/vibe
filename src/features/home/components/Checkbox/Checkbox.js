import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import CheckMarkIcon from '../../../../assets/icons/Checkmark';

import './Checkbox.scss';

const Checkbox = ({ onChecked, id, label, name, checked, value }) => {
  const [ticked, setChecked] = useState(checked)

  const toggleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked)
    onChecked(e.target.checked)
  }

  useEffect(() => {
    if (checked !== ticked) {
      setChecked(checked);
    }
  }, [checked, ticked]);

  return (
    <div className={classNames('checkbox', { checked: ticked })}>
      <input
        checked={ticked}
        className="input"
        id={id}
        name={name}
        onChange={toggleCheckbox}
        type="checkbox"
        value={value}
      />
      <span className="check">
        {ticked && <CheckMarkIcon fill="white" width={12} height={9} />}
      </span>
      <label htmlFor={id}>{label}</label>
    </div>
  )
}

Checkbox.propTypes = {
  onChecked: PropTypes.func.isRequired,
  checked: PropTypes.bool,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

Checkbox.defaultProps = {
  checked: false,
}

export default Checkbox
