import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import { FaSun, FaMoon } from 'react-icons/fa';
import './App.css';

// API base URL
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// My weather app component
function App() {
  // State for weather data and UI
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Theme from localStorage
  const [isDark, setIsDark] = useState(() => localStorage.getItem('theme') === 'dark');

  // Save theme preference
  useEffect(() => {
    document.body.className = isDark ? 'dark-theme' : 'light-theme';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  // Get weather data for a city
  async function fetchWeatherData(city) {
    if (!city?.trim()) return;

    setIsLoading(true);
    setErrorMsg('');
    setWeatherData(null);
    setForecastData(null);
    
    try {
      let [weatherRes, forecastRes] = await Promise.all([
        axios.get(`${API_URL}/api/weather?city=${encodeURIComponent(city)}`),
        axios.get(`${API_URL}/api/forecast?city=${encodeURIComponent(city)}`)
      ]);

      if (!weatherRes.data) throw new Error('Failed to fetch weather data');

      let weather = {
        name: weatherRes.data.city,
        weather: [{
          description: weatherRes.data.description,
          main: weatherRes.data.condition
        }],
        main: {
          temp: weatherRes.data.temperature,
          feels_like: weatherRes.data.feels_like ?? weatherRes.data.temperature,
          humidity: weatherRes.data.humidity ?? 0
        },
        wind: {
          speed: weatherRes.data.windSpeed ?? 0
        }
      };

      let forecast = {
        list: forecastRes.data.forecasts.map(day => ({
          dt_txt: new Date(day.date).toISOString(),
          main: {
            temp: day.temp ?? day.temperature
          },
          weather: [{
            description: day.description ?? 'Clear',
            main: day.condition ?? 'Clear'
          }]
        }))
      };

      // Pad forecast to 5 days if needed
      while (forecast.list.length < 5) {
        let lastDay = forecast.list[forecast.list.length - 1];
        let nextDate = new Date(lastDay.dt_txt);
        nextDate.setDate(nextDate.getDate() + 1);
        
        forecast.list.push({
          dt_txt: nextDate.toISOString(),
          main: { temp: lastDay.main.temp },
          weather: [{ description: 'Clear', main: 'Clear' }]
        });
      }

      setWeatherData(weather);
      setForecastData(forecast);
    } catch (err) {
      let message = 'Something went wrong';
      
      if (err.response?.status === 404) {
        message = 'City not found';
      } else if (err.response?.status === 401) {
        message = 'API key error';
      } else if (!err.response && err.request) {
        message = 'Network error - check your connection';
      }
      
      setErrorMsg(message);
    } finally {
      setIsLoading(false);
    }
  }

  // Get user's location
  function getUserLocation() {
    if (!navigator.geolocation) {
      setErrorMsg('Your browser doesn\'t support geolocation');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          let { data } = await axios.get(
            `${API_URL}/api/reverse-geocode?lat=${position.coords.latitude}&lon=${position.coords.longitude}`
          );
          
          if (data?.city) {
            fetchWeatherData(data.city);
          } else {
            setErrorMsg('Location not found');
          }
        } catch {
          setErrorMsg('Error getting location data');
        }
      },
      (err) => {
        setErrorMsg(err.code === 1 ? 'Please enable location access' : 'Error getting location');
      }
    );
  }

  // Get location on start
  useEffect(() => {
    getUserLocation();
  }, []);

  return (
    <div className={`App ${isDark ? 'dark' : 'light'}`}>
      <header className="App-header">
        <h1>Weather App</h1>
        <button 
          className="theme-toggle" 
          onClick={() => setIsDark(prev => !prev)}
          aria-label="Toggle theme"
        >
          {isDark ? <FaSun /> : <FaMoon />}
        </button>
      </header>
      
      <main>
        <SearchBar onSearch={fetchWeatherData} />
        
        {isLoading && <div className="loading">Loading...</div>}
        {errorMsg && <div className="error">{errorMsg}</div>}
        
        {weatherData && !isLoading && !errorMsg && (
          <WeatherCard 
            weather={weatherData} 
            forecast={forecastData} 
            darkMode={isDark} 
          />
        )}
      </main>
    </div>
  );
}

export default App;
