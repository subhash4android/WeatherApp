import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  ActivityIndicator,
} from 'react-native';
import { useWeather } from '../context/WeatherContext';
import Icon from 'react-native-vector-icons/Ionicons';

const SearchBar = () => {
  const { fetchWeather, isLoading, lastSearchedCity, darkMode } = useWeather();
  const [city, setCity] = useState(lastSearchedCity || '');

  const handleSearch = () => {
    fetchWeather(city);
  };

  // Get the theme colors based on dark mode
  const getThemeStyles = () => {
    return {
      inputBackground: darkMode ? '#2c2c2c' : '#ffffff',
      textColor: darkMode ? '#f5f5f5' : '#333333',
      borderColor: darkMode ? '#444444' : '#dddddd',
      buttonBackground: '#3498db',
    };
  };

  const theme = getThemeStyles();

  return (
    <View style={styles.container}>
      <View style={[
        styles.inputContainer,
        { backgroundColor: theme.inputBackground, borderColor: theme.borderColor }
      ]}>
        <Icon
          name="location-outline"
          size={20}
          color={theme.textColor}
          style={styles.icon}
        />
        <TextInput
          style={[styles.input, { color: theme.textColor }]}
          placeholder="Enter city name"
          placeholderTextColor={darkMode ? '#aaaaaa' : '#999999'}
          value={city}
          onChangeText={setCity}
          onSubmitEditing={handleSearch}
        />
      </View>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.buttonBackground }]}
        onPress={handleSearch}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#ffffff" size="small" />
        ) : (
          <Text style={styles.buttonText}>Search</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 10,
    height: 50,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  button: {
    height: 50,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SearchBar;