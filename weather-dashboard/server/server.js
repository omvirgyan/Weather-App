const express = require('express');
const cors = require('cors');
const path = require('path');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

if (!OPENWEATHER_API_KEY) {
    console.error('OPENWEATHER_API_KEY is required but not set in environment variables');
    process.exit(1);
}

// CORS configuration
const corsOptions = {
    origin: [
        'http://localhost:3000',
        'https://your-vercel-app-url.vercel.app'
    ],
    optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
}

// Current weather endpoint by city name
app.get('/api/weather', async (req, res) => {
    const { city } = req.query;
    
    if (!city) {
        return res.status(400).json({ error: 'City name is required' });
    }

    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${OPENWEATHER_API_KEY}`
        );

        const weatherData = {
            temperature: response.data.main.temp,
            description: response.data.weather[0].description,
            icon: response.data.weather[0].icon,
            humidity: response.data.main.humidity,
            windSpeed: response.data.wind.speed,
            city: response.data.name,
            country: response.data.sys.country
        };

        res.json(weatherData);
    } catch (error) {
        if (error.response && error.response.status === 404) {
            res.status(404).json({ error: 'City not found' });
        } else {
            res.status(500).json({ error: 'Error fetching weather data' });
        }
    }
});

// Current weather endpoint by coordinates
app.get('/api/weather/coordinates', async (req, res) => {
    const { lat, lon } = req.query;
    
    if (!lat || !lon) {
        return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${OPENWEATHER_API_KEY}`
        );

        const weatherData = {
            temperature: response.data.main.temp,
            description: response.data.weather[0].description,
            icon: response.data.weather[0].icon,
            humidity: response.data.main.humidity,
            windSpeed: response.data.wind.speed,
            city: response.data.name,
            country: response.data.sys.country
        };

        res.json(weatherData);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching weather data' });
    }
});

// 5-day forecast endpoint by city name
app.get('/api/forecast', async (req, res) => {
    const { city } = req.query;
    
    if (!city) {
        return res.status(400).json({ error: 'City name is required' });
    }

    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${OPENWEATHER_API_KEY}`
        );

        const processedForecast = response.data.list
            .filter((item, index) => index % 8 === 0)
            .slice(0, 5)
            .map(item => ({
                date: new Date(item.dt * 1000).toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric'
                }),
                temperature: Math.round(item.main.temp),
                description: item.weather[0].description,
                icon: item.weather[0].icon,
                humidity: item.main.humidity,
                windSpeed: item.wind.speed
            }));

        res.json({
            city: response.data.city.name,
            forecast: processedForecast
        });
    } catch (error) {
        if (error.response && error.response.status === 404) {
            res.status(404).json({ error: 'City not found' });
        } else {
            res.status(500).json({ error: 'Error fetching forecast data' });
        }
    }
});

// 5-day forecast endpoint by coordinates
app.get('/api/forecast/coordinates', async (req, res) => {
    const { lat, lon } = req.query;
    
    if (!lat || !lon) {
        return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${OPENWEATHER_API_KEY}`
        );

        const processedForecast = response.data.list
            .filter((item, index) => index % 8 === 0)
            .slice(0, 5)
            .map(item => ({
                date: new Date(item.dt * 1000).toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric'
                }),
                temperature: Math.round(item.main.temp),
                description: item.weather[0].description,
                icon: item.weather[0].icon,
                humidity: item.main.humidity,
                windSpeed: item.wind.speed
            }));

        res.json({
            city: response.data.city.name,
            forecast: processedForecast
        });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching forecast data' });
    }
});

// Serve React app in production
if (process.env.NODE_ENV === 'production') {
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    });
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 