import React from 'react';
import Select from 'react-select';
import countryList from 'react-select-country-list';

function CountryDropdown({ value, onChange }) {
    const countries = countryList().getData();

    return (
      <div>
        <Select
          options={countries}
          value={countries.find(c => c.value === value)}
          onChange={(val) => onChange({ target: { name: 'country', value: val.value } })}
          placeholder="Select a country"
          className='mb-4 w-78 border-2 border-black rounded'
        />
      </div>
    );
}

export default CountryDropdown;
