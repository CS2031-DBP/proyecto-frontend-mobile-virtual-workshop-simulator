// Perfil.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getUsuario, postPerfil } from '../api/usuario';
import { useAuth } from '../auth/AuthProvider';

const Perfil = () => {
  const { usuarioId } = useAuth();
  const [usuario, setUsuario] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const handlePickImage = async () => {
    // Pide permisos para acceder a la galería
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert('Permiso para acceder a la galería es necesario.');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (pickerResult.cancelled) {
      return;
    }

    // Aquí puedes enviar la imagen al backend
    const fileUri = pickerResult.uri;
    const fileName = fileUri.split('/').pop();

    const file = {
      uri: fileUri,
      name: fileName,
      type: 'image/jpeg',
    };

    try {
      await postPerfil(usuarioId, file);
      const response = await getUsuario(usuarioId);
      setUsuario(response?.data);
    } catch (error) {
      console.error('Error al subir la foto de perfil:', error);
      setError('No se pudo subir la foto de perfil');
    }
  };

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await getUsuario(usuarioId);
        setUsuario(response?.data);
        setError(null);
      } catch (error) {
        console.error('Error al cargar el perfil:', error);
        setError('Error al cargar el perfil del usuario.');
      } finally {
        setLoading(false);
      }
    };
    fetchUsuario();
  }, [usuarioId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      {usuario ? (
        <>
          <View style={styles.profileContainer}>
            <TouchableOpacity onPress={handlePickImage}>
              <Image
                source={usuario.perfilUrl ? { uri: usuario.perfilUrl } : require('../../assets/sinPerfil.png')}
                style={styles.profileImage}
              />
            </TouchableOpacity>
            <Text style={styles.userName}>{usuario.nombre}</Text>
            <Text style={styles.userEmail}>{usuario.email}</Text>
            <Text style={styles.registeredDate}>
              Registrado: {new Date(usuario.fechaRegistro).toLocaleDateString()}
            </Text>
          </View>
          <View style={styles.carrerasContainer}>
            <Text style={styles.carrerasTitle}>Carreras Inscritas:</Text>
            {usuario.carreras.length > 0 ? (
              <FlatList
                data={usuario.carreras}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View style={styles.carreraItem}>
                    <Text>{item.nombre}</Text>
                  </View>
                )}
              />
            ) : (
              <Text style={styles.noCarrerasText}>Este usuario no está inscrito en ninguna carrera.</Text>
            )}
          </View>
        </>
      ) : (
        <Text>No se pudo cargar la información del usuario.</Text>
      )}
    </View>
  );
};

export default Perfil;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  profileImage: {
    width: 128,
    height: 128,
    borderRadius: 64,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    marginBottom: 16,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  userEmail: {
    fontSize: 16,
    color: '#4B5563',
  },
  registeredDate: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  carrerasContainer: {
    marginTop: 16,
  },
  carrerasTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  carreraItem: {
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 8,
  },
  noCarrerasText: {
    color: '#6B7280',
    textAlign: 'center',
  },
});
