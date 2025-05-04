
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js"
const firebaseConfig = {
  apiKey: "AIzaSyDL0C-N21wIkpb0UMn665MbGEhElLHTsKY",
  authDomain: "meuspedidos-26cff.firebaseapp.com",
  databaseURL: "https://meuspedidos-26cff-default-rtdb.firebaseio.com",
  projectId: "meuspedidos-26cff",
  storageBucket: "meuspedidos-26cff.firebasestorage.app",
  messagingSenderId: "135117509241",
  appId: "1:135117509241:web:5b957792c71566f436baa8",
  measurementId: "G-V73EJCXBLP"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export { db, app, auth }