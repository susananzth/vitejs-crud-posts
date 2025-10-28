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
      className="fixed inset-0 bg-black bg-opacity-60 z-40 flex justify-center items-center"
      onClick={onClose} // Cierra el modal si se hace clic fuera
    >
      {/* Contenedor del Modal */}
      <div
        className="bg-white p-6 rounded-lg shadow-xl z-50 max-w-sm w-full"
        onClick={(e) => e.stopPropagation()} // Evita que el clic se propague al fondo
      >
        <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>
        <p className="text-gray-700 mb-6">{message}</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
