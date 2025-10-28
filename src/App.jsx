import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import PostListPage from "./pages/PostListPage";
import PostDetailPage from "./pages/PostDetailPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Redirige la raíz a /posts */}
        <Route index element={<Navigate to="/posts" replace />} />

        {/* Rutas CRUD de posts */}
        <Route path="posts" element={<PostListPage />} />
        <Route path="posts/ver/:id" element={<PostDetailPage />} />
      </Route>
    </Routes>
  );
}

export default App;
