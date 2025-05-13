import { useEffect, useState } from "react";
import { db } from "../lib/firebaseConfig";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Corrige ícone padrão do Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function Cliente() {
  const [input, setInput] = useState("");
  const [dadosEntrega, setDadosEntrega] = useState(null);
  const [localEquipe, setLocalEquipe] = useState(null);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  const buscarEntrega = async () => {
    setErro("");
    setSucesso("");
    setDadosEntrega(null);
    setLocalEquipe(null);

    try {
      let entregaData = null;

      // Verifica se é um ID válido do Firestore
      const docRef = doc(db, "entregas", input.trim());
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        entregaData = docSnap.data();
      } else {
        // Tenta buscar por número do pedido
        const q = query(
          collection(db, "entregas"),
          where("numeroPedido", "==", input.trim())
        );
        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
          entregaData = snapshot.docs[0].data();
        }
      }

      if (!entregaData) {
        setErro("Pedido não encontrado.");
        return;
      }

      setDadosEntrega(entregaData);
      setSucesso("Entrega localizada com sucesso!");

      // Ouve posição da equipe em tempo real
      if (entregaData.equipeId) {
        const unsub = onSnapshot(
          doc(db, "rastreamentoEquipes", entregaData.equipeId),
          (snap) => {
            if (snap.exists()) setLocalEquipe(snap.data());
          }
        );
        return () => unsub(); // limpar ao desmontar
      }
    } catch (e) {
      console.error(e);
      setErro("Erro ao buscar dados.");
    }
  };

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "entregue":
        return "text-green-700 font-semibold";
      case "aprovada":
        return "text-blue-600 font-semibold";
      case "em rota":
        return "text-yellow-600 font-semibold";
      case "atrasada":
        return "text-red-600 font-semibold";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="min-h-screen p-6 text-zinc-800 bg-white">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-semibold mb-4">Rastreamento de Entrega</h1>

        <div className="flex flex-col sm:flex-row gap-2 mb-6">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Número do pedido ou ID"
            className="flex-1 border border-gray-300 rounded px-4 py-2"
          />
          <button
            onClick={buscarEntrega}
            className="bg-[#935c35] text-white px-4 py-2 rounded hover:opacity-90"
          >
            Buscar
          </button>
        </div>

        {erro && <p className="text-red-600 mb-2">{erro}</p>}
        {sucesso && <p className="text-green-600 mb-2">{sucesso}</p>}

        {dadosEntrega && (
          <div className="bg-gray-50 p-4 rounded shadow space-y-2">
            <p>
              <strong>Cliente:</strong> {dadosEntrega.nomeCliente}
            </p>
            <p>
              <strong>Endereço:</strong> {dadosEntrega.endereco}
            </p>
            <p>
              <strong>Cidade:</strong> {dadosEntrega.cidade}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span className={getStatusStyle(dadosEntrega.status)}>
                {dadosEntrega.status}
              </span>
            </p>
            <p>
              <strong>Data da Entrega:</strong> {dadosEntrega.dataEntrega}
            </p>
            {dadosEntrega.produto && (
              <p>
                <strong>Produto:</strong> {dadosEntrega.produto}
              </p>
            )}
            {dadosEntrega.observacoes && (
              <p>
                <strong>Observações:</strong> {dadosEntrega.observacoes}
              </p>
            )}
            <p>
              <strong>Vendedor:</strong> {dadosEntrega.vendedor}
            </p>
          </div>
        )}

        {localEquipe?.latitude && localEquipe?.longitude && (
          <div className="mt-6">
            <h2 className="font-semibold mb-2">
              Localização da Equipe{" "}
              <span className={getStatusStyle(localEquipe.status)}>
                ({localEquipe.status})
              </span>
            </h2>
            <MapContainer
              center={[localEquipe.latitude, localEquipe.longitude]}
              zoom={13}
              style={{ height: "300px", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker
                position={[localEquipe.latitude, localEquipe.longitude]}
              >
                <Popup>
                  Equipe: {dadosEntrega.equipeId} <br />
                  Status: {localEquipe.status}
                </Popup>
              </Marker>
            </MapContainer>

            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${localEquipe.latitude},${localEquipe.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 text-sm text-blue-600 underline"
            >
              Ver rota no Google Maps
            </a>

            <p className="text-sm text-gray-500 mt-1">
              Última atualização:{" "}
              {new Date(localEquipe.ultimaAtualizacao?.toDate()).toLocaleString(
                "pt-BR"
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
