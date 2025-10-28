import PostItem from "./PostItem";

/**
 * Props que recibe:
 * - posts: (array) La lista de posts.
 * - onEdit: (función) Pasa al PostItem.
 * - onDelete: (función) Pasa al PostItem.
 */
function PostList({ posts, onEdit, onDelete }) {
  if (posts.length === 0) {
    return (
      <p className="text-center text-slate-900 dark:text-white">
        No hay posts para mostrar.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostItem
          key={post.id}
          post={post}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default PostList;
