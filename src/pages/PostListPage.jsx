import { useState, useEffect } from "react";
import * as postService from "../services/postService";

import PostList from "../components/posts/PostList";

function PostListPage() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar posts al iniciar
  useEffect(() => {
    setIsLoading(true);
    postService
      .getPosts()
      .then((data) => {
        setPosts(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="container mx-auto max-w-3xl px-4 py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Gestor de Posts</h1>
      </div>

      {isLoading ? (
        <p className="text-center text-gray-500">Cargando posts...</p>
      ) : (
        <PostList posts={posts} />
      )}
    </div>
  );
}

export default PostListPage;
