import { useState, useEffect } from "react";
import { faHeading, faParagraph } from "@fortawesome/free-solid-svg-icons";
import Button from "../common/Button";
import Input from "../common/Input";

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
      className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg dark:shadow-none dark:ring-1 dark:ring-slate-700"
    >
      <Input
        label="Título"
        id="title"
        name="title"
        icon={faHeading}
        placeholder="Escribe el título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mb-5"
      />

      <Input
        as="textarea"
        label="Contenido"
        id="body"
        name="body"
        icon={faParagraph}
        placeholder="Escribe el contenido"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={5}
        className="mb-6"
      />

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
