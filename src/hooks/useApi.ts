import axios from 'axios';
// import useToken from '../hooks/useToken';

const API_URL = 'http://localhost:8080';

// interface User {
//   fullName: string;
//   email: string;
//   password: string;
//   username: string;
// }

// interface Product {
//   name: string;
//   description: string;
//   price: number;
//   quantity: number;
//   imageUrl: string;
// }
interface  LoginRequest  {
  email: string;
  password: string;
};

//Registro
export const login = async (request: LoginRequest) => {
  try {
    const response = await axios.post<{ token: string, usuarioId: string }>(`${API_URL}/auth/login`, request);
    
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const register = async (request: LoginRequest) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, request);
    
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUsuario = async (id: string,token: string) => {
  const n_id = Number(id);
  try {
    const response = await axios.get(`${API_URL}/usuarios/${n_id}`, {
      headers: { Authorization: `Bearer ${token}` },
      params: {id},
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// // Configuración de Axios para incluir el token en las solicitudes de productos
// const getAuthHeaders = () => {
//   const token = localStorage.getItem('token');
//   return {
//     headers: { Authorization: `Bearer ${token}` },
//   };
// };

// // Administración de Productos
// export const createProduct = async (product: Product) => {
//   try {
//     const response = await axios.post(`${API_URL}/api/products`, product, getAuthHeaders());
//     console.log('Producto creado exitosamente');
//     return response.data;
//   } catch (error) {
//     console.error('Error al crear producto:', error);
//     throw error;
//   }
// };

// export const getProducts = async (skip: number, limit: number) => {
//   try {
//     const response = await axios.get(`${API_URL}/api/products`, {
//       ...getAuthHeaders(),
//       params: { skip, limit },
//     });
//     console.log('Productos obtenidos exitosamente');
//     return response.data;
//   } catch (error) {
//     console.error('Error al obtener productos:', error);
//     throw error;
//   }
// };

// export const getProductById = async (productId: string) => {
//   try {
//     const response = await axios.get(`${API_URL}/api/products/${productId}`, getAuthHeaders());
//     console.log('Producto obtenido exitosamente');
//     return response.data;
//   } catch (error) {
//     console.error('Error al obtener producto:', error);
//     throw error;
//   }
// };

// export const updateProduct = async (productId: string, product: Product) => {
//   try {
//     const response = await axios.put(`${API_URL}/api/products/${productId}`, product, getAuthHeaders());
//     console.log('Producto actualizado exitosamente');
//     return response.data;
//   } catch (error) {
//     console.error('Error al actualizar producto:', error);
//     throw error;
//   }
// };

// export const deleteProduct = async (productId: string) => {
//   try {
//     const response = await axios.delete(`${API_URL}/api/products/${productId}`, getAuthHeaders());
//     console.log('Producto eliminado exitosamente');
//     return response.data;
//   } catch (error) {
//     console.error('Error al eliminar producto:', error);
//     throw error;
//   }
// };