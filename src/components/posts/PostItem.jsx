import { Link } from "react-router-dom";

/**
 * Props que recibe:
 * - post: (objeto) El post a mostrar.
 * - onDelete: (función) Callback al hacer clic en "Eliminar".
 */
function PostItem({ post, onDelete }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md dark:shadow-none dark:ring-1 dark:ring-slate-700 transition-shadow duration-300 hover:shadow-lg">
      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
          {post.title}
        </h3>
        <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
          {post.body}
        </p>
      </div>

      <div className="flex justify-end gap-3 border-t border-slate-200 dark:border-slate-700 px-6 py-4">
        <Link
          to={`/posts/ver/${post.id}`}
          className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 transition-colors"
        >
          Ver
        </Link>
        <Link
          to={`/posts/editar/${post.id}`}
          className="font-medium text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 transition-colors"
        >
          Editar
        </Link>
        <button
          onClick={() => onDelete(post.id)}
          className="font-medium text-red-600 dark:text-red-500 hover:text-red-400 transition-colors"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default PostItem;
