// ListCarreras.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, ActivityIndicator } from 'react-native';
import { useAuth } from '../auth/AuthProvider';
import { getCarreras } from '../api/carrera';
import CrearCarrera from './CrearCarrera';
import Icon from 'react-native-vector-icons/FontAwesome';

const ListCarreras = ({ usuarioId, onCarreraClick }) => {
  const [carreras, setCarreras] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [inscritos, setInscritos] = useState({});

  useEffect(() => {
    const fetchCarreras = async () => {
      setLoading(true);
      try {
        const data = await getCarreras();
        setCarreras(data);
        // Implementa la lógica para obtener las carreras inscritas
      } catch (error) {
        console.error('Error al obtener carreras:', error);
        setCarreras([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCarreras();
  }, [usuarioId]);

  const refreshCursos = async () => {
    setMostrarFormulario(false);
    const data = await getCarreras();
    setCarreras(data);
  };

  const handleInscribirse = async (id) => {
    // Implementa la lógica para inscribirse
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => onCarreraClick(item.id)}>
      <View style={styles.itemContent}>
        <Image source={require('../../assets/biblioteca.png')} style={styles.itemImage} />
        <Text style={styles.itemText}>{item.nombre}</Text>
      </View>
      <TouchableOpacity onPress={() => handleInscribirse(item.id)}>
        <Icon
          name={inscritos[item.id] ? 'check' : 'user-plus'}
          size={20}
          color={inscritos[item.id] ? 'green' : 'green'}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.createButton} onPress={() => setMostrarFormulario(true)}>
        <Icon name="folder-plus" size={20} color="#FFFFFF" />
        <Text style={styles.createButtonText}>Crear carrera</Text>
      </TouchableOpacity>

      {mostrarFormulario && <CrearCarrera onCarreraCreado={refreshCursos} />}

      <Text style={styles.title}>Lista de Carreras</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : carreras.length === 0 ? (
        <Text style={styles.noDataText}>No hay carreras disponibles.</Text>
      ) : (
        <FlatList
          data={carreras}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

export default ListCarreras;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3B82F6', // bg-blue-500
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 24,
    alignSelf: 'center',
    marginBottom: 16,
  },
  createButtonText: {
    color: '#FFFFFF',
    marginLeft: 8,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  noDataText: {
    textAlign: 'center',
    color: '#6B7280', // text-gray-500
  },
  list: {
    paddingBottom: 16,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#E5E7EB', // border-gray-200
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemImage: {
    width: 30,
    height: 30,
    marginRight: 8,
  },
  itemText: {
    fontSize: 16,
    color: '#1F2937', // text-gray-800
  },
});
