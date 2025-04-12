# Weather Dashboard

A full-stack weather dashboard application that displays real-time weather information for any city. Built with React (frontend) and Node.js/Express (backend).

## Features

- 🔍 Search weather by city name
- 🌡️ Real-time weather data display (temperature, humidity, wind speed, etc.)
- 🎨 Modern, responsive UI
- ⚡ Fast and reliable API integration
- 🌓 Dark/light mode toggle
- 📱 Mobile-friendly design

## Tech Stack

### Frontend
- React
- Axios for API calls
- CSS Modules for styling
- React Icons

### Backend
- Node.js
- Express
- Axios for OpenWeatherMap API integration
- CORS for cross-origin requests
- dotenv for environment variables

## Setup Instructions

1. Clone the repository
2. Set up the backend:
   ```bash
   cd server
   npm install
   # Create .env file and add your OpenWeatherMap API key:
   # OPENWEATHER_API_KEY=your_api_key_here
   npm start
   ```

3. Set up the frontend:
   ```bash
   cd client
   npm install
   npm start
   ```

4. Open http://localhost:3000 in your browser

## Environment Variables

Create a `.env` file in the server directory with the following:

```
OPENWEATHER_API_KEY=your_api_key_here
PORT=5000
```

## API Endpoints

- GET `/api/weather?city={cityName}` - Get weather data for a specific city

## Contributing

Feel free to submit issues and pull requests.

## License

MIT 