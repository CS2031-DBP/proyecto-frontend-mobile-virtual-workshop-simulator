// App.tsx
import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { AuthProvider } from './src/auth/AuthProvider';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import Router from './src/navigation/router';

// Opcional: Personaliza el tema de navegación
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#FFFFFF', // Color de fondo de la aplicación
  },
};

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer theme={MyTheme}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        <Router />
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
