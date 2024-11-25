// ListCursos.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, ActivityIndicator } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useAuth } from '../auth/AuthProvider';
import CrearCurso from './CrearCurso';
import Icon from 'react-native-vector-icons/FontAwesome';
import { obtenerCarrerasInscritas } from '../api/usuario';
import { getCursos } from '../api/curso';

export interface Curso {
  id: string;
  nombre: string;
  carreraNombre: string;
}

interface ListCursoProps {
  onCursoClick: (id: string) => void;
}

const ListCursos: React.FC<ListCursoProps> = ({ onCursoClick }) => {
  const route = useRoute();
  const navigation = useNavigation();
  const { carreraId } = route.params;
  const { usuarioId } = useAuth();
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mostrarFormulario, setMostrarFormulario] = useState<boolean>(false);
  const [inscrito, setInscrito] = useState<boolean>(false);

  useEffect(() => {
    const fetchCursos = async () => {
      if (!carreraId) {
        setError('No se ha proporcionado un ID de carrera.');
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const carrerasInscritas = await obtenerCarrerasInscritas(usuarioId);
        setInscrito(carrerasInscritas.includes(Number(carreraId)));

        const response = await getCursos(carreraId);
        if (response && response.data) {
          setCursos(response.data as Curso[]);
        }
      } catch (error) {
        console.error('Error al obtener los cursos:', error);
        setError('Ocurrió un error al cargar los cursos.');
        setCursos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCursos();
  }, [carreraId]);

  const refreshCursos = async () => {
    setMostrarFormulario(false);
    const response = await getCursos(carreraId);
    if (response && response.data) {
      setCursos(response.data as Curso[]);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => onCursoClick(item.id)}>
      <Image source={require('../../assets/biblioteca.png')} style={styles.itemImage} />
      <Text style={styles.itemText}>{item.nombre}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {inscrito && (
        <TouchableOpacity style={styles.createButton} onPress={() => setMostrarFormulario(true)}>
          <Icon name="plus-circle" size={20} color="#FFFFFF" />
          <Text style={styles.createButtonText}>Crear curso</Text>
        </TouchableOpacity>
      )}

      {mostrarFormulario && <CrearCurso carreraId={carreraId} onCursoCreado={refreshCursos} />}

      <Text style={styles.title}>Lista de Cursos</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : cursos.length === 0 ? (
        <Text style={styles.noDataText}>No hay cursos disponibles.</Text>
      ) : (
        <FlatList
          data={cursos}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

export default ListCursos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3B82F6',
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
  itemImage: {
    width: 30,
    height: 30,
    marginRight: 8,
  },
  itemText: {
    fontSize: 16,
    color: '#1F2937',
  },
});
