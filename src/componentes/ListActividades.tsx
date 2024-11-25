// ListActividades.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, Linking } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { gettActividades } from '../api/actividades';

export interface Actividad {
  id: string;
  nombre: string;
  enlace: string;
}

const ListActividades = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { cursoId } = route.params;
  const [actividades, setActividad] = useState<Actividad[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActividad = async () => {
      if (!cursoId) {
        setError('No se ha proporcionado un ID de curso.');
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await gettActividades(cursoId);
        if (response && response.data) {
          setActividad(response.data as Actividad[]);
        }
      } catch (error) {
        console.error('Error al obtener las actividades:', error);
        setError('Ocurrió un error al cargar las actividades.');
        setActividad([]);
      } finally {
        setLoading(false);
      }
    };

    fetchActividad();
  }, [cursoId]);

  const handleNombreClick = (id: string) => {
    navigation.navigate('ActividadDetalle', { actividadId: id });
  };

  const handleEnlaceClick = (url: string) => {
    Linking.openURL(url);
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Icon name="tasks" size={24} color="#1E3A8A" />
      <TouchableOpacity style={styles.itemTextContainer} onPress={() => handleNombreClick(item.id)}>
        <Text style={styles.itemText}>{item.nombre}</Text>
      </TouchableOpacity>
      {item.enlace && (
        <TouchableOpacity onPress={() => handleEnlaceClick(item.enlace)}>
          <Icon name="external-link" size={20} color="#3B82F6" />
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Actividades</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : actividades.length === 0 ? (
        <Text style={styles.noDataText}>No existen actividades creadas.</Text>
      ) : (
        <FlatList
          data={actividades}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

export default ListActividades;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  errorText: {
    color: '#EF4444',
    textAlign: 'center',
  },
  noDataText: {
    textAlign: 'center',
    color: '#6B7280',
  },
  list: {
    paddingBottom: 16,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
  },
  itemTextContainer: {
    flex: 1,
    marginLeft: 8,
  },
  itemText: {
    fontSize: 16,
    color: '#1F2937',
  },
});
