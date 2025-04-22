import { useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";

const cidadesDisponiveis = [
  "São José dos Campos",
  "Atibaia",
  "Tremembé",
  "Taubaté",
  "Jacareí",
  "Guaratinguetá",
];

export default function ConsultaRapida({ onContinuar }) {
  const [cidade, setCidade] = useState("");
  const [mostrarSugestoes, setMostrarSugestoes] = useState(false);
  const [manejo, setManejo] = useState("sim");

  const sugestoesFiltradas = cidadesDisponiveis.filter((c) =>
    c.toLowerCase().startsWith(cidade.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const lojaOrigem =
      cidade.toLowerCase().includes("são josé") ? "SJC1" :
      cidade.toLowerCase().includes("atibaia") ? "Atibaia" :
      cidade.toLowerCase().includes("tremembé") ? "Estrada de Campos" :
      "Outra";

    const datasDisponiveis = ["17/04/2025", "18/04/2025", "19/04/2025"];

    onContinuar({
      cidade,
      manejo,
      lojaOrigem,
      datasDisponiveis,
    });
  };

  const handleSugestaoClick = (sugestao) => {
    setCidade(sugestao);
    setMostrarSugestoes(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
    >
      <h2 className="text-lg font-semibold mb-4">Consulta Rápida</h2>

      <Label>Cidade do cliente</Label>
      <div className="relative mb-4">
        <Input
          type="text"
          value={cidade}
          onChange={(e) => {
            setCidade(e.target.value);
            setMostrarSugestoes(true);
          }}
          onFocus={() => setMostrarSugestoes(true)}
          placeholder="Ex: São José dos Campos"
        />

        {mostrarSugestoes && sugestoesFiltradas.length > 0 && (
          <ul className="absolute z-10 bg-white border rounded shadow-md mt-1 w-full max-h-40 overflow-y-auto">
            {sugestoesFiltradas.map((sugestao, index) => (
              <li
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSugestaoClick(sugestao)}
              >
                {sugestao}
              </li>
            ))}
          </ul>
        )}
      </div>

      <Label>Precisa de manejo?</Label>
      <div className="flex gap-4 my-2">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            value="sim"
            checked={manejo === "sim"}
            onChange={() => setManejo("sim")}
          />
          Sim
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            value="nao"
            checked={manejo === "nao"}
            onChange={() => setManejo("nao")}
          />
          Não
        </label>
      </div>

      <Button type="submit" className="mt-4">
        Ver datas disponíveis
      </Button>
    </form>
  );
}
