// page/Inicio.tsx
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Navbar from '../componentes/Navbar';

const Inicio = () => {
  const navigation = useNavigation();

  const handleMove = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>
      <Navbar />
      <View style={styles.content}>
        <Text style={styles.title}>BIENVENIDO</Text>
        <View style={styles.center}>
          <Image source={require('../assets/bienvenida.png')} style={styles.image} />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => handleMove('Login')}
              style={[styles.button, styles.loginButton]}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleMove('Register')}
              style={[styles.button, styles.registerButton]}
            >
              <Text style={styles.buttonText}>Registrarse</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.subtitle}>ASESORIAS ++</Text>
      </View>
    </View>
  );
};

export default Inicio;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  center: {
    alignItems: 'center',
  },
  image: {
    height: 200,
    width: 200,
    marginBottom: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 12,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  loginButton: {
    backgroundColor: '#3b82f6',
  },
  registerButton: {
    backgroundColor: '#10b981',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 36,
  },
});
