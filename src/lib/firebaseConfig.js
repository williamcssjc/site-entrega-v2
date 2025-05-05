// src/lib/firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // <-- isso importa o Firestore
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDH5amqz7OjqFhaY_NClX7ch1pxuZmEV6c",
  authDomain: "artevelha-entregas.firebaseapp.com",
  projectId: "artevelha-entregas",
  storageBucket: "artevelha-entregas.firebasestorage.app",
  messagingSenderId: "1026378716414",
  appId: "1:1026378716414:web:58a324715eec84db3601af",
  measurementId: "G-PXSR7VLHSP"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // <-- cria a instância do Firestore
const analytics = getAnalytics(app);

export { app, db }; // <-- exporta corretamente para uso em outros arquivos
