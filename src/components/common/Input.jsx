import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Estilos base para el <input> o <textarea>
const baseInputStyles = `
  w-full py-3 rounded-lg
  bg-white dark:bg-slate-800 
  text-slate-900 dark:text-slate-100
  border border-slate-300 dark:border-slate-600
  placeholder-slate-400 dark:placeholder-slate-500
  focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500
  transition-colors
`;

/**
 * --- El Componente Input ---
 * * Props:
 * - label: (string) Texto para el <label>.
 * - id: (string) ID para conectar el label al input (importante para accesibilidad).
 * - name: (string) Nombre del input.
 * - as: (string) 'input' o 'textarea'. (default: 'input')
 * - icon: (objeto) El icono de FontAwesome (ej. faUser). (Opcional)
 * - type: (string) Tipo de input: 'text', 'password', 'email', etc. (default: 'text')
 * - className: (string) Clases extra para el *contenedor* (para espaciado, ej. 'mb-4').
 * - ...props: Todas las demás props (value, onChange, placeholder, rows) se pasan al input/textarea.
 */
function Input({
  label,
  id,
  name,
  as = "input",
  icon,
  type = "text",
  className = "",
  ...props
}) {
  // 1. Decide qué componente renderizar
  const InputComponent = as === "textarea" ? "textarea" : "input";

  // 2. Define los estilos de padding
  // Si hay icono, añadimos padding a la izquierda (pl-10)
  // Si no hay icono, padding normal (px-4)
  const paddingStyles = icon ? "pl-10 pr-4" : "px-4";

  // 3. Prepara las props para el componente (Input o Textarea)
  const inputProps = {
    id,
    name,
    className: `${baseInputStyles} ${paddingStyles}`,
    ...props, // Pasa value, onChange, placeholder, rows, etc.
  };

  if (as === "input") {
    inputProps.type = type;
  }

  return (
    <div className={`w-full ${className}`}>
      {/* 1. Etiqueta (Label) */}
      {label && ( // Solo muestra el label si se proporciona
        <label
          htmlFor={id}
          className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2"
        >
          {label}
        </label>
      )}

      {/* 2. Contenedor del Input (para posicionar el icono) */}
      {/* 'group' permite que el icono cambie de color cuando el input está en foco */}
      <div className="relative group">
        {/* 3. Icono (si se proporciona) */}
        {icon && (
          <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 dark:text-slate-500 transition-colors group-focus-within:text-cyan-500 pointer-events-none">
            <FontAwesomeIcon icon={icon} />
          </span>
        )}

        {/* 4. El Input o Textarea */}
        <InputComponent {...inputProps} />
      </div>
    </div>
  );
}

export default Input;
