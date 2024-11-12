import React from 'react';
import WeatherCode from './WeatherCode';
import PropTypes from 'prop-types';

const ForecastItem = (props) => {
  const { label, code, temperature } = props;
  return (
    <li className='forecast-item'>
      <p>{label}</p>
      <WeatherCode code={code} />
      <p className='forecast-item-temp'>{temperature}</p>
    </li>
  );
};

ForecastItem.propTypes = {
  label: PropTypes.string.isRequired,
  code: PropTypes.number.isRequired,
  temperature: PropTypes.number.isRequired,
};

export default ForecastItem;
