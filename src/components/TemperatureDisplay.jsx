import React from 'react';
import PropTypes from 'prop-types';

class TemperatureDisplay extends React.Component {
  render() {
    return (
      <div className='temperature-display'>
        <p className='temperature-display-avg'>{this.props.avg}</p>
        <div className='temperature-display-row'>
          <p>{this.props.max}</p>
          <p className='temperature-display-row-item--min'>{this.props.min}</p>
        </div>
      </div>
    );
  }
}

TemperatureDisplay.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  avg: PropTypes.number.isRequired,
};

export default TemperatureDisplay;
