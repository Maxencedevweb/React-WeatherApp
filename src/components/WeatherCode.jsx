import React from 'react';
import PropTypes from 'prop-types';
import cloudsIcon from '../assets/img/clouds.png';
import fogIcon from '../assets/img/fog.png';
import heavyRainIcon from '../assets/img/heavy-rain.png';
import partialSunIcon from '../assets/img/partial-sun.png';
import slightSnowIcon from '../assets/img/slight-snow.png';
import heavySnowIcon from '../assets/img/heavy-snow.png';
import sunRainIcon from '../assets/img/sun-rain.png';
import sunshineIcon from '../assets/img/sunshine.png';
import thunderStormIcon from '../assets/img/thunderstorm.png';

const WeatherCode = (props) => {
  const { code } = props;
  const weatherIcons = {
    0: sunshineIcon,
    2: partialSunIcon,
    3: cloudsIcon,
    45: fogIcon,
    51: sunRainIcon,
    65: heavyRainIcon,
    71: slightSnowIcon,
    75: heavySnowIcon,
    80: heavyRainIcon,
    85: heavySnowIcon,
    95: thunderStormIcon,
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
