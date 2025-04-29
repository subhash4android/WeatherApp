import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useWeather } from '../context/WeatherContext';

const ErrorMessage = () => {
  const { error, darkMode } = useWeather();

  if (!error) {
    return null;
  }

  // Get theme colors based on dark mode
  const backgroundColor = darkMode ? '#402229' : '#ffeded';
  const textColor = darkMode ? '#ff8a8a' : '#e74c3c';
  const borderColor = darkMode ? '#5a3033' : '#ffd0d0';

  return (
    <View style={[styles.container, { backgroundColor, borderColor }]}>
      <Icon name="alert-circle-outline" size={24} color={textColor} style={styles.icon} />
      <Text style={[styles.errorText, { color: textColor }]}>{error}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  icon: {
    marginRight: 12,
  },
  errorText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
  },
});

export default ErrorMessage;