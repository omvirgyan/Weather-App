import React from 'react';

const WeatherCard = ({ weatherData, loading, error }) => {
    if (loading) {
        return <div className="loading"></div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (!weatherData) {
        return null;
    }

    const currentDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    return (
        <div className="weather-card">
            <div className="weather-header">
                <div className="weather-location">
                    <h2>{weatherData.city}</h2>
                    <span className="weather-date">{currentDate}</span>
                </div>
            </div>
            
            <div className="weather-main">
                <div className="weather-icon">
                    {weatherData.description.includes('clear') ? '☀️' :
                     weatherData.description.includes('cloud') ? '☁️' :
                     weatherData.description.includes('rain') ? '🌧️' :
                     weatherData.description.includes('snow') ? '❄️' :
                     weatherData.description.includes('thunder') ? '⛈️' : '☀️'}
                </div>
                <div>
                    <div className="temperature">{Math.round(weatherData.temperature)}°C</div>
                    <div className="weather-description">{weatherData.description}</div>
                </div>
            </div>

            <div className="weather-details">
                <div className="weather-detail-item">
                    <div className="detail-label">Feels Like</div>
                    <div className="detail-value">{Math.round(weatherData.temperature)}°C</div>
                </div>
                <div className="weather-detail-item">
                    <div className="detail-label">Humidity</div>
                    <div className="detail-value">{weatherData.humidity}%</div>
                </div>
                <div className="weather-detail-item">
                    <div className="detail-label">Wind Speed</div>
                    <div className="detail-value">{weatherData.windSpeed} m/s</div>
                </div>
            </div>
        </div>
    );
};

export default WeatherCard; 