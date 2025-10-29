import { useState, useEffect } from "react";
import * as postService from "../services/postService";
import PostTable from "../components/posts/PostTable";
import Button from "../components/common/Button";
import ConfirmationModal from "../components/common/ConfirmationModal";

function PostListPage() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // --- Estados del Modal ---
  const [modalIsOpen, setModalIsOpen] = useState(false);
  // Guardamos el ID del post que se va a eliminar
  const [postToDelete, setPostToDelete] = useState(null);

  // Cargar posts al iniciar
  useEffect(() => {
    // Patrón de carga de datos: Iniciar carga, llamar al servicio, manejar éxito/error.
    setIsLoading(true);
    postService
      .getPosts()
      .then((data) => {
        setPosts(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error al obtener los posts:", err);
        setIsLoading(false);
      });
  }, []); // El array vacío asegura que solo se ejecuta al montar el componente

  // Paso 1: Abrir el modal. Esta función se pasa al PostTable
  const handleDeleteRequest = (id) => {
    setPostToDelete(id); // Guarda el ID
    setModalIsOpen(true); // Abre el modal
  };

  // Paso 2: Cerrar el modal
  const handleCloseModal = () => {
    setModalIsOpen(false);
    setPostToDelete(null); // Limpia el ID
  };

  // Paso 3: Confirmar eliminación
  const handleConfirmDelete = async () => {
    if (postToDelete) {
      // Llamada al servicio de eliminación
      const success = await postService.deletePost(postToDelete);

      if (success) {
        // Actualiza el estado local (optimistic update)
        // Patrón de Inmutabilidad: Usamos .filter() para no mutar el estado anterior.
        setPosts(posts.filter((post) => post.id !== postToDelete));
      } else {
        console.error("Error al eliminar el post");
      }
      handleCloseModal(); // Cierra el modal
    }
  };

  return (
    <div className="container mx-auto max-w-5xl px-4 py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
          Gestor de Posts
        </h1>
        <Button to="/posts/nuevo" variant="primary">
          Crear Nuevo Post
        </Button>
      </div>

      {isLoading ? (
        <p className="text-center text-gray-500">Cargando posts...</p>
      ) : (
        <PostTable
          posts={posts} // Pasa los datos
          onDelete={handleDeleteRequest} // Pasa la función para ABRIR el modal
        />
      )}

      {/* El Modal de Confirmación */}
      <ConfirmationModal
        isOpen={modalIsOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        title="Confirmar Eliminación"
        message={`¿Estás seguro de que deseas eliminar este post? (ID: ${postToDelete}) Esta acción no se puede deshacer.`}
      />
    </div>
  );
}

export default PostListPage;
