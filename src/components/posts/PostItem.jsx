/**
 * Props que recibe:
 * - post: (objeto) El post a mostrar.
 */
function PostItem({ post }) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-4 transition-shadow duration-300 hover:shadow-xl">
      <h3 className="text-xl font-bold text-gray-800 mb-2">{post.title}</h3>
      <p className="text-gray-600 mb-4">{post.body}</p>
    </div>
  );
}

export default PostItem;
