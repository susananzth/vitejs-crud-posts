import Input from "./Input";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

/**
 * Props del componente:
 * @param {string} searchTerm - El valor actual del input de búsqueda.
 * @param {function} onSearchChange - Función para manejar el cambio en el input de búsqueda.
 * @param {number} pageSize - El número de elementos por página actual.
 * @param {function} onPageSizeChange - Función para manejar el cambio en el select.
 * @param {Array<number>} availableSizes - Opciones disponibles para "elementos por página".
 */
function TableControls({
  searchTerm,
  onSearchChange,
  pageSize,
  onPageSizeChange,
  availableSizes = [5, 10, 20],
}) {
  // Manejador para el cambio en el selector de tamaño de página
  const handleSelectChange = (e) => {
    // Asegura que el valor se convierta a número
    onPageSizeChange(Number(e.target.value));
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4 p-4 rounded-t-xl bg-slate-50 dark:bg-slate-800 border border-b-0 border-slate-200 dark:border-slate-700">
      {/* 1. Buscador Dinámico (utilizando tu componente Input) */}
      <div className="w-full md:w-1/2">
        <Input
          id="search-posts"
          name="search-posts"
          placeholder="Buscar en toda la tabla..."
          icon={faSearch}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          // Eliminamos el label para mantenerlo compacto en la tabla
          className="m-0"
        />
      </div>

      {/* 2. Selector de "Elementos por Página" */}
      <div className="flex items-center space-x-2">
        <label
          htmlFor="page-size-select"
          className="text-sm font-medium text-slate-700 dark:text-slate-300 whitespace-nowrap"
        >
          Posts por página:
        </label>
        {/* Utilizamos tu estilo base de Input para el select */}
        <select
          id="page-size-select"
          name="page-size-select"
          value={pageSize}
          onChange={handleSelectChange}
          className="py-2 px-3 border border-slate-300 dark:border-slate-600 rounded-lg text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
        >
          {availableSizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default TableControls;
