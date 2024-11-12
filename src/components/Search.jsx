import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const Search = (props) => {
  const { defaultInputValue, onSelect } = props;
  const [inputValue, setInputValue] = useState('');
  const [searchResults, setSearchResults] = useState('');
  const wantedValue = ['centre', 'codeDepartement'];

  const getCityData = useCallback(() => {
    fetch(
      `https://geo.api.gouv.fr/communes?nom=${inputValue}&fields=${wantedValue.join(
        ','
      )}&boost=population&limit=5`
    )
      .then((res) => res.json())
      .then((data) => setSearchResults(data));
  }, [inputValue]);

  useEffect(() => {
    inputValue.length >= 3 && getCityData();
  }, [getCityData, inputValue.length]);

  const handleClickList = (ville) => {
    onSelect(ville);
    setInputValue('');
  };

  return (
    <div className='searchbar-container'>
      <div className='searchbar-input-group'>
        <input
          type='text'
          className='searchbar-input'
          placeholder='Rechercher...'
          defaultValue={defaultInputValue}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button className='searchbar-button'>
          <svg
            className='searchbar-button-logo'
            fill='currentColor'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
          >
            <path d='M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z' />
          </svg>
        </button>
      </div>
      <div
        className={
          'searchbar-options ' + (inputValue.length < 3 ? 'hidden' : '')
        }
      >
        <ul>
          {searchResults &&
            searchResults.map((ville, index) => (
              <li key={index}>
                <button onClick={() => handleClickList(ville)}>
                  {ville.nom} ({ville.codeDepartement})
                </button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

Search.propTypes = {
  defaultInputValue: PropTypes.string.isRequired,
};

export default Search;
