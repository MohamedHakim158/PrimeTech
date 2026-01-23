
document.addEventListener('DOMContentLoaded', function() {
 
    document.getElementById('register-btn').addEventListener('click', function() {
        registerUser();
    });

    
    document.getElementById('confirm-password').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            registerUser();
        }
    });
});

function registerUser() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const address = document.getElementById('address').value.trim();
    const termsAccepted = document.getElementById('terms').checked;
    
  
    if (!name || !email || !password || !confirmPassword || !address) {
        showMessage('error-message', 'Please fill in all fields');
        return;
    }
    
 
    if (!isValidGmail(email)) {
        showMessage('error-message', 'Only Gmail addresses are allowed (example@gmail.com)');
        return;
    }
    
    if (password !== confirmPassword) {
        showMessage('error-message', 'Passwords do not match');
        return;
    }
    
    if (password.length < 6) {
        showMessage('error-message', 'Password must be at least 6 characters');
        return;
    }
    
    if (!termsAccepted) {
        showMessage('error-message', 'You must accept the terms and conditions');
        return;
    }
    

    showLoading(true);
    hideMessage('error-message');
    hideMessage('success-message');
    

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
 
            const user = userCredential.user;
            
        
            const userRef = database.ref('users/' + user.uid);
            
            const userData = {
                uid: user.uid,
                name: name,
                email: email,
                address: address,
                createdAt: new Date().toISOString(),
                lastLogin: new Date().toISOString(),
                status: 'active',
                userType: 'customer',
                emailVerified: false
            };
            
            userRef.set(userData)
                .then(() => {
         
                    return user.sendEmailVerification();
                })
                .then(() => {
               
                    showLoading(false);
                    
 
                    showMessage('success-message', 'Registration successful! Verification email sent to ' + email + '. Redirecting to login...', 'success');
                    
                    setTimeout(() => {
                        window.location.href = 'login.html';
                    }, 3000);
                })
                .catch((error) => {
                    showLoading(false);
                    console.error('Error saving user data:', error);
                
                    showMessage('success-message', 'Account created but there was an issue saving your profile. Redirecting to login...', 'success');
                    
                    setTimeout(() => {
                        window.location.href = 'login.html';
                    }, 3000);
                });
        })
        .catch((error) => {
     
            showLoading(false);
            

            let errorMessage = 'Registration failed. ';
            switch(error.code) {
                case 'auth/email-already-in-use':
                    errorMessage += 'This Gmail is already registered.';
                    break;
                case 'auth/invalid-email':
                    errorMessage += 'Invalid Gmail address.';
                    break;
                case 'auth/weak-password':
                    errorMessage += 'Password is too weak.';
                    break;
                case 'auth/operation-not-allowed':
                    errorMessage += 'Email/password accounts are not enabled.';
                    break;
                default:
                    errorMessage += error.message;
            }
            showMessage('error-message', errorMessage);
        });
}


function checkPasswordStrength(password) {
    const strength = {
        0: "Very Weak",
        1: "Weak",
        2: "Medium",
        3: "Strong",
        4: "Very Strong"
    };
    
    let score = 0;
    

    if (password.length >= 8) score++;
    if (password.length >= 12) score++;

    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    

    if (/\d/.test(password)) score++;
    
 
    if (/[^A-Za-z0-9]/.test(password)) score++;
    
    return strength[Math.min(score, 4)];
}

document.getElementById('password')?.addEventListener('input', function() {
    const password = this.value;
    if (password.length > 0) {
        const strength = checkPasswordStrength(password);

        console.log('Password strength:', strength);
    }
});