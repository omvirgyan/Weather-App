import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import './SearchBar.css';

// Search component without history
const SearchBar = ({ onSearch }) => {
    const [city, setCity] = useState('');

    // Handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        if (city.trim()) {
            onSearch(city.trim());
            setCity('');
        }
    };

    // Handle input change
    const handleInputChange = (e) => {
        setCity(e.target.value);
    };

    return (
        <div className="search-container">
            <form className="search-bar" onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={city}
                    onChange={handleInputChange}
                    placeholder="Enter city name..."
                    className="search-input"
                />
                <button type="submit" className="search-button">
                    <FaSearch />
                </button>
            </form>
        </div>
    );
};

export default SearchBar; 