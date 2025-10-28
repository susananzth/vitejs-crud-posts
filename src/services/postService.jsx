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

/**
 * Obtiene un único post por su ID.
 * @param {number|string} id - El ID del post.
 * @returns {Promise<object|null>} - Una promesa que resuelve al post.
 */
export const getPostById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error("Error al cargar el post");
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

/**
 * Elimina un post.
 * @param {number|string} id - El ID del post a eliminar.
 * @returns {Promise<boolean>} - True si tuvo éxito, false si no.
 */
export const deletePost = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Error al eliminar post");
    return true; // Éxito
  } catch (error) {
    console.error(error);
    return false; // Error
  }
};
