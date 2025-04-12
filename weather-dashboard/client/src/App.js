import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import ForecastSection from './components/ForecastSection';
import axios from 'axios';
import './styles.css';

const API_URL = process.env.REACT_APP_API_URL;

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    // Get user's location when component mounts
    getCurrentLocation();
  }, []);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const [weatherResponse, forecastResponse] = await Promise.all([
              axios.get(`${API_URL}/api/weather/coordinates?lat=${latitude}&lon=${longitude}`),
              axios.get(`${API_URL}/api/forecast/coordinates?lat=${latitude}&lon=${longitude}`)
            ]);
            setWeatherData(weatherResponse.data);
            setForecastData(forecastResponse.data);
          } catch (err) {
            setError('Error fetching weather data for your location');
          } finally {
            setLoading(false);
          }
        },
        (error) => {
          setError('Unable to get your location. Please allow location access or search manually.');
          setLoading(false);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser');
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const fetchWeather = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const [weatherResponse, forecastResponse] = await Promise.all([
        axios.get(`${API_URL}/api/weather?city=${city}`),
        axios.get(`${API_URL}/api/forecast?city=${city}`)
      ]);
      setWeatherData(weatherResponse.data);
      setForecastData(forecastResponse.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Error fetching weather data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Weather Dashboard</h1>
        <div className="header-controls">
          <button className="location-button" onClick={getCurrentLocation} title="Get current location">
            📍
          </button>
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </header>
      <SearchBar onSearch={fetchWeather} />
      <WeatherCard
        weatherData={weatherData}
        loading={loading}
        error={error}
      />
      {forecastData && !loading && !error && (
        <ForecastSection forecastData={forecastData} />
      )}
    </div>
  );
}

export default App;
