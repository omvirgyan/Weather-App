# Weather Dashboard

A full-stack weather dashboard application that displays real-time weather data and forecasts using the OpenWeatherMap API.

## Features

- Real-time weather data display
- 5-day weather forecast
- Automatic location detection
- City search functionality
- Dark/Light mode toggle
- Responsive design
- Modern UI with clean aesthetics

## Prerequisites

- Node.js (v14 or higher)
- OpenWeatherMap API key (get it from [OpenWeatherMap](https://openweathermap.org/api))

## Local Development Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd weather-dashboard
```

2. Install dependencies for server and client:
```bash
npm run install-all
```

3. Create a .env file in the server directory:
```bash
cd server
cp .env.example .env
```

4. Edit the .env file and add your OpenWeatherMap API key:
```
PORT=5000
OPENWEATHER_API_KEY=your_api_key_here
NODE_ENV=development
```

5. Start the development server:
```bash
cd ..
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Deployment to Render

1. Create a new Web Service on Render

2. Connect your GitHub repository

3. Configure the Web Service:
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Environment Variables:
     - `OPENWEATHER_API_KEY`: Your OpenWeatherMap API key
     - `NODE_ENV`: production
     - `PORT`: 5000

4. Deploy the application

## Project Structure

```
weather-dashboard/
├── client/             # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── App.js
│   │   └── styles.css
│   └── package.json
├── server/            # Node.js backend
│   ├── server.js
│   └── package.json
├── package.json
└── README.md
```

## Available Scripts

- `npm run dev`: Start both frontend and backend in development mode
- `npm run client`: Start frontend only
- `npm run server`: Start backend only
- `npm run build`: Build the frontend for production
- `npm start`: Start the production server
- `npm run install-all`: Install dependencies for both frontend and backend

## Environment Variables

### Server (.env)
- `PORT`: Server port (default: 5000)
- `OPENWEATHER_API_KEY`: Your OpenWeatherMap API key
- `NODE_ENV`: development/production

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License. 