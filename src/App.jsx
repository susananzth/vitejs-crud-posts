import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Post from "./pages/Post";

function App() {
  return (
    <Routes>
      {/* Layout como ruta "padre" */}
      <Route path="/" element={<Layout />}>
        {/* Redirección: si van a la raíz o a otra página */}
        <Route index element={<Navigate to="/posts" replace />} />

        <Route path="posts" element={<Post />} />
      </Route>
    </Routes>
  );
}

export default App;
