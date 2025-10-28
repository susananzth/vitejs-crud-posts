const API_URL = "https://jsonplaceholder.typicode.com/posts";

/**
 * Obtiene una lista de posts.
 * @returns {Promise<Array>} - Una promesa que resuelve a un array de posts.
 */
export const getPosts = async () => {
  try {
    // Traemos solo 10 para el ejemplo
    const response = await fetch(`${API_URL}?_limit=10`);
    if (!response.ok) throw new Error("Error al cargar posts");
    return await response.json();
  } catch (error) {
    console.error(error);
    return []; // Devuelve un array vacío en caso de error
  }
};
