// CrearCarrera.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { createCarrera } from '../api/carrera';

interface CrearCarreraFormProps {
  onCarreraCreado: () => void;
}

const CrearCarrera: React.FC<CrearCarreraFormProps> = ({ onCarreraCreado }) => {
  const [nombreCurso, setNombreCurso] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [creandoCarrera, setCreandoCarrera] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!nombreCurso.trim()) {
      setError('El nombre del curso es obligatorio.');
      return;
    }

    setCreandoCarrera(true);
    setError(null);

    try {
      await createCarrera(nombreCurso);
      setNombreCurso('');
      onCarreraCreado();
    } catch (error) {
      setError('Hubo un error al crear el curso. Intenta nuevamente.');
      console.error('Error al crear el curso', error);
    } finally {
      setCreandoCarrera(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Nueva Carrera</Text>
      {error && <Text style={styles.errorText}>{error}</Text>}
      <TextInput
        value={nombreCurso}
        onChangeText={setNombreCurso}
        placeholder="Nombre de la carrera"
        style={styles.input}
      />
      <TouchableOpacity onPress={handleSubmit} style={styles.button} disabled={creandoCarrera}>
        {creandoCarrera ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.buttonText}>Crear Carrera</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default CrearCarrera;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
  },
  errorText: {
    color: '#EF4444',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
