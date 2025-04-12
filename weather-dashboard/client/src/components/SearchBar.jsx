import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [city, setCity] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (city.trim()) {
            onSearch(city.trim());
        }
    };

    return (
        <div className="search-container">
            <form className="search-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="search-input"
                    placeholder="Enter city name..."
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <button type="submit" className="search-button" aria-label="Search">
                    <svg 
                        width="18" 
                        height="18" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2"
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                    >
                        <circle cx="11" cy="11" r="8"/>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    </svg>
                </button>
            </form>
        </div>
    );
};

export default SearchBar; 