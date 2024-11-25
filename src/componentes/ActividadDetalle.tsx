// src/screens/ActividadDetalle.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
  ScrollView,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface ActividadDetalle {
  id: number;
  nombre: string;
  nameUsuario: string;
  perfilUsuario: string;
  tipo: 'REUNION' | 'QUIZZ';
  enlace: string;
  fecha: string;
  fechaActividad: string;
}

const ActividadDetalle: React.FC = () => {
  const route = useRoute();
  const { actividadId } = route.params as { actividadId: string };
  const [actividad, setActividad] = useState<ActividadDetalle | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActividad = async () => {
      if (!actividadId) return;

      setLoading(true);
      setError(null);

      try {
        // Reemplaza con tu función real para obtener la actividad
        // const data = await getActividadById(actividadId);
        // Simulación de datos
        setActividad({
          id: 1,
          nombre: 'Reunión de estrategia de marketing',
          nameUsuario: 'María López',
          perfilUsuario: 'https://via.placeholder.com/150', // Imagen de perfil de prueba
          tipo: 'REUNION',
          enlace: 'https://example.com',
          fecha: '2024-11-20T10:00:00',
          fechaActividad: '2024-11-25T15:00:00',
        });
      } catch (error) {
        console.error('Error al obtener los detalles de la actividad:', error);
        setError('No se pudieron cargar los detalles de la actividad.');
      } finally {
        setLoading(false);
      }
    };

    fetchActividad();
  }, [actividadId]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text style={styles.loadingText}>Cargando detalles de la actividad...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Título principal */}
      <Text style={styles.title}>Detalles de la Actividad</Text>

      {actividad ? (
        <View style={styles.card}>
          {/* Fecha de creación */}
          <Text style={styles.fechaCreacion}>
            Creado: {new Date(actividad.fecha).toLocaleString()}
          </Text>

          {/* Información del Usuario */}
          <View style={styles.userInfo}>
            <Image
              source={
                actividad.perfilUsuario
                  ? { uri: actividad.perfilUsuario }
                  : require('../../assets/sinPerfil.png')
              }
              style={styles.profileImage}
            />
            <Text style={styles.userName}>Creado por: {actividad.nameUsuario}</Text>
          </View>

          {/* Nombre de la Actividad */}
          <Text style={styles.actividadNombre}>{actividad.nombre}</Text>

          {/* Tipo de Actividad */}
          <View style={styles.tipoContainer}>
            <Text style={styles.tipoLabel}>Tipo:</Text>
            <View
              style={[
                styles.tipoBadge,
                actividad.tipo === 'REUNION'
                  ? styles.tipoReunion
                  : styles.tipoQuizz,
              ]}
            >
              <Text style={styles.tipoText}>{actividad.tipo}</Text>
            </View>
          </View>

          {/* Fecha de la Actividad */}
          <View style={styles.fechaActividadContainer}>
            <Text style={styles.fechaActividadLabel}>
              Se realizará el día:
            </Text>
            <Text style={styles.fechaActividad}>
              {new Date(actividad.fechaActividad).toLocaleString()}
            </Text>
          </View>

          {/* Enlace */}
          <View style={styles.enlaceContainer}>
            {actividad.enlace ? (
              <TouchableOpacity
                style={styles.enlaceButton}
                onPress={() => Linking.openURL(actividad.enlace)}
              >
                <Icon name="external-link" size={20} color="#FFFFFF" />
                <Text style={styles.enlaceButtonText}>
                  Abrir enlace de la actividad
                </Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.noEnlaceText}>
                No hay enlace disponible.
              </Text>
            )}
          </View>

          {/* Imagen Adicional */}
          <Image
            source={require('../../assets/actividad.jpeg')} // Asegúrate de tener esta imagen en la carpeta assets
            style={styles.actividadImage}
            resizeMode="cover"
          />
        </View>
      ) : (
        <Text>No se encontraron detalles para esta actividad.</Text>
      )}
    </ScrollView>
  );
};

export default ActividadDetalle;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#F3F4F6', // bg-blue-50 equivalent
    flexGrow: 1,
  },
  title: {
    fontSize: 24, // text-3xl
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#1E40AF', // text-blue-800
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  loadingText: {
    marginTop: 8,
    fontSize: 16,
    color: '#3B82F6', // text-blue-500
  },
  errorText: {
    color: '#EF4444', // text-red-500
    fontSize: 16,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  fechaCreacion: {
    fontSize: 12,
    color: '#6B7280', // text-gray-500
    position: 'absolute',
    top: 16,
    right: 16,
    fontStyle: 'italic',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 48, // Para evitar superposición con fechaCreacion
    marginBottom: 16,
  },
  profileImage: {
    width: 64, // w-16
    height: 64, // h-16
    borderRadius: 32, // rounded-full
    borderWidth: 2,
    borderColor: '#3B82F6', // border-blue-400
    marginRight: 12,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937', // text-gray-800
  },
  actividadNombre: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E3A8A', // text-blue-700
    marginBottom: 16,
    textAlign: 'center',
  },
  tipoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  tipoLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937', // text-gray-800
    marginRight: 8,
  },
  tipoBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 9999, // full rounded
  },
  tipoReunion: {
    backgroundColor: '#3B82F6', // bg-blue-500
  },
  tipoQuizz: {
    backgroundColor: '#10B981', // bg-green-500
  },
  tipoText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  fechaActividadContainer: {
    marginBottom: 16,
  },
  fechaActividadLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  fechaActividad: {
    fontSize: 16,
    color: '#4B5563', // text-gray-600
  },
  enlaceContainer: {
    marginBottom: 16,
    alignItems: 'center',
  },
  enlaceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3B82F6', // bg-blue-600
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  enlaceButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginLeft: 8,
    fontWeight: '600',
  },
  noEnlaceText: {
    fontSize: 16,
    color: '#6B7280',
    fontStyle: 'italic',
  },
  actividadImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginTop: 16,
  },
});
