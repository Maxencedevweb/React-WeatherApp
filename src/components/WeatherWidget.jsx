import React, { useCallback, useEffect, useState } from 'react';
import TemperatureDisplay from './TemperatureDisplay';
import WeatherCode from './WeatherCode';
import ForecastItem from './ForecastItem';
import PropTypes from 'prop-types';
import useOpenMeteo from '../hooks/useOpenMeteo';

// Les coordonnées de La Rochelle ;-)
const getTempAvg = (data, size) => {
  const tempSum = data.slice(0, size).reduce((acc, curr) => acc + curr, 0);
  const tempAvg = Math.round(tempSum / size);
  return tempAvg;
};

const WeatherWidget = (props) => {
  const { latitude, longitude, cityName } = props;
  const [tabActive, setTabActive] = useState('day');
  const [meteoData, getMeteoData] = useOpenMeteo(latitude, longitude);

  return (
    <main className='weather-container'>
      <div className='weather-container-content'>
        <header className='weather-container-header'>
          <p className='location'>{cityName}</p>
          <button className='refresh-button' onClick={getMeteoData}>
            <img
              src='https://lpmiaw-react.napkid.dev/img/weather/refresh.png'
              alt='Refresh'
            />
          </button>
        </header>

        {meteoData && (
          <p className='date'>
            {meteoData.daily.time[0].split('-').reverse().join('/')}
          </p>
        )}
        <article className='today'>
          {meteoData ? (
            <WeatherCode code={parseInt(meteoData.daily.weathercode)} />
          ) : (
            'Pas de données'
          )}
          {meteoData ? (
            <TemperatureDisplay
              min={parseInt(meteoData.daily.temperature_2m_min)}
              max={parseInt(meteoData.daily.temperature_2m_max)}
              avg={getTempAvg(meteoData.hourly.temperature_2m, 24)}
            />
          ) : (
            'Pas de données'
          )}
        </article>
        <section className=''>
          <nav className='tabs'>
            <button
              className={'tab ' + (tabActive === 'day' ? 'tab--active' : '')}
              onClick={() => setTabActive('day')}
            >
              Journée
            </button>
            <button
              className={'tab ' + (tabActive === 'week' ? 'tab--active' : '')}
              onClick={() => setTabActive('week')}
            >
              Semaine
            </button>
          </nav>
          <ul className='forecast'>
            {meteoData
              ? tabActive === 'day'
                ? new Array(5)
                    .fill(null)
                    .map((_, index) => (
                      <ForecastItem
                        key={index}
                        label={4 * index + 6 + 'h'}
                        code={meteoData.hourly.weathercode[4 * index + 6]}
                        temperature={
                          meteoData.hourly.temperature_2m[4 * index + 6]
                        }
                      />
                    ))
                : new Array(5)
                    .fill(null)
                    .map((_, index) => (
                      <ForecastItem
                        key={index}
                        label={meteoData.daily.time[index + 1]
                          .slice(-5)
                          .split('-')
                          .reverse()
                          .join('/')}
                        code={meteoData.daily.weathercode[index + 1]}
                        temperature={
                          meteoData.daily.temperature_2m_max[index + 1]
                        }
                      />
                    ))
              : 'Pas de données'}
          </ul>
        </section>
        <footer className='weather-container-footer'>
          <p>
            {meteoData
              ? 'Mis à jour à ' + meteoData.timestamp
              : 'Pas de données'}
          </p>
        </footer>
      </div>
    </main>
  );
};
WeatherWidget.propTypes = {
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  cityName: PropTypes.string.isRequired,
};
export default WeatherWidget;
