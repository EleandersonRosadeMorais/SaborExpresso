
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js"
const firebaseConfig = {
  apiKey: "AIzaSyBj-Ylk49kOBTsIG7W_HbBl0NuplZSqEjU",
  authDomain: "saborexpresso-b7f6f.firebaseapp.com",
  databaseURL: "https://saborexpresso-b7f6f-default-rtdb.firebaseio.com",
  projectId: "saborexpresso-b7f6f",
  storageBucket: "saborexpresso-b7f6f.firebasestorage.app",
  messagingSenderId: "635279162003",
  appId: "1:635279162003:web:fde0c2a20f0131d692eb66",
  measurementId: "G-BT2FFLQF5X"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export { db, app, auth }