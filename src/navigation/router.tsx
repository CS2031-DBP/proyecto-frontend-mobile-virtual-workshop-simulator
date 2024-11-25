// rout/router.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Inicio from '../pages/Inicio';
import Login from '../componentes/Login';
import Register from '../componentes/Register';
import Dashboard from '../pages/Dashboard';
import NotFound from '../pages/NotFound';
import Carpeta from '../pages/Carpeta';
import CarpMat from '../pages/CarpMat';
import ActividadDetalle from '../componentes/ActividadDetalle';
import { useAuth } from '../auth/AuthProvider';

const Stack = createNativeStackNavigator();

function Router() {
  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicio">
        {isAuthenticated ? (
          <>
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="Carpeta" component={Carpeta} />
            <Stack.Screen name="CarpMat" component={CarpMat} />
            <Stack.Screen name="ActividadDetalle" component={ActividadDetalle} />
          </>
        ) : (
          <>
            <Stack.Screen name="Inicio" component={Inicio} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        )}
        <Stack.Screen name="NotFound" component={NotFound} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Router;
