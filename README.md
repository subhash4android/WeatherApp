
A simple weather application built with React Native that fetches and displays weather data from the OpenWeatherMap API. The app supports both iOS and Android platforms.


Features

    Search for weather by city name
    Display current temperature, weather conditions, and other details
    Error handling for city not found or network issues
    Persists last searched city
    Dark mode toggle
    Responsive UI that works on iOS and Android

Getting Started
    Prerequisites

   - Node.js (v18.0 or later)
   - npm or yarn
   - @react-native-community/cli: 
   - This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/
    react-native-community/cli).
   - OpenWeatherMap API key (register at OpenWeatherMap)

   Android Studio Version : Android Studio Meerkat | 2024.3.1 Patch 1
   Note: if any android build issues, Downgrade to JDK 17, works!, as the project is using latest react native architecture
   the packages asynstorage and vector icons are not building on android. 
   Xcode Version : Version 16.0 (16A242d)

   Installation

    1) Clone the repository
    git clone https://github.com/esubhashk/WeatherApp.git    or download the zip file and extract the project
    cd WeatherApp

    2) Install dependencies
    npm install
    # or
    yarn install

    3) Configure API Key

    Open src/services/weatherService.js
    Replace YOUR_API_KEY with your actual OpenWeatherMap API key


    4) Start the development server
    npm start
    # or
    yarn start

    5) Run on iOS or Android

    Press i in the terminal to run on iOS simulator
    Press a to run on Android emulator
    Or scan the QR code with the Expo Go app on your physical device



    Architecture and Design Decisions

    Project Structure
        The project follows a modular folder structure organized by feature and type:
        WeatherApp/
        ├── src/
        │   ├── components/ - Reusable UI components
        │   ├── context/ - React Context for state management
        │   ├── hooks/ - Custom hooks
        │   ├── screens/ - App screens
        │   ├── services/ - API and external services
        │   ├── utils/ - Utility functions
        │   └── constants/ - App constants
    
    State Management
        This app uses React Context API for state management. The decision to use Context over Redux was based on:

        Simplicity of the app's state requirements
        Reduced boilerplate compared to Redux
        Built-in with React and sufficient for our needs

    The WeatherContext handles:

    Loading states
    Error states
    Weather data storage
    Dark mode preferences
    Last searched city persistence

    API Integration
        The app uses the OpenWeatherMap API for fetching weather data. To keep the API logic separate:

        All API calls are isolated in the weatherService.js file
        Custom hook useWeatherApi.js provides a convenient interface to the API
        Error handling is implemented at multiple levels

    Data Persistence
        AsyncStorage is used to persist the last searched city. When the app is reopened, it attempts to load weather data for this city automatically.
    Testing
        The app includes unit tests using Jest and React Testing Library. Key components and logic are tested:

        Components rendering
        Context API functionality
        API integration

    Run tests with:
        npm test
