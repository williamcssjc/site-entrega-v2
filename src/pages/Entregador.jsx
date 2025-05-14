import React, { useEffect, useState } from "react";
import Calendar from "../components/ui/Calendar";
import { db } from "../lib/firebaseConfig";
import { collection, query, getDocs } from "firebase/firestore";

function Entregador() {
  const [entregas, setEntregas] = useState([]);
  const [dataSelecionada, setDataSelecionada] = useState(new Date());
  const [entregasDoDia, setEntregasDoDia] = useState([]);

  useEffect(() => {
    async function fetchEntregas() {
      try {
        const q = query(collection(db, "entregas"));
        const querySnapshot = await getDocs(q);
        const dados = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEntregas(dados);
      } catch (error) {
        console.error("Erro ao buscar entregas:", error);
      }
    }

    fetchEntregas();
  }, []);

  useEffect(() => {
    // Filtro das entregas pela data selecionada
    const filtradas = entregas.filter((entrega) => {
      const dataEntrega = entrega.dataEntrega?.toDate?.();
      return (
        dataEntrega &&
        dataEntrega.toDateString() === dataSelecionada.toDateString()
      );
    });

    setEntregasDoDia(filtradas);
  }, [dataSelecionada, entregas]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Painel do Entregador</h1>

      <Calendar selected={dataSelecionada} onSelect={setDataSelecionada} />

      <h2 className="text-lg font-semibold mt-6">
        Entregas de {dataSelecionada.toLocaleDateString("pt-BR")}
      </h2>

      {entregasDoDia.length === 0 ? (
        <p className="text-gray-500 mt-2">Nenhuma entrega agendada para esse dia.</p>
      ) : (
        <ul className="mt-2 space-y-2">
          {entregasDoDia.map((entrega) => (
            <li key={entrega.id} className="border p-3 rounded shadow">
              <p><strong>Cliente:</strong> {entrega.nomeCliente}</p>
              <p><strong>Pedido:</strong> {entrega.numeroPedido}</p>
              <p><strong>Cidade:</strong> {entrega.cidade}</p>
              <p><strong>Móvel:</strong> {entrega.movels}</p>
              <p><strong>Status:</strong> {entrega.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Entregador;
