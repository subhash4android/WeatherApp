import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useWeather } from '../context/WeatherContext';

const WeatherCard = () => {
  const { weatherData, darkMode } = useWeather();

  if (!weatherData) {
    return null;
  }

  const {
    city,
    country,
    temperature,
    condition,
    description,
    iconUrl,
    humidity,
    feelsLike,
    timestamp,
  } = weatherData;

  // Get theme colors based on dark mode
  const cardBackground = darkMode ? '#1e1e1e' : '#ffffff';
  const textColor = darkMode ? '#f5f5f5' : '#333333';
  const borderColor = darkMode ? '#444444' : '#dddddd';

  return (
    <View style={[styles.card, { backgroundColor: cardBackground, borderColor }]}>
      <View style={styles.header}>
        <Text style={[styles.city, { color: textColor }]}>
          {city}, {country}
        </Text>
        <Text style={[styles.timestamp, { color: textColor }]}>
          {timestamp}
        </Text>
      </View>

      <View style={styles.mainInfo}>
        <View style={styles.tempContainer}>
          <Text style={[styles.temperature, { color: textColor }]}>
            {temperature}°C
          </Text>
          <Text style={[styles.feelsLike, { color: textColor }]}>
            Feels like: {feelsLike}°C
          </Text>
        </View>

        <View style={styles.conditionContainer}>
          <Image source={{ uri: iconUrl }} style={styles.icon} />
          <Text style={[styles.condition, { color: textColor }]}>
            {condition}
          </Text>
          <Text style={[styles.description, { color: textColor }]}>
            {description}
          </Text>
        </View>
      </View>

      <View style={styles.additionalInfo}>
        <Text style={[styles.infoText, { color: textColor }]}>
          Humidity: {humidity}%
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
  },
  header: {
    marginBottom: 16,
  },
  city: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  timestamp: {
    fontSize: 14,
    marginTop: 4,
    opacity: 0.7,
  },
  mainInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  tempContainer: {
    flex: 1,
  },
  temperature: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  feelsLike: {
    fontSize: 16,
    marginTop: 4,
  },
  conditionContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 80,
    height: 80,
  },
  condition: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 4,
    textTransform: 'capitalize',
  },
  additionalInfo: {
    marginTop: 8,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#dddddd',
  },
  infoText: {
    fontSize: 16,
  },
});

export default WeatherCard;