/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function WeatherAxios() {
    const [weather, setWeather] = useState(null);
    const [city, setCity] = useState('Mumbai');
    const [error, setError] = useState(null);

    const apiKey = '7b5987e7b27066ffabf0f4b98a86929a';

    const getWeather = async () => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
            );
            setWeather(response.data);
            setError(null);
        } catch (error) {
            if (error.response) {
                setError("City not found");
            } else if (error.request) {
                setError("Network error - please check your connection");
            } else {
                setError("Failed to fetch weather data");
            }
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
                        <p>Humidity: {weather.main.humidity}%</p>
                        <p>Wind: {weather.wind.speed} m/s</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default WeatherAxios;