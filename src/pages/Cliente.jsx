import { useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from "../lib/firebaseConfig";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function Cliente() {
  const [pedidoId, setPedidoId] = useState('');
  const [dadosEntrega, setDadosEntrega] = useState(null);
  const [localizacaoEquipe, setLocalizacaoEquipe] = useState(null);

  const buscarPedido = async () => {
    if (!pedidoId) return;

    try {
      const pedidoRef = doc(db, 'entregas', pedidoId);
      const pedidoSnap = await getDoc(pedidoRef);

      if (pedidoSnap.exists()) {
        const dados = pedidoSnap.data();
        setDadosEntrega(dados);

        // Buscar dados da equipe
        if (dados.equipeId) {
          const equipeRef = doc(db, 'rastreamentoEquipes', dados.equipeId);
          const equipeSnap = await getDoc(equipeRef);

          if (equipeSnap.exists()) {
            setLocalizacaoEquipe(equipeSnap.data());
          } else {
            setLocalizacaoEquipe(null);
          }
        }
      } else {
        setDadosEntrega(null);
        setLocalizacaoEquipe(null);
        alert('Pedido não encontrado.');
      }
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  return (
    <div className="flex justify-center bg-[#fbf9ed] min-h-screen py-10">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Acompanhar Pedido</h2>

        <input
          type="text"
          placeholder="Digite o número do pedido"
          value={pedidoId}
          onChange={(e) => setPedidoId(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-2 text-black"
        />
        <button
          onClick={buscarPedido}
          className="bg-[#8d6748] text-white px-4 py-2 rounded hover:bg-[#a97d5e] w-full"
        >
          Buscar
        </button>

        {dadosEntrega && (
          <div className="mt-4 space-y-1">
            <p><strong>Status:</strong> {dadosEntrega.status}</p>
            <p><strong>Localização:</strong> {dadosEntrega.localizacao}</p>
            <p><strong>Previsão de entrega:</strong> {dadosEntrega.previsao}</p>
            {localizacaoEquipe && (
              <>
                <p><strong>Status da Equipe:</strong> {localizacaoEquipe.status}</p>
                <p><strong>Última atualização:</strong> {localizacaoEquipe.ultimaAtualizacao}</p>
                <div className="mt-2">
                  <MapContainer
                    center={[localizacaoEquipe.latitude, localizacaoEquipe.longitude]}
                    zoom={13}
                    style={{ height: '200px', width: '100%' }}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[localizacaoEquipe.latitude, localizacaoEquipe.longitude]}>
                      <Popup>Equipe em rota</Popup>
                    </Marker>
                  </MapContainer>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
