import React from 'react';
import { WiDaySunny, WiRain, WiCloudy, WiSnow, WiThunderstorm, WiFog } from 'react-icons/wi';
import './WeatherCard.css';

// Weather card component
const WeatherCard = ({ weather, forecast, darkMode }) => {
    if (!weather || !weather.weather || !weather.weather[0]) {
        return null;
    }

    // Get weather icon based on condition
    const getWeatherIcon = (condition) => {
        const conditionLower = condition.toLowerCase();
        if (conditionLower.includes('clear') || conditionLower.includes('sunny')) {
            return <WiDaySunny className="weather-icon" />;
        } else if (conditionLower.includes('rain')) {
            return <WiRain className="weather-icon" />;
        } else if (conditionLower.includes('cloud')) {
            return <WiCloudy className="weather-icon" />;
        } else if (conditionLower.includes('snow')) {
            return <WiSnow className="weather-icon" />;
        } else if (conditionLower.includes('thunder') || conditionLower.includes('storm')) {
            return <WiThunderstorm className="weather-icon" />;
        } else {
            return <WiFog className="weather-icon" />;
        }
    };

    // Format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, { 
            weekday: 'long',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className={`weather-card ${darkMode ? 'dark' : ''}`}>
            <div className="weather-header">
                <h2>{weather.name}</h2>
                <span className="date">{formatDate(new Date())}</span>
            </div>
            
            <div className="weather-main">
                <div className="weather-icon">
                    {getWeatherIcon(weather.weather[0].description)}
                </div>
                <div className="temperature">
                    <h1>{Math.round(weather.main.temp)}°C</h1>
                    <p>{weather.weather[0].description}</p>
                </div>
            </div>

            <div className="weather-details">
                <div className="detail">
                    <span>Feels Like</span>
                    <span>{Math.round(weather.main.feels_like)}°C</span>
                </div>
                <div className="detail">
                    <span>Humidity</span>
                    <span>{weather.main.humidity}%</span>
                </div>
                <div className="detail">
                    <span>Wind Speed</span>
                    <span>{weather.wind.speed} m/s</span>
                </div>
            </div>

            {forecast && forecast.list && forecast.list.length > 0 && (
                <div className="forecast">
                    <h3>5-Day Forecast</h3>
                    <div className="forecast-list">
                        {forecast.list.slice(0, 5).map((day, index) => (
                            <div key={index} className="forecast-item">
                                <span className="forecast-date">
                                    {formatDate(day.dt_txt)}
                                </span>
                                {getWeatherIcon(day.weather[0].description)}
                                <span className="forecast-temp">
                                    {Math.round(day.main.temp)}°C
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default WeatherCard; 