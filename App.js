import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { WeatherProvider } from './src/context/WeatherContext';
import HomeScreen from './src/screens/HomeScreen';

/**
 * Main App component that wraps the entire application with the WeatherProvider
 * for global state management and renders the HomeScreen within a SafeAreaView
 */
export default function App() {
  return (
    <WeatherProvider>
      <SafeAreaView style={styles.container}>
        <HomeScreen />
      </SafeAreaView>
    </WeatherProvider>
  );
}

/**
 * Basic styles for the root container
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});