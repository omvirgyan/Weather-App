import React from 'react';

const ForecastSection = ({ forecastData }) => {
  const getWeatherIcon = (description) => {
    if (description.includes('clear')) return '☀️';
    if (description.includes('cloud')) return '☁️';
    if (description.includes('rain')) return '🌧️';
    if (description.includes('snow')) return '❄️';
    if (description.includes('thunder')) return '⛈️';
    return '☀️';
  };

  return (
    <div className="forecast-section">
      <h2>5-Day Forecast</h2>
      <div className="forecast-grid">
        {forecastData.forecast.map((day, index) => (
          <div key={index} className="forecast-card">
            <div className="forecast-date">{day.date}</div>
            <div className="forecast-icon">
              {getWeatherIcon(day.description)}
            </div>
            <div className="forecast-temp">{day.temperature}°C</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastSection; 