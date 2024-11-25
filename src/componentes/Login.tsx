// Login.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { apiLogin } from '../api/inicio';
import { useAuth } from '../auth/AuthProvider';

const Login = () => {
  const navigation = useNavigation();
  const { login } = useAuth();
  const [data, setData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (name, value) => {
    setData({ ...data, [name]: value });
  }

  const handleSubmit = async () => {
    setErrorMessage('');
    try {
      const response = await apiLogin(data.email, data.password);
      if (response && response.data.token && response.data.usuarioId) {
        login(response.data.usuarioId, response.data.token);
        navigation.navigate('Dashboard');
      } else {
        setErrorMessage('Los datos son incorrectos. Por favor, intenta nuevamente o regístrate.');
      }
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      setErrorMessage('Ocurrió un error al intentar iniciar sesión. Por favor, intenta nuevamente.');
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>BIENVENIDO</Text>
        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Correo Electrónico</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingresa tu correo"
            keyboardType="email-address"
            autoCapitalize="none"
            value={data.email}
            onChangeText={(value) => handleChange('email', value)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Contraseña</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingresa tu contraseña"
            secureTextEntry
            value={data.password}
            onChangeText={(value) => handleChange('password', value)}
          />
        </View>
        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center', // Centra verticalmente
    paddingHorizontal: 16,
    backgroundColor: '#F3F4F6', // bg-gray-100
  },
  form: {
    backgroundColor: '#FFFFFF', // bg-white
    padding: 24,
    borderRadius: 8,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E40AF', // text-blue-950
    textAlign: 'center',
    marginBottom: 16,
  },
  error: {
    color: '#EF4444', // text-red-500
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 12,
  },
  label: {
    color: '#374151', // text-gray-600
    fontWeight: '500',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB', // border-gray-300
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
  },
  button: {
    backgroundColor: '#6366F1', // bg-indigo-500
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
