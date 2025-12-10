import { initializeApp }
  from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";

import { getDatabase, ref, get }
  from "https://www.gstatic.com/firebasejs/11.0.0/firebase-database.js";
const firebaseConfig = {
  apiKey: "AIzaSyCJ6UFEyyXJrZCyVQKeaZKdXhgHiInTlXw",
  authDomain: "game-f6ba8.firebaseapp.com",
  databaseURL: "https://game-f6ba8-default-rtdb.firebaseio.com",
  projectId: "game-f6ba8",
  storageBucket: "game-f6ba8.firebasestorage.app",
  messagingSenderId: "489174228842",
  appId: "1:489174228842:web:de73dc7484e82d697d8f13"
};


const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

console.log("Firebase初期化完了:", db);

// 他のJSから利用できるようにexport
export { db };