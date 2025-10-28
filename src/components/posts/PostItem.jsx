import { Link } from "react-router-dom";

/**
 * Props que recibe:
 * - post: (objeto) El post a mostrar.
 * - onDelete: (función) Callback al hacer clic en "Eliminar".
 */
function PostItem({ post, onDelete }) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-4 transition-shadow duration-300 hover:shadow-xl">
      <h3 className="text-xl font-bold text-gray-800 mb-2">{post.title}</h3>
      <p className="text-gray-600 mb-4">{post.body}</p>

      <div className="flex justify-end gap-3 border-t pt-4 mt-4">
        <Link
          to={`/posts/ver/${post.id}`}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded-lg text-sm transition duration-200"
        >
          Ver
        </Link>
        <button
          onClick={() => onDelete(post.id)}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded-lg text-sm transition duration-200"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default PostItem;
