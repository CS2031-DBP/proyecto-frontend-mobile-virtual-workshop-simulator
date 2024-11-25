import React, { useEffect, useState } from "react";
import { View, Text, Image, Button, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getPosts } from "../api/post";
import { useAuth } from "../auth/AuthProvider";
import { getUsuario } from "../api/usuario";

interface Post {
  id: string;
  titulo: string;
  autorNombre: string;
  contenido: string;
  fechaCreacion: number;
}

interface Usuario {
  perfilUrl: string;
}

const PaginationPost: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { carreraId } = route.params as { carreraId: string };
  const { usuarioId } = useAuth();
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const limit = 3;

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const response = await getUsuario(usuarioId);
        setUsuario(response?.data);

        const data = await getPosts(page, limit, carreraId);
        setPosts(data.content as Post[]);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error al obtener productos:", error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [page]);

  const handleNext = () => {
    if (page < totalPages - 1) {
      setPage(page + 1);
    }
  };

  const handlePrevious = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const renderItem = ({ item }: { item: Post }) => (
    <TouchableOpacity
      style={styles.postContainer}
      onPress={() => navigation.navigate("PostDetails", { postId: item.id })}
    >
      <View style={styles.postHeader}>
        <Image
          source={{ uri: usuario?.perfilUrl || "https://via.placeholder.com/150" }}
          style={styles.profileImage}
        />
        <View>
          <Text style={styles.authorName}>{item.autorNombre}</Text>
          <Text style={styles.date}>
            {new Date(item.fechaCreacion).toLocaleDateString()}
          </Text>
        </View>
      </View>
      <Text style={styles.postTitle}>{item.titulo}</Text>
      <View style={styles.postContent}>
        <Text numberOfLines={4}>{item.contenido}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todas las Publicaciones</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={posts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      )}
      <View style={styles.pagination}>
        <Button title="Anterior" onPress={handlePrevious} disabled={page === 0} />
        <Button title="Siguiente" onPress={handleNext} disabled={page >= totalPages - 1} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  listContainer: {
    paddingBottom: 16,
  },
  postContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    backgroundColor: "#f9f9f9",
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  authorName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  date: {
    fontSize: 12,
    color: "#666",
  },
  postTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  postContent: {
    backgroundColor: "#f0f0f0",
    padding: 8,
    borderRadius: 4,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
});

export default PaginationPost;
