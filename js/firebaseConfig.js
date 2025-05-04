
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js"
const firebaseConfig = {
  apiKey: "AIzaSyBSjCxC6JfV9--_BOpoweeCGND9gKfg1-M",
  authDomain: "cardapio-6b660.firebaseapp.com",
  databaseURL: "https://cardapio-6b660-default-rtdb.firebaseio.com",
  projectId: "cardapio-6b660",
  storageBucket: "cardapio-6b660.firebasestorage.app",
  messagingSenderId: "568038482924",
  appId: "1:568038482924:web:50bb7c3ed0c83d23e5d6c9",
  measurementId: "G-KKQPRXHYZX"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export { db, app, auth }