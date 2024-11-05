import React, { useEffect } from 'react';
import { useState } from 'react';
import TemperatureDisplay from './TemperatureDisplay';
import WeatherCode from './WeatherCode';

const baseUrl = 'https://api.open-meteo.com/v1/forecast';
const timezone = 'Europe/London';
const dailyVars = ['weathercode', 'temperature_2m_max', 'temperature_2m_min'];

const hourlyVars = ['temperature_2m', 'weathercode'];

// Les coordonnées de La Rochelle ;-)
const latitude = 46.1592;
const longitude = -1.171;

const App = () => {
  const [meteoData, setMeteoData] = useState(null);

  const getMeteoData = () => {
    fetch(
      `${baseUrl}?latitude=${latitude}&longitude=${longitude}&hourly=${hourlyVars.join(
        ','
      )}&daily=${dailyVars.join(',')}&timezone=${timezone}`
    )
      .then((res) => res.json())
      .then((data) => setMeteoData({ ...data, timestamp: Date.now() }));
    console.log(meteoData);
  };
  useEffect(() => {
    getMeteoData();
    const timer = setInterval(getMeteoData, 100000);
    return () => clearInterval(timer);
  }, []);

  const getTempAvg = (data) => {
    const tempSum = data.slice(0, 24).reduce((acc, curr) => acc + curr, 0);
    const tempAvg = Math.round(tempSum / 24);
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
          <p className='location'>La Rochelle</p>
          <button className='refresh-button' onClick={getMeteoData}>
            <img
              src='https://lpmiaw-react.napkid.dev/img/weather/refresh.png'
              alt='Refresh'
            />
          </button>
        </header>
        <p className='date'>10/20/2021</p>
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
              avg={getTempAvg(meteoData.hourly.temperature_2m)}
            />
          ) : (
            'Pas de données'
          )}
        </article>
        <section className='hidden'>
          <nav className='tabs'>
            <button className='tab tab--active'>Journée</button>
            <button className='tab'>Semaine</button>
          </nav>
          <ul className='forecast'>
            <li className='forecast-item'>
              <p>20/10</p>
              <img
                src='https://lpmiaw-react.napkid.dev/img/weather/sunshine.png'
                alt='sunshine'
                className='weathercode-img'
              />
              <p className='forecast-item-temp'>21</p>
            </li>
            <li className='forecast-item'>
              <p>21/10</p>
              <img
                src='https://lpmiaw-react.napkid.dev/img/weather/sunshine.png'
                alt='sunshine'
                className='weathercode-img'
              />
              <p className='forecast-item-temp'>21</p>
            </li>
            <li className='forecast-item'>
              <p>22/10</p>
              <img
                src='https://lpmiaw-react.napkid.dev/img/weather/sunshine.png'
                alt='sunshine'
                className='weathercode-img'
              />
              <p className='forecast-item-temp'>21</p>
            </li>
            <li className='forecast-item'>
              <p>23/10</p>
              <img
                src='https://lpmiaw-react.napkid.dev/img/weather/sunshine.png'
                alt='sunshine'
                className='weathercode-img'
              />
              <p className='forecast-item-temp'>21</p>
            </li>
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

export default App;
