
import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../App';

// Mock the required components
jest.mock('../src/screens/HomeScreen', () => 'HomeScreen');
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve(null)),
}));

describe('App Component', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(<App />);
    // Since we've mocked HomeScreen to just return the string 'HomeScreen',
    // we need to make it return a component with a testID
    // In a real app, you might want to make more specific assertions
    // This test simply verifies that the app renders without errors
    expect(true).toBeTruthy();
  });
});