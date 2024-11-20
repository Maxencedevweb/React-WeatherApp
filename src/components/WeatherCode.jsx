import React from 'react';
import PropTypes from 'prop-types';

const WeatherCode = (props) => {
  const { code } = props;
  const weatherIcons = {
    0: '/assets/img/sunshine.png',
    2: '/assets/img/partial-sun.png',
    3: '/assets/img/clouds.png',
    45: '/assets/img/fog.png',
    51: '/assets/img/sun-rain.png',
    65: '/assets/img/heavy-rain.png',
    71: '/assets/img/slight-snow.png',
    75: '/assets/img/heavy-snow.png',
    80: '/assets/img/heavy-rain.png',
    85: '/assets/img/heavy-snow.png',
    95: '/assets/img/thunderstorm.png',
  };
  const determineIcon = (code) => {
    const icon = Object.keys(weatherIcons)
      .sort((a, b) => b - a)
      .find((key) => key <= code);

    return weatherIcons[icon];
  };

  return (
    <img
      src={determineIcon(code)}
      className='weathercode-img'
      alt='Logo partiellement nuageux'
    />
  );
};

WeatherCode.propTypes = {
  code: PropTypes.number.isRequired,
};

export default WeatherCode;
