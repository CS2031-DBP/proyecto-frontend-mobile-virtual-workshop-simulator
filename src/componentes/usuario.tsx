// Usuario.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

const Usuario = () => {
  const route = useRoute();
  const { userName } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nombre de usuario</Text>
      <Text>{userName}</Text>
    </View>
  );
};

export default Usuario;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
});
