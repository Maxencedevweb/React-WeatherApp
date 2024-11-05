import React from 'react';

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

export default TemperatureDisplay;
