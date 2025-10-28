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
    return (
      <div className="p-10 text-center text-xl dark:text-slate-200">
        Cargando post...
      </div>
    );
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
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl dark:shadow-none dark:ring-1 dark:ring-slate-700 p-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
          {post.title}
        </h1>

        <p className="text-slate-600 dark:text-slate-400 text-lg mb-6">
          {post.body}
        </p>

        <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            ID de Post: {post.id}
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            ID de Usuario: {post.userId}
          </p>
        </div>

        <Link
          to="/posts"
          className="inline-block mt-8 px-5 py-2.5 rounded-lg text-sm font-bold text-white bg-blue-500 shadow-lg shadow-blue-500/30 transition-all duration-300 ease-in-out hover:bg-blue-400 hover:shadow-blue-400/40 focus:ring-4 focus:ring-blue-500/50 focus:outline-none"
        >
          &larr; Volver a la lista
        </Link>
      </div>
    </div>
  );
}

export default PostDetailPage;
