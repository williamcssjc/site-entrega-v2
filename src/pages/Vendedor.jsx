import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ComboboxCidades } from "@/components/ui/ComboboxCidades";
import { db } from "@/lib/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import UploadRomaneio from "@/components/ui/UploadRomaneio";
import { toast } from "sonner";

const lojasComManejo = ["SJC1", "SJC2", "Av. Atibaia", "Fernão Dias", "Estrada de Campos"];

const SelectDataEntrega = ({ datas, value, onChange }) => (
  <select value={value} onChange={(e) => onChange(e.target.value)} className="border rounded px-2 py-2 w-full">
    <option value="">Escolher data</option>
    {datas.map((data, idx) => (
      <option key={idx} value={data}>{data}</option>
    ))}
  </select>
);

const gerarDatasEntrega = (inicio = new Date(), quantidade = 3) => {
  const datas = [];
  const data = new Date(inicio);
  for (let i = 0; i < quantidade; i++) {
    data.setDate(data.getDate() + 1);
    datas.push(data.toISOString().slice(0, 10));
  }
  return datas;
};

const Vendedor = () => {
  const [cidadeSelecionada, setCidadeSelecionada] = useState("");
  const [datasSugestao, setDatasSugestao] = useState([]);
  const [buscou, setBuscou] = useState(false);
  const [manejoNecessario, setManejoNecessario] = useState(null);
  const [lojaSelecionada, setLojaSelecionada] = useState("");
  const [dataSugeridaManejo, setDataSugeridaManejo] = useState("");
  const [dataFinalSelecionada, setDataFinalSelecionada] = useState("");

  const [nomeCliente, setNomeCliente] = useState("");
  const [numeroPedido, setNumeroPedido] = useState("");
  const [endereco, setEndereco] = useState("");
  const [produto, setProduto] = useState("");
  const [vendedor, setVendedor] = useState("");
  const [observacoes, setObservacoes] = useState("");

  const buscarDatas = () => {
    if (!cidadeSelecionada) {
      toast.warning("Selecione uma cidade antes de buscar datas.");
      return;
    }
    const sugestoes = gerarDatasEntrega(new Date(), 3);
    setDatasSugestao(sugestoes);
    setBuscou(true);
    setManejoNecessario(null);
    setDataFinalSelecionada("");
  };

  const sugerirManejo = (loja) => {
    const diaManejo = gerarDatasEntrega(new Date(), 1)[0];
    setDataSugeridaManejo(diaManejo);
  };

  const handleAgendarEntrega = async () => {
    if (!numeroPedido || !nomeCliente || !endereco || !produto || !vendedor || !dataFinalSelecionada) {
      toast.warning("Preencha todos os campos obrigatórios.");
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
      toast.success("Entrega agendada com sucesso!");
    } catch (err) {
      console.error("Erro ao agendar entrega:", err);
      toast.error("Erro ao agendar. Tente novamente.");
    }
  };

  const preencherFormularioComPDF = (dados) => {
    if (dados.nomeCliente) setNomeCliente(dados.nomeCliente);
    if (dados.numeroPedido) setNumeroPedido(dados.numeroPedido);
    if (dados.endereco) setEndereco(dados.endereco);
    if (dados.produto) setProduto(dados.produto);
    if (dados.vendedor) setVendedor(dados.vendedor);
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold mb-4">Agendamento de Entrega</h2>

      <div className="space-y-4">
        <ComboboxCidades value={cidadeSelecionada} onChange={setCidadeSelecionada} />
        <Button onClick={buscarDatas} className="w-full">Buscar Datas</Button>
      </div>

      {buscou && (
        <>
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Sugestões de datas:</h3>
            <ul className="list-disc list-inside">
              {datasSugestao.map((data, idx) => (
                <li key={idx}>{data}</li>
              ))}
            </ul>
          </div>

          {manejoNecessario === null && (
            <div className="mt-4 flex gap-4">
              <Button onClick={() => setManejoNecessario(true)}>Precisa de manejo</Button>
              <Button variant="outline" onClick={() => setManejoNecessario(false)}>Não precisa</Button>
            </div>
          )}

          {manejoNecessario !== null && (
            <>
              {manejoNecessario && (
                <div className="space-y-4 mt-4">
                  <p>Selecione a loja de manejo:</p>
                  <select
                    value={lojaSelecionada}
                    onChange={(e) => {
                      setLojaSelecionada(e.target.value);
                      sugerirManejo(e.target.value);
                    }}
                    className="border rounded px-2 py-2 w-full"
                  >
                    <option value="">Escolher loja</option>
                    {lojasComManejo.map((loja) => (
                      <option key={loja} value={loja}>{loja}</option>
                    ))}
                  </select>

                  {dataSugeridaManejo && (
                    <>
                      <p>Data sugerida para manejo: <strong>{dataSugeridaManejo}</strong></p>
                      <p>Selecione a data de entrega:</p>
                      <SelectDataEntrega
                        datas={gerarDatasEntrega(new Date(dataSugeridaManejo), 3)}
                        value={dataFinalSelecionada}
                        onChange={setDataFinalSelecionada}
                      />
                    </>
                  )}
                </div>
              )}

              {!manejoNecessario && (
                <div className="space-y-4 mt-4">
                  <p>Escolha a data de entrega:</p>
                  <SelectDataEntrega
                    datas={datasSugestao}
                    value={dataFinalSelecionada}
                    onChange={setDataFinalSelecionada}
                  />
                </div>
              )}
            </>
          )}
        </>
      )}

      {dataFinalSelecionada && (
        <form onSubmit={(e) => { e.preventDefault(); handleAgendarEntrega(); }} className="space-y-4 mt-6">
          <UploadRomaneio onDadosExtraidos={preencherFormularioComPDF} />
          <Input placeholder="Nome do cliente" value={nomeCliente} onChange={(e) => setNomeCliente(e.target.value)} />
          <Input placeholder="Número do pedido" value={numeroPedido} onChange={(e) => setNumeroPedido(e.target.value)} />
          <Input placeholder="Endereço completo" value={endereco} onChange={(e) => setEndereco(e.target.value)} />
          <Input placeholder="Produto / móvel" value={produto} onChange={(e) => setProduto(e.target.value)} />
          <Input placeholder="Nome do vendedor" value={vendedor} onChange={(e) => setVendedor(e.target.value)} />
          <Input placeholder="Observações (opcional)" value={observacoes} onChange={(e) => setObservacoes(e.target.value)} />

          <Button type="submit" className="w-full">Agendar Entrega</Button>
        </form>
      )}
    </div>
  );
};

export default Vendedor;
