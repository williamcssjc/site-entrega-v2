import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Cliente from "./pages/Cliente";
import Vendedor from "./pages/Vendedor";
import Logistica from "./pages/Logistica";
import NotFound from "./pages/NotFound";
import 'leaflet/dist/leaflet.css';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="cliente" element={<Cliente />} />
        <Route path="vendedor" element={<Vendedor />} />
        <Route path="logistica" element={<Logistica />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
