const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

// My personal weather app server
const app = express();
const port = process.env.PORT || 5000;

// Basic setup
app.use(cors());
app.use(express.json());

// Helper function to handle API errors
const handleApiError = (error, res) => {
    console.log('API Error:', error.message);
    if (error.response?.status === 404) {
        return res.status(404).json({ error: 'Location not found' });
    }
    res.status(500).json({ error: 'Something went wrong' });
};

// Get city name from coordinates
app.get('/api/reverse-geocode', async (req, res) => {
    const { lat, lon } = req.query;
    
    if (!lat || !lon) {
        return res.status(400).json({ error: 'Need coordinates' });
    }

    try {
        const apiKey = process.env.OPENWEATHER_API_KEY;
        const response = await axios.get(
            `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`
        );

        if (response.data?.[0]) {
            res.json({
                city: response.data[0].name,
                country: response.data[0].country
            });
        } else {
            res.status(404).json({ error: 'No city found' });
        }
    } catch (error) {
        handleApiError(error, res);
    }
});

// Get current weather
app.get('/api/weather', async (req, res) => {
    const { city } = req.query;
    
    if (!city) {
        return res.status(400).json({ error: 'Need a city name' });
    }

    try {
        const apiKey = process.env.OPENWEATHER_API_KEY;
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`
        );

        const weather = {
            city: response.data.name,
            temperature: response.data.main.temp,
            condition: response.data.weather[0].main,
            description: response.data.weather[0].description,
            icon: response.data.weather[0].icon,
            humidity: response.data.main.humidity,
            windSpeed: response.data.wind.speed,
            country: response.data.sys.country
        };

        res.json(weather);
    } catch (error) {
        handleApiError(error, res);
    }
});

// Get 5-day forecast
app.get('/api/forecast', async (req, res) => {
    const { city } = req.query;
    
    if (!city) {
        return res.status(400).json({ error: 'Need a city name' });
    }

    try {
        const apiKey = process.env.OPENWEATHER_API_KEY;
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`
        );

        // Group forecasts by day
        const dailyForecasts = {};
        response.data.list.forEach(item => {
            const date = item.dt_txt.split(' ')[0];
            if (!dailyForecasts[date]) {
                dailyForecasts[date] = {
                    date: date,
                    temp: item.main.temp,
                    condition: item.weather[0].main,
                    description: item.weather[0].description,
                    icon: item.weather[0].icon,
                    humidity: item.main.humidity,
                    windSpeed: item.wind.speed
                };
            }
        });

        res.json({
            city: response.data.city.name,
            country: response.data.city.country,
            forecasts: Object.values(dailyForecasts).slice(0, 5)
        });
    } catch (error) {
        handleApiError(error, res);
    }
});

// Simple health check
app.get('/health', (req, res) => {
    res.json({ status: 'working' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
}); 