
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


firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();


function isValidGmail(email) {
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return gmailRegex.test(email);
}


function showMessage(elementId, message, type = 'error') {
    const element = document.getElementById(elementId);
    element.textContent = message;
    element.style.display = 'block';
    element.style.color = type === 'error' ? '#ff6b6b' : '#00B7B5';
    element.style.backgroundColor = type === 'error' ? 'rgba(255, 107, 107, 0.1)' : 'rgba(0, 183, 181, 0.1)';
    element.style.padding = '12px';
    element.style.borderRadius = '6px';
    element.style.borderLeft = type === 'error' ? '4px solid #ff6b6b' : '4px solid #00B7B5';
    element.style.marginTop = '15px';
}


function hideMessage(elementId) {
    document.getElementById(elementId).style.display = 'none';
}


function showLoading(show) {
    const loadingElement = document.getElementById('loading');
    if (loadingElement) {
        loadingElement.style.display = show ? 'block' : 'none';
    }
}