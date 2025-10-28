import PostItem from "./PostItem";

/**
 * Props que recibe:
 * - posts: (array) La lista de posts.
 */
function PostList({ posts }) {
  if (posts.length === 0) {
    return (
      <p className="text-center text-gray-500">No hay posts para mostrar.</p>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
}

export default PostList;
