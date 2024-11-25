// page/Carpeta.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import ListCursos from '../componentes/ListCursos';
import Navbar from '../componentes/Navbar';
import PaginationPost from '../componentes/PaginationPost';
import CrearPost from '../componentes/CrearPost';
import { getUsuario } from '../api/usuario';
import { useAuth } from '../auth/AuthProvider';

const Carpeta = () => {
  const { usuarioId } = useAuth();
  const [usuario, setUsuario] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();
  const { carreraId } = route.params;

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await getUsuario(usuarioId);
        setUsuario({
          id: response.data.id,
          nombre: response.data.nombre,
          perfilUrl: response.data.perfilUrl,
        });
      } catch (error) {
        console.error('Error al obtener el usuario:', error);
      }
    };

    fetchUsuario();
  }, [usuarioId]);

  return (
    <View style={styles.container}>
      <Navbar />
      <View style={styles.content}>
        {/* Panel Izquierdo */}
        <View style={styles.sidebar}>
          <Text style={styles.sidebarTitle}>Cursos</Text>
          <ListCursos
            onCursoClick={(id) => navigation.navigate('CarpMat', { cursoId: id })}
          />
        </View>
        {/* Panel Derecho */}
        <View style={styles.mainContent}>
          <ScrollView>
            {usuario && <CrearPost usuario={usuario} />}
            <PaginationPost />
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default Carpeta;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 70,
  },
  sidebar: {
    width: '25%',
    borderRightWidth: 1,
    borderColor: '#d1d5db',
    padding: 16,
    backgroundColor: '#f3f4f6',
  },
  sidebarTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  mainContent: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9fafb',
  },
});
