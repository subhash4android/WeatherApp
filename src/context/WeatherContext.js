import React, { createContext, useContext, useState, useEffect } from 'react';
import { getWeatherByCity } from '../services/weatherService';
import { storeLastCity, getLastCity } from '../utils/storage';

// Create the context
const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastSearchedCity, setLastSearchedCity] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  // Load last searched city when app opens
  useEffect(() => {
    const loadLastCity = async () => {
      try {
        const city = await getLastCity();
        if (city) {
          setLastSearchedCity(city);
          fetchWeather(city);
        }
      } catch (err) {
        console.error('Failed to load last city:', err);
      }
    };

    loadLastCity();
  }, []);

  const fetchWeather = async (city) => {
    if (!city.trim()) {
      setError('Please enter a city name');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await getWeatherByCity(city);
      setWeatherData(data);
      setLastSearchedCity(city);
      await storeLastCity(city);
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data');
      setWeatherData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  const value = {
    weatherData,
    isLoading,
    error,
    lastSearchedCity,
    darkMode,
    fetchWeather,
    toggleDarkMode
  };

  return (
    <WeatherContext.Provider value={value}>
      {children}
    </WeatherContext.Provider>
  );
};

// Custom hook to use the weather context
export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};

export default WeatherContext;