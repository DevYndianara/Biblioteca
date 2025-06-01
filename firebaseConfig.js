// Importar as aplicações do Firebase no App
import { initializeApp } from "firebase/app";
//import { initializeAuth, getReactNativePersistence } from 'firebase/auth/react-native';
//import AsyncStorage from "@react-native-async-storage/async-storage"; Não está funcionando a autenticação, logo, não precisa da persistência de dados do storage
//import { getAuth } from "firebase/auth"; Não está funcionando no Expo
//import { initializeAuth, getReactNativePersistence } from "firebase/auth"; Não está funcionando a tela de autenticação
import { getFirestore } from "firebase/firestore";
import { initializeFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Configuração do Firebase 
const firebaseConfig = {
  apiKey: "XXXXXXXXXXXXXXXX-XXXXXXXXXXXXXXXXXXX",
  authDomain: "XXXXX-0000b.firebaseapp.com",
  projectId: "XXXXX-0000b",
  storageBucket: "XXXXX-0000b.firebasestorage.app",
  messagingSenderId: "123412341234",
  appId: "1:123412341234:web:XXXXXXXXXXXXXXXXXXX"
};

// Inicializar o Firebase 
const app = initializeApp(firebaseConfig);

// const auth = getAuth(app); - Não funcionou para o Expo (11h)

// Inicializa a autenticação corretamente para React Native com persistência no Storage
//const auth = initializeAuth(app, {
//  persistence: getReactNativePersistence(AsyncStorage)
//}); Comentado pq não está funcionando a tela de autenticação na última tentativa às 18h22

const db = getFirestore(app);


export { db }; // Removido da exportação o auth

