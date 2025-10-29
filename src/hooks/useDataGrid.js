import { useState, useMemo, useCallback } from "react";

// Definición de las constantes de dirección de ordenamiento
const SORT_DIRECTIONS = {
  ASC: "asc", // Ascendente
  DESC: "desc", // Descendente
};

/**
 * Hook personalizado para manejar la lógica de una Data Grid (búsqueda, paginación, ordenamiento).
 *
 * Principio: Separación de Responsabilidades (SRP). La lógica de gestión de datos
 * está separada del componente de presentación (la tabla).
 *
 * @param {Array<object>} initialData - El array de datos iniciales.
 * @param {number} initialPageSize - El número de elementos por página.
 * @returns {object} Un objeto con los datos procesados y las funciones de control.
 */
export const useDataGrid = (initialData, initialPageSize = 5) => {
  // --- ESTADOS ---

  // Estado del término de búsqueda (filtro dinámico)
  const [searchTerm, setSearchTerm] = useState("");
  // Estado para el ordenamiento: { column: 'id', direction: 'asc' }
  const [sortConfig, setSortConfig] = useState({
    column: null,
    direction: SORT_DIRECTIONS.ASC, // Por defecto, orden ascendente
  });
  // Estado de paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  // --- LÓGICA DE PROCESAMIENTO DE DATOS (useMemo para optimización) ---

  // 1. Filtrado de Datos
  const filteredData = useMemo(() => {
    // Si no hay término de búsqueda, devolvemos los datos completos
    if (!searchTerm) {
      return initialData;
    }

    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    // Filtra el array, buscando el término en cualquier valor de propiedad de cada objeto
    return initialData.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(lowerCaseSearchTerm)
      )
    );
  }, [initialData, searchTerm]); // Se recalcula si cambian los datos o el término

  // 2. Ordenamiento de Datos
  const sortedData = useMemo(() => {
    // Se utiliza una copia para no mutar el estado original del array filtrado
    const sortableItems = [...filteredData];
    const { column, direction } = sortConfig;

    // Si no hay columna definida, devolvemos los datos sin ordenar (solo filtrados)
    if (!column) return sortableItems;

    sortableItems.sort((a, b) => {
      // Manejo de valores nulos, undefined o distintos de string/number
      const aValue = a[column];
      const bValue = b[column];

      // Convertimos a string para una comparación uniforme, luego a minúsculas
      const aString = String(aValue).toLowerCase();
      const bString = String(bValue).toLowerCase();

      if (aString < bString) {
        return direction === SORT_DIRECTIONS.ASC ? -1 : 1;
      }
      if (aString > bString) {
        return direction === SORT_DIRECTIONS.ASC ? 1 : -1;
      }
      return 0; // Son iguales
    });

    return sortableItems;
  }, [filteredData, sortConfig]); // Se recalcula si cambia la data filtrada o el config de orden

  // 3. Paginación de Datos
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    // Retorna solo el segmento de datos para la página actual
    return sortedData.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, pageSize, sortedData]); // Se recalcula con cada cambio de paginación u orden

  // --- MANEJADORES DE ESTADO (Funciones Públicas) ---

  /**
   * Cambia la configuración de ordenamiento.
   * Si se hace clic en la misma columna, invierte la dirección.
   * @param {string} column - Nombre de la columna por la que ordenar.
   */
  const handleSort = useCallback(
    (column) => {
      setSortConfig((prevConfig) => {
        let direction = SORT_DIRECTIONS.ASC; // Por defecto: ascendente

        // Si es la misma columna, invertimos la dirección
        if (
          prevConfig.column === column &&
          prevConfig.direction === SORT_DIRECTIONS.ASC
        ) {
          direction = SORT_DIRECTIONS.DESC;
        }

        // Siempre volvemos a la primera página después de un nuevo ordenamiento
        setCurrentPage(1);
        return { column, direction };
      });
    },
    []
  );

  /**
   * Actualiza el término de búsqueda y vuelve a la primera página.
   * @param {string} term - El nuevo término de búsqueda.
   */
  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
    setCurrentPage(1); // Volvemos a la página 1 después de una nueva búsqueda
  }, []);

  /**
   * Actualiza el número de elementos por página y vuelve a la primera página.
   * @param {number} size - El nuevo tamaño de página.
   */
  const handlePageSizeChange = useCallback((size) => {
    setPageSize(size);
    setCurrentPage(1); // Volvemos a la página 1 después de cambiar el tamaño
  }, []);

  /**
   * Cambia a una página específica.
   * @param {number} page - El número de página (empezando en 1).
   */
  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  // --- CÁLCULO DE METADATOS DE PAGINACIÓN ---

  const totalItems = sortedData.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages || totalPages === 0;

  return {
    // Datos procesados
    data: currentTableData,
    // Funciones de control
    handleSort,
    handleSearch,
    handlePageSizeChange,
    handlePageChange,
    // Estados y metadatos
    sortConfig,
    searchTerm,
    currentPage,
    pageSize,
    totalItems,
    totalPages,
    isFirstPage,
    isLastPage,
    SORT_DIRECTIONS, // Exportamos la constante para usar en el componente de tabla
  };
};