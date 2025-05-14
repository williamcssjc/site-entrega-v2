import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Vendedor from "./pages/Vendedor";
import Logistica from "./pages/Logistica";
import Cliente from "./pages/Cliente";
import NotFound from "./pages/NotFound";
import Entregador from './pages/Entregador'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vendedor" element={<Vendedor />} />
        <Route path="/logistica" element={<Logistica />} />
        <Route path="/cliente" element={<Cliente />} />
        <Route path="/entregador" element={<Entregador />} /> {/* ✅ Nova rota */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
