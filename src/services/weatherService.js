import axios from 'axios';

// OpenWeatherMap API key - in a real app, store this in environment variables
const API_KEY = '3a8a2d1be27a57b3899c20af147778c3';  // Replace with your actual API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

/**
 * Fetches weather data for a specified city
 * @param {string} city - The city name to fetch weather for
 * @returns {Promise} - Weather data object
 */
export const getWeatherByCity = async (city) => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric'  // Use Celsius
      }
    });

    if (response.status !== 200) {
      throw new Error('Failed to fetch weather data');
    }

    // Transform the API response to a more convenient format
    return {
      city: response.data.name,
      country: response.data.sys.country,
      temperature: Math.round(response.data.main.temp),
      feelsLike: Math.round(response.data.main.feels_like),
      humidity: response.data.main.humidity,
      condition: response.data.weather[0].main,
      description: response.data.weather[0].description,
      iconCode: response.data.weather[0].icon,
      iconUrl: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      timestamp: new Date(response.data.dt * 1000).toLocaleTimeString(),
    };
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error('City not found');
    }
    throw new Error(error.message || 'Error fetching weather data');
  }
};