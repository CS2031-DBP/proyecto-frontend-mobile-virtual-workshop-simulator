// page/CarpMat.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import ListActividades from '../componentes/ListActividades';
import PaginatioMaterial from '../componentes/PaginatioMaterial';
import Navbar from '../componentes/Navbar';

const CarpMat = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { cursoId } = route.params;

  return (
    <View style={styles.container}>
      <Navbar />
      <View style={styles.content}>
        {/* Panel Izquierdo */}
        <View style={styles.sidebar}>
          <Text style={styles.sidebarTitle}>Actividades</Text>
          <ListActividades cursoId={cursoId} />
        </View>
        {/* Panel Derecho */}
        <View style={styles.mainContent}>
          <PaginatioMaterial cursoId={cursoId} />
        </View>
      </View>
    </View>
  );
};

export default CarpMat;

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
