import { useMemo } from "react";
import Button from "./Button";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * Genera el array de números de página a mostrar, siguiendo un patrón
 * de "paginación inteligente" (ej. [1, ..., 5, 6, 7, ..., 10]).
 *
 * @param {number} totalPages - Número total de páginas.
 * @param {number} currentPage - La página actual.
 * @param {number} siblingCount - Número de páginas a mostrar a cada lado de la actual.
 * @returns {Array<number|string>} Array de números de página o elipsis '...'
 */
const range = (start, end) => {
  let length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

const DOTS = "..."; // Representación delipsis

const usePagination = ({ totalPages, currentPage, siblingCount = 1 }) => {
  return useMemo(() => {
    // Si el total de páginas es pequeño (ej. <= 5), muestra todos los números
    const totalPageNumbers = siblingCount + 5; // [1, 2, 3, 4, 5]

    if (totalPageNumbers >= totalPages) {
      return range(1, totalPages);
    }

    // Calcula los límites a mostrar
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

    const firstPageIndex = 1;
    const lastPageIndex = totalPages;

    // Caso 1: No hay puntos a la izquierda, solo a la derecha
    if (!shouldShowLeftDots && shouldShowRightDots) {
      // Ej: [1, 2, 3, ..., 10]
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);
      return [...leftRange, DOTS, lastPageIndex];
    }

    // Caso 2: No hay puntos a la derecha, solo a la izquierda
    if (shouldShowLeftDots && !shouldShowRightDots) {
      // Ej: [1, ..., 8, 9, 10]
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = range(totalPages - rightItemCount + 1, totalPages);
      return [firstPageIndex, DOTS, ...rightRange];
    }

    // Caso 3: Puntos a ambos lados
    if (shouldShowLeftDots && shouldShowRightDots) {
      // Ej: [1, ..., 5, 6, 7, ..., 10]
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }

    return range(1, totalPages);
  }, [totalPages, currentPage, siblingCount]);
};

/**
 * Componente de Paginación.
 * Muestra los botones para navegar entre páginas.
 *
 * @param {number} totalPages - Número total de páginas.
 * @param {number} currentPage - La página actual.
 * @param {function} onPageChange - Función para cambiar de página.
 * @param {number} totalItems - El número total de items.
 */
function Pagination({ totalPages, currentPage, onPageChange, totalItems }) {
  // Utiliza el hook de paginación para obtener los elementos a renderizar
  const paginationRange = usePagination({
    totalPages,
    currentPage,
    siblingCount: 1,
  });

  // Si no hay datos (ej. al buscar un término que no existe)
  if (totalPages <= 1 && totalItems === 0) {
    return null;
  }

  // Si solo hay una página y hay items, no muestra controles pero sí el conteo
  if (totalPages <= 1 && totalItems > 0) {
    return (
      <div className="flex justify-end py-2 px-4 text-sm text-slate-600 dark:text-slate-400">
        Mostrando **{totalItems}** de **{totalItems}** resultados.
      </div>
    );
  }

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center p-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 rounded-b-xl">
      {/* Indicador de resultados */}
      <div className="text-sm text-slate-600 dark:text-slate-400 mb-4 sm:mb-0">
        Página <strong>{currentPage}</strong> de <strong>{totalPages}</strong> (
        {totalItems} resultados)
      </div>

      {/* Controles de Paginación */}
      <div className="flex items-center space-x-2">
        {/* Botón Anterior */}
        <Button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={isFirstPage}
          variant="secondary"
          className="p-2.5 px-3!" // Sobreescribe estilos para hacerlo más pequeño
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </Button>

        {/* Números de Página */}
        <nav className="flex space-x-2" aria-label="Pagination">
          {paginationRange.map((pageNumber, index) => {
            // Elipsis (...)
            if (pageNumber === DOTS) {
              return (
                <span
                  key={index}
                  className="px-3 py-2.5 text-slate-500 dark:text-slate-400 font-bold"
                >
                  ...
                </span>
              );
            }

            // Botón de Página
            const isCurrent = pageNumber === currentPage;
            return (
              <Button
                key={index}
                onClick={() => onPageChange(pageNumber)}
                variant={isCurrent ? "primary" : "secondary"}
                className={`p-2.5 px-4! ${
                  isCurrent ? "pointer-events-none" : ""
                }`}
              >
                {pageNumber}
              </Button>
            );
          })}
        </nav>

        {/* Botón Siguiente */}
        <Button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={isLastPage}
          variant="secondary"
          className="p-2.5 px-3!"
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </Button>
      </div>
    </div>
  );
}

export default Pagination;
