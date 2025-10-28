import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import PostListPage from "./pages/PostListPage";
import PostFormPage from "./pages/PostFormPage";
import PostDetailPage from "./pages/PostDetailPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Redirige la raíz a /posts */}
        <Route index element={<Navigate to="/posts" replace />} />

        {/* Rutas CRUD de posts */}
        <Route path="posts" element={<PostListPage />} />
        <Route path="posts/nuevo" element={<PostFormPage />} />
        <Route path="posts/ver/:id" element={<PostDetailPage />} />
        <Route path="posts/editar/:id" element={<PostFormPage />} />
      </Route>
    </Routes>
  );
}

export default App;
