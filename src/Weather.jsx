/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import './Weather.css';
function Weather() {
    const [weather, setWeather] = useState(null);
    const [city, setCity] = useState('Mumbai');
    const [error, setError] = useState(null);

    const apiKey = '7b5987e7b27066ffabf0f4b98a86929a';

    const getWeather = async () => {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
            );
            const data = await response.json();
            if (data.cod === 200) {
                setWeather(data);
                setError(null);
            } else {
                setError("City not found");
                setWeather(null);
            }
        } catch (error) {
            setError("Failed to fetch weather data");
            setWeather(null);
        }
    };

    useEffect(() => {
        getWeather();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        getWeather();
    };

    const convertUnixTime = (unix) => {
        return new Date(unix * 1000).toLocaleTimeString();
    };

    return (
        <div className="weather-app">
            <h1>Simple Weather App</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city name"
                />
                <button type="submit">Get Weather</button>
            </form>

            {error && <p className="error">{error}</p>}

            {weather && (
                <div className="weather-info">
                    <h2>{weather.name}, {weather.sys.country}</h2>
                    <div className="weather-main">
                        <img
                            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                            alt={weather.weather[0].description}
                        />
                        <p>{Math.round(weather.main.temp)}°C</p>
                    </div>
                    <p>{weather.weather[0].description}</p>
                    <div className="weather-details">
                        <p><strong>Feels Like:</strong> {Math.round(weather.main.feels_like)}°C</p>
                        <p><strong>Min Temp:</strong> {Math.round(weather.main.temp_min)}°C</p>
                        <p><strong>Max Temp:</strong> {Math.round(weather.main.temp_max)}°C</p>
                        <p><strong>Humidity:</strong> {weather.main.humidity}%</p>
                        <p><strong>Pressure:</strong> {weather.main.pressure} hPa</p>
                        <p><strong>Wind:</strong> {weather.wind.speed} m/s</p>
                        <p><strong>Visibility:</strong> {weather.visibility / 1000} km</p>
                        <p><strong>Cloudiness:</strong> {weather.clouds.all}%</p>
                        <p><strong>Sunrise:</strong> {convertUnixTime(weather.sys.sunrise)}</p>
                        <p><strong>Sunset:</strong> {convertUnixTime(weather.sys.sunset)}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Weather;
