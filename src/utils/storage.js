import AsyncStorage from '@react-native-async-storage/async-storage';

const LAST_CITY_KEY = '@weather_app_last_city';

/**
 * Stores the last searched city in AsyncStorage
 * @param {string} city - The city name to store
 */
export const storeLastCity = async (city) => {
  try {
    await AsyncStorage.setItem(LAST_CITY_KEY, city);
  } catch (error) {
    console.error('Error storing last city:', error);
  }
};

/**
 * Retrieves the last searched city from AsyncStorage
 * @returns {Promise<string>} - The last searched city or empty string
 */
export const getLastCity = async () => {
  try {
    const city = await AsyncStorage.getItem(LAST_CITY_KEY);
    return city || '';
  } catch (error) {
    console.error('Error getting last city:', error);
    return '';
  }
};