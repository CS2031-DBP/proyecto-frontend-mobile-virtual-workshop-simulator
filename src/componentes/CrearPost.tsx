// CrearPost.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { postPost } from '../api/post';
import Icon from 'react-native-vector-icons/FontAwesome';

interface CrearPostProps {
  usuario: { id: string; nombre: string; perfilUrl?: string };
}

const CrearPost: React.FC<CrearPostProps> = ({ usuario }) => {
  const route = useRoute();
  const { carreraId } = route.params;
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setLoading(true);

    try {
      await postPost(usuario.id, carreraId, titulo, contenido);
      setTitulo('');
      setContenido('');
    } catch (err) {
      setError('Error al crear el post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Image
          source={usuario.perfilUrl ? { uri: usuario.perfilUrl } : require('../../assets/sinPerfil.png')}
          style={styles.profileImage}
        />
        <View>
          <Text style={styles.userName}>{usuario?.nombre || 'Usuario'}</Text>
          <Text style={styles.subtitle}>Crea una nueva publicación</Text>
        </View>
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>
          <Icon name="header" size={16} color="#3B82F6" /> Título
        </Text>
        <TextInput
          value={titulo}
          onChangeText={setTitulo}
          style={styles.input}
          placeholder="Escribe el título aquí"
          required
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>
          <Icon name="pencil" size={16} color="#3B82F6" /> Contenido
        </Text>
        <TextInput
          value={contenido}
          onChangeText={setContenido}
          style={[styles.input, styles.textArea]}
          placeholder="Escribe el contenido aquí"
          multiline
          numberOfLines={6}
          required
        />
      </View>
      <TouchableOpacity onPress={handleSubmit} style={styles.button} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.buttonText}>Crear Post</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default CrearPost;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  userName: {
    fontSize: 16,
    fontWeight: '500',
  },
  subtitle: {
    color: '#6B7280',
    fontSize: 12,
  },
  errorText: {
    color: '#EF4444',
    marginBottom: 8,
  },
  inputContainer: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#2563EB',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
