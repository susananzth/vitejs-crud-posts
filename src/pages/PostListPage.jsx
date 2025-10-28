import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as postService from "../services/postService";

import PostList from "../components/posts/PostList";
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
    setIsLoading(true);
    postService
      .getPosts()
      .then((data) => {
        setPosts(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  // Paso 1: Abrir el modal
  // Esta función se pasa al PostItem
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
      const success = await postService.deletePost(postToDelete);
      if (success) {
        // Actualiza el estado local
        setPosts(posts.filter((post) => post.id !== postToDelete));
      } else {
        // (Opcional) Mostrar un "toast" de error
        console.error("Error al eliminar el post");
      }
      handleCloseModal(); // Cierra el modal
    }
  };

  return (
    <div className="container mx-auto max-w-3xl px-4 py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
          Gestor de Posts
        </h1>
        {/* Botón "Crear" que navega a la nueva ruta */}
        <Link
          to="/posts/nuevo"
          className="
            inline-block px-5 py-2.5 rounded-lg text-sm font-bold text-white
            bg-cyan-500 shadow-lg shadow-cyan-500/30
            transition-all duration-300 ease-in-out
            hover:bg-cyan-400 hover:shadow-cyan-400/40
            focus:ring-4 focus:ring-cyan-500/50 focus:outline-none"
        >
          Crear Nuevo Post
        </Link>
      </div>

      {isLoading ? (
        <p className="text-center text-gray-500">Cargando posts...</p>
      ) : (
        <PostList
          posts={posts}
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
