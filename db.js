import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, set, onValue, push, get, child } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyC5noAfjd0zqH0NqxUsRCBt0rppXetu43w",
  authDomain: "e-commerce-8ba20.firebaseapp.com",
  databaseURL: "https://e-commerce-8ba20-default-rtdb.firebaseio.com",
  projectId: "e-commerce-8ba20",
  storageBucket: "e-commerce-8ba20.firebasestorage.app",
  messagingSenderId: "994107550649",
  appId: "1:994107550649:web:ae881a0ae7b04e2bef6468"
};

// 1. تفعيل التطبيق
const app = initializeApp(firebaseConfig);

// 2. تفعيل قاعدة البيانات مع ربطها بالتطبيق (ده اللي كان ناقص)
const db = getDatabase(app);

// 3. التصدير
export { db, ref, set,onValue, push, get, child };