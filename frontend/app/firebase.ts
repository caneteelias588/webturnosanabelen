import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // 👈 Importamos la Base de Datos

// Tus credenciales reales
const firebaseConfig = {
  apiKey: "AIzaSyBaMTQFXxqlOTYBm0Quka5nFKzCGs8nBSU",
  authDomain: "turnos-ana-belen.firebaseapp.com",
  projectId: "turnos-ana-belen",
  storageBucket: "turnos-ana-belen.firebasestorage.app",
  messagingSenderId: "462662573627",
  appId: "1:462662573627:web:55d4d0692ffb25d332861e",
  measurementId: "G-4QC5SQW1TW"
};

// Iniciamos la conexión
const app = initializeApp(firebaseConfig);

// 👇 Exportamos la Base de Datos para poder usarla en el calendario
export const db = getFirestore(app);