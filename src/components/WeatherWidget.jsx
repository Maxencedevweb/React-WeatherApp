import React, { useCallback, useEffect, useState } from 'react';
import TemperatureDisplay from './TemperatureDisplay';
import WeatherCode from './WeatherCode';
import ForecastItem from './ForecastItem';
import PropTypes from 'prop-types';

const baseUrl = 'https://api.open-meteo.com/v1/forecast';
const timezone = 'Europe/London';
const dailyVars = ['weathercode', 'temperature_2m_max', 'temperature_2m_min'];

const hourlyVars = ['temperature_2m', 'weathercode'];

// Les coordonnées de La Rochelle ;-)

const WeatherWidget = (props) => {
  const { latitude, longitude, cityName } = props;
  const [meteoData, setMeteoData] = useState(null);
  const [tabActive, setTabActive] = useState('day');

  const getMeteoData = useCallback(() => {
    fetch(
      `${baseUrl}?latitude=${latitude}&longitude=${longitude}&hourly=${hourlyVars.join(
        ','
      )}&daily=${dailyVars.join(',')}&timezone=${timezone}`
    )
      .then((res) => res.json())
      .then((data) => setMeteoData({ ...data, timestamp: Date.now() }));
    console.log(meteoData);
  }, [latitude, longitude]);

  useEffect(() => {
    getMeteoData();
    const timer = setInterval(getMeteoData, 100000);
    return () => clearInterval(timer);
  }, [getMeteoData]);

  const getTempAvg = (data, size) => {
    const tempSum = data.slice(0, size).reduce((acc, curr) => acc + curr, 0);
    const tempAvg = Math.round(tempSum / size);
    return tempAvg;
  };

  const timestampToHours = (timestamp) => {
    const date = new Date(timestamp);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

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
              ? 'Mis à jour à ' + timestampToHours(meteoData.timestamp)
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
