import { useState, useEffect } from "react";

/**
 * Props que recibe:
 * - onSubmit: (función) Se ejecuta al enviar el formulario.
 * - initialData: (objeto) Datos para precargar el formulario (para editar).
 * - onCancel' es una nueva prop que viene de PostFormPage
 */
function PostForm({ onSubmit, initialData = null, onCancel }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  // Este efecto sincroniza el estado del formulario con `initialData`
  // Se usa para cargar los datos del post cuando hacemos clic en "Editar"
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setBody(initialData.body);
    } else {
      // Si no hay initialData (modo "Crear"), resetea el form
      setTitle("");
      setBody("");
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !body) return; // Validación simple

    // Llama a la función onSubmit que le pasamos desde App.jsx
    // Pasa un objeto con los datos del formulario
    onSubmit({ title, body });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-100 p-6 rounded-lg shadow-md mb-10"
    >
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
          Título
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Escribe el título"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="body" className="block text-gray-700 font-bold mb-2">
          Contenido
        </label>
        <textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="4"
          placeholder="Escribe el contenido"
        />
      </div>
      <div className="flex gap-4 mt-6">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
        >
          {initialData ? "Actualizar Post" : "Guardar Post"}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

export default PostForm;
