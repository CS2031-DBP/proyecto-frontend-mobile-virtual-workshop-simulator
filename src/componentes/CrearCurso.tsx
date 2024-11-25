// CrearCurso.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { createCurso } from '../api/curso';

interface CrearCursoFormProps {
  carreraId: string;
  onCursoCreado: () => void;
}

const CrearCurso: React.FC<CrearCursoFormProps> = ({ carreraId, onCursoCreado }) => {
  const [nombreCurso, setNombreCurso] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [creandoCurso, setCreandoCurso] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!nombreCurso.trim()) {
      setError('El nombre del curso es obligatorio.');
      return;
    }

    setCreandoCurso(true);
    setError(null);

    try {
      await createCurso(nombreCurso, carreraId);
      setNombreCurso('');
      onCursoCreado();
    } catch (error) {
      setError('Hubo un error al crear el curso. Intenta nuevamente.');
      console.error('Error al crear el curso', error);
    } finally {
      setCreandoCurso(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Nuevo Curso</Text>
      {error && <Text style={styles.errorText}>{error}</Text>}
      <TextInput
        value={nombreCurso}
        onChangeText={setNombreCurso}
        placeholder="Nombre del curso"
        style={styles.input}
      />
      <TouchableOpacity onPress={handleSubmit} style={styles.button} disabled={creandoCurso}>
        {creandoCurso ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.buttonText}>Crear Curso</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default CrearCurso;

const styles = StyleSheet.create({
  // Mismos estilos que en CrearCarrera.tsx
});
