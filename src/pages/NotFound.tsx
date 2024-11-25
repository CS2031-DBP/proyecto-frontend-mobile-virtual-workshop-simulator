// page/NotFound.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NotFound = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>No encontrado</Text>
    </View>
  );
};

export default NotFound;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  text: {
    fontSize: 18,
  },
});
