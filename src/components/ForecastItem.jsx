import React from 'react';
import WeatherCode from './WeatherCode';

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

export default ForecastItem;
