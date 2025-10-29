// src/components/posts/PostTable.jsx

import { useDataGrid } from "../../hooks/useDataGrid";
import Button from "../common/Button";
import TableControls from "../common/TableControls";
import Pagination from "../common/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSort,
  faSortUp,
  faSortDown,
} from "@fortawesome/free-solid-svg-icons";

/**
 * Componente que representa el encabezado (<th>) de una columna con lógica de ordenamiento.
 * @param {string} columnKey - La clave de la propiedad en el objeto (ej. 'title').
 * @param {string} label - El texto a mostrar en el encabezado.
 * @param {object} sortConfig - El estado actual del ordenamiento { column, direction }.
 * @param {function} onSort - Función para cambiar el ordenamiento.
 */
const SortableHeader = ({ columnKey, label, sortConfig, onSort }) => {
  // Determina el icono de ordenamiento a mostrar
  const getSortIcon = () => {
    if (sortConfig.column !== columnKey) {
      return faSort; // Icono neutro (no se está ordenando por esta columna)
    }
    // Icono arriba/abajo según la dirección
    return sortConfig.direction === "asc" ? faSortUp : faSortDown;
  };

  return (
    <th
      // Habilita la interacción con un cursor de puntero
      className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider cursor-pointer select-none"
      onClick={() => onSort(columnKey)}
    >
      <div className="flex items-center space-x-2">
        <span>{label}</span>
        {/* Muestra el icono de ordenamiento */}
        <FontAwesomeIcon
          icon={getSortIcon()}
          className={`
            ${
              sortConfig.column === columnKey
                ? "text-cyan-500"
                : "text-slate-400"
            }
            transition-colors duration-200
          `}
        />
      </div>
    </th>
  );
};

/**
 * La Data Grid de Posts con búsqueda, ordenamiento y paginación.
 *
 * Principios de Diseño:
 * - Contenedor/Presentador: Este es el componente Contenedor que maneja el estado
 * a través del hook y pasa las props a los componentes Presentadores (Controles, Paginación).
 * - Componentes Comunes: Reutiliza Button e Input para mantener la consistencia del diseño.
 *
 * @param {Array<object>} posts - La lista original de posts a gestionar.
 * @param {function} onDelete - Función para iniciar la eliminación de un post.
 */
function PostTable({ posts, onDelete }) {
  // Usa el hook para gestionar toda la lógica de la tabla
  const {
    data, // Los datos de la página actual, ya filtrados y ordenados
    handleSort,
    handleSearch,
    handlePageSizeChange,
    handlePageChange,
    sortConfig,
    searchTerm,
    pageSize,
    totalItems,
    totalPages,
    currentPage,
    SORT_DIRECTIONS,
  } = useDataGrid(posts, 5); // 5 por defecto como tamaño de página inicial

  // Si no hay posts después del filtrado (ej. búsqueda sin resultados)
  const isDataEmpty = data.length === 0 && totalItems > 0;
  const isSearchResultsEmpty = totalItems === 0 && searchTerm;

  return (
    <div className="shadow-xl rounded-xl ring-1 ring-slate-200 dark:ring-slate-700 overflow-hidden">
      {/* Controles de la Tabla (Buscador y Per Page) */}
      <TableControls
        searchTerm={searchTerm}
        onSearchChange={handleSearch}
        pageSize={pageSize}
        onPageSizeChange={handlePageSizeChange}
        availableSizes={[5, 10, 20, 50]}
      />

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
          {/* Encabezado de la Tabla */}
          <thead className="bg-slate-50 dark:bg-slate-800">
            <tr>
              {/* Encabezados Ordenables */}
              <SortableHeader
                columnKey="id"
                label="ID"
                sortConfig={sortConfig}
                onSort={handleSort}
              />
              <SortableHeader
                columnKey="title"
                label="Título"
                sortConfig={sortConfig}
                onSort={handleSort}
              />
              <SortableHeader
                columnKey="body"
                label="Cuerpo"
                sortConfig={sortConfig}
                onSort={handleSort}
              />
              {/* Columna de Acciones (no ordenable) */}
              <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>

          {/* Cuerpo de la Tabla */}
          <tbody className="bg-white dark:bg-slate-900 divide-y divide-slate-200 dark:divide-slate-700">
            {isDataEmpty && (
              <tr>
                <td
                  colSpan="4"
                  className="px-6 py-10 text-center text-slate-500 dark:text-slate-400"
                >
                  {/* Mensaje cuando no hay resultados de búsqueda */}
                  {isSearchResultsEmpty
                    ? `No se encontraron resultados para "${searchTerm}".`
                    : "No hay posts para mostrar."}
                </td>
              </tr>
            )}

            {data.map((post) => (
              <tr
                key={post.id}
                className="hover:bg-slate-50 dark:hover:bg-slate-800/70 transition-colors"
              >
                {/* ID */}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-white">
                  {post.id}
                </td>
                {/* Título */}
                <td className="px-6 py-4">
                  <span className="line-clamp-1 text-sm text-slate-900 dark:text-slate-200 font-semibold">
                    {post.title}
                  </span>
                </td>
                {/* Cuerpo */}
                <td className="px-6 py-4">
                  <p className="line-clamp-2 text-sm text-slate-500 dark:text-slate-400">
                    {post.body}
                  </p>
                </td>
                {/* Acciones */}
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                  <Button to={`/posts/ver/${post.id}`} variant="blue">
                    Ver
                  </Button>
                  <Button to={`/posts/editar/${post.id}`} variant="primary">
                    Editar
                  </Button>
                  <Button onClick={() => onDelete(post.id)} variant="danger">
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <Pagination
        totalItems={totalItems}
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default PostTable;
