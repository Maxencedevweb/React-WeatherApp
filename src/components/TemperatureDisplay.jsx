import React from 'react';
import PropTypes from 'prop-types';

const TemperatureDisplay = (props) => {
  const { min, max, avg } = props;
  return (
    <div className='temperature-display'>
      <p className='temperature-display-avg'>{avg}</p>
      <div className='temperature-display-row'>
        <p>{max}</p>
        <p className='temperature-display-row-item--min'>{min}</p>
      </div>
    </div>
  );
};

TemperatureDisplay.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  avg: PropTypes.number.isRequired,
};

export default TemperatureDisplay;
