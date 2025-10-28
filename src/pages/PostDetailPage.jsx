import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import * as postService from "../services/postService";

function PostDetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    postService
      .getPostById(id)
      .then((data) => {
        setPost(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return <div className="p-10 text-center text-xl">Cargando post...</div>;
  }

  if (!post) {
    return (
      <div className="p-10 text-center text-xl text-red-500">
        Post no encontrado.
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-2xl px-4 py-10">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{post.title}</h1>
        <p className="text-gray-600 text-lg mb-6">{post.body}</p>
        <div className="border-t pt-4">
          <p className="text-sm text-gray-500">ID de Post: {post.id}</p>
          <p className="text-sm text-gray-500">ID de Usuario: {post.userId}</p>
        </div>
        <Link
          to="/posts"
          className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          &larr; Volver a la lista
        </Link>
      </div>
    </div>
  );
}

export default PostDetailPage;
