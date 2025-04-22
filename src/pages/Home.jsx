// src/pages/Home.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-100">
      <div className="flex gap-8">
        <Card className="w-60 p-6 text-center shadow-md bg-white">
          <h2 className="text-xl font-semibold text-amber-900">Cliente</h2>
          <p className="text-sm text-gray-600 mb-4">Acompanhar pedido</p>
          <Button onClick={() => navigate("/cliente")}>Entrar</Button>
        </Card>

        <Card className="w-60 p-6 text-center shadow-md bg-white">
          <h2 className="text-xl font-semibold text-amber-900">Vendedor</h2>
          <p className="text-sm text-gray-600 mb-4">Agendar entrega ou manejo</p>
          <Button onClick={() => navigate("/vendedor")}>Entrar</Button>
        </Card>

        <Card className="w-60 p-6 text-center shadow-md bg-white">
          <h2 className="text-xl font-semibold text-amber-900">Logística</h2>
          <p className="text-sm text-gray-600 mb-4">Aprovar entregas e ver rotas</p>
          <Button onClick={() => navigate("/logistica")}>Entrar</Button>
        </Card>
      </div>
    </div>
  );
}
