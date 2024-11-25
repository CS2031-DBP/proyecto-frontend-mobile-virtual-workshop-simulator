// Navbar.tsx
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '../auth/AuthProvider';

const Navbar = () => {
  const { logout, isAuthenticated } = useAuth();

  const handleLogout = () => {
    logout();
  }

  return (
    <View style={styles.navbar}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/logo_buho.png')}
            style={styles.logo}
          />
          <Text style={styles.title}>Asesorias ++</Text>
        </View>
        {isAuthenticated && (
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Text style={styles.logoutButtonText}>Salir</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

export default Navbar;

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: '#60A5FA', // bg-blue-400
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    height: 50,
    width: 50,
    marginRight: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF', // text-white
  },
  logoutButton: {
    backgroundColor: '#1D4ED8', // bg-blue-700
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
