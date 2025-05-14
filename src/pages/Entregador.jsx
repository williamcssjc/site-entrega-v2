import React, { useEffect, useState } from "react";
import { Calendar } from "../components/ui/Calendar";
import { db } from "../firebaseConfig";
import { collection, query, getDocs } from "firebase/firestore";

function Entregador() {
  const [entregas, setEntregas] = useState([]);

  useEffect(() => {
    async function fetchEntregas() {
      const q = query(collection(db, "entregas"));
      const querySnapshot = await getDocs(q);
      const dados = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setEntregas(dados);
    }

    fetchEntregas();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Painel do Entregador</h1>
      <Calendar />
      {/* Aqui futuramente mostraremos as entregas */}
    </div>
  );
}

export default Entregador;
