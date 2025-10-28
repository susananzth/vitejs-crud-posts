import { useState, useEffect } from "react";
import Button from "../common/Button";

/**
 * Props que recibe:
 * - onSubmit: (función) Se ejecuta al enviar el formulario.
 * - initialData: (objeto) Datos para precargar el formulario (para editar).
 * - onCancel' es una nueva prop que viene de PostFormPage
 */
function PostForm({ onSubmit, initialData = null, onCancel }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const commonInputStyles = `
    w-full px-4 py-3 rounded-lg 
    bg-white dark:bg-slate-800 
    text-slate-900 dark:text-slate-100
    border border-slate-300 dark:border-slate-600
    placeholder-slate-400 dark:placeholder-slate-500
    focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500
    transition-colors
  `;

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
      className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg dark:shadow-none dark:ring-1 dark:ring-slate-700"
    >
      <div className="mb-5">
        <label
          htmlFor="title"
          className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2"
        >
          Título
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={commonInputStyles}
          placeholder="Escribe el título"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="body"
          className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2"
        >
          Contenido
        </label>
        <textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className={`${commonInputStyles} min-h-[120px]`}
          rows="4"
          placeholder="Escribe el contenido"
        />
      </div>
      <div className="flex gap-4">
        <Button type="submit" variant="primary" className="flex-1">
          {initialData ? "Actualizar Post" : "Guardar Post"}
        </Button>
        {onCancel && (
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            className="flex-1"
          >
            Cancelar
          </Button>
        )}
      </div>
    </form>
  );
}

export default PostForm;
