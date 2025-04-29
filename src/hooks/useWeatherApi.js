import { useState } from 'react';
import { getWeatherByCity } from '../services/weatherService';

/**
 * A custom hook for weather API operations
 * @returns {Object} Weather API state and functions
 */
const useWeatherApi = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetch weather data for a specific city
   * @param {string} city - City name to fetch weather for
   */
  const fetchWeather = async (city) => {
    if (!city.trim()) {
      setError('Please enter a city name');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const weatherData = await getWeatherByCity(city);
      setData(weatherData);
      return weatherData;
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data');
      setData(null);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    weatherData: data,
    isLoading: loading,
    error,
    fetchWeather,
    resetWeatherData: () => setData(null),
    resetError: () => setError(null),
  };
};

export default useWeatherApi;