import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Cliente from './pages/Cliente.jsx';
import Vendedor from "./pages/Vendedor.jsx";
import Logistica from './pages/Logistica.jsx';
import NotFound from './pages/NotFound.jsx';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cliente" element={<Cliente />} />
      <Route path="/vendedor" element={<Vendedor />} />
      <Route path="/logistica" element={<Logistica />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
