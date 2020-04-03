import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames'
import map from 'lodash/map'
import reduce from 'lodash/reduce'

import Checkbox from '../Checkbox/Checkbox'

import './TreeSelector.scss';

export const TOptions = PropTypes.arrayOf(PropTypes.shape({
  id: PropTypes.number,
  parentId: PropTypes.number,
  name: PropTypes.string,
  selected: PropTypes.bool,
  children: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    parentId: PropTypes.number,
    name: PropTypes.string,
    selected: PropTypes.bool,
  })),
}));

const getTreeExpanded = (options) => {
  return reduce(options, (expanded, option) => {
    if (Object.keys(option.children).length > 0) {
      return { ...expanded, [option.id]: true }
    }
    return expanded
  }, {})
}

const ToggleButton = ({ open, onToggle }) => (
  <div className="toggle-button" onClick={onToggle}>
    {open ? '-' : '+'}
  </div>
);

const TreeSelector = ({ options, onSelected, onSelectAll, onClearAll }) => {
  const [treeExpanded, setTreeExpanded] = useState(getTreeExpanded(options));

  const handleToggle = optionId => {
    setTreeExpanded({
      ...treeExpanded,
      [optionId]: !treeExpanded[optionId],
    });
  };

  return (
    <div className="tree-selector">
      <div className="control-row">
        <div className="control-column select-button" onClick={onSelectAll}>
          Select all
        </div>
        <div className="control-column clear-button" onClick={onClearAll}>
          Clear all
        </div>
      </div>
      {map(options, option => (
        <Fragment key={option.id}>
          <div className="tree-parent-row">
            {Object.keys(option.children).length > 0 && (
              <ToggleButton
                open={treeExpanded[option.id]}
                onToggle={() => handleToggle(option.id)}
              />
            )}
            <Checkbox
              onChecked={checked => onSelected(option, checked)}
              checked={option.selected}
              id={option.id + ''}
              name={option.id + ''}
              label={option.name}
              value={option.id + ''}
            />
          </div>
          {Object.keys(option.children).length > 0 && (
            <div className={classNames('tree-children', { expand: treeExpanded[option.id] })}>
              {map(option.children, child => (
                <div className="tree-child-row" key={`${option.id}-${child.id}`}>
                  <Checkbox
                    onChecked={checked => onSelected(child, checked)}
                    checked={child.selected}
                    id={child.id + ''}
                    name={child.id + ''}
                    label={child.name}
                    value={child.id + ''}
                  />
                </div>
              ))}
            </div>
          )}
        </Fragment>
      ))}
    </div>
  );
};

TreeSelector.propTypes = {
  options: TOptions,
  onSelected: PropTypes.func.isRequired,
  onSelectAll: PropTypes.func.isRequired,
  onClearAll: PropTypes.func.isRequired,
};

TreeSelector.defaultProps = {
  options: []
};

export default TreeSelector;
