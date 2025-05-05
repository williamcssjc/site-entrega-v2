import React, { useEffect, useState } from "react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Logistica() {
  const [entregas, setEntregas] = useState([]);
  const [pedidoReagendando, setPedidoReagendando] = useState(null);
  const [novaData, setNovaData] = useState("");

  useEffect(() => {
    const buscarEntregas = async () => {
      const snapshot = await getDocs(collection(db, "entregas"));
      const lista = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setEntregas(lista);
    };
    buscarEntregas();
  }, []);

  const atualizarStatus = async (id, novoStatus, novaDataEntrega = null) => {
    const entregaRef = doc(db, "entregas", id);
    const payload = novaDataEntrega
      ? { status: novoStatus, dataEntrega: novaDataEntrega }
      : { status: novoStatus };

    await updateDoc(entregaRef, payload);
    setPedidoReagendando(null);
    setNovaData("");
    window.location.reload();
  };

  const renderEntrega = (entrega) => (
    <div key={entrega.id} className="border p-4 rounded bg-white shadow mb-4">
      <p><strong>Pedido:</strong> {entrega.id}</p>
      <p><strong>Cliente:</strong> {entrega.nomeCliente}</p>
      <p><strong>Endereço:</strong> {entrega.endereco}</p>
      <p><strong>Data:</strong> {entrega.dataEntrega}</p>
      <p><strong>Status:</strong> {entrega.status}</p>
      <p><strong>Observações:</strong> {entrega.observacoes}</p>

      {entrega.status === "pendente" && (
        <div className="mt-2 flex gap-2">
          <Button onClick={() => atualizarStatus(entrega.id, "aprovada")}>Aprovar</Button>
          <Button variant="destructive" onClick={() => atualizarStatus(entrega.id, "recusada")}>Recusar</Button>
          <Button variant="outline" onClick={() => setPedidoReagendando(entrega.id)}>Reagendar</Button>
        </div>
      )}

      {pedidoReagendando === entrega.id && (
        <div className="mt-2">
          <Input
            type="date"
            value={novaData}
            onChange={(e) => setNovaData(e.target.value)}
          />
          <Button onClick={() => atualizarStatus(entrega.id, "reagendada", novaData)} className="mt-1">
            Confirmar nova data
          </Button>
        </div>
      )}
    </div>
  );

  const entregasPorStatus = (status) => entregas.filter(e => e.status === status);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <h2 className="text-2xl font-bold">Painel da Logística</h2>

      <div>
        <h3 className="text-lg font-semibold mb-2">Pendentes</h3>
        {entregasPorStatus("pendente").map(renderEntrega)}
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Aprovadas</h3>
        {entregasPorStatus("aprovada").map(renderEntrega)}
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Reagendadas</h3>
        {entregasPorStatus("reagendada").map(renderEntrega)}
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Entregues</h3>
        {entregasPorStatus("entregue").map(renderEntrega)}
      </div>
    </div>
  );
}
