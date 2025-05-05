import React, { useState } from "react";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Corrige ícones do Leaflet no Vite (sem require!)
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL("leaflet/dist/images/marker-icon-2x.png", import.meta.url).href,
  iconUrl: new URL("leaflet/dist/images/marker-icon.png", import.meta.url).href,
  shadowUrl: new URL("leaflet/dist/images/marker-shadow.png", import.meta.url).href,
});

export default function Cliente() {
  const [pedido, setPedido] = useState("");
  const [dadosEntrega, setDadosEntrega] = useState(null);
  const [localEquipe, setLocalEquipe] = useState(null);

  const buscarPedido = async () => {
    if (!pedido) return;
    try {
      const pedidoRef = doc(db, "entregas", pedido);
      const docSnap = await getDoc(pedidoRef);
      if (docSnap.exists()) {
        const dados = docSnap.data();
        setDadosEntrega(dados);
        if (dados.equipeId) {
          const equipeRef = doc(db, "rastreamentoEquipes", dados.equipeId);
          onSnapshot(equipeRef, (snapshot) => {
            setLocalEquipe(snapshot.data());
          });
        }
      } else {
        alert("Pedido não encontrado");
        setDadosEntrega(null);
        setLocalEquipe(null);
      }
    } catch (err) {
      console.error("Erro ao buscar pedido:", err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      <h2 className="text-xl font-bold">Rastreamento de Entrega</h2>

      <div className="flex gap-2">
        <Input
          placeholder="Digite o número do pedido"
          value={pedido}
          onChange={(e) => setPedido(e.target.value)}
        />
        <Button onClick={buscarPedido}>Buscar</Button>
      </div>

      {dadosEntrega && (
        <div className="mt-4 space-y-2">
          <p><strong>Cliente:</strong> {dadosEntrega.nomeCliente}</p>
          <p><strong>Endereço:</strong> {dadosEntrega.endereco}</p>
          <p><strong>Status:</strong> {dadosEntrega.status}</p>
          <p><strong>Data da Entrega:</strong> {dadosEntrega.dataEntrega}</p>
        </div>
      )}

      {localEquipe && (
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Localização da Equipe</h3>
          <MapContainer
            center={[localEquipe.latitude, localEquipe.longitude]}
            zoom={13}
            style={{ height: "300px", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[localEquipe.latitude, localEquipe.longitude]}>
              <Popup>
                Equipe: {dadosEntrega?.equipeId} <br />
                Status: {localEquipe.status}
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      )}
    </div>
  );
}
