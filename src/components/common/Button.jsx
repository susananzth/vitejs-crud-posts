import { Link } from "react-router-dom";

/**
 * --- Definición de Estilos ---
 * Aquí centralizamos todos los estilos de los botones
 */

// Estilos base comunes a todos los botones
const baseStyles =
  "inline-block px-5 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ease-in-out focus:ring-4 focus:outline-none";

// Estilos específicos para cada variante
const variantStyles = {
  primary: `
    text-white bg-cyan-500 shadow-lg shadow-cyan-500/30 
    hover:bg-cyan-400 hover:shadow-cyan-400/40 
    focus:ring-cyan-500/50
  `,
  blue: `
    text-white bg-blue-500 shadow-lg shadow-blue-500/30 
    hover:bg-blue-400 hover:shadow-blue-400/40 
    focus:ring-blue-500/50
  `,
  danger: `
    text-white bg-red-600 shadow-lg shadow-red-600/30 
    hover:bg-red-500 hover:shadow-red-500/40 
    focus:ring-red-600/50
  `,
  secondary: `
    text-slate-700 dark:text-slate-300 
    bg-slate-100 dark:bg-slate-700 
    hover:bg-slate-200 dark:hover:bg-slate-600 
    focus:ring-slate-500/50
  `,
};

/**
 * --- El Componente Botón ---
 * * Props:
 * - variant: 'primary', 'danger', 'secondary', 'blue' (default: 'primary')
 * - to:      Si se provee, renderiza un <Link> de React Router.
 * - href:    Si se provee, renderiza un <a> (para enlaces externos).
 * - type:    'button', 'submit' (default: 'button').
 * - className: Clases adicionales para Tailwind.
 * - children: El contenido del botón (texto, icono, etc.).
 * - ...otras props (como onClick) se pasan directamente.
 */
function Button({
  variant = "primary",
  to,
  href,
  type = "button",
  className = "",
  children,
  ...props
}) {
  // 1. Combina los estilos base, los de la variante, y las clases extras
  const appliedStyles = `
    ${baseStyles} 
    ${variantStyles[variant] || variantStyles.primary} 
    ${className}
  `;

  // 2. Renderiza un <Link> si 'to' existe
  if (to) {
    return (
      <Link to={to} className={appliedStyles} {...props}>
        {children}
      </Link>
    );
  }

  // 3. Renderiza un <a> si 'href' existe
  if (href) {
    return (
      <a href={href} className={appliedStyles} {...props}>
        {children}
      </a>
    );
  }

  // 4. Renderiza un <button> por defecto
  return (
    <button type={type} className={appliedStyles} {...props}>
      {children}
    </button>
  );
}

export default Button;
