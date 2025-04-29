import React from 'react';
import { renderHook, act } from '@testing-library/react-native';
import { WeatherProvider, useWeather } from '../src/context/WeatherContext';

// Mock the weatherService
jest.mock('../src/services/weatherService', () => ({
  getWeatherByCity: jest.fn(),
}));

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve(null)),
}));

// Import the mocked function
import { getWeatherByCity } from '../src/services/weatherService';

describe('WeatherContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('provides initial state', () => {
    const wrapper = ({ children }) => <WeatherProvider>{children}</WeatherProvider>;
    const { result } = renderHook(() => useWeather(), { wrapper });

    expect(result.current.weatherData).toBeNull();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.lastSearchedCity).toBe('');
    expect(result.current.darkMode).toBe(false);
    expect(typeof result.current.fetchWeather).toBe('function');
    expect(typeof result.current.toggleDarkMode).toBe('function');
  });

  it('fetches weather data successfully', async () => {
    const mockWeatherData = {
      city: 'Berlin',
      country: 'DE',
      temperature: 20,
      condition: 'Clear',
    };

    getWeatherByCity.mockResolvedValueOnce(mockWeatherData);

    const wrapper = ({ children }) => <WeatherProvider>{children}</WeatherProvider>;
    const { result } = renderHook(() => useWeather(), { wrapper });

    await act(async () => {
      await result.current.fetchWeather('Berlin');
    });

    expect(getWeatherByCity).toHaveBeenCalledWith('Berlin');
    expect(result.current.weatherData).toEqual(mockWeatherData);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.lastSearchedCity).toBe('Berlin');
  });

  it('handles error when fetching weather data', async () => {
    const errorMessage = 'City not found';
    getWeatherByCity.mockRejectedValueOnce(new Error(errorMessage));

    const wrapper = ({ children }) => <WeatherProvider>{children}</WeatherProvider>;
    const { result } = renderHook(() => useWeather(), { wrapper });

    await act(async () => {
      await result.current.fetchWeather('NonExistentCity');
    });

    expect(getWeatherByCity).toHaveBeenCalledWith('NonExistentCity');
    expect(result.current.weatherData).toBeNull();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(errorMessage);
  });

  it('toggles dark mode', () => {
    const wrapper = ({ children }) => <WeatherProvider>{children}</WeatherProvider>;
    const { result } = renderHook(() => useWeather(), { wrapper });

    expect(result.current.darkMode).toBe(false);

    act(() => {
      result.current.toggleDarkMode();
    });

    expect(result.current.darkMode).toBe(true);

    act(() => {
      result.current.toggleDarkMode();
    });

    expect(result.current.darkMode).toBe(false);
  });
});