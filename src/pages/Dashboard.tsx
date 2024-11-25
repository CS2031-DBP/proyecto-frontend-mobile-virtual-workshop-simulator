// page/Dashboard.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ListCarreras from '../componentes/ListCarreras';
import Perfil from '../componentes/Perfil';
import Navbar from '../componentes/Navbar';
import { useAuth } from '../auth/AuthProvider';

const Dashboard = () => {
  const { usuarioId } = useAuth();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Navbar />
      <View style={styles.content}>
        {/* Panel Izquierdo */}
        <View style={styles.sidebar}>
          <Text style={styles.sidebarTitle}>Carreras</Text>
          <ListCarreras
            usuarioId={usuarioId}
            onCarreraClick={(id) => navigation.navigate('Carpeta', { carreraId: id })}
          />
        </View>
        {/* Panel Derecho */}
        <View style={styles.mainContent}>
          <Perfil />
        </View>
      </View>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 70, // Ajusta según sea necesario
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
