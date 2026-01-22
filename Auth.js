// Import Firebase v12.8.0 modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

// for later use



    // Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyDl2av1J5to1r345j5xCscbbpMezhVGYRg",
    authDomain: "primetech-e1884.firebaseapp.com",
    projectId: "primetech-e1884",
    storageBucket: "primetech-e1884.firebasestorage.app",
    messagingSenderId: "86145780620",
    appId: "1:86145780620:web:06a2f36d84ffd27153a4a9",
    measurementId: "G-JMLT7PMSY6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Auth
const auth = getAuth(app);
const db = getFirestore(app)


// Check if user is authenticated
function checkAuthenticated() {
    onAuthStateChanged(auth, user => {
        if (!user) {
            window.location.href = "/login.html";
        }
    });
}



// Register a new user
async function register(name , email , password , city , address) {
    try {
            checkAuthenticated();
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredential.user;
            const idToken = await user.getIdToken();
           

            
            const firestoreData = await addDoc(collection(db , "users"),{
                fields: {
                    email: email,
                    fullName: name,
                    city: city,
                    address:address,
                    role:"user"
                }
            });

         

        }
    catch (error) {
           console.log(error.message);
    }
}



// saving user data after registering

 



// Call functions
// checkAuthenticated();
register("mohamed" , "anybody@gmail.com" , "anypass" , "cairo" , "egypt");
