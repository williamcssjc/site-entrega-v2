import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ComboboxCidades } from "@/components/ui/ComboboxCidades";
import { db } from "@/lib/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { Input } from "@/components/ui/input";

const lojasComManejo = ["SJC1", "SJC2", "Av. Atibaia", "Fernão Dias", "Estrada de Campos"];

const Vendedor = () => {
  const [cidadeSelecionada, setCidadeSelecionada] = useState("");
  const [datasSugestao, setDatasSugestao] = useState([]);
  const [buscou, setBuscou] = useState(false);
  const [manejoNecessario, setManejoNecessario] = useState(null);
  const [lojaSelecionada, setLojaSelecionada] = useState("");
  const [dataSugeridaManejo, setDataSugeridaManejo] = useState("");
  const [dataFinalSelecionada, setDataFinalSelecionada] = useState("");
  const [mostrarFormularioAgendamento, setMostrarFormularioAgendamento] = useState(false);

  const [nomeCliente, setNomeCliente] = useState("");
  const [numeroPedido, setNumeroPedido] = useState("");
  const [endereco, setEndereco] = useState("");
  const [produto, setProduto] = useState("");
  const [vendedor, setVendedor] = useState("");
  const [observacoes, setObservacoes] = useState("");

  const gerarDatasEntrega = (inicio = new Date(), quantidade = 3) => {
    const datas = [];
    let data = new Date(inicio);
    for (let i = 0; i < quantidade; i++) {
      data.setDate(data.getDate() + 1);
      datas.push(data.toISOString().slice(0, 10));
    }
    return datas;
  };

  const buscarDatas = () => {
    if (!cidadeSelecionada) return;
    const hoje = new Date();
    const sugestoes = gerarDatasEntrega(hoje, 3);
    setDatasSugestao(sugestoes);
    setBuscou(true);
    setManejoNecessario(null);
    setDataFinalSelecionada("");
  };

  const sugerirManejo = (loja) => {
    const hoje = new Date();
    const diaManejo = gerarDatasEntrega(hoje, 1)[0];
    setDataSugeridaManejo(diaManejo);
  };

  const handleAgendarEntrega = async () => {
    if (!numeroPedido || !nomeCliente || !endereco || !produto || !vendedor || !dataFinalSelecionada) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    const dadosEntrega = {
      cidade: cidadeSelecionada,
      dataEntrega: dataFinalSelecionada,
      dataManejo: manejoNecessario ? dataSugeridaManejo : null,
      endereco,
      equipeId: manejoNecessario ? lojaSelecionada : null,
      nomeCliente,
      produto,
      observacoes,
      status: "pendente",
      vendedor,
    };

    try {
      await setDoc(doc(db, "entregas", numeroPedido), dadosEntrega);
      alert("Entrega agendada com sucesso!");
    } catch (err) {
      console.error("Erro ao agendar entrega:", err);
      alert("Erro ao agendar. Tente novamente.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <h2 className="text-xl font-bold mb-4">Consulta de Datas</h2>

      <ComboboxCidades onChange={(cidade) => setCidadeSelecionada(cidade)} />

      <Button onClick={buscarDatas} className="mt-2">Buscar Datas</Button>

      {buscou && (
        <div className="space-y-4 mt-4">
          <div>
            <h3 className="font-semibold">Sugestões de datas de entrega:</h3>
            <ul className="list-disc ml-4">
              {datasSugestao.map((data, idx) => (
                <li key={idx}>{data}</li>
              ))}
            </ul>
          </div>

          {manejoNecessario === null && (
            <div>
              <p className="mt-2">Essa entrega precisa de manejo?</p>
              <div className="flex gap-4 mt-2">
                <Button onClick={() => setManejoNecessario(true)}>Sim</Button>
                <Button onClick={() => setManejoNecessario(false)}>Não</Button>
              </div>
            </div>
          )}
        </div>
      )}

      {manejoNecessario === false && (
        <div className="mt-4 space-y-2">
          <p>Escolher data final para entrega</p>
          <select value={dataFinalSelecionada} onChange={(e) => setDataFinalSelecionada(e.target.value)} className="border rounded px-2 py-1">
            <option value="">Selecione uma data</option>
            {datasSugestao.map((data, idx) => (
              <option key={idx} value={data}>{data}</option>
            ))}
          </select>
        </div>
      )}

      {manejoNecessario === true && (
        <div className="mt-4 space-y-4">
          <p>De qual loja sairá o manejo?</p>
          <select value={lojaSelecionada} onChange={(e) => {
            setLojaSelecionada(e.target.value);
            sugerirManejo(e.target.value);
          }} className="border rounded px-2 py-1">
            <option value="">Selecione a loja</option>
            {lojasComManejo.map((loja) => (
              <option key={loja} value={loja}>{loja}</option>
            ))}
          </select>

          {dataSugeridaManejo && (
            <div>
              <p>Data sugerida para o manejo: <strong>{dataSugeridaManejo}</strong></p>
              <p className="mt-2">Datas sugeridas para entrega após manejo:</p>
              <select value={dataFinalSelecionada} onChange={(e) => setDataFinalSelecionada(e.target.value)} className="border rounded px-2 py-1">
                <option value="">Selecione a data final</option>
                {gerarDatasEntrega(new Date(dataSugeridaManejo), 3).map((data, idx) => (
                  <option key={idx} value={data}>{data}</option>
                ))}
              </select>
            </div>
          )}
        </div>
      )}

      {dataFinalSelecionada && (
        <div className="space-y-4 mt-6">
          <h4 className="font-medium">Preencha os dados da entrega:</h4>

          <Input placeholder="Nome do cliente" value={nomeCliente} onChange={(e) => setNomeCliente(e.target.value)} />
          <Input placeholder="Número do pedido" value={numeroPedido} onChange={(e) => setNumeroPedido(e.target.value)} />
          <Input placeholder="Endereço completo" value={endereco} onChange={(e) => setEndereco(e.target.value)} />
          <Input placeholder="Produto / móvel" value={produto} onChange={(e) => setProduto(e.target.value)} />
          <Input placeholder="Nome do vendedor" value={vendedor} onChange={(e) => setVendedor(e.target.value)} />
          <Input placeholder="Observações (opcional)" value={observacoes} onChange={(e) => setObservacoes(e.target.value)} />

          <Button className="mt-2" onClick={handleAgendarEntrega}>
            Agendar entrega
          </Button>
        </div>
      )}
    </div>
  );
};

export default Vendedor;
