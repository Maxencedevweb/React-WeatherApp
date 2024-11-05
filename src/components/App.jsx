import React from 'react';
import { useState } from 'react';
import TemperatureDisplay from './TemperatureDisplay';
import WeatherCode from './WeatherCode';

const App = () => {
  const [meteoData, setMeteoData] = useState(null);

  const getMeteoData = () => {
    fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=46.1631&longitude=-1.1522&current=temperature_2m,weather_code&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=Europe%2FLondon'
    )
      .then((res) => res.json())
      .then((data) => console.log(data) + setMeteoData(data));
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
          <WeatherCode code={56} />
          <TemperatureDisplay min={15} max={20} avg={18} />
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
          <p>Mis à jour à 10:14:21</p>
        </footer>
      </div>
    </main>
  );
};

export default App;
