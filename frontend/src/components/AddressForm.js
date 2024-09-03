import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAccessUser from '../utils/useAccessUser';

function AddressForm({ address, setAddress }) {
  const [suggestions, setSuggestions] = useState([]);
  const user = useAccessUser();
  
  useEffect(() => {
    // Set the initial address value when the component mounts
    if (user?.address) {
      setAddress(user.address);
    }
  }, [user, setAddress]);

  const handleClick = (address_name) => {
    setAddress(address_name);
    setSuggestions([]);
  };

  const handleInputChange = async (event) => {
    const value = event.target.value;
    setAddress(value);

    if (value.length > 2) { // Only search after a few characters are typed
      try {
        const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${value}`);
        setSuggestions(response.data);
      } catch (error) {
        console.error("Error fetching data from Nominatim API:", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  return (
    <div>
      <h3 className='font-bold'>Enter your address:</h3>
      <input
        type="text"
        value={address}  // Controlled component, no need for defaultValue
        onChange={handleInputChange}
        placeholder="Enter address"
        className="w-96 p-3 rounded-lg"
      />
      <div>
        {suggestions.map((suggestion) => (
          <div key={suggestion.place_id}>
            <button onClick={() => handleClick(suggestion.display_name)}>
              {suggestion.display_name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AddressForm;
