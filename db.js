
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, set, onValue, push, get, child , remove , update } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";

const firebaseConfig = {
    apiKey: "AIzaSyDl2av1J5to1r345j5xCscbbpMezhVGYRg",
    authDomain: "primetech-e1884.firebaseapp.com",
    databaseURL: "https://primetech-e1884-default-rtdb.firebaseio.com",
    projectId: "primetech-e1884",
    storageBucket: "primetech-e1884.firebasestorage.app",
    messagingSenderId: "86145780620",
    appId: "1:86145780620:web:06a2f36d84ffd27153a4a9",
    measurementId: "G-JMLT7PMSY6"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const analytics = getAnalytics(app);


export { db, ref, set, onValue, push, get, child , remove , update };