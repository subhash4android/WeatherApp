import React from 'react';
import { View, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import SearchBar from '../components/SearchBar';
import WeatherCard from '../components/WeatherCard';
import ErrorMessage from '../components/ErrorMessage';
import { useWeather } from '../context/WeatherContext';
import Icon from 'react-native-vector-icons/Ionicons';

const HomeScreen = () => {
  const { weatherData, isLoading, darkMode, toggleDarkMode } = useWeather();

  // Get theme colors based on dark mode
  const backgroundColor = darkMode ? '#121212' : '#f5f5f5';
  const statusBarStyle = darkMode ? 'light-content' : 'dark-content';

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <StatusBar barStyle={statusBarStyle} />
      
      {/* Dark Mode Toggle */}
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleDarkMode} style={styles.themeToggle}>
          <Icon 
            name={darkMode ? 'sunny-outline' : 'moon-outline'} 
            size={24} 
            color={darkMode ? '#f5f5f5' : '#333333'} 
          />
        </TouchableOpacity>
      </View>
      
      <SearchBar />
      <ErrorMessage />
      
      {weatherData && <WeatherCard />}
      
      {!weatherData && !isLoading && (
        <View style={styles.placeholder}>
          <Icon 
            name="cloud-outline" 
            size={80} 
            color={darkMode ? '#444444' : '#dddddd'} 
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
  },
  themeToggle: {
    padding: 8,
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.5,
  },
});

export default HomeScreen;