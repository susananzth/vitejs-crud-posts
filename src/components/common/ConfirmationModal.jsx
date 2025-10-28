/**
 * Props:
 * - isOpen: (boolean) Controla si el modal está visible.
 * - onClose: (función) Se llama al hacer clic en "Cancelar" o fuera del modal.
 * - onConfirm: (función) Se llama al hacer clic en "Eliminar".
 * - title: (string) Título del modal.
 * - message: (string) Mensaje de confirmación.
 */
function ConfirmationModal({ isOpen, onClose, onConfirm, title, message }) {
  if (!isOpen) return null;

  return (
    // Fondo oscuro (backdrop)
    <div
      className="fixed inset-0 bg-black/70 z-40 flex justify-center items-center"
      onClick={onClose} // Cierra el modal si se hace clic fuera
    >
      {/* Contenedor del Modal */}
      <div
        className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-xl z-50 max-w-sm w-full mx-4"
        onClick={(e) => e.stopPropagation()} // Evita que el clic se propague al fondo
      >
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
          {title}
        </h3>
        <p className="text-slate-600 dark:text-slate-400 mb-6">{message}</p>

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg text-sm font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 focus:ring-4 focus:ring-slate-500/50 focus:outline-none transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2.5 rounded-lg text-sm font-bold text-white bg-red-600 shadow-lg shadow-red-600/30 transition-all duration-300 ease-in-out hover:bg-red-500 hover:shadow-red-500/40 focus:ring-4 focus:ring-red-500/50 focus:outline-none"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
