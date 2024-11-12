import React, { useState } from 'react';
import WeatherWidget from './WeatherWidget';
import Search from './Search';

const App = () => {
  const [dataCity, setDataCity] = useState();
  const coords = {
    long: dataCity ? dataCity.centre.coordinates[0] : null,
    lat: dataCity ? dataCity.centre.coordinates[1] : null,
  };
  console.log('long :', coords.long, 'lat :', coords.lat);

  return (
    <div className='weather-container'>
      <div className='searchbar-container'>
        <Search
          defaultInputValue='La Rochelle'
          onSelect={(data) => setDataCity(data) + console.log(data)}
        />
      </div>
      <div className='weather-widget-container'>
        {dataCity ? (
          <WeatherWidget
            longitude={coords.long}
            latitude={coords.lat}
            cityName={dataCity.nom}
          />
        ) : (
          <WeatherWidget
            longitude={-1}
            latitude={47}
            cityName={'La Rochelle'}
          />
        )}
      </div>
    </div>
  );
};

export default App;
