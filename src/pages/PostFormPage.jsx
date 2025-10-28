import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PostForm from "../components/posts/PostForm";
import * as postService from "../services/postService";

function PostFormPage() {
  // Hooks de React Router
  const { id } = useParams(); // Obtiene el 'id' de la URL (si existe)
  const navigate = useNavigate(); // Para redirigir al usuario

  // Estado
  const [initialData, setInitialData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const isEditing = Boolean(id); // true si hay un 'id' en la URL

  // EFECTO: Cargar datos si estamos en modo "Edición"
  useEffect(() => {
    if (isEditing) {
      setIsLoading(true);
      postService
        .getPostById(id)
        .then((post) => {
          setInitialData(post);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setIsLoading(false);
          navigate("/posts");
        });
    }
  }, [id, isEditing, navigate]);

  // MANEJADOR: Se llama al enviar el formulario
  const handleSubmit = async (postData) => {
    try {
      if (isEditing) {
        // --- LÓGICA DE ACTUALIZACIÓN ---
        const updatedPostData = { ...initialData, ...postData };
        await postService.updatePost(id, updatedPostData);
      } else {
        // --- LÓGICA DE CREACIÓN ---
        await postService.createPost({ ...postData, userId: 1 });
      }

      // Redirigir a la lista de posts
      navigate("/posts");
    } catch (error) {
      console.error("Error al guardar el post:", error);
      // Aquí podrías mostrar un "toast" de error
    }
  };

  // Muestra "Cargando..." mientras busca el post a editar
  if (isEditing && isLoading) {
    return <div className="p-10 text-center text-xl">Cargando datos...</div>;
  }

  // Muestra el formulario (vacío si es 'nuevo', con datos si es 'editar')
  return (
    <div className="container mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        {isEditing ? "Editar Post" : "Crear Nuevo Post"}
      </h1>

      <PostForm
        onSubmit={handleSubmit}
        initialData={isEditing ? initialData : null}
        // 'navigate' para que el formulario pueda tener un botón "Cancelar"
        onCancel={() => navigate("/posts")}
      />
    </div>
  );
}

export default PostFormPage;
