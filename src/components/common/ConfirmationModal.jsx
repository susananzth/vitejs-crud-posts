import Button from "./Button";

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
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            Eliminar
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
