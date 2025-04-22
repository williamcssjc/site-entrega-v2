import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../lib/firebaseConfig";

export default function FormularioAgendamento({ cidade }) {
  const [cliente, setCliente] = useState("");
  const [endereco, setEndereco] = useState("");
  const [data, setData] = useState("");
  const [vendedor, setVendedor] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleAgendar = async (e) => {
    e.preventDefault();

    if (!cliente || !endereco || !data || !vendedor) {
      setMensagem("Preencha todos os campos.");
      return;
    }

    try {
      await addDoc(collection(db, "entregas"), {
        cliente,
        endereco,
        data,
        vendedor,
        cidade,
        status: "pendente"
      });

      setMensagem("Entrega agendada com sucesso!");
      setCliente("");
      setEndereco("");
      setData("");
      setVendedor("");
    } catch (err) {
      console.error(err);
      setMensagem("Erro ao agendar entrega.");
    }
  };

  return (
    <form onSubmit={handleAgendar} className="bg-white p-4 rounded shadow mt-6 space-y-4">
      <h2 className="text-lg font-semibold text-gray-700">Agendar nova entrega em {cidade}</h2>

      <input
        type="text"
        placeholder="Nome do cliente"
        value={cliente}
        onChange={(e) => setCliente(e.target.value)}
        className="w-full border px-3 py-2 rounded"
      />

      <input
        type="text"
        placeholder="Endereço"
        value={endereco}
        onChange={(e) => setEndereco(e.target.value)}
        className="w-full border px-3 py-2 rounded"
      />

      <input
        type="date"
        value={data}
        onChange={(e) => setData(e.target.value)}
        className="w-full border px-3 py-2 rounded"
      />

      <input
        type="text"
        placeholder="Nome do vendedor"
        value={vendedor}
        onChange={(e) => setVendedor(e.target.value)}
        className="w-full border px-3 py-2 rounded"
      />

      <button
        type="submit"
        className="bg-amber-800 text-white px-4 py-2 rounded hover:bg-amber-700"
      >
        Agendar entrega
      </button>

      {mensagem && <p className="text-sm text-green-600">{mensagem}</p>}
    </form>
  );
}
