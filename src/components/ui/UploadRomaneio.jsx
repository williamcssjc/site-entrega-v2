// src/components/ui/UploadRomaneio.jsx
import React from "react";
import * as pdfjsLib from "pdfjs-dist";
import { Input } from "./input";
import { Label } from "./label";

// configura worker do PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js";

export default function UploadRomaneio({ onDadosExtraidos }) {
  const handlePDFUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // fallback para número do pedido pelo nome do arquivo
    const nomeArquivo = file.name;
    const matchArq = nomeArquivo.match(/(\d{5,6})/);
    const fallbackPedido = matchArq ? matchArq[1] : "";

    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const data = new Uint8Array(reader.result);
        const pdf = await pdfjsLib.getDocument({ data }).promise;
        const page = await pdf.getPage(1);
        const content = await page.getTextContent();

        // agrupa por 'y' aproximado
        const linhasMap = {};
        content.items.forEach((itm) => {
          const y = Math.round(itm.transform[5]); // transform[5] é o y
          if (!linhasMap[y]) linhasMap[y] = [];
          linhasMap[y].push({ x: itm.transform[4], str: itm.str });
        });

        // monta array de linhas ordenadas de cima para baixo
        const yCoords = Object.keys(linhasMap)
          .map((y) => parseInt(y))
          .sort((a, b) => b - a); // invertido: PDF vai de topo pra base
        const rawLines = yCoords.map((y) =>
          linhasMap[y]
            .sort((a, b) => a.x - b.x)
            .map((c) => c.str.trim())
            .join(" ")
            .trim()
        );

                // ...
        // ...
        // depois de montar rawLines[]
        const pegaValor = (labelRegex) => {
          const idx = rawLines.findIndex((l) => labelRegex.test(l));
          if (idx === -1) return "";
          // valor na própria linha depois do “:”
          const parts = rawLines[idx].split(/:/);
          let val = parts.length > 1 ? parts.slice(1).join(":").trim() : "";
          // se bateu exatamente o cabeçalho (sem conteúdo), pega a próxima linha
          const headerOnly = rawLines[idx].trim().match(/^(\w+\s?)+$/);
          if ((!val || headerOnly) && rawLines[idx + 1]) {
            val = rawLines[idx + 1].trim();
          }
          return val;
        };

        const dados = {
          numeroPedido:
            pegaValor(/PEDIDO\s*º/i) ||
            pegaValor(/pedido nº/i) ||
            fallbackPedido,
          nomeCliente: pegaValor(/NOME\s+LEGÍVEL/i) || pegaValor(/CLIENTE:/i),
          endereco: pegaValor(/ENDEREÇ?O:/i),
          produto: pegaValor(/DADOS\s+DOS\s+PRODUTOS/i),
          vendedor: pegaValor(/Vendedor:/i),
        };


        

        // se não achar no rótulo "NOME LEGÍVEL", usa CLIENTE:
        if (!dados.nomeCliente && dados.nomeClienteAlt) {
          dados.nomeCliente = dados.nomeClienteAlt;
        }
        delete dados.nomeClienteAlt;

        console.log("Linhas extraídas:", rawLines);
        console.log("Dados estruturados:", dados);
        onDadosExtraidos(dados);
      } catch (err) {
        console.error("Erro ao ler PDF:", err);
        alert("Não foi possível processar o PDF.");
      }
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="space-y-2">
      <Label>Romaneio (PDF)</Label>
      <Input type="file" accept="application/pdf" onChange={handlePDFUpload} />
    </div>
  );
}
