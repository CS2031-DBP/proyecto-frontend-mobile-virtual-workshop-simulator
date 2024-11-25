// PaginatioMaterial.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ActivityIndicator, Linking } from 'react-native';
import { getMateriales } from '../api/material';

export enum TipoMaterial {
  PDF = 'PDF',
  VIDEO = 'VIDEO',
  IMAGEN = 'IMAGEN',
}

interface Material {
  id: string;
  nombre: string;
  urlArchivo: string;
  tipo: TipoMaterial;
  rating: number;
  usuarioNombre: string;
}

const PaginatioMaterial = () => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [skip, setSkip] = useState(0);
  const limit = 4;
  const [loading, setLoading] = useState(false);

  const getImageForType = (tipo: TipoMaterial): any => {
    switch (tipo) {
      case TipoMaterial.PDF:
        return require('../../assets/pdf.png');
      case TipoMaterial.VIDEO:
        return require('../../assets/video.png');
      case TipoMaterial.IMAGEN:
        return require('../../assets/image.png');
      default:
        return require('../../assets/error.png');
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const data = await getMateriales(skip, limit);
        setMaterials(data.content as Material[]);
      } catch (error) {
        console.error('Error al obtener materiales:', error);
        setMaterials([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [skip]);

  const handleNext = () => {
    setSkip(skip + limit);
  };

  const handlePrevious = () => {
    if (skip >= limit) {
      setSkip(skip - limit);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => Linking.openURL(item.urlArchivo)}
    >
      <View style={styles.imageContainer}>
        <Image source={getImageForType(item.tipo)} style={styles.itemImage} />
        <View style={styles.rating}>
          <Text style={styles.ratingText}>Rating: ⭐{item.rating.toFixed(1)}</Text>
        </View>
      </View>
      <View style={styles.itemContent}>
        <Text style={styles.itemTitle}>{item.nombre}</Text>
        <Text style={styles.itemSubtitle}>Por {item.usuarioNombre}</Text>
        <Text style={styles.itemLink}>Ver más</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todas las Publicaciones</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : materials.length === 0 ? (
        <Text style={styles.noDataText}>No hay materiales disponibles.</Text>
      ) : (
        <>
          <FlatList
            data={materials}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.list}
            numColumns={2}
          />
          <View style={styles.pagination}>
            <TouchableOpacity onPress={handlePrevious} style={styles.button} disabled={skip === 0}>
              <Text style={styles.buttonText}>Anterior</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleNext} style={styles.button}>
              <Text style={styles.buttonText}>Siguiente</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default PaginatioMaterial;

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
  noDataText: {
    textAlign: 'center',
    color: '#6B7280',
  },
  list: {
    paddingBottom: 16,
  },
  item: {
    flex: 1,
    margin: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
  },
  imageContainer: {
    position: 'relative',
  },
  itemImage: {
    width: '100%',
    height: 120,
  },
  rating: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  ratingText: {
    color: '#1F2937',
    fontWeight: '500',
    fontSize: 12,
  },
  itemContent: {
    padding: 12,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  itemSubtitle: {
    color: '#6B7280',
    fontSize: 12,
    marginBottom: 8,
  },
  itemLink: {
    color: '#3B82F6',
    fontSize: 14,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  button: {
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
