import React from 'react';
import { render } from '@testing-library/react-native';
import WeatherCard from '../src/components/WeatherCard';
import { WeatherProvider } from '../src/context/WeatherContext';

// Mock the useWeather hook
jest.mock('../src/context/WeatherContext', () => ({
  WeatherProvider: ({ children }) => children,
  useWeather: () => ({
    weatherData: {
      city: 'London',
      country: 'GB',
      temperature: 15,
      feelsLike: 13,
      condition: 'Cloudy',
      description: 'scattered clouds',
      iconUrl: 'https://openweathermap.org/img/wn/03d@2x.png',
      humidity: 76,
      timestamp: '10:30 AM',
    },
    darkMode: false,
  }),
}));

describe('WeatherCard Component', () => {
  it('renders weather information correctly', () => {
    const { getByText } = render(
      <WeatherProvider>
        <WeatherCard />
      </WeatherProvider>
    );

    // Check if main weather data is displayed
    expect(getByText('London, GB')).toBeTruthy();
    expect(getByText('15°C')).toBeTruthy();
    expect(getByText('Feels like: 13°C')).toBeTruthy();
    expect(getByText('Cloudy')).toBeTruthy();
    expect(getByText('scattered clouds')).toBeTruthy();
    expect(getByText('Humidity: 76%')).toBeTruthy();
    expect(getByText('10:30 AM')).toBeTruthy();
  });
});